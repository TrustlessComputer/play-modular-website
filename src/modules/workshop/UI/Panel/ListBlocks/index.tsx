'use client'

import { IconCheck } from '@/components/IconSvgs'
import { useStoreGlobal } from '@/stores/blocks'
import { TTraitBlocks } from '@/types'
import s from './styles.module.scss'
import { DATA_FETCH } from '@/constant/trait-data'

export const ListBlocks = () => {
  const { setWidth, setDepth, setColor, setTexture, texture, setTrait, trait, listCurrent } = useStoreGlobal()
  const handleChangeTexture = (data: TTraitBlocks) => {
    // const sizeArray = data.shape.split('x')
    const sizeArray = data.ShapeObject.split('x')
    const size = {
      w: Number(sizeArray[0]),
      d: Number(sizeArray[1]),
    }
    setTrait({ color: data.color, shape: data.ShapeObject, texture: data.texture, type: data.id })
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
          {DATA_FETCH.map((item, index) => {
            // console.log('trait', trait)
            // console.log('item', item)
            const isActive = item.id === trait.type
            // const isHaventBlocks = item.count === 0
            return (
              <div key={index}>
                <figure className={`${s.wrapper_item} ${isActive && s.wrapper_item__isActive} `}>
                  {/* <span className={s.wrapper_number}> {item.count}</span> */}

                  <img src={item.img} onClick={() => handleChangeTexture(item)} alt={item.ShapeObject} />
                  {isActive && (
                    <span className={s.iconCheck}>
                      <IconCheck />
                    </span>
                  )}
                  {/* {isHaventBlocks && <span className={s.isHaventBlock}></span>} */}
                </figure>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
