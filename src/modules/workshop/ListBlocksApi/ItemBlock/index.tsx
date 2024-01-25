'use client'
import React from 'react'
import Image from 'next/image'

import s from './styles.module.scss'

const ItemBlock: React.FunctionComponent<any> = ({ thumbnail, project }) => {
  console.log('thumbnail', thumbnail)
  return (
    <div className={s.itemBlock}>
      <Image src={thumbnail} width={50} height={50} alt={project?.name} />
      <div>{project?.name}</div>
    </div>
  )
}

export default ItemBlock
