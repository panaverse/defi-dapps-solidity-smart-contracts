import { Election as ElectionType } from '../../types/web3-v1-contracts/Election'


export interface Candidates {
    id: string;
    name: string;
    voteCount: string;
    0: string;
    1: string;
    2: string;
}

export interface Data {
    userAddress: string;
    candidates: Candidates[] | [null];
    candidatesCount: number | null;
    electionContract: ElectionType | null;
    loading: boolean;
    voter: boolean | undefined;
    contractAddress?: string
}

export interface ConnectInfo {
    chainId: string;
}

export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}