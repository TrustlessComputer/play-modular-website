/* eslint-disable react/display-name */
'use client'

import React, { forwardRef, PropsWithChildren, useEffect } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

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

const GridComponents = {
  List: GridList,
  Item: GridItem,
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
  } = useApiInfinite(
    getListModularByWallet,
    {
      // ownerAddress: account?.address, // 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
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
        {hasFirstFetching && isEmpty ? (
          <Empty />
        ) : (
          <VirtuosoGrid
            className={s.wrapper_listBlocks}
            style={{ height: 'calc(100dvh)', pointerEvents: 'auto' }}
            data={listCurrent}
            totalCount={listCurrent.length}
            endReached={() => {
              if (isReachingEnd === false) {
                loadMore()
              }
            }}
            overscan={200}
            components={GridComponents as any}
            itemContent={(index, block) => {
              return <ItemBlock key={index} {...block} />
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ListBlocks
