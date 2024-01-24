"use client"
import styles from './styles.module.scss'
import useWalletContext from "@/contexts/wallet/useWalletContext";
import { WalletProvider } from "@/contexts/wallet";

const ConnectTest = () => {
  const walletCtx = useWalletContext();

  console.log('SANG TEST: ', walletCtx);

  return (
    <div className={styles.container}>
      <button>Connect Unisat</button>
      <button>Connect Xverse</button>
      <button>Disconnect</button>
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
