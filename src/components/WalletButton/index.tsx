import React, { useRef, useState } from 'react'
import cn from 'classnames'

import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletType } from '@/providers/wallet/types'
import { WalletProvider } from '@/providers/wallet'
import { formatLongAddress } from '@/utils/address'

import s from './styles.module.scss'
import { IconCopy, IconLogout, IconWallet } from '../IconSvgs'
import useClickOutside from '@/hooks/useClickOutSide'

type TWalletButton = {
  className?: string
}

const WalletButton: React.FunctionComponent<TWalletButton> = ({ className }) => {
  const walletCtx = useWalletContext()
  const [toggleState, setToggleState] = useState<boolean>(false)
  const walletButton = useRef<HTMLButtonElement | null>(null)

  const account = useAppSelector(accountSelector)

  const hidePopupHandler = () => {
    setToggleState(false)
  }

  useClickOutside(walletButton, hidePopupHandler)

  return (
    <div className={cn(s.walletButton, className)}>
      {account ? (
        <div className={s.walletButton_walletInfo}>
          <button ref={walletButton} className={s.account} onClick={() => setToggleState(!toggleState)}>
            <IconWallet /> {formatLongAddress(account.address)}
          </button>
          <div className={`${s.walletPopup} ${toggleState && s.active}`}>
            <div className={s.walletPopup_address}>
              <p>Bitcoin address</p>
              <p>
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
      ) : (
        <>
          <button
            className='btn btn__secondary'
            onClick={() => {
              walletCtx.requestAccount({ walletType: WalletType.Unisat }).then()
            }}
          >
            Connect Unisat
          </button>
          <button
            className='btn btn__secondary'
            onClick={() => {
              walletCtx.requestAccount({ walletType: WalletType.Xverse }).then()
            }}
          >
            Connect Xverse
          </button>
        </>
      )}
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
