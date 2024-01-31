import { getAddress, GetAddressOptions } from 'sats-connect'
import { IAccount, RequestAccountResponse, WalletType } from '@/providers/wallet/types'
import { TypeCapabilityState } from '@/providers/wallet/hooks/useXverseState'

const openInstall = () => {
  window.open('https://www.xverse.app/download')
}

const connect = async () => {
  return new Promise<RequestAccountResponse>((resolve, reject) => {
    getAddress({
      payload: {
        purposes: ['ordinals', 'payment'],
        message: 'Address for receiving Ordinals and payments',
        network: {
          type: 'Mainnet',
        },
      },
      onFinish: (response) => {
        const addresses = response.addresses
        if (!addresses || addresses.length < 2) {
          return reject('Connect to xverse failed.')
        }

        const address = addresses[0].address

        resolve({
          address: address,
          publicKey: addresses[0].publicKey,
        })
      },
      onCancel: () => reject('User rejected the request.'),
    } as GetAddressOptions)
  })
}

const requestAccount = async (params: { capabilityState: TypeCapabilityState }): Promise<IAccount> => {
  const { capabilityState } = params

  switch (capabilityState) {
    case 'missing':
      openInstall()
      throw new Error('Kindly set up your wallet.')
    case 'loading':
      openInstall()
      throw new Error('Loading.')
    default:
      const { address, publicKey } = await connect()
      return {
        address,
        publicKey,
        type: WalletType.Xverse,
      }
  }
}

const xverseHelper = {
  openInstall,
  connect,
  requestAccount,
}

export default xverseHelper
