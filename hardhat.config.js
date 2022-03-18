/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
const { API_URL, PRIVATE_KEY, API_KEY } = process.env;
module.exports = {
    defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    }
  },
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },

  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: [API_URL],
      accounts: [`0x${PRIVATE_KEY}`],
    },
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: API_KEY,
    },
    solidity: {
      version: "0.8.1",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts",
    },
    mocha: {
      timeout: 40000,
    },
  },
};
