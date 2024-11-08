import { createContext } from "react";

const TransactionContext = createContext({
  value: {
    connectWallet: () => {},
    handleChange: () => {},
    handleSubmit: () => {},
    formData: {},
    isLoading: false,
    sendTransaction: () => {},
    currentAccount: "",
  },
});

export default TransactionContext;
