import WorkShop from '@/modules/workshop'
import Web3Auth from '@/hocs/Web3Auth'
import Banner from '@/components/Banner'

export default function Page() {
  return (
    <Web3Auth>
      <Banner />
      <WorkShop />
    </Web3Auth>
  )
}
