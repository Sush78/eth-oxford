import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ServerStyleSheet } from 'styled-components';
import { LIST_OF_CHAARITIES } from '../utils/constants';

const coinFlipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(900deg);
  }
  100% {
    transform: rotateY(1800deg);
  }
`;

const CoinContainer = styled.div`
  width: 100px;
  height: 100px;
  perspective: 1000px;
`;

const Coin = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${(props) => (props.isFlipping ? coinFlipAnimation : 'none')} 2s infinite;
`;

const CoinSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  background-image: url('coinBack.jpeg'); /* Replace with your image path */
  background-size: cover; /* or 'contain' depending on your preference */
  background-position: center;
  background-repeat: no-repeat;
`;

const ResultText = styled.div`
  font-size: 0.5rem;
  font-weight: bold;
  color: black;
`;

const getRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * LIST_OF_CHAARITIES.length);
    return LIST_OF_CHAARITIES[randomIndex];
};

const CoinFlipAnimation = ({onStopFlip}) => {
    const [isFlipping, setIsFlipping] = useState(true);
    const coinRef = useRef(null);

  useEffect(() => {
    const coin = coinRef.current;
    const resetAnimation = () => {
      coin.style.animation = 'none';
      coin.offsetHeight; // Trigger reflow
      coin.style.animation = null;
    };

    const intervalId = setInterval(resetAnimation, 2000);

    const stopFlipping = () => {
        const randomSpins = Math.floor(Math.random() * (10 - 5 + 1)) + 2;
        const timeoutId = setTimeout(() => {
          const randomCharity = getRandomElement()
          onStopFlip(randomCharity)
          setIsFlipping(false);
          clearInterval(intervalId);
        }, randomSpins * 2000); // Stop flipping after the random number of spins
  
        return () => clearTimeout(timeoutId);
      };
  
      const timeoutId = setTimeout(stopFlipping, 2000); // Start flipping after 2 seconds
  
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }, []);
  

  return (
    <CoinContainer>
      <Coin ref={coinRef} isFlipping={isFlipping}>
        <CoinSide heads />
        <CoinSide />
      </Coin>
    </CoinContainer>
  );
};

export default CoinFlipAnimation;