/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
'use client'

import { useEffect, useRef, useState } from 'react'
import s from './styles.module.scss'
import { totalArray, currentArray } from './data'

export default function Workshop2D() {
  const [uploaded, setUploaded] = useState<boolean>(false)
  const [valueRange, setValueRange] = useState<number>(100)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const rangePixelRef = useRef<any | null>(null)
  const uploadImageRef = useRef<any | null>(null)
  const pixelatedImageRef = useRef<any | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    if (pixelatedImageRef.current) {
      ctxRef.current = pixelatedImageRef.current.getContext('2d')
      ctxRef.current.mozImageSmoothingEnabled = false
      ctxRef.current.webkitImageSmoothingEnabled = false
      ctxRef.current.imageSmoothingEnabled = false
    }
  }, [])

  useEffect(() => {
    if (ctxRef.current) {
      pixelate(ctxRef.current)
    }
  }, [valueRange])

  const uploadInput = async (e) => {
    const [file] = e.target.files
    setUploaded(true)

    uploadImageRef.current.src = await fileToDataUri(file)
    rangePixelRef.current.value = 100

    let ctx = pixelatedImageRef.current.getContext('2d')
    pixelate(ctx)

    return false
  }

  const pixelRangeHandler = (e) => {
    setValueRange(e.target.value)
  }

  const fileToDataUri = (field) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        resolve(reader.result)
      })
      reader.readAsDataURL(field)
    })
  }

  const pixelate = (ctx) => {
    const size = valueRange * 0.01
    const w = pixelatedImageRef.current.clientWidth * size
    const h = pixelatedImageRef.current.clientHeight * size
    const object = new Image()
    object.src = uploadImageRef.current.src

    object.onload = function () {
      ctx.drawImage(object, 0, 0, w, h)
      ctx.drawImage(
        pixelatedImageRef.current,
        0,
        0,
        w,
        h,
        0,
        0,
        pixelatedImageRef.current.width,
        pixelatedImageRef.current.height,
      )
    }
  }

  const getResultHandler = () => {
    const imageData = ctxRef.current.getImageData(0, 0, pixelatedImageRef.current.width, pixelatedImageRef.current.height)
    console.log(imageData)
  }

  return (
    <div className={s.workshop2d}>
      <div className={s.container}>
        <div className={`${s.container_heading} flex items-center`}>
          <h2>Use image</h2>
          <p>Project you have build</p>
        </div>

        <div className={`${s.container_content} grid grid-cols-12`}>
          <div className={`${s.box} col-span-5`}>
            <div className={`${s.uploadImg}`}>
              <div className={`${s.uploadImg_input} ${uploaded ? s.none : s.display}`}>
                <label htmlFor='upload_image'>Upload Image</label>
                <input id={'upload_image'} ref={inputRef} type='file' accept='image/*' onChange={uploadInput} />
              </div>
              <img
                className={`${s.uploadImg_img} ${uploaded ? s.display : s.none}`}
                src=''
                width={300}
                height={300}
                alt='uploaded image'
                ref={uploadImageRef}
              />
            </div>
            <div className={`${s.pixelateImg_placeholder} ${uploaded ? s.hide : s.show}`}>
              <span>Result image</span>
            </div>
            <div className={`${s.pixelateImg} ${uploaded ? s.show : s.hide}`}>
              <canvas width={300} height={300} ref={pixelatedImageRef} />
            </div>
          </div>
          <div className={`${s.options} col-span-7`}>
            <div className={`${s.options_top}`}>
              <h5>Options</h5>
              <p>Bricks</p>
              <div className={s.options_buttons}>
                <p>All</p>
                <p>Only you have</p>
              </div>
              <p>Longest Dimension/resolution</p>
              <div className={s.options_input}>
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={valueRange}
                  ref={rangePixelRef}
                  onInput={pixelRangeHandler}
                  disabled={!uploaded && true}
                />

                <span>{valueRange}</span>
              </div>
            </div>
            <button onClick={getResultHandler}>Get Brick result</button>
            <div className={`${s.options_brick}`}>
              <div className={s.totalBricks}>
                <p>Total: </p>
                <div className={s.totalList}>
                  {totalArray.map((item, index) => (
                    <div key={index} className={s.totalBricks_item}>
                      <span className={s.color} style={{ backgroundColor: item.color }} />
                      <span className={s.qty}>x{item.quatity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.lackBricks}>
                <p>You lacks: </p>
                <div className={s.lackList}>
                  {currentArray.map((item, index) => (
                    <div
                      key={index}
                      className={`${s.lackBricks_item} ${totalArray[index].quatity - item.quatity === 0 && s.hide}`}
                    >
                      <span className={s.color} style={{ backgroundColor: item.color }} />
                      <span className={s.qty}>x{totalArray[index].quatity - item.quatity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button>Mint</button>
            </div>
          </div>
          <div className={`${s.create} col-span-2 col-start-11`}>
            <button>Create Sketch</button>
          </div>
        </div>
      </div>
    </div>
  )
}
