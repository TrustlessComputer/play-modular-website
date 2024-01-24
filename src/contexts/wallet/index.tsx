"use client"
import React, { PropsWithChildren, useMemo } from 'react'
import useXverseState from '@/contexts/wallet/hooks/useXverseState'
import { IWalletContext } from '@/contexts/wallet/types'

const initialValue: IWalletContext = {
  xverseState: undefined,
}

export const WalletContext = React.createContext<IWalletContext>(initialValue)

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const xverseState = useXverseState()

  const contextValues = useMemo((): IWalletContext => {
    return { xverseState }
  }, [xverseState])

  return <WalletContext.Provider value={contextValues}>{children}</WalletContext.Provider>
}
