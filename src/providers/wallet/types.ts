import { IXverseState } from '@/providers/wallet/hooks/useXverseState'

export enum WalletType {
  Unisat = 'Unisat',
  Xverse = 'Xverse',
}

export interface RequestAccountResponse {
  address: string,
  publicKey: string
}

export interface IAccount extends RequestAccountResponse {
  type: WalletType
}

export interface IRequestAccount {
  walletType: WalletType
}

export interface IWalletContext {
  xverseState?: IXverseState,
  requestAccount: (_: IRequestAccount) => Promise<void>
  requestSignOut: () => void
}
