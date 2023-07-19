import React, { useState } from 'react';
import './Payment.css';

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Payment processing logic here
    // You can perform payment validation and handle payment submission

    // Clear the form after submission
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setCardHolderName('');
  };

  return (
    <div className="payment-gateway">
      <h1>Payment Gateway</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cardHolderName">Card Holder Name:</label>
        <input
          type="text"
          id="cardHolderName"
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value)}
          required
        />

        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />

        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentGateway;
