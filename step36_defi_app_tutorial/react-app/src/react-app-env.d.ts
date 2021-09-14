/// <reference types="react-scripts" />

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_MY_TOKEN_CONTRACT_ADDRESS: string;
      REACT_APP_FARM_TOKEN_CONTRACT_ADDRESS: string;
    }
  }
}

export interface State {
  loading: boolean;
  errorMsg: string;
  isEthereumAvailable: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  account?: string | null;
  myTokenBalanceOfUser: number;
  farmTokenBalanceOfUser: number;
  myTokenBalanceOfFarm: number;
  farmAllowance: number;
  allowFarm: (tokenstoApprove: number) => Promise<void>;
  depositInFarm: (tokensToDeposit: number) => Promise<void>;
  withdrawFromFarm: (tokensToWithdraw: number) => Promise<void>;
}
