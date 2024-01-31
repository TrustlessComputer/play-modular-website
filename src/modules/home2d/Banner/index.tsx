import React from 'react'
import s from './style.module.scss'
import { IconBVM } from '@/components/IconSvgs'
import Link from 'next/link'

const Banner = () => {
  return (
    <Link href={'https://bvm.network/'} className={s.banner}>
      <div className={s.banner_content}>
        <IconBVM />
        <p>Powered by blockchain Bitcoin Virtual Machine</p>
      </div>
    </Link>
  )
}

export default Banner
