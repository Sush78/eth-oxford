import React, { useEffect } from 'react';
import './confetti.css'; // Import the CSS file for styling

const Confetti = () => {
  useEffect(() => {
    const confettiContainer = document.getElementById('confetti-container');

    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      confetti.style.width = `${Math.random() * 15 + 5}px`;
      confetti.style.height = `${Math.random() * 15 + 5}px`;
      confetti.style.backgroundColor = getRandomColor();

      confettiContainer.appendChild(confetti);

      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const confettiInterval = setInterval(createConfetti, 200);

    // Stop the confetti after 10 seconds
    setTimeout(() => {
      clearInterval(confettiInterval);
    }, 10000);

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return <div id="confetti-container" className="confetti-container" />;
};

export default Confetti;
