'use client'
import Image from 'next/image'
import React from 'react'

import { WalletType } from '@/providers/wallet/types'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletProvider } from '@/providers/wallet'
import { useModalStore } from '@/stores/blocks'

import s from './styles.module.scss'

export const CONNECT_WALLET_MODAL_ID = 'CONNECT_WALLET_MODAL_ID'

const ConnectWalletModal = () => {
  const walletCtx = useWalletContext()
  const { closeModal } = useModalStore()

  return (
    <>
      <div className={s.title}>Choose wallet</div>
      <div className={s.caption}>Please connect your Taproot wallet address.</div>
      <div className='flex flex-col gap-[12px]'>
        <div
          className={s.itemWallet}
          onClick={() => {
            walletCtx.requestAccount({ walletType: WalletType.Unisat }).then(() => {
              closeModal(CONNECT_WALLET_MODAL_ID)
            })
          }}
        >
          <Image src='/imgs/wallet/unisat.svg' width={48} height={48} alt='unisat' />
          <div className={s.itemWallet_title}>UNISAT</div>
        </div>
        <div
          className={s.itemWallet}
          onClick={() => {
            walletCtx.requestAccount({ walletType: WalletType.Xverse }).then(() => {
              closeModal(CONNECT_WALLET_MODAL_ID)
            })
          }}
        >
          <Image src='/imgs/wallet/xverse.svg' width={48} height={48} alt='xverse' />
          <div className={s.itemWallet_title}>XVERSE</div>
        </div>
        {/* <div
          className={s.itemWallet}
          onClick={() => {
            walletCtx.requestAccount({ walletType: WalletType.GuestMode }).then(() => {
              closeModal(CONNECT_WALLET_MODAL_ID)
            })
          }}
        >
          <div className={s.itemWallet_guestModeIcon}>
            <Image src='/imgs/wallet/guest-mode.svg' width={20} height={20} alt='guest-mode' />
          </div>
          <div className={s.itemWallet_title}>GUEST MODE</div>
        </div> */}
      </div>
    </>
  )
}

const ConnectWalletModalWrapper = () => {
  return (
    <WalletProvider>
      <ConnectWalletModal />
    </WalletProvider>
  )
}

export default ConnectWalletModalWrapper
