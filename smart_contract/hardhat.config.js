require("dotenv").config(); //all the key value pairs are being made available due to this lib
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_ARBITRUM_URL,
      accounts: [process.env.ARBITRUM_PRIVATE_KEY],
    },
  },
};
