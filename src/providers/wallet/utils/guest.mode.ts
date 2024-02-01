import { IAccount, RequestAccountResponse, WalletType } from '@/providers/wallet/types'
import CoinKey from 'coinkey'

const getBasicInfo = async (): Promise<RequestAccountResponse> => {
  const wallet = new CoinKey.createRandom()

  return {
    address: wallet.publicAddress,
    publicKey: wallet.publicAddress,
  }
}

const requestAccount = async (): Promise<IAccount> => {
  const { address, publicKey } = await getBasicInfo()

  return {
    address,
    publicKey,
    type: WalletType.GuestMode,
  }
}

const guestModeHelper = {
  getBasicInfo,
  requestAccount,
}

export default guestModeHelper
