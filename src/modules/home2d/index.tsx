import Image from 'next/image'
import s from './styles.module.scss'
import Button from '@/components/Button'

export default function Home2d() {
  return (
    <div className={s.homepage}>
      <div className={s.homepage_bg}>
        <Image src='/img/bg-home.jpg' width={1920} height={1080} alt='bg-home' />
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
