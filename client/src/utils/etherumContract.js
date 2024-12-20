import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constants";
const { ethereum } = window;
export const getEtherumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // console.log(`${provider} ${signer} ${transactionContract}`);
  return transactionContract;
};
