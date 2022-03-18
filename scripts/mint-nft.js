require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/A1NFT.sol/A1NFT.json");
// console.log(JSON.stringify(contract.abi));
const contractAddress = "0xD0b32Fd6dcF96Eb23C836F7b5668B6746fdC7ba8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  //func to get the most recent nonce
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  //the main transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
        if (!err) {
          console.log(
            "Your transaction hash is:",
            hash,
            "\nCheck Alchemy's mempool to view the status of your transaction"
          );
        } else {
          console.log(
            "something went wrong when submitting your transaction:",
            err
          );
        }
      })
      .catch((err) => {
        console.log("Promise failed:", err);
      });
  });
}

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmaVpxdhKAxGneb3XmQQXtS5fe8yHUS3uuevndKcRp8CtP"
);
