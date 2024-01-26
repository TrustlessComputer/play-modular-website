'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import AlertDialog from '@/components/AlertDialog'

import s from './styles.module.scss'

const ConnectWallet: React.FunctionComponent = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={s.connectWallet}>
      <Image src='/imgs/group-block.svg' width={723} height={384} alt='blocks' />
      <button className={s.connectWallet_btn} onClick={() => setIsOpen(true)}>
        Connect Wallet
      </button>
      <AlertDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default ConnectWallet
