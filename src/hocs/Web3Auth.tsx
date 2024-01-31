'use client'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'

import { WalletProvider } from '@/providers/wallet'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import ConnectWallet from '@/modules/connect-wallet'
import { isBrowser } from '@/utils/helpers'
import Spinner from '@/components/Spinner'

const Web3Auth: React.FC<PropsWithChildren> = ({ children }) => {
  const account = useAppSelector(accountSelector)

  // Waiting app load wallet
  if (typeof account === 'undefined' && isBrowser() === false) {
    return (
      <div className='w-full h-dvh flex flex-col justify-center items-center'>
        <Image src='/imgs/group-block.png' width={723} height={384} alt='blocks' />
        <Spinner />
      </div>
    )
  }

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
