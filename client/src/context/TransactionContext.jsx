import React, { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext({
  value: "",
});

export default TransactionContext;
