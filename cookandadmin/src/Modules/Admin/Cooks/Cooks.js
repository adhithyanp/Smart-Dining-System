import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASEURL } from '../../../url/BaseUrl';
import './Cook.css'; 
import CookAvatar from "../../../assets/illustration-of-chef-avatar-work.png";

function Cooks() {
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const response = await axios.get(`${BASEURL}/fetchCook`);
        setCooks(response.data);
      } catch (error) {
        console.error("Error fetching the cooks", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCooks();
  }, []);

  const handleApprove = async (cookId) => {
    try {
      await axios.post(`${BASEURL}/approveCook/${cookId}`);
      setCooks(cooks.map(cook => cook._id === cookId ? { ...cook, status: 1 } : cook));
    } catch (error) {
      console.error("Error approving the cook", error);
    }
  };

  const handleRemove = async (cookId) => {
    try {
      await axios.post(`${BASEURL}/removeCook/${cookId}`);
      setCooks(cooks.map(cook => cook._id === cookId ? { ...cook, status: 0 } : cook));
    } catch (error) {
      console.error("Error changing the status of the cook", error);
    }
  };

  return (
    <div className="cooks-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {cooks.map(cook => (
            <div key={cook._id} className="cook-card">
              <div className="cook-avatar">
                <img src={CookAvatar} alt="Cook Avatar" />
              </div>
              <div className="cook-details">
                <h2>{cook.username}</h2>
                <p>Status: {cook.status === 1 ? 'Approved' : 'Not Approved'}</p>
                <div className="button-container">
                  {cook.status === 0 && (
                    <button className="approve" onClick={() => handleApprove(cook._id)}>Approve</button>
                  )}
                  {cook.status === 1 && (
                    <button className="remove" onClick={() => handleRemove(cook._id)}>Remove</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Cooks;