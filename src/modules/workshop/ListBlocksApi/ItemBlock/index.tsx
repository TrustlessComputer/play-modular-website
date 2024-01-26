'use client'
import React from 'react'
import Image from 'next/image'

import s from './styles.module.scss'
import { handleConvertData } from '@/utils/convertTraits'
import { useStoreGlobal } from '@/stores/blocks'

const ItemBlock: React.FunctionComponent<any> = ({ thumbnail, project, attributes }) => {
  const { setTrait, setColor, setTexture, setWidth, setDepth } = useStoreGlobal()
  const handleSetTraits = () => {
    const data = handleConvertData(attributes)

    const sizeArray = data.shape.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }
    setTrait({ color: data.color, shape: data.shape, texture: data.texture, type: data.type })
    setTexture(data.texture)
    setColor(data.color)
    setWidth(size.w)
    setDepth(size.d)
  }

  return (
    <div className={s.itemBlock} onClick={handleSetTraits}>
      <Image src={thumbnail} width={50} height={50} alt={project?.name} />
      <div>{project?.name}</div>
    </div>
  )
}

export default ItemBlock
