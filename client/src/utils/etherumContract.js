import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constants";
const { etherum } = window;
export const getEtherumContract = () => {
  const provider = new ethers.providers.Web3Provider(etherum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log(`${provider} ${signer} ${transactionContract}`);
};
