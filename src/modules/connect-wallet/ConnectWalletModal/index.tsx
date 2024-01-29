'use client'
import Image from 'next/image'
import React from 'react'

import { WalletType } from '@/providers/wallet/types'
import useWalletContext from '@/providers/wallet/useWalletContext'

import s from './styles.module.scss'

export const CONNECT_WALLET_MODAL_ID = 'CONNECT_WALLET_MODAL_ID'

const ConnectWalletModal = () => {
  const walletCtx = useWalletContext()

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

export default ConnectWalletModal
