import { IXverseState } from '@/contexts/wallet/hooks/useXverseState'

export enum WalletSupported {
  Unisat = 'Unisat',
  Xverse = 'Xverse',
}

export interface IWalletContext {
  xverseState?: IXverseState
}
