'use client'

import React, { PropsWithChildren } from 'react'

import { WalletProvider } from '@/providers/wallet'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import ConnectWallet from '@/modules/connect-wallet'

const Web3Auth: React.FC<PropsWithChildren> = ({ children }) => {
  const account = useAppSelector(accountSelector)

  return <>{account ? <>{children}</> : <ConnectWallet />}</>
}

const Web3AuthWrapper = (props) => {
  return (
    <WalletProvider>
      <Web3Auth {...props} />
    </WalletProvider>
  )
}

export default Web3AuthWrapper
