import PropTypes from "prop-types";
import TransactionContext from "./TransactionContext";
import { useEffect, useState } from "react";
const { ethereum } = window;
const TransactionsProvider = ({ children }) => {
  const [connectAccount, setConnectAccount] = useState("");
  const checkWallet = async () => {
    if (!ethereum) return alert("Please install metamask wallet");
    // get accounts
    const address = await ethereum.request({ method: "eth_accounts" });

    console.log("Address: " + address);
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
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionsProvider;

TransactionsProvider.propTypes = {
  children: PropTypes.object,
};
