import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './landingPage.css'

const pageStyle = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'felx-start',
    alignItems: 'center',
    flexDirection: 'column',
  };

const Title = styled.h1`
  color: #ffa500;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #ffa500;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const CoinsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Coin = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('coinBack.jpeg'); /* Replace with your image path */
  background-size: cover; /* or 'contain' depending on your preference */
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 1rem;
`;

const Coin2 = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url('coinFront.jpeg'); /* Replace with your image path */
  background-size: cover; /* or 'contain' depending on your preference */
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 1rem;
`;

const LaunchButton = styled.button`
  background-color: #0066cc;
  color: #fff;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004d99;
  }
`;

const LandingPage = () => {
    const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/staker');
  };

  return (
    <div style={pageStyle}>
      <Title>FAIR FUTURE LIES IN FAIR COINS</Title>
      <Subtitle>Support people &amp; protect the planet</Subtitle>
      <CoinsContainer>
        <Coin />
        <Coin2 />
      </CoinsContainer>
      <LaunchButton onClick={handleButtonClick}>LAUNCH APP</LaunchButton>
      <div className="how-to-use">
        <h2 style={{ color: 'white' }}>How to Use</h2>
        <ol>
          <li>Connect your metamask/phantom wallet on our platform.</li>
          <li>Click on Launch App</li>
          <li>Either pick a charity of your choice from our options</li>
          <li>Or use our random coin flip if you dont feel like making the decision</li>
          <li>Enter the stake amount and press Stake</li>
          <li>Enjoy a seamless experience with our app!</li>
        </ol>
      </div>
    </div>
  );
};

export default LandingPage;
