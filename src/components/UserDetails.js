import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {

    const storedData = sessionStorage.getItem('userFormData');
    
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {

      navigate('/');
    }
  }, [navigate]);
  
  if (!userData) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="user-details-container">
      <h1>User Registration Details</h1>
      
      <div className="details-card">
        <div className="detail-row">
          <h2>Personal Information</h2>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Full Name:</div>
          <div className="detail-value">{userData.firstName} {userData.lastName}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Username:</div>
          <div className="detail-value">{userData.username}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Email:</div>
          <div className="detail-value">{userData.email}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Phone Number:</div>
          <div className="detail-value">+{userData.phoneCountryCode} {userData.phoneNumber}</div>
        </div>
        
        <div className="detail-row">
          <h2>Location Information</h2>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Country:</div>
          <div className="detail-value">{userData.country}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">City:</div>
          <div className="detail-value">{userData.city}</div>
        </div>
        
        <div className="detail-row">
          <h2>Identification Documents</h2>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">PAN Number:</div>
          <div className="detail-value">{userData.panNumber}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Aadhar Number:</div>
          <div className="detail-value">{userData.aadharNumber}</div>
        </div>
      </div>
      
      <button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        Back to Form
      </button>
    </div>
  );
};

export default UserDetails;