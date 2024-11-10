import PropTypes from "prop-types";
import TransactionContext from "./TransactionContext";
import { useEffect, useState } from "react";
import { getEtherumContract } from "../utils/etherumContract";
const { ethereum } = window;
import { ethers } from "ethers";

const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const [connectAccount, setConnectAccount] = useState("");
  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask wallet");
      // get accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectAccount(accounts[0]);
        // get All transactions
      }
      console.log("Address: " + accounts);
    } catch (error) {
      alert("No account found");
      console.log(error);
    }
  };
  useEffect(() => {
    checkWallet();
  }, []);
  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Wallet connected successfully!: ", accounts);
      setConnectAccount(accounts[0]);
    } catch (e) {
      alert("Unable to connect to metamask", e);
    }
  };
  const sendTransaction = async () => {
    try {
      const transactionContract = await getEtherumContract();
      const { addressTo, amount, keyword, message } = formData;
      const transaction = await transactionContract.sendTransaction(
        addressTo,
        ethers.utils.parseEther(amount),
        keyword,
        message
      );
      console.log("Transaction sent: ", transaction);
    } catch (error) {
      alert("Unable to send transaction", error);
      console.log(error);
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount: connectAccount,
        formData,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionsProvider;

TransactionsProvider.propTypes = {
  children: PropTypes.object,
};
