import IcCheck from "@/modules/homepage/Banner/Icons/IcCheck";
import s from './styles.module.scss'
import IcLogo from "@/modules/homepage/Banner/Icons/IcLogo";
import IcApple from "@/modules/homepage/Banner/Icons/IcApple";
import IcAndroid from "@/modules/homepage/Banner/Icons/IcAndroid";

export default function Banner() {
    return <div className={s.banner}>
        <div className={s.banner_left}>
            <div className={s.banner_icon}><IcLogo/>
            </div>
            <div className={s.banner_content}>
                <h1 className={s.banner_content_heading}>Say hello to the crypto super app.</h1>
                <ul className={s.banner_content_checks}>
                    <li>
                        <IcCheck/>
                        One-second installation
                    </li>
                    <li>
                        <IcCheck/>
                        No wallet or deposit required
                    </li>
                    <li>
                        <IcCheck/>
                        Multi-chain supported
                    </li>
                </ul>
            </div>
        </div>
        <div className={s.banner_right}>
            <div className={s.banner_right_top}>
                <button className={s.btn}
                        onClick={() => {
                            if (typeof window !== 'undefined')
                                window.open('https://alpha.wtf/app', '_blank')?.focus();
                        }}
                >
                    Install The App
                </button>
            </div>
            <div className={s.banner_right_bottom}>
                Available on both <IcApple/> and <IcAndroid/>
            </div>
        </div>
    </div>
}
