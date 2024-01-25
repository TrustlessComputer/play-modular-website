// @ts-nocheck
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import style from './styles.module.scss'
import Img from 'next/image';

export default function Workshop2D() {
  const [valueRange, setValueRange] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const rangePixelRef = useRef<any | null>(null)
  const uploadImageRef = useRef<any | null>(null)
  const pixelatedImageRef = useRef<any | null>(null)

  useEffect(() => {
    let ctx = pixelatedImageRef.current.getContext('2d')
    ctx.mozImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
    pixelate(ctx)
  }, [valueRange])

  const uploadInput = async (e) => {
    const [file] = e.target.files

    uploadImageRef.current.src = await fileToDataUri(file)
    rangePixelRef.current.value = 0
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

  return (
    <div className={style.workshop2d}>
      <div className={style.container}>
        <div className={`${style.container_heading} flex items-center`}>
          <h2>Use image</h2>
          <p>Project you have build</p>


        </div>

        <div className={`grid grid-cols-12 mt-5`}>
          <div className="col-span-5">
            <div className="flex flex-col items-start">
              <div className="">
                <label className={`${style.picture}`} htmlFor="picture__input" tabIndex="0">
                  <span className={`${style.picture__image}`}>Upload image</span>
                </label>
                <input type="file" name="picture__input" id={`${style.picture__input}`} />
              </div>
              <div className="mt-14">
                <label className={`${style.picture}`} htmlFor="picture__input" tabIndex="0">
                  <span className={`${style.picture__image}`}>Upload image</span>
                </label>
                <input type="file" name="picture__input" id={`${style.picture__input}`} />
              </div>
            </div>
          </div>
          <div className="col-span-7">
            <div className="flex flex-col items-start">
              <div className="">
                <label className={`${style.picture}`} htmlFor="picture__input" tabIndex="0">
                  <span className={`${style.picture__image}`}>Upload image</span>
                </label>
                <input type="file" name="picture__input" id={`${style.picture__input}`} />
              </div>
              <div className="mt-14">
                <label className={`${style.picture}`} htmlFor="picture__input" tabIndex="0">
                  <span className={`${style.picture__image}`}>Upload image</span>
                </label>
                <input type="file" name="picture__input" id={`${style.picture__input}`} />
              </div>
            </div>
          </div>
        </div>


        <div className={`grid grid-cols-12`}>
          <div className={`${style.box} col-span-6`}>
            <p>Original Image:</p>
            <Img src="" width={256} height={253} alt="uploaded image" ref={uploadImageRef} />
            <p>Pixelated Image: </p>
            <canvas width={300} height={300} ref={pixelatedImageRef} />
          </div>
          <div className={`${style.input} col-span-6`}>
            <input ref={inputRef} type='file' accept='image/*' onChange={uploadInput} />
            <p>Pixelation: </p>
            <input type='range' min={1} max={100} value={valueRange} ref={rangePixelRef} onInput={pixelRangeHandler} />
          </div>
        </div>
      </div>


    </div>
  )
}
