import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
  DEPLOYER_KEY: string | undefined;
  INFURA_KEY: string | undefined;
  ETHERSCAN_API_KEY: string | undefined;
  POLYGONSCAN_API_KEY: string | undefined;
  BSCSCAN_API_KEY: string | undefined;
}

interface Config {
  DEPLOYER_KEY: string;
  INFURA_KEY: string;
  ETHERSCAN_API_KEY: string;
  POLYGONSCAN_API_KEY: string;
  BSCSCAN_API_KEY: string;
}

const getConfig = (): ENV => {
  return {
    DEPLOYER_KEY: process.env.DEPLOYER_KEY,
    INFURA_KEY: process.env.INFURA_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
    BSCSCAN_API_KEY: process.env.BSCSCAN_API_KEY,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
