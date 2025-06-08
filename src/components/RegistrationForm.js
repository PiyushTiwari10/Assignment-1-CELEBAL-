import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';
import { countries } from '../data/countries';

const RegistrationForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCountryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
 
  useEffect(() => {
    if (formData.country) {

      const countryCities = countries.find(c => c.name === formData.country)?.cities || [];
      setCities(countryCities);
      setFormData(prev => ({
        ...prev,
        city: '' 
      }));
    }
  }, [formData.country]);
  

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      
 
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
        newErrors.firstName = 'First name should only contain letters';
      }
      

      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
        newErrors.lastName = 'Last name should only contain letters';
      }
      

      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters';
      }
      

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
      

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
        newErrors.password = 'Password must include lowercase, uppercase, number and special character';
      }
      

      if (!formData.phoneCountryCode) {
        newErrors.phoneCountryCode = 'Country code is required';
      }
      
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be 10 digits';
      }
      

      if (!formData.country) {
        newErrors.country = 'Country is required';
      }
      

      if (!formData.city) {
        newErrors.city = 'City is required';
      }
      

      if (!formData.panNumber) {
        newErrors.panNumber = 'PAN number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        newErrors.panNumber = 'Enter a valid PAN number (ABCDE1234F)';
      }
      

      if (!formData.aadharNumber) {
        newErrors.aadharNumber = 'Aadhar number is required';
      } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = 'Aadhar number must be 12 digits';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    setIsFormValid(validateForm());
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
  
      sessionStorage.setItem('userFormData', JSON.stringify(formData));
      navigate('/user-details');
    }
  };
  
  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group password-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            <button 
              type="button" 
              className="toggle-password" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="form-group phone-group">
          <label htmlFor="phoneCountryCode">Phone Number *</label>
          <div className="phone-input">
            <input
              type="text"
              id="phoneCountryCode"
              name="phoneCountryCode"
              placeholder="Code"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              className={errors.phoneCountryCode ? 'error' : ''}
              style={{ width: '70px' }}
            />
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
              style={{ flex: '1' }}
            />
          </div>
          {(errors.phoneCountryCode || errors.phoneNumber) && 
            <span className="error-message">
              {errors.phoneCountryCode || errors.phoneNumber}
            </span>
          }
        </div>
        
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.name} value={country.name}>{country.name}</option>
            ))}
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
            disabled={!formData.country}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="panNumber">PAN Number *</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            className={errors.panNumber ? 'error' : ''}
            placeholder="ABCDE1234F"
          />
          {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number *</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            className={errors.aadharNumber ? 'error' : ''}
            placeholder="123456789012"
          />
          {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={!isFormValid}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;