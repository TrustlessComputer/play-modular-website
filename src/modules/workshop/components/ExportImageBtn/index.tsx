'use client'
import React from 'react'
import s from './ExportImageBtn.module.scss'
import { downloadImage } from '@/utils'

type Props = {
    imageSrc: string
    name: string
}

const ExportImageBtn = ({ imageSrc, name }: Props) => {
    return (
        <div className={s.wrapper}>
            <button
                className='flex items-center gap-1 btn_submit'
                onClick={() => {
                    downloadImage(imageSrc, `${name}-model`)
                }}
            >
                Export Image
            </button>
        </div>
    )
}

export default ExportImageBtn