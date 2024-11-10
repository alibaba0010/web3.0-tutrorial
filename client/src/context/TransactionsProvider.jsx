import PropTypes from "prop-types";
import TransactionContext from "./TransactionContext";
import { useEffect, useState } from "react";
import { getEtherumContract } from "../utils/etherumContract";
const { ethereum } = window;
import { ethers } from "ethers";

const TransactionsProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const count = localStorage.getItem("transactionCount");
  const [connectAccount, setConnectAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(count);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
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
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = await getEtherumContract();
      console.log("Transaction contract: ", transactionContract);
      const parsedAmount = ethers.parseEther(amount);
      // send transaction ethers
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectAccount,
            to: addressTo,
            gas: "0x5208",
            // value: parsedAmount._hex,
            value: parsedAmount._hex,
          },
        ],
      });
      // to store the transaction
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionsCount = await transactionContract.getTransactionCount();
      console.log(`Transaction count: ${transactionsCount}`);
      // incrase the count after each transaction
      setTransactionCount(transactionsCount.toNumber());
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
        isloading,
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
