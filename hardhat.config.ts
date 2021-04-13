import { HardhatUserConfig } from "hardhat/config";
import { config } from "dotenv";

import "hardhat-docgen";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

config();

const privateKey: string = String(process.env.PRIVATE_KEY);
const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [privateKey],
    },
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
  etherscan: {
    apiKey: process.env.BSC_API_KEY,
  },
};

module.exports = hardhatConfig;
