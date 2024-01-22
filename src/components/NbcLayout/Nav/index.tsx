import {ROUTER} from "@/constant/comon";
import IcMenu from "@/components/NbcLayout/Ioncs/IcMenu";
import React, {useRef, useState} from "react";
import s from './styles.module.scss';
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import IcTW from "@/components/NbcLayout/Ioncs/IcTW";
import IcDiscord from "@/components/NbcLayout/Ioncs/IcDiscord";

export default function Nav() {
    const refContent = useRef(null);
    const [isShow, setIsShow] = useState<boolean>(false);
    useOnClickOutside(refContent.current as HTMLDivElement, () => setIsShow(false));

    return <div ref={refContent} className={s.nav}>
        <button className={`${s.nav_btn}`} onClick={() => setIsShow(prevState => !prevState)}>
            <IcMenu isShow={isShow}/>
        </button>
        <ul className={`${s.nav_list} ${isShow ? s.isShow : ''}`}>
            {ROUTER.map((item, key) => {
                return (
                        <li key={item.id}>
                            <button
                                className={`btn btn__primary ${s.nav_list_btn}`}
                                onClick={() => {
                                    if (typeof window !== 'undefined')
                                        window.open(item.link, '_blank')?.focus();
                                }}
                            >
                                {item.name}
                            </button>
                        </li>
                );
            })}

            <li className={s.itemMobile} key={'discord'}>
                <button
                    className={`btn btn__secondary ${s.nav_list_btn}`}
                    onClick={() => {
                        if (typeof window !== 'undefined')
                            window.open('https://discord.gg/yNbatuGMDG', '_blank')?.focus();
                    }}
                >
                    <IcDiscord/>
                </button>
            </li>
            <li className={s.itemMobile} key={'discord'}>
                <button
                    className={`btn btn__secondary ${s.nav_list_btn}`}
                    onClick={() => {
                        if (typeof window !== 'undefined')
                            window.open('https://twitter.com/NewBitcoinCity', '_blank')?.focus();
                    }}
                >
                    <IcTW/>
                </button>
            </li>
        </ul>
    </div>
}
