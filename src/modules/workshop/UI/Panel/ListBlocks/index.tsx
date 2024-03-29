// 'use client'

// import { IconCheck } from '@/components/IconSvgs'
// import { useStoreGlobal } from '@/stores/blocks'
// import { TTraitBlocks } from '@/types'
// import s from './styles.module.scss'
// import { CREATE_MODE } from '@/utils'

// export const ListBlocks = () => {
//   const { setWidth, setDepth, setColor, setTexture, setTrait, trait, listCurrent, setMode } = useStoreGlobal()

//   const handleChangeTexture = (data: TTraitBlocks) => {
//     const sizeArray = data.shape.split('x')
//     const size = {
//       w: Number(sizeArray[0]),
//       d: Number(sizeArray[1]),
//     }
//     setMode(CREATE_MODE)
//     setTrait({ color: data.color, shape: data.shape, texture: data.texture, type: data.type, groupId: data.groupId })
//     setTexture(data.texture)
//     setColor(data.color)
//     setWidth(size.w)
//     setDepth(size.d)
//   }
//   return (
//     <div className={s.wrapper}>
//       <div className={s.inner}>
//         <h3 className={s.title}>MODULAR</h3>
//         <div className={s.wrapper_listBlocks}>
//           {listCurrent.map((item, index) => {
//             const isActive = item.traits.type === trait.type
//             // const isHaventBlocks = item.count === 0
//             return (
//               <div key={index}>
//                 <figure className={`${s.wrapper_item} ${isActive && s.wrapper_item__isActive} `}>
//                   {/* <span className={s.wrapper_number}> {item.count}</span> */}

//                   <img src={item.thumbnail} onClick={() => handleChangeTexture(item.traits)} />
//                   {isActive && (
//                     <span className={s.iconCheck}>
//                       <IconCheck />
//                     </span>
//                   )}
//                   {/* {isHaventBlocks && <span className={s.isHaventBlock}></span>} */}
//                 </figure>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
