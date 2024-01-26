'use client'

import React, { useEffect } from 'react'
import { IconCheck } from '@/components/IconSvgs'
import { useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'
import { DATA_FETCH } from '@/constant/trait-data'

export const ListBlocks = () => {
  const { setWidth, setDepth, setColor, setTexture, texture, setTrait, trait, setListCurrent } = useStoreGlobal()
  const handleChangeTexture = ({ PatternObject, texture, ShapeObject, color, type }) => {
    const sizeArray = ShapeObject.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }
    setTrait({ color: color, shape: ShapeObject, texture: texture, type: type })
    setTexture(texture)
    setColor(color)
    setWidth(size.w)
    setDepth(size.d)
  }
  useEffect(() => {
    setListCurrent(DATA_FETCH)
  }, [])
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h3 className={s.title}>MODULAR</h3>
        <div className={s.wrapper_listBlocks}>
          {DATA_FETCH.map((item, index) => {
            const isActive = item.type === trait.type
            // const isHaventBlocks = item.count === 0
            return (
              <>
                <figure key={index} className={`${s.wrapper_item} ${isActive && s.wrapper_item__isActive} `}>
                  {/* <span className={s.wrapper_number}> {item.count}</span> */}

                  <img src={item.img} onClick={() => handleChangeTexture(item)} />
                  {isActive && (
                    <span className={s.iconCheck}>
                      <IconCheck />
                    </span>
                  )}
                  {/* {isHaventBlocks && <span className={s.isHaventBlock}></span>} */}
                </figure>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
