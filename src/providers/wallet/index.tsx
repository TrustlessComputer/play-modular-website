'use client'

import React, { PropsWithChildren, useMemo } from 'react'
import useXverseState from '@/providers/wallet/hooks/useXverseState'
import { IAccount, IRequestAccount, IWalletContext, WalletType } from '@/providers/wallet/types'
import unisatHelper from '@/providers/wallet/utils/unisat'
import xverseHelper from '@/providers/wallet/utils/xverse'
import guestModeHelper from '@/providers/wallet/utils/guest.mode'
import { useAppDispatch } from '@/stores/hooks'
import { clearAccount, setAccount } from '@/stores/states/wallet/reducer'

const initialValue: IWalletContext = {
  xverseState: undefined,
  requestAccount: () => undefined,
  requestSignOut: () => undefined,
}

export const WalletContext = React.createContext<IWalletContext>(initialValue)

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const xverseState = useXverseState()
  const dispatch = useAppDispatch()

  const requestAccount = async (params: IRequestAccount) => {
    try {
      const { walletType } = params
      let account: IAccount | undefined = undefined
      switch (walletType) {
        case WalletType.Unisat:
          account = await unisatHelper.requestAccount()
          break
        case WalletType.Xverse:
          account = await xverseHelper.requestAccount({ capabilityState: xverseState.capabilityState })
          break
        default:
          account = await guestModeHelper.requestAccount()
      }
      if (account) {
        dispatch(setAccount(account))
      }
    } catch (error) {
      // TODO: handle error
      alert(error?.message || 'Something went wrong!')
    }
  }

  const requestSignOut = () => dispatch(clearAccount())

  const contextValues = useMemo((): IWalletContext => {
    return { xverseState, requestAccount, requestSignOut }
  }, [xverseState, requestAccount, xverseState, requestSignOut])

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>
}
