'use client'
import { DOMAIN_URL } from '@/constant/constant';
import React from 'react'
import s from './ShareTwitterBtn.module.scss'
import IcTwitter from '@/icons/workshop/ic-twitter.svg'
import { useAppSelector } from '@/stores/hooks';
import { accountSelector } from '@/stores/states/wallet/selector';

type Props = {
    data: any
}

const ShareTwitterBtn = ({ data }: Props) => {

    const account = useAppSelector(accountSelector)

    const content = `Playing Lego at @BVMnetwork
    
This is my masterpiece, you can't beat me lol.

Join me at the Modular Workshop`

    const handleShareTw = (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = `${DOMAIN_URL}/workshop/${data?.data?.id}`;

        window.open(
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                content,
            )}`,
            '_blank',
        );
        // setTriggerSubmit(true);
        // setIsProcessing(true);
    };

    if (account?.address !== data?.data?.owner_addr) return <></>

    return (
        <div className={s.wrapper}>
            <button
                className='flex items-center gap-1 btn_submit'
                onClick={handleShareTw}>
                <IcTwitter /> Share
            </button>
        </div>
    )
}

export default ShareTwitterBtn