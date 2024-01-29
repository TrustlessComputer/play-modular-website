/* eslint-disable react/display-name */
'use client'

import React, { forwardRef, PropsWithChildren, useEffect } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet } from '@/services/api/generative'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

import ItemBlock from './ItemBlock'
import s from './styles.module.scss'
import { useStoreGlobal } from '@/stores/blocks'
import { TListCurrent } from '@/types'

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

const GridItem = ({ children, ...props }) => (
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

const GridComponents = {
  List: GridList,
  Item: GridItem,
}

const ListBlocks: React.FunctionComponent = () => {
  const { setDataCurrent, listCurrent, blockCurrent } = useStoreGlobal()
  const account = useAppSelector(accountSelector)
  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
  } = useApiInfinite(
    getListModularByWallet,
    {
      // ownerAddress: account?.address, // 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
      ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
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
    if (data.length > 0) {
      setDataCurrent(data)
    }
  }, [dataInfinite.length])

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h3 className={s.title}>MODULAR</h3>
        <VirtuosoGrid
          className={s.wrapper_listBlocks}
          style={{ height: 'calc(100dvh - 300px)', pointerEvents: 'auto' }}
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
      </div>
    </div>
  )
}

export default ListBlocks
