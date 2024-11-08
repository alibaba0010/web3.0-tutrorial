import PropTypes from "prop-types";
import TransactionContext from "./TransactionContext";
import { useEffect, useState } from "react";
const { ethereum } = window;
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
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount: connectAccount,
        formData,
        setFormData,
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
