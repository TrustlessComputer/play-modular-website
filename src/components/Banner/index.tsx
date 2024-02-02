'use client';

import React, {useMemo} from 'react'
import s from './style.module.scss'
import { IconBVM } from '@/components/IconSvgs'
import Link from 'next/link'
import Countdown from "@/components/Countdown";
import dayjs from "dayjs";
import {usePathname} from "next/navigation";
const Banner = () => {

  return (
    <Link href={'https://bvm.network/public-sale?source=playmodular'}  target='_blank' rel='noopener noreferrer' className={`${s.banner}`}>
      <div className={s.banner_content}>
        <IconBVM />
        <div>Exclusive for Modular Builders: <strong>20% Boost</strong> for $BVM Public Sale within the next <Countdown
            className={s.countdown}
            expiredTime={dayjs
                .utc('Mon Feb 05 2024 03:30:00 GMT+0000')
                .toString()}
        />!</div>
           <span className={s.workshopBtn}> Join Now </span>
      </div>
    </Link>
  )
}

export default Banner
