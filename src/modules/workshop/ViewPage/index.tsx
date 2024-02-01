'use client'
import Banner from '@/components/Banner'
import InscribeButton from '@/components/InscribeButton'
import ShareTwitterBtn from '@/components/ShareTwitterBtn'
import ViewMap from '@/modules/viewMap'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { Toaster } from 'react-hot-toast'
import ExportImageBtn from '../components/ExportImageBtn'
import s from './style.module.scss'

type Props = {
  data: any
  id: string
}

const WorkshopViewPage = ({ data, id }: Props) => {
  const account = useAppSelector(accountSelector)

  const isOwner = account?.address.toLowerCase() == data?.data?.owner_addr.toLowerCase()

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
      <Banner />
      <div className={`relative h-[calc(100vh - 44px)] ${s.container}`} id='view-3d'>
        {isOwner && (
          <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto flex gap-5 items-center'>
            <ShareTwitterBtn data={data} />
            <ExportImageBtn
              imageSrc={data?.data?.thumbnail}
              name={data?.data?.name}
              ownerAddress={data?.data?.owner_addr}
            />
            <InscribeButton className='h-[52px] px-7' />
          </div>
        )}
        <ViewMap brickData={JSON.parse(data.data.meta_data)} id={id} />
      </div>
    </>
  )
}

export default WorkshopViewPage
