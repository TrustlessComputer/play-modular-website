'use client'

import s from './styles.module.scss'
import Button from '@/components/Button'
import {CDN_URL_VIDEOS} from "@/constant/constant";
import TimeLine from "@/modules/home2d/TimeLine";
import Load from "@/layouts/Load";
import {useEffect, useRef, useState} from "react";
import useAnimationStore from "@/stores/useAnimationStore";

export default function Home2d() {

    const refPlay = useRef<HTMLVideoElement>(null);
    const {setPlay, play} = useAnimationStore();

    useEffect(() => {
        setTimeout(setPlay, 300);
    }, []);

    useEffect(() => {
        if (!play) return;
        setTimeout(() => {
            refPlay.current?.play();
        }, 800);
    }, [play]);

    return (
        <>
            <div className={s.homepage}>
                <div className={s.homepage_bg}>
                    <video ref={refPlay} width={1920} height={1080} preload={'metadata'} playsInline loop muted>
                        <source src={`${CDN_URL_VIDEOS}/original-33532573c947eaea79d5ffbd86bfddbe.mp4`}/>
                    </video>
                </div>
                <div className={s.homepage_inner}>

                    <div className={s.containerContent}>
                        <div className={s.left}>

                            <div className={s.homepage_content}>
                                <h1 className={s.homepage_title}>Modular</h1>
                                <p className={s.homepage_desc}>Modular is a fully on-chain digital lego</p>
                                <div className={s.homepage_groupBtn}>
                                    <Button bg='purple'>Collect</Button>
                                    <Button bg='white'>Learn more</Button>
                                </div>
                            </div>
                        </div>
                        <TimeLine/>
                    </div>

                </div>
            </div>
            <Load/>
        </>
    )
}
