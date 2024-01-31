import React from 'react'
import s from './style.module.scss'
import { IconBVM } from '@/components/IconSvgs'

const Banner = () => {
  return (
    <div className={s.banner}>
      <div className={s.banner_content}>
        <IconBVM />
        <p>Powered by blockchain Bitcoin Virtual Machine</p>
      </div>
    </div>
  )
}

export default Banner
