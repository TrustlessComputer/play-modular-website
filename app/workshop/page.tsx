import WorkShop from '@/modules/workshop'
import Web3Auth from '@/hocs/Web3Auth'

export default function Page() {
  return (
    <Web3Auth>
      <WorkShop />
    </Web3Auth>
  )
}
