import React, { useContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";

const TransactionContext = () => {
  useEffect();
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  useContext();
  contractABI;
  contractAddress;
  const handleChange = () => {};
  return <div>TransactionContext</div>;
};

export default TransactionContext;
