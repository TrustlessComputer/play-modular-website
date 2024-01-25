import WorkShop from '@/modules/workshop'
import { WalletProvider } from '@/providers/wallet'

export default function Page() {
  return (
    <WalletProvider>
      <WorkShop />
    </WalletProvider>
  )
}
