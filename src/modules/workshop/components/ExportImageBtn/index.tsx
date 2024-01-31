'use client'
import React from 'react'
import s from './ExportImageBtn.module.scss'
import { captureCanvasImage, downloadImage } from '@/utils'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

type Props = {
    imageSrc: string
    name: string
    ownerAddress: string
}

const ExportImageBtn = ({ imageSrc, name, ownerAddress }: Props) => {
    const account = useAppSelector(accountSelector)

    if (account?.address !== ownerAddress) return <></>


    return (
        <div className={s.wrapper}>
            <button
                className='flex items-center gap-1 btn_secondary'
                onClick={() => {
                    // captureCanvasImage({ dom: '#view-3d', name: `${name}-model`, download: true })
                    captureCanvasImage({ download: true })

                }}
            >
                Export Image
            </button>
        </div>
    )
}

export default ExportImageBtn
