/* eslint-disable react/display-name */
'use client'

import React, { forwardRef, PropsWithChildren, useEffect } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { TEXTURE_LIST } from '@/constant/trait-data'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet } from '@/services/api/generative'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

import { useStoreGlobal } from '@/stores/blocks'
import { TListCurrent } from '@/types'
import { handleConvertData } from '@/utils/convertTraits'
import Empty from './Empty'
import ItemBlock from './ItemBlock'
import s from './styles.module.scss'
import { isLocalhost } from '@/utils/browser'
import { MOCK_ADDRESS } from '@/constant/mock-data'
import ImagePlaceholder from '@/components/Skeleton/ImagePlaceholder'

const GridList = forwardRef(({ children, ...props }: PropsWithChildren, ref: any) => (
  <div
    ref={ref}
    {...props}
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      width: 'fit-content',
    }}
  >
    {children}
  </div>
))

const GridItem = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flex: 'none',
        alignContent: 'stretch',
        boxSizing: 'border-box',
      }}
      className={s.itemBlock}
    >
      {children}
    </div>
  )
}

const Footer = () => <div />

const GridComponents = {
  List: GridList,
  Item: GridItem,
  Footer,
}

const ListBlocks: React.FunctionComponent = () => {
  const { setDataCurrent, listCurrent, blockCurrent, setTrait, setTexture, setColor, setWidth, setDepth } =
    useStoreGlobal()
  const account = useAppSelector(accountSelector)
  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
    hasFirstFetching,
    isEmpty,
    isRefreshing,
  } = useApiInfinite(
    getListModularByWallet,
    {
      ownerAddress: isLocalhost() ? MOCK_ADDRESS : account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      shouldFetch: !!account?.address,
    },
  )

  useEffect(() => {
    const data = dataInfinite as TListCurrent[]
    setDataCurrent(data)

    if (data.length > 0 && data[0]) {
      const convertedData = handleConvertData((data as any)[0].attributes)
      const sizeArray = convertedData.shape.split('x')
      const size = {
        w: Number(sizeArray[0]),
        d: Number(sizeArray[1]),
      }

      setTrait({
        color: convertedData.color,
        shape: convertedData.shape,
        texture: convertedData.texture,
        type: convertedData.type,
        groupId: data[0].groupId,
      })
      setTexture(convertedData.texture)
      setColor(convertedData.color)
      setWidth(size.w)
      setDepth(size.d)
    }
  }, [dataInfinite.length])

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h3 className={s.title}>MODULAR</h3>
        {hasFirstFetching === false || isRefreshing ? (
          <div className='grid grid-cols-2 gap-2'>
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <ImagePlaceholder key={index} />
              ))}
          </div>
        ) : (
          <>
            {hasFirstFetching && isEmpty ? (
              <Empty />
            ) : (
              <VirtuosoGrid
                className={s.wrapper_listBlocks}
                style={{ height: '100dvh', pointerEvents: 'auto' }}
                data={listCurrent}
                totalCount={listCurrent.length}
                endReached={() => {
                  if (isReachingEnd === false) {
                    loadMore()
                  }
                }}
                overscan={1000}
                components={GridComponents as any}
                itemContent={(index, block) => {
                  return <ItemBlock key={index} {...block} />
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ListBlocks
