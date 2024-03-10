/* eslint-disable react/prop-types */
import React, {useContext} from 'react';
import styled from 'styled-components';
import { TransactionContext } from '../context/TransactionContext';

const HeaderContainer = styled.div`
  display: flex;
//   width: 100vw;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
//   padding-right: 1rem;
  background-color: #1c1c1c;
//   border-bottom: 2px solid #ffd700; // Nice shade of gold
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5); // Add a subtle golden glow
`;

const ConnectWalletButton = styled.button`
  background-color: #4da6ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 3rem;

  &:hover {
    background-color: #3d8bcf;
  }
`;

const shortenAddress = (address) => {
    if(!address) return ""
    return `${address.slice(0,5)}..${address.slice(address.length-4)}`
}

const HeaderComp = ({ title }) => {
  const { currentAccount, connectWallet, handleChange, mintAndDonate, formData, isLoading } = useContext(TransactionContext);  
  return (
    <HeaderContainer>
      <h3>{title}</h3>
      {currentAccount ? (
       <p>{shortenAddress(currentAccount)}</p>
       ):(
        <ConnectWalletButton onClick={connectWallet}>Connect Wallet</ConnectWalletButton>
       )}
    </HeaderContainer>
  );
};

export default HeaderComp;
