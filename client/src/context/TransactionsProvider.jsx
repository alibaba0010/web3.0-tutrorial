import PropTypes from "prop-types";
import TransactionContext from "./TransactionContext";
import { useEffect, useState } from "react";
import { getEtherumContract } from "../utils/etherumContract";
const { ethereum } = window;
import { ethers } from "ethers";
import convertBigIntToDate from "../utils/convertDate";

const TransactionsProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const count = localStorage.getItem("transactionCount");
  const [connectAccount, setConnectAccount] = useState("");
  const [transactionCount, setTransactionCount] = useState(count);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  // function to get all transactions
  const getAvailableTransactions = async () => {
    setIsLoading(true);
    const transactionContract = await getEtherumContract();
    const allTransactions = await transactionContract.getAllTransactions();
    const getAmount = parseInt(allTransactions[0].amount) / 10 ** 18;
    // console.log("All transactions: ", getAmount);
    const time = convertBigIntToDate(allTransactions[0].timestamp);
    const structuredTransactions = allTransactions.map((transaction) => ({
      addressTo: transaction.receiver,
      addressFrom: transaction.sender,
      timestamp: time,
      message: transaction.message,
      keyword: transaction.keyword,
      amount: getAmount,
    }));
    // console.log("Structured transactions: ", structuredTransactions);
    setTransactions(structuredTransactions);
    setIsLoading(false);
  };
  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask wallet");
      // get accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        // console.log("Address: " + accounts.length);
        setConnectAccount(accounts[0]);
        // get All transactions
        await getAvailableTransactions();
      } else {
        alert("No account found in this blockchain");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function to check if transaction exist
  const checkTransaction = async () => {
    const transactionContract = await getEtherumContract();
    const currentTransactionCount =
      await transactionContract.getTransactionCount();
    console.log("Current transaction count: " + currentTransactionCount);

    // setTransactions((prevState) => [transaction, ...prevState]);
    // setTransactionCount(prevState.length + 1);
    localStorage.setItem("transactionCount", currentTransactionCount);
  };

  // listen for new transactions
  useEffect(() => {
    checkWallet();
    checkTransaction();
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
      setTransactionCount(transactionsCount);
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
        transactions,
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
