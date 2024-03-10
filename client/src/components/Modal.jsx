import React, {useState} from 'react';
import styled from 'styled-components';
import { LIST_OF_CHAARITIES } from '../utils/constants';

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
  max-width: 20rem;
  max-height: 80%;
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

const Modal = ({ show, onClose, content, onConfirm, onCancel }) => {
  const [selectedValue, setSelectedValue] = useState('');

  if (!show) return null;

  const handleConfirm = () => {
    onConfirm(selectedValue);
    onClose();
  };

  const handleCancel = () => {
    onCancel('');
    onClose();
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value)
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p style={{ color: 'white' }}>{content}</p>
        <select id="dropdown" value={selectedValue} onChange={handleSelectChange} className="white-text">
            <option value="">Select...</option>
            {LIST_OF_CHAARITIES.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
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

export default Modal;