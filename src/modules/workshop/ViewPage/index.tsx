'use client'
import BVMBanner from '@/components/BVMBanner'
import ShareTwitterBtn from '@/components/ShareTwitterBtn'
import React from 'react'
import ExportImageBtn from '../components/ExportImageBtn'
import ViewMap from '@/modules/viewMap'
import IcPublish from '@/icons/workshop/ic-publish.svg'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
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
            <BVMBanner />
            <div className={`relative h-[calc(100vh - 44px)] ${s.container}`} id='view-3d'>
                {isOwner && (
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto flex gap-5 items-center">
                        <ShareTwitterBtn data={data} />
                        <ExportImageBtn imageSrc={data?.data?.thumbnail} name={data?.data?.name} ownerAddress={data?.data?.owner_addr} />
                        <button className={`h-[52px]  btn_inscribe`}>
                            <p>
                                <p className='flex items-center gap-2 h-[20px]'><IcPublish /> Inscribe Your Build</p>
                                <span>(Coming soon)</span>
                            </p>
                        </button>
                    </div>
                )}
                <ViewMap brickData={JSON.parse(data.data.meta_data)} id={id} />
            </div >
        </>
    )
}

export default WorkshopViewPage