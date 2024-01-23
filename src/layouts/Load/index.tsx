'use client'

import {gsap} from 'gsap';
import Image from 'next/image';
import s from './styles.module.scss';
import {useEffect, useRef} from "react";
import useAnimationStore from "@/stores/useAnimationStore";

export default function Load() {

    const refLogo = useRef<HTMLDivElement>(null);
    const refLoad = useRef<HTMLDivElement>(null);
    const refBg = useRef<HTMLDivElement>(null);
    const {play, setPlayed, played} = useAnimationStore();

    useEffect(() => {

        if (play) {
            if (refLogo.current) {
                const headeLogo = document.querySelector('.js-header-logo');
                const rectLogo = headeLogo.getBoundingClientRect();
                const rectLogoCenter = refLogo.current.getBoundingClientRect();

                const x = rectLogo.x - rectLogoCenter.x;
                const y =  rectLogo.y - rectLogoCenter.y;

                gsap.to(refLogo.current, {
                    x, y, ease: 'power3.inOut', duration: .8, onComplete: () => {
                        setPlayed();
                    }
                });
            }

            gsap.to(refLoad.current, {
                opacity: 0, ease: 'power3.inOut', duration: .8, delay: .4,
            });
        }
    }, [play]);

    return <div ref={refLoad} className={s.load}>
        <div ref={refBg} className={s.load_bg}></div>
        {
            !played && <div ref={refLogo} className={s.logo}>
                <Image width={40} height={40} src={'imgs/logo.svg'} alt={'logo'}/>
            </div>
        }
    </div>
}
