import { useContext } from "react";
import { WalletContext } from "@/contexts/wallet/index";

const useWalletContext = () => {
  return useContext(WalletContext);
}

export default useWalletContext
