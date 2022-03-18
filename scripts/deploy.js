const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");

async function main() {
  const A1NFT = await ethers.getContractFactory("A1NFT");

  // Start deployment, returning a promise that reesolves to a contract objects
  const a1NFT = await A1NFT.deploy();
  await a1NFT.deployed();
  console.log("Your contract has been deployed to the address:", a1NFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
