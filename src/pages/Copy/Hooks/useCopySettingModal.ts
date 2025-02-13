import { useCallback, useEffect, useMemo, useState } from "react";
import useNEST from "../../../hooks/useNEST";
import { copyAsset, copyFollow } from "../../../lib/NESTRequest";
import { t } from "@lingui/macro";
import useService from "../../../contracts/useService";

function useCopySettingModal(
  address: string | undefined,
  onClose: (res?: boolean) => void
) {
  const { chainsData, signature, account } = useNEST();
  const { service_balance } = useService();
  const [tokenBalance, setTokenBalance] = useState<number>();
  const [copyAccountBalance, setCopyAccountBalance] = useState<string>("");
  const [followingValue, setFollowingValue] = useState<string>("");
  const [oldFollowingValue, setOldFollowingValue] = useState<string>("");
  const [oldTotalValue, setOldTotalValue] = useState<number>();
  const [selectButton, setSelectButton] = useState<number>();
  const [agree, setAgree] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>();

  const [isLoading, setIsLoading] = useState(false);
  const follow = useCallback(async () => {
    if (chainsData.chainId && signature && address && followingValue !== "") {
      const copyAccountBalanceNumber =
        copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
      const oldTotalValueNumber = oldTotalValue ?? 0;
      const req = await copyFollow(
        chainsData.chainId,
        {
          Authorization: signature.signature,
        },
        {
          chainId: chainsData.chainId.toString(),
          copyAccountBalance: (copyAccountBalanceNumber + oldTotalValueNumber).floor(
            2
          ),
          copyKolAddress: address,
          follow: "true",
          followingMethod: "FIEXD",
          followingValue: followingValue,
        }
      );
      if (Number(req["errorCode"]) === 0) {
      }
      setIsLoading(false);
      onClose(Number(req["errorCode"]) === 0);
    }
  }, [address, chainsData.chainId, copyAccountBalance, followingValue, oldTotalValue, onClose, signature]);
  /**
   * balance
   */
  const getBalance = useCallback(async () => {
    service_balance((result: number) => {
      setTokenBalance(result);
    });
  }, [service_balance]);

  const getCurrent = useCallback(async () => {
    if (chainsData.chainId && signature && address && account.address) {
      const req = await copyAsset(
        chainsData.chainId,
        address,
        account.address,
        {
          Authorization: signature.signature,
        }
      );
      if (Number(req["errorCode"]) === 0) {
        const value = req["value"];
        const currentValue = value["copyAccountBalance"];
        const oldTotal = value["copyAccountBalanceTotal"];
        if (currentValue) {
          setCurrent(currentValue);
        }
        if (oldTotal) {
          setOldTotalValue(oldTotal);
        }
        const follow: number = value["followingValue"];
        if (oldFollowingValue === "" && follow > 0) {
          setOldFollowingValue(follow.floor(2));
        }
      }
    }
  }, [
    account.address,
    address,
    chainsData.chainId,
    oldFollowingValue,
    signature,
  ]);

  const checkBalance = useMemo(() => {
    if (tokenBalance) {
      const copyAccountBalanceNumber =
        copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
      return copyAccountBalanceNumber <= tokenBalance;
    }
    return false;
  }, [copyAccountBalance, tokenBalance]);

  const checkLimit = useMemo(() => {
    const copyAccountBalanceNumber =
      copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
    const oldTotalValueNumber = oldTotalValue ?? 0;
    if (oldTotalValueNumber + copyAccountBalanceNumber >= 200) {
      return true;
    }
    return false;
  }, [copyAccountBalance, oldTotalValue]);

  const checkLimit2 = useMemo(() => {
    const followingValueNumber =
      followingValue === "" ? 0 : parseFloat(followingValue);
    if (followingValueNumber >= 50) {
      return true;
    }
    return false;
  }, [followingValue]);

  const mainButtonTitle = useMemo(() => {
    return t`Save`;
  }, []);

  const mainButtonLoading = useMemo(() => {
    return isLoading;
  }, [isLoading]);
  const mainButtonDis = useMemo(() => {
    return !checkBalance || !checkLimit || !agree || !checkLimit2;
  }, [agree, checkBalance, checkLimit, checkLimit2]);

  const mainButtonAction = useCallback(() => {
    if (!mainButtonDis && !mainButtonLoading) {
      setIsLoading(true);
      follow();
    }
  }, [follow, mainButtonDis, mainButtonLoading]);

  const maxCallBack = useCallback(() => {
    if (tokenBalance) {
      setCopyAccountBalance(tokenBalance.floor(2));
    }
  }, [tokenBalance]);
  const selectButtonCallBack = useCallback(
    (num: number) => {
      setSelectButton(num);
      if (num !== 0) {
        if (tokenBalance) {
          const oneBalance = tokenBalance / 4;
          const nowAmount = oneBalance * num;
          setCopyAccountBalance(nowAmount.floor(2));
        }
      }
    },
    [tokenBalance]
  );

  const errorLabel1 = useMemo(() => {
    if (!checkBalance && copyAccountBalance !== "") {
      return t`Insufficient ATF balance`;
    } else if (!checkLimit && copyAccountBalance !== "") {
      return t`Minimum 200 ATF`;
    }
  }, [checkBalance, checkLimit, copyAccountBalance]);

  const errorLabel2 = useMemo(() => {
    if (!checkLimit2 && followingValue !== "") {
      return t`Minimum 50 ATF`;
    }
  }, [checkLimit2, followingValue]);

  /**
   * update
   */
  useEffect(() => {
    getBalance();
    getCurrent();
    const time = setInterval(() => {
      getBalance();
      getCurrent();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getBalance, getCurrent]);

  useEffect(() => {
    if (oldFollowingValue !== "") {
      setFollowingValue(oldFollowingValue);
    }
  }, [oldFollowingValue]);

  return {
    copyAccountBalance,
    setCopyAccountBalance,
    followingValue,
    setFollowingValue,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    maxCallBack,
    tokenBalance,
    selectButton,
    setSelectButton,
    selectButtonCallBack,
    agree,
    setAgree,
    current,
    errorLabel1,
    errorLabel2,
  };
}

export default useCopySettingModal;
