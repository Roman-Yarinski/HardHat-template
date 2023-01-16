declare module "config" {
  export interface GasReporter {
    readonly ENABLED: boolean;
    readonly COINMARKETCAP: string;
    readonly CURRENCY: string;
    readonly TOKEN: string;
    readonly GAS_PRICE_API: string;
  }

  export const INFURA_KEY: string;
  export const PRIVATE_KEY: string;
  export const ETHERSCAN_API_KEY: string;
  export const POLYGONSCAN_API_KEY: string;
  export const BSCSCAN_API_KEY: string;
  export const GAS_PRICE: number;
  export const GAS_REPORTER: GasReporter;
}
