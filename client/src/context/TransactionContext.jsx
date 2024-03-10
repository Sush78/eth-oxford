/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ETHERSCAN_API_KEY } from "../utils/constants";

import { mockEthContractABI, mockEthcontractAddress, charityVaultcontractAddress, charityVaultContractABI } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const mockEthContract = new ethers.Contract(mockEthcontractAddress, mockEthContractABI, signer);
  const charityVaultContract = new ethers.Contract(charityVaultcontractAddress, charityVaultContractABI, signer);
//   console.log({mockEthContract})
  return {mockEthContract, charityVaultContract}
};

export const TransactionProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [gasPrice, setGasPrice] = useState(null);
  const [maxBalance, setMaxBalance] = useState(null);

  const fetchGasPrice = async () => {
    try {
      // Fetch gas price from Eth Gas Station API
      const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
      const jsonResp = await response.json()
      const apiGasPriceEth = jsonResp.result.SafeGasPrice
    //   const gasPriceEth = ethers.utils.parseUnits(apiGasPriceEth.toString(), 'gwei')
    //   console.log(gasPriceEth)
      setGasPrice(apiGasPriceEth);
    } catch (error) {
      console.error('Error fetching gas price:', error);
    }
  }


  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mintAndDonate = async(formData) => {
    try {
        console.log(formData)
        if (ethereum) {
          const retVal = createEthereumContract();   
          const amountInWei = ethers.utils.parseEther(formData.ethAmount.toString()); 
          await retVal.mockEthContract.mint(currentAccount, amountInWei);
          await retVal.mockEthContract.approve(charityVaultcontractAddress, amountInWei);
          await retVal.charityVaultContract._deposit(amountInWei);
        console.log("done")
        }
    } catch (error) {
        console.log(error);
      }
  }

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      console.log("in check")
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts)
      console.log(accounts)
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      const selectedAccount = accounts[0];
      // Get the balance in Wei
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(selectedAccount);
      const balanceInEth = ethers.utils.formatEther(balance);
    //   console.log(balanceInEth);
      setMaxBalance(parseFloat(balanceInEth));
    //   window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnect();
    // checkIfTransactionsExists();
    fetchGasPrice()
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        mintAndDonate,
        formData,
        gasPrice,
        maxBalance
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};