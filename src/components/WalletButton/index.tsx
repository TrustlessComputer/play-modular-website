import React from 'react'
import cn from 'classnames'

import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletType } from '@/providers/wallet/types'
import { WalletProvider } from '@/providers/wallet'

import s from './styles.module.scss'

type TWalletButton = {
  className?: string
}

const WalletButton: React.FunctionComponent<TWalletButton> = ({ className }) => {
  const walletCtx = useWalletContext()

  const account = useAppSelector(accountSelector)

  return (
    <div className={cn(s.walletButton, className)}>
      {account ? (
        <div className={s.walletButton_walletInfo}>
          <div className={s.account}>Address: {account.address}</div>
          <div className={s.account}>Public Key: {account.publicKey}</div>
          <button
            className='btn btn__secondary'
            onClick={() => {
              walletCtx.requestSignOut()
            }}
          >
            Disconnect {account.type}
          </button>
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
