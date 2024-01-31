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

const ExportImageBtn = ({ imageSrc, name }: Props) => {
  return (
    <div className={s.wrapper}>
      <button
        className='flex items-center gap-1 btn_submit'
        onClick={() => {
          // downloadImage(imageSrc, `${name}-model`)
          captureCanvasImage({ download: true })
        }}
      >
        Export Image
      </button>
    </div>
  )
}

export default ExportImageBtn
