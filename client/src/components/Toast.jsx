import React, { useState, useEffect } from 'react';
import './toast.css'; // Import the CSS file for styling

const Toast = ({ message, showToast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showToast) {
      setIsVisible(true);

      // Automatically hide the toast after 3000 milliseconds (adjust as needed)
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 8000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showToast, onClose]);

  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
