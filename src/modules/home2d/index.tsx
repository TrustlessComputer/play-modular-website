'use client'
import Link from 'next/link'

import Button from '@/components/Button'
import { CDN_URL_VIDEOS } from '@/constant/constant'
import Load from '@/layouts/Load'
import TimeLine from '@/modules/home2d/TimeLine'
import useAnimationStore from '@/stores/useAnimationStore'
import { useEffect, useRef } from 'react'

import s from './styles.module.scss'
import Banner from './Banner'

export default function Home2d() {
  const refPlay = useRef<HTMLVideoElement>(null)
  const { setPlay, play, setVidIsPlay, setVidIndexActive } = useAnimationStore()

  useEffect(() => {
    setTimeout(setPlay, 300)
  }, [])

  useEffect(() => {
    if (!play) return
    setTimeout(() => {
      refPlay.current?.play()
    }, 800)
  }, [play])

  const onTimeUpdate = () => {
    if (Math.floor(refPlay.current.currentTime) === 0) {
      setVidIndexActive(0)
    } else if (Math.floor(refPlay.current.currentTime) === 3) {
      setVidIndexActive(1)
    } else if (Math.floor(refPlay.current.currentTime) === 6) {
      setVidIndexActive(2)
    }
  }

  return (
    <>
      <div className={s.homepage}>
        <div className={s.homepage_bg}>
          <video
            ref={refPlay}
            width={1920}
            height={1080}
            preload={'metadata'}
            onTimeUpdate={onTimeUpdate}
            playsInline
            loop
            muted
            onPlaying={() => {
              setVidIsPlay(true)
            }}
          >
            <source src={`${CDN_URL_VIDEOS}/dragon_3-compress.mp4`} />
          </video>
        </div>
        <div className={s.homepage_inner}>
          <div className={s.containerContent}>
            <div className={s.left}>
              <div className={s.homepage_content}>
                <h1 className={s.homepage_title}>Modular</h1>
                <p className={s.homepage_desc}>Build whatever on Bitcoin.</p>
                <div className={s.homepage_groupBtn}>
                  <a href='https://magiceden.io/ordinals/marketplace/modular' target='_blank' rel='noopener noreferrer'>
                    <Button bg='purple'>Collect</Button>
                  </a>
                  <Link
                    href={'https://twitter.com/punk3700/status/1752291478901235915'}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button bg='white'>Learn more</Button>
                  </Link>
                </div>
              </div>
            </div>
            <TimeLine />
          </div>
        </div>
        <Banner />
      </div>
      <Load />
    </>
  )
}
