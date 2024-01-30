'use client'
import { DOMAIN_URL } from '@/constant/constant';
import React from 'react'

type Props = {
    data: any
}

const ShareTwitterBtn = ({ data }: Props) => {

    const content = 'Share Model'

    const handleShareTw = (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl = DOMAIN_URL;

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
        <div>
            <button
                onClick={handleShareTw}>
                Share on X
            </button>
        </div>
    )
}

export default ShareTwitterBtn