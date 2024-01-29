'use client'
import styles from './styles.module.scss'
import useWalletContext from '@/providers/wallet/useWalletContext'
import { WalletProvider } from '@/providers/wallet'
import { WalletType } from '@/providers/wallet/types'
import StoreProvider from '@/providers/store'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

const ConnectTest = () => {
  const walletCtx = useWalletContext()

  const account = useAppSelector(accountSelector)

  return (
    <div className={styles.container}>
      {!!account && (
        <>
          <div className={styles.account}>Address: {account.address}</div>
          <div className={styles.account}>Public Key: {account.publicKey}</div>
        </>
      )}
      <button
        onClick={() => {
          walletCtx.requestAccount({ walletType: WalletType.Unisat }).then()
        }}
      >
        Connect Unisat
      </button>
      <button
        onClick={() => {
          walletCtx.requestAccount({ walletType: WalletType.Xverse }).then()
        }}
      >
        Connect Xverse
      </button>
      {!!account && (
        <button
          onClick={() => {
            walletCtx.requestSignOut()
          }}
        >
          Disconnect {account.type}
        </button>
      )}
    </div>
  )
}

const Page = () => {
  return (
    <WalletProvider>
      <ConnectTest />
    </WalletProvider>
  )
}

export default Page
