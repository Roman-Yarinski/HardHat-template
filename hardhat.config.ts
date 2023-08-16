import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";

import "tsconfig-paths/register";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-watcher";
import "hardhat-deploy";
import "solidity-docgen";

import "./tasks/index";

import { HardhatUserConfig } from "hardhat/config";
import envConfig from "./config";

const { DEPLOYER_KEY, INFURA_KEY, ETHERSCAN_API_KEY, POLYGONSCAN_API_KEY, BSCSCAN_API_KEY } = envConfig;

function typedNamedAccounts<T>(namedAccounts: { [key in string]: T }) {
  return namedAccounts;
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: "types/typechain-types",
  },
  networks: {
    hardhat: {
      gasPrice: "auto",
      loggingEnabled: false,
      forking: {
        url: "",
        enabled: false,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 1,
      accounts: [DEPLOYER_KEY || ""],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      chainId: 5,
      accounts: [DEPLOYER_KEY || ""],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 137,
      accounts: [DEPLOYER_KEY || ""],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      chainId: 80001,
      accounts: [DEPLOYER_KEY || ""],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [DEPLOYER_KEY || ""],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: [DEPLOYER_KEY || ""],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_API_KEY || "",
      goerli: ETHERSCAN_API_KEY || "",
      polygon: POLYGONSCAN_API_KEY || "",
      polygonMumbai: POLYGONSCAN_API_KEY || "",
      bsc: BSCSCAN_API_KEY || "",
      bscTestnet: BSCSCAN_API_KEY || "",
    },
  },
  namedAccounts: typedNamedAccounts({
    deployer: 0,
  }),
  docgen: {
    exclude: ["./mocks"],
    pages: "single",
  },
  watcher: {
    test: {
      tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
      files: ["./test/**/*"],
      verbose: true,
    },
  },
  gasReporter: {
    enabled: false,
    coinmarketcap: "",
    currency: "USD",
    token: "ETH",
    gasPrice: 28,
  },
};

export default config;
