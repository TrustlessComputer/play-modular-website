'use client'

import React from 'react'
import { listMaterial } from '@/constant/mock-data'
import { IconCheck } from '@/components/IconSvgs'
import './styles.css'
import { useStoreGlobal } from '@/stores'

export const ListBlocks = () => {
  const { setWidth, setDepth, setColor, setTexture, texture, setTrait } = useStoreGlobal()
  const [isHover, setIsHover] = React.useState<number>(-1)
  const handleChangeTexture = ({ texture, color, shape }) => {
    const sizeArray = shape.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }

    setTexture(texture)
    setColor(color)
    setWidth(size.w)
    setDepth(size.d)
  }

  return (
    <div className='SliderInputContainer'>
      <label className='SliderLabel'>Traits</label>
      <div className='ListTexture'>
        {listMaterial.map((item, index) => {
          const isActive = item.texture === texture
          return (
            <figure
              onMouseEnter={() => setIsHover(index)}
              onMouseLeave={() => setIsHover(-1)}
              key={index}
              className={`texture_wrapper ${isActive && 'isActive'}`}
            >
              <img src={item.texture} onClick={() => handleChangeTexture(item)} />
              {isActive && (
                <span className={'icon_check'}>
                  <IconCheck />
                </span>
              )}

              {isHover === index && (
                <div className='tooltip'>
                  <span>Color: {item.color}</span>
                  <span>Shape: {item.shape}</span>
                  <span>Texture: {item.texture.split('/')[3]}</span>
                </div>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}
