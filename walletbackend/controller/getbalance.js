import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk"
import dotenv from "dotenv";

dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);
function hexToEth(hexString) {
    // Remove the '0x' prefix if it exists
    hexString = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
  
    // Convert the hexadecimal string to a decimal number
    const decimalValue = parseInt(hexString, 16);
  
    // Divide by 10^18 to convert from wei to ETH
    const ethValue = decimalValue / 1e18;
  
    return ethValue;
  }
const checkBalance= async (req,res) =>
{
  // This response fetches the balance of the given address in the paramter as of the provided block.
  let id=req.params.id
  let response = await alchemy.core.getBalance(id, "latest")

  //Logging the response to the console'

  const ethValue = hexToEth(response._hex);
  const round = (n, dp) => {
    const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }
  
  console.log(round(ethValue, 4))
  let x=round(ethValue, 4)
  res.json({"eth":x})
};


export { checkBalance}