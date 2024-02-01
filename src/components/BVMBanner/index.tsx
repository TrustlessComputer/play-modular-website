import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IcBVM from '@/icons/workshop/ic-bvm.svg'

type Props = {}

const BVMBanner = (props: Props) => {
    return (
        <Link className='h-[44px] w-[100vw] relative z-[2] block' href={'https://bvm.network/'} target="_blank">
            <Image
                fill={true}
                src={'/icons/workshop/modular-banner.png'}
                alt='Modular Banner'
            ></Image>
            <p className='z-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex items-center gap-2'>
                <IcBVM />
                Powered by Bitcoin Virtual Machine</p>
        </Link>
    )
}

export default BVMBanner