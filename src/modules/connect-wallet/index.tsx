'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import AlertDialog from '@/components/AlertDialog'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletType } from '@/providers/wallet/types'

import s from './styles.module.scss'

const ConnectWallet: React.FunctionComponent = () => {
  const walletCtx = useWalletContext()

  let [isOpen, setIsOpen] = useState<boolean>(false)

  const BodyModal = () => {
    return (
      <>
        <div className={s.title}>Choose wallet</div>
        <div className={s.caption}>Please connect your Taproot wallet address.</div>
        <div className='flex flex-col gap-[12px]'>
          <div
            className={s.itemWallet}
            onClick={() => {
              walletCtx.requestAccount({ walletType: WalletType.Unisat }).then()
            }}
          >
            <Image src='/imgs/wallet/unisat.svg' width={48} height={48} alt='unisat' />
            <div className={s.itemWallet_title}>UNISAT</div>
          </div>
          <div
            className={s.itemWallet}
            onClick={() => {
              walletCtx.requestAccount({ walletType: WalletType.Xverse }).then()
            }}
          >
            <Image src='/imgs/wallet/xverse.svg' width={48} height={48} alt='xverse' />
            <div className={s.itemWallet_title}>XVERSE</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={s.connectWallet}>
      <Image src='/imgs/group-block.svg' width={723} height={384} alt='blocks' />
      <button className={s.connectWallet_btn} onClick={() => setIsOpen(true)}>
        Connect Wallet
      </button>
      <AlertDialog isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <BodyModal />
      </AlertDialog>
    </div>
  )
}

export default ConnectWallet
