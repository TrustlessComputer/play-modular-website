'use client'

import React, { useEffect } from 'react'
import { IconCheck } from '@/components/IconSvgs'
import { useStoreGlobal } from '@/stores/blocks'
import s from './styles.module.scss'
import { DATA_FETCH } from '@/constant/trait-data'

export const ListBlocks = () => {
  const { setWidth, setDepth, setColor, setTexture, texture, setTrait, trait, listCurrent } = useStoreGlobal()
  const handleChangeTexture = (data) => {
    console.log(data)
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
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h3 className={s.title}>MODULAR</h3>
        <div className={s.wrapper_listBlocks}>
          {listCurrent.map((item, index) => {
            const isActive = item.type === trait.type
            // const isHaventBlocks = item.count === 0
            return (
              <>
                <figure key={index} className={`${s.wrapper_item} ${isActive && s.wrapper_item__isActive} `}>
                  {/* <span className={s.wrapper_number}> {item.count}</span> */}

                  <img src={item.thumbnail} onClick={() => handleChangeTexture(item.trait)} />
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
