import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { FC } from "react";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { InjectedConnector } from "wagmi/connectors/injected";

import { infuraProvider } from "wagmi/providers/infura";
import { ProviderProps } from "./provider";

import {
  MetaMask,
  CoinbaseWallet,
  WalletConnect,
  TrustWallet,
  OKX,
} from "../components/icons";
import useTheme from "../hooks/useTheme";

const scrollAlphaTestnet = {
  id: 534353,
  name: "scroll Alpha Testnet",
  network: "scroll Alpha Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://scroll-alpha-public.unifra.io"],
    },
    public: {
      http: ["https://scroll-alpha-public.unifra.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "scrollExplorer",
      url: "https://blockscout.scroll.io/",
    },
  },
  testnet: true,
};

export const DEFAULT_CHAIN_ID = 56;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // [bsc, scrollAlphaTestnet],
  // [bscTestnet],
  [bsc],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === 97) {
          return {
            http: "https://data-seed-prebsc-2-s2.binance.org:8545",
          };
        } else if (chain.id === 56) {
          return {
            http: "https://bsc-dataseed1.defibit.io/",
          };
        } else if (chain.id === 534353) {
          return {
            http: "https://scroll-alpha-public.unifra.io",
          };
        } else {
          return {
            http: "",
          };
        }
      },
    }),
    infuraProvider({ apiKey: "be0a9832394640b090fceb2b2107993c" }),
  ],
  { retryCount: 5 }
);
const PROJECT_ID = "91c4a65d26960c2d42b245b5bf92b17c";

export const Wallets = [
  {
    wallet: metaMaskWallet({ projectId: PROJECT_ID, chains: chains }),
    icon: MetaMask,
    name: "MetaMask",
  },
  {
    wallet: walletConnectWallet({
      chains: chains,
      projectId: PROJECT_ID,
    }),
    icon: WalletConnect,
    name: "WalletConnect",
  },
  {
    wallet: coinbaseWallet({ chains, appName: "ATF" }),
    icon: CoinbaseWallet,
    name: "Coinbase Wallet",
  },
  {
    wallet: trustWallet({ projectId: PROJECT_ID, chains: chains }),
    icon: TrustWallet,
    name: "Trust Wallet",
  },
  {
    wallet: okxWallet({ projectId: PROJECT_ID, chains: chains }),
    icon: OKX,
    name: "OKX Wallet",
  },
];

const connectors = connectorsForWallets([
  {
    groupName: "main",
    wallets: Wallets.map((item) => item.wallet),
  },
])();

const config = createConfig({
  autoConnect: true,
  connectors: [
    ...connectors,
    new InjectedConnector({
      chains,
      options: {
        name: "Injected_Trust",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const WalletProvider: FC<ProviderProps> = ({ children }) => {
  const { nowTheme } = useTheme();
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        theme={nowTheme.isLight ? lightTheme() : darkTheme()}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;
