import React from 'react'
import s from '../styles.module.scss'
const DATA_FOOTER_TOP = [
  {
    time: 'JAN 2024',
    title: 'The Module Factory',
  },
  {
    time: 'March 2024',
    title: 'Build whatever',
  },
  {
    time: 'May 2024',
    title: 'The Module Factory',
  },
]
export default function SectionTop() {
  return (
    <section className={s.footer_top}>
      {DATA_FOOTER_TOP.map((item, index) => {
        const isActive = index === 0
        return (
          <div className={`${s.itemTop} ${isActive && s.itemTop_isActive}`}>
            <p className={s.itemTop_timeline}>{item.time}</p>
            <h5 className={s.itemTop_title}>{item.title}</h5>
          </div>
        )
      })}
    </section>
  )
}
