import cn from 'classnames'
import React, { useRef, useState } from 'react'

import { WalletProvider } from '@/providers/wallet'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { formatLongAddress } from '@/utils/address'
import toast from 'react-hot-toast'
import Image from 'next/image'
import useClickOutside from '@/hooks/useClickOutSide'
import { IconCopy, IconLogout, IconWallet } from '../IconSvgs'
import s from './styles.module.scss'

type TWalletButton = {
  className?: string
}

const WalletButton: React.FunctionComponent<TWalletButton> = ({ className }) => {
  const walletCtx = useWalletContext()
  const [toggleState, setToggleState] = useState<boolean>(false)
  const walletButton = useRef<HTMLDivElement | null>(null)
  const account = useAppSelector(accountSelector)
  const hidePopupHandler = () => {
    setToggleState(false)
  }

  useClickOutside(walletButton, hidePopupHandler)

  const copyTextHanlder = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Text successfully copied to clipboard')
      })
      .catch((err) => {
        toast.error('Unable to copy text to clipboard')
      })
  }

  if (!account) return null

  return (
    <div className={cn(s.walletButton, className)}>
      {/* <Image src='/imgs/wallet/wallet.svg' width={20} height={20} alt='wallet' />
      <div className={s.walletButton_address}>{formatLongAddress(account.address)}</div> */}
      {/* <button
          className='btn btn__secondary'
          onClick={() => {
            walletCtx.requestSignOut()
          }}
        >
          Disconnect {account.type}
        </button> */}

      <div className={s.walletButton_walletInfo} ref={walletButton}>
        <button className={s.account} onClick={() => setToggleState(!toggleState)}>
          <Image src='/imgs/wallet/wallet.svg' width={20} height={20} alt='wallet' />
          {formatLongAddress(account.address)}
        </button>
        <div className={`${s.walletPopup} ${toggleState && s.active}`}>
          <div className={s.walletPopup_address}>
            <p>Bitcoin address</p>
            <p onClick={() => copyTextHanlder(account.address)}>
              {formatLongAddress(account.address)} <IconCopy />
            </p>
          </div>
          <button
            className={`${s.walletPopup_btn}`}
            onClick={() => {
              walletCtx.requestSignOut()
              hidePopupHandler()
            }}
          >
            <IconLogout />
            Disconnect
          </button>
        </div>
      </div>
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
