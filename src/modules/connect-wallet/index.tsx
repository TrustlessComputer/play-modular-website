'use client'
import Image from 'next/image'
import React from 'react'

import useConnectWalletModal from '@/hooks/useConnectWalletModal'

import s from './styles.module.scss'

const ConnectWallet: React.FunctionComponent = () => {
  const { openConnectWalletModal, closeConnectWalletModal } = useConnectWalletModal()

  return (
    <div className={s.connectWallet}>
      <Image src='/imgs/group-block.svg' width={723} height={384} alt='blocks' />
      <button className={s.connectWallet_btn} onClick={openConnectWalletModal}>
        Connect Wallet
      </button>
    </div>
  )
}

export default ConnectWallet
