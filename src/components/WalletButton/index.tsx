import React, { useRef, useState } from 'react'
import cn from 'classnames'

import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
// import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletProvider } from '@/providers/wallet'
import { formatLongAddress } from '@/utils/address'
import Image from 'next/image'

import s from './styles.module.scss'
import { IconCopy, IconLogout, IconWallet } from '../IconSvgs'
import useClickOutside from '@/hooks/useClickOutSide'

type TWalletButton = {
  className?: string
}

const WalletButton: React.FunctionComponent<TWalletButton> = ({ className }) => {
  // const walletCtx = useWalletContext()

  const account = useAppSelector(accountSelector)

  if (!account) return null

  return (
    <div className={cn(s.walletButton, className)}>
      <Image src='/imgs/wallet/wallet.svg' width={20} height={20} alt='wallet' />
      <div className={s.walletButton_address}>{formatLongAddress(account.address)}</div>
      {/* <button
          className='btn btn__secondary'
          onClick={() => {
            walletCtx.requestSignOut()
          }}
        >
          Disconnect {account.type}
        </button> */}
    </div>
  )
}

const WalletButtonWrapper = () => {
  return (
    <WalletProvider>
      <WalletButton />
    </WalletProvider>
  )
}

export default WalletButtonWrapper
