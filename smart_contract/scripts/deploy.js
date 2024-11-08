// const main = async () => {
//   const transactionsFactory = await hre.ethers.getContractFactory(
//     "Transactions"
//   );
//   const transactionsContract = await transactionsFactory.deploy();
//   console.log("Transactions: ", transactionsContract);

//   await transactionsContract.deployed();

//   console.log("Transactions address: ", transactionsContract.address);
// };

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// runMain();
// // AuuU5KSKE9PWJ0vQ3VYkekMRshH9PFm3

const { ethers } = require("hardhat");

async function main() {
  const Transactions = await ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  await transactions.waitForDeployment();

  console.log(`Token address: ${(await transactions.getAddress()).toString()}`);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
clearImmediate;
