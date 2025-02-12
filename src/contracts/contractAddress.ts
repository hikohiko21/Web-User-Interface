import {
  ADATokenLogo,
  BNBTokenLogo,
  BTCLogo,
  DOGETokenLogo,
  ETHLogo,
  ETHTokenLogo,
  MATICTokenLogo,
  NESTLogo,
  NHBTCTokenLogo,
  USDTLogo,
  XRPTokenLogo,
} from "../components/icons";


export type TokenType = {
  symbol: string;
  icon: typeof ETHLogo;
  decimals: DecimalsType;
  address: AddressType;
  priceDecimals: number;
};

export interface AddressType {
  [key: number]: string;
}

export interface DecimalsType {
  [key: number]: number;
}

export const ETH: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
  534353: String().zeroAddress,
};

export const BTC: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
  534353: String().zeroAddress,
};

export const BNB: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
  534353: String().zeroAddress,
};

export const ATFToken: AddressType = {
  1: "0x04abEdA201850aC0124161F037Efd70c74ddC74C",
  5: "0xE2975bf674617bbCE57D2c72dCfC926716D8AC1F",
  56: "0x00000000ba2ca30042001abc545871380f570b1f",
  97: "0x000000fB6B0389cc3311198353A0b0f36AB03d44",
  534353: "0x146Af6aE0c93e9Aca1a39A644Ee7728bA9ddFA7c",
};

export const USDTToken: AddressType = {
  1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  5: "0x5cbb73B367FD69807381d06BC2041BEc86d8487d",
  56: "0x55d398326f99059ff775485246999027b3197955",
  97: "0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc",
  534353: "0x5cbb73B367FD69807381d06BC2041BEc86d8487d",
};

export const WBNBToken: AddressType = {
  1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  5: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  97: "0x0302E130B79A2220725eDFe0B9315b6290Ed7D1D",
  534353: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
};

export const NHBTCToken: AddressType = {
  1: "0x1F832091fAf289Ed4f50FE7418cFbD2611225d46",
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: "0xDda3801487a8Bb5ec19dD1E3510b6340BA435863",
  534353: String().zeroAddress,
};

export const SwapContract: AddressType = {
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  5: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  97: "0xC293C13be5d5c669c638aC293ec9Adc9542ffEda",
  534353: "0xF50822767bEce47c277982d3fCFd39f0F561bf2E",
};

export const FuturesV2Contract: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: "0x02904e03937E6a36D475025212859f1956BeC3f0",
  97: "0x476981D37FaA3bE8E8768E8E7d0d01625433126a",
  534353: "0xc39dC1385a44fBB895991580EA55FC10e7451cB3",
};

export const NESTRedeemContract: AddressType = {
  1: "0xaf22d05095d09cb6cb4f18cb7aefd94cb39eb113",
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: "0x6E9c1edACe6Fc03f9666769f09D557b1383f7F57",
  534353: "0x6E9c1edACe6Fc03f9666769f09D557b1383f7F57",
};
export const ATFService: AddressType = {
  1: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  5: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  56: "0xD325f5b059F889e82dE26c9791677017Fcfb85e4",
  97: "0x1529E8cC52c6BD545099843e6feF2e85073341A8",
  534353: "0xd9f3aA57576a6da995fb4B7e7272b4F16f04e681",
};

export const ATFServiceOther: AddressType = {
  1: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  5: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  56: "0xD325f5b059F889e82dE26c9791677017Fcfb85e4",
  97: "0x1529E8cC52c6BD545099843e6feF2e85073341A8",
  534353: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
};

const All18: DecimalsType = {
  1: 18,
  5: 18,
  56: 18,
  97: 18,
  534353: 18,
};
const USDTDecimals: DecimalsType = {
  1: 6,
  5: 6,
  56: 18,
  97: 18,
  534353: 18,
};

export const TokenList: Array<TokenType> = [
  {
    symbol: "BTC",
    icon: BTCLogo,
    decimals: All18,
    address: BTC,
    priceDecimals: 2,
  },
  {
    symbol: "ETH",
    icon: ETHTokenLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 2,
  },
  {
    symbol: "BNB",
    icon: BNBTokenLogo,
    decimals: All18,
    address: BNB,
    priceDecimals: 2,
  },
  {
    symbol: "ATF",
    icon: NESTLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 2,
  },
  {
    symbol: "USDT",
    icon: USDTLogo,
    decimals: USDTDecimals,
    address: USDTToken,
    priceDecimals: 2,
  },
  {
    symbol: "NHBTC",
    icon: NHBTCTokenLogo,
    decimals: All18,
    address: NHBTCToken,
    priceDecimals: 2,
  },
  {
    symbol: "MATIC",
    icon: MATICTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "ADA",
    icon: ADATokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "DOGE",
    icon: DOGETokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 5,
  },
  {
    symbol: "XRP",
    icon: XRPTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
];
