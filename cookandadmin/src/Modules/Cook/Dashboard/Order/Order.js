import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from "../../../../url/BaseUrl";
import "./Orders.css";
import io from 'socket.io-client';

const socket = io(BASEURL);

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order details from the database
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASEURL}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    // Add event listener for order status updates
    socket.on('orderStatusUpdated', ({ orderId, status }) => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    });

    // Add event listener for new orders
    socket.on('newOrder', (newOrder) => {
      setOrders(prevOrders => [...prevOrders, newOrder]);
    });

    // Cleanup
    return () => {
      socket.off('orderStatusUpdated');
      socket.off('newOrder');
    };
  }, []);

  const handleDeliver = async (orderId) => {
    try {
      await axios.put(`${BASEURL}/deliverfood/${orderId}`, { status: 'delivered' });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='order-con'>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h2>Order ID: {order._id}</h2>
          <p>Table Number: {order.tableNumber}</p>
          <h3>Items:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item._id}>
                {item.food} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total Amount: {order.totalPrice}/-</p>
          {order.status !== 'delivered' && (
            <button onClick={() => handleDeliver(order._id)}>Mark as Delivered</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Order;
