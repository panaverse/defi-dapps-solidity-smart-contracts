import { Election as ElectionType } from '../../types/web3-v1-contracts/Election'


export interface Candidates {
    id: string;
    name: string;
    voteCount: string;    
}

export interface Data {
    userAddress: string;
    candidates: Candidates[] | [null] | undefined;
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