import Image from 'next/image'
import s from './styles.module.scss'
import Button from '@/components/Button'
import {CDN_URL_VIDEOS} from "@/modules/constant";

export default function Home2d() {
  return (
    <div className={s.homepage}>
      <div className={s.homepage_bg}>
        <video width={1920} height={1080} autoPlay playsInline loop muted>
          <source src={`${CDN_URL_VIDEOS}/original-33532573c947eaea79d5ffbd86bfddbe.mp4`}/>
        </video>
      </div>
      <div className={s.homepage_inner}>
        <div className={s.homepage_content}>
          <h1 className={s.homepage_title}>Modular</h1>
          <p className={s.homepage_desc}>Modular is a fully on-chain digital lego</p>
          <div className={s.homepage_groupBtn}>
            <Button bg='purple'>Collect</Button>
            <Button bg='grey'>Learn more</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
