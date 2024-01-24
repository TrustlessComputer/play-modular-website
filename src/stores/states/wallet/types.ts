import { IAccount } from "@/providers/wallet/types";

export interface WalletState {
  requestReload: number;
  accountStorage?: IAccount | undefined
}
