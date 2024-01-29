'use client'
import React from 'react'
import Image from 'next/image'

import s from './styles.module.scss'
import { handleConvertData } from '@/utils/convertTraits'
import { useStoreGlobal } from '@/stores/blocks'
import { CREATE_MODE } from '@/utils'
import cn from 'classnames'
import { IconCheck } from '@/components/IconSvgs'

const ItemBlock: React.FunctionComponent<any> = ({ thumbnail, project, attributes, totalLength, ...props }) => {
  const { setTrait, setColor, setTexture, setWidth, setDepth, setMode, trait, listCurrent } = useStoreGlobal()
  const isHaventBlocks = props.items.length === 0
  const isActiveBlocks = props.groupId === trait.groupId

  const handleSetTraits = () => {
    const data = handleConvertData(attributes)
    const sizeArray = data.shape.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }

    setMode(CREATE_MODE)
    setTrait({ color: data.color, shape: data.shape, texture: data.texture, type: data.type, groupId: props.groupId })
    setTexture(data.texture)
    setColor(data.color)
    setWidth(size.w)
    setDepth(size.d)
  }
  return (
    <div className={cn(s.itemBlock)} onClick={handleSetTraits}>
      <Image src={thumbnail} width={50} height={50} alt={project?.name} />
      {/* <div>{project?.name}</div> */}
      <div className={s.itemBlock_count}>
        <span>{props.items.length}</span>
        <span>/{props.totalItems}</span>
      </div>
      {isActiveBlocks && !isHaventBlocks && (
        <span className={s.itemBlock__isActive}>
          <IconCheck />
        </span>
      )}
      {isHaventBlocks && <span className={s.itemBlock__isHaventBlocks}></span>}
    </div>
  )
}

export default ItemBlock
