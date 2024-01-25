'use client'

import React from 'react'
import { IconCheck } from '@/components/IconSvgs'
import { useStoreGlobal } from '@/stores'
import s from './styles.module.scss'
import { DATA_FETCH } from '@/constant/trait-data'

export const ListBlocks = () => {
  const { setWidth, setDepth, setColor, setTexture, texture, setTrait, trait } = useStoreGlobal()
  const [isHover, setIsHover] = React.useState<number>(-1)
  const handleChangeTexture = ({ PatternObject, texture, ShapeObject, color }) => {
    const sizeArray = ShapeObject.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }
    setTrait({ color: color, shape: ShapeObject, texture: texture })
    setTexture(texture)
    setColor(color)
    setWidth(size.w)
    setDepth(size.d)
  }

  return (
    <div className={s.wrapper}>
      <label className={s.label}>Filter/sort theo traits</label>
      <div className={s.wrapper_listBlocks}>
        {DATA_FETCH.map((item, index) => {
          const isActive = item.texture === trait.texture
          const isHaventBlocks = item.number === 0
          return (
            <figure
              onMouseEnter={() => setIsHover(index)}
              onMouseLeave={() => setIsHover(-1)}
              key={index}
              className={`${s.wrapper_item} ${isActive && s.wrapper_item__isActive} `}
            >
              <span className={s.wrapper_number}> {item.number}</span>

              <img src={item.img} onClick={() => handleChangeTexture(item)} />
              {isActive && (
                <span className={s.iconCheck}>
                  <IconCheck />
                </span>
              )}
              {isHaventBlocks && <span className={s.isHaventBlock}></span>}
              {isHover === index && (
                <div className={s.wrapper_tooltip}>
                  <span>Texture: {item.PatternObject}</span>
                  <span>Shape: {item.ShapeObject}</span>
                </div>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}
