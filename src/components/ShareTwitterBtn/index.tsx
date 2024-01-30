'use client'
import { DOMAIN_URL } from '@/constant/constant';
import React from 'react'
import s from './ShareTwitterBtn.module.scss'

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
                className='btn_submit'
                onClick={handleShareTw}>
                Share on X
            </button>
        </div>
    )
}

export default ShareTwitterBtn