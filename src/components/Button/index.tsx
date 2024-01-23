import React from 'react'
import s from './styles.module.scss'

type TButton = {
  bg: 'purple' | 'grey' | 'white'
  children: React.ReactNode
}

export default function Button({ children, bg }: TButton) {
  return <button className={`${s.button} ${s[`button__${bg}`]}`}>{children}</button>
}
