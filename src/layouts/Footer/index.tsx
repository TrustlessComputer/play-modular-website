import React from 'react'
import s from './styles.module.scss'
import SectionTop from './SectionTop'
import SectionBottom from './SectionBottom'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <SectionTop />
      <SectionBottom />
    </footer>
  )
}
