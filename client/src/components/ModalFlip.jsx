import React, {useState, useEffect} from 'react';
import {styled, keyframes} from 'styled-components';
import './modalFlip.css';
import CoinFlipAnimation from './CoinFlipAnimation';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #363431;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  // max-width: 80%;
  // max-height: 80%;
  width: 20rem;
  height: 12rem;
  overflow: auto;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); // Add a subtle golden glow
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) => (props.confirm ? '#4da6ff' : '#ccc')};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 0.5rem;

  &:hover {
    background-color: ${(props) => (props.confirm ? '#3d8bcf' : '#bbb')};
  }
`;


const ModalFlip = ({ show, onClose, content, onConfirm, onCancel }) => {
  // const [isFlipping, setIsFlipping] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [contentText, setContentText] = useState('');

  useEffect(() => {
    setShowContent(false)
    setContentText('')
  },[show])

  if (!show) return null;

  const handleConfirm = () => {
    onConfirm(contentText);
    onClose();
  };

  const handleCancel = () => {
    onCancel('');
    onClose();
  };

  const handleStopFlip = (value) => {
    setShowContent(true)
    setContentText(value)
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CoinFlipAnimation onStopFlip={handleStopFlip}/>
        {showContent && <p style={{ color: 'white' }}>{`You've selected ${contentText} charity!`}</p>}
        <ButtonContainer>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} confirm>
            Confirm
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalFlip;