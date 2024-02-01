import WorkShop from '@/modules/workshop'
import Web3Auth from '@/hocs/Web3Auth'
import BVMBanner from '@/components/BVMBanner'

export default function Page() {
  return (
    <Web3Auth>
      <BVMBanner />
      <WorkShop />
    </Web3Auth>
  )
}
