import React from 'react'
import s from '../styles.module.scss'
import IconDots from '@/components/NbcLayout/Ioncs/IcDot'

const DATA_FOOTER_BOTTOM = [
  {
    title: 'Phase I',
  },
  {
    title: 'Phase II',
  },
  {
    title: 'Phase III',
  },
]

export default function SectionBottom() {
  return (
    <section className={s.footer_bottom}>
      {DATA_FOOTER_BOTTOM.map((item, index) => {
        const isActive = index === 0
        return (
          <div className={`${s.itemBottom} ${isActive && s.itemBottom_isActive}`} key={item.title}>
            <IconDots />
            <p className={s.itemBottom_text}>{item.title}</p>
          </div>
        )
      })}
    </section>
  )
}
