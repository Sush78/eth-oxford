import {useState, useContext } from 'react';
// import { Button, TextField, Typography, Container, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { TransactionContext } from "../context/TransactionContext";
import Modal from './Modal';
import ModalFlip from './ModalFlip';
import Confetti from './Confetti';
import Toast from './Toast';

const pageStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

const Container = styled.div`
  background-color: #000;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  border-style
  border: 2px solid #ffd700; // Nice shade of gold
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); // Add a subtle golden glow

`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.div`
  background-color: #1c1c1c;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  background-color: transparent;
  border: none;
  color: #fff;
  flex: 1;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #666;
  }
`;

const MaxButton = styled.button`
  background-color: transparent;
  border: none;
  color: #4da6ff;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ConnectWalletButton = styled.button.attrs((props) => ({
    disabled: props.disabled,
  }))`
    background-color: ${(props) => (props.disabled ? '#ccc' : '#4da6ff')};
    color: ${(props) => (props.disabled ? '#666' : '#fff')};
    border: none;
    border-radius: 4px;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: ${(props) => (props.disabled ? '#ccc' : '#3d8bcf')};
    }
  `;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Button = styled.button.attrs((props) => ({
    disabled: props.disabled,
  }))`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#4da6ff')};
  color: ${(props) => (props.disabled ? '#666' : '#fff')};
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
  margin: 0 0.5rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#3d8bcf')};
  }
`;

const StakerPage = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showModalFlip, setShowModalFlip] = useState(false);
  const [modalContentFlip, setModalContentFlip] = useState('');
  const [selectedCharity, setSelectedCharity] = useState('');
  const [showConfetti, setShowConfetti] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleButtonClickFlip = (content) => {
    setModalContentFlip(content);
    setShowModalFlip(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };  

  const handleConfirm = (value) => {
    console.log('Confirmed:', value);
    setShowModal(false);
    setSelectedCharity(value)
  };

  const handleCancel = () => {
    console.log('Canceled');
    setShowModal(false);
  };

  const handleCloseModalFlip = () => {
    setShowModalFlip(false);
  };  

  const handleConfirmFlip = (value) => {
    console.log('Confirmed:', value);
    setShowModalFlip(false);
    setSelectedCharity(value)
  };

  const handleCancelFlip = () => {
    console.log('Canceled');
    setShowModalFlip(false);
  };

  const handleStake = async() => {
    console.log('staking...');
    try{
        await mintAndDonate({selectedCharity, ethAmount})
        playSoundEffect()
        setShowConfetti(true)
        setEthAmount('')
        setSelectedCharity('')
        setShowToast(true)
    } catch (err) {
        console.log(err)
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };
 
  const playSoundEffect = () => {
    // const audio = new Audio('wow-171498.mp3');
    const audio = new Audio('cha-ching.mp3');
    audio.play();
  };

  const { currentAccount, connectWallet, handleChange, mintAndDonate, formData, isLoading } = useContext(TransactionContext);

  return (
    <div style={pageStyle}>
    <Container>
      <ButtonsContainer>
        <Button onClick={() => handleButtonClick('Pick a charity of your choice')}>Direct Donation</Button>
        <Button onClick={() => handleButtonClickFlip('Content for Button 2')}>Flip A Coin</Button>
        <Button disabled={true} onClick={() => handleButtonClick('Content for Button 3')}>General Pool</Button>
      </ButtonsContainer>  
      <Header>Stake Ether</Header>
      <p>Stake ETH and receive stETH while staking.</p>
      <Input>
        <InputField
          type="number"
          placeholder="ETH amount"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />
        <MaxButton>MAX</MaxButton>
        </Input>
      {selectedCharity !=='' && <p>Selected Charity: {selectedCharity}</p>}
      <ConnectWalletButton disabled={selectedCharity==='' || !currentAccount} onClick={handleStake}>Stake</ConnectWalletButton>
      <InfoRow>
        <span>You will receive</span>
        <span>0.0 stETH</span>
      </InfoRow>
      <InfoRow>
        <span>Exchange rate</span>
        <span>1 ETH = 1 stETH</span>
      </InfoRow>
      <InfoRow>
        <span>Max transaction cost</span>
        <span>$45.14</span>
      </InfoRow>
      <InfoRow>
        <span>Reward fee</span>
        <span>10%</span>
      </InfoRow>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        content={modalContent}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <ModalFlip
        show={showModalFlip}
        onClose={handleCloseModalFlip}
        content={modalContentFlip}
        onConfirm={handleConfirmFlip}
        onCancel={handleCancelFlip}
      />
    </Container>
    {showConfetti && <Confetti /> }
    <Toast
        message="Staking request submitted!"
        showToast={showToast}
        onClose={handleToastClose}
    />
    </div>
  );
};

export default StakerPage;
