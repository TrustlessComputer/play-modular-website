import React from 'react'
import s from './style.module.scss'
import { IconBVM } from '@/components/IconSvgs'
import Link from 'next/link'

const Banner = () => {
  return (
    <Link href={'https://bvm.network/public-sale?source=playmodular'}  target='_blank' rel='noopener noreferrer' className={s.banner}>
      <div className={s.banner_content}>
        <IconBVM />
        <p>Powered by Bitcoin Virtual Machine</p>
      </div>
    </Link>
  )
}

export default Banner
