import { useContext } from "react";
import { WalletContext } from "@/providers/wallet/index";
import { IWalletContext } from "@/providers/wallet/types";

const useWalletContext = (): IWalletContext => {
  return useContext(WalletContext);
}

export default useWalletContext
