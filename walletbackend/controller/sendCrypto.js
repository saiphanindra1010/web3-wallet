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
const sendCrypto= async (req,res) =>
{

  // This response fetches the balance of the given address in the paramter as of the provided block.
  const { to_address,amount} = req.body
  console.log(to_address)
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );
  let transaction = {
    to: to_address,
    value: Utils.parseEther(amount),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 11155111,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log("Sent transaction", tx);


  await res.json({success: true});
};


export { sendCrypto}