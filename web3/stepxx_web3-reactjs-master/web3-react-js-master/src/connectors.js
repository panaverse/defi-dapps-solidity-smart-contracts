import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { TorusConnector } from "@web3-react/torus-connector";


const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/db6231b5ef424bd9a61a76670e56086b",
  4: "https://rinkeby.infura.io/v3/db6231b5ef424bd9a61a76670e56086b"
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  defaultChainId: 1,
  pollingInterval: POLLING_INTERVAL
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "web3-react example"
});

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: "dummy@abc.xyz",
  manifestAppUrl: "https://8rg3h.csb.app/"
});

export const frame = new FrameConnector({ supportedChainIds: [1] });

export const fortmatic = new FortmaticConnector({
  apiKey: "pk_live_F95FEECB1BE324B5",
  chainId: 1
});

export const portis = new PortisConnector({
  dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
  networks: [1, 100]
});

export const torus = new TorusConnector({ chainId: 1 });

export const authereum = new AuthereumConnector({ chainId: 42 });
