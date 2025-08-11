import Web3 from "web3";
import ABI from "./ABI.json";

// const CONTRACT_ADDRESS = "0x1Cf4A978e7D83B7EEc558273f62a790313681D46";
const CONTRACT_ADDRESS = "0xF9d683E465dA7445D06AE02a5d40Eb5326b60c2f";

export async function connectContract() {
  if (!window.ethereum) throw new Error("Sem MetaMask instalada.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length) throw new Error("Carteira não permitida.");

  // alert(accounts[0]);
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
}

export async function addLink({ url, linkId, feeInWei }) {
  const contract = await connectContract();
  return contract.methods.addLink(url, linkId, feeInWei).send();
}

export async function getLink(linkId) {
  const contract = await connectContract();
  return contract.methods.getLink(linkId).call();
}

export async function payLink(linkId, valueInWei) {
  const contract = await connectContract();
  return contract.methods.payLink(linkId).send({ value: valueInWei });
}
