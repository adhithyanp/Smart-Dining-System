import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '../../../url/BaseUrl';
import "./Payments.css";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASEURL}/fetchPayments`); 
        setPayments(response.data);
        calculateTotalProfit(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const calculateTotalProfit = (payments) => {
    let total = 0;
    payments.forEach((payment) => {
      total += payment.orderDetails.totalPrice;
    });
    setTotalProfit(total);
  };

  return (
    <div className="payments-container">
      <div className="payments-list">
        {payments.map((payment, index) => (
          <div key={index} className="payment-card">
            <h2>Order Details</h2>
            <p>Order ID: {payment.orderDetails._id}</p>
            <p>Table Number: {payment.orderDetails.tableNumber}</p>
            <p>Status: {payment.orderDetails.status}</p>
            <p>Total Price: {payment.orderDetails.totalPrice}</p>
          </div>
        ))}
      </div>
      <div className="total-profit">
        <h2>Total Profit: {totalProfit}</h2>
      </div>
    </div>
  );
}

export default Payments;
