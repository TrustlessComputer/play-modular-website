import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const BVMBanner = (props: Props) => {
    return (
        <div className='h-[44px] w-[100vw] relative z-[99999]'>
            <Link href={'https://bvm.network/'} target="_blank">
                <Image
                    fill={true}
                    src={'/icons/workshop/modular-banner.png'}
                    alt='Modular Banner'
                ></Image>
            </Link>
        </div>
    )
}

export default BVMBanner