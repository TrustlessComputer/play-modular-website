'use client'
import { DOMAIN_URL } from '@/constant/constant';
import React from 'react'
import s from './ShareTwitterBtn.module.scss'
import IcTwitter from '@/icons/workshop/ic-twitter.svg'

type Props = {
    data: any
}

const ShareTwitterBtn = ({ data }: Props) => {

    const content = `Share Model`

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

    // const han

    return (
        <div className={s.wrapper}>
            <button
                className='flex items-center gap-1 btn_secondary'
                onClick={handleShareTw}>
                Share on
                <IcTwitter />
            </button>
        </div>
    )
}

export default ShareTwitterBtn