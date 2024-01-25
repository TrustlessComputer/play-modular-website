'use client'

import React from 'react'
import { Virtuoso } from 'react-virtuoso'

import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet } from '@/services/api/generative'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

import ItemBlock from './ItemBlock'
import s from './styles.module.scss'

const ListBlocks: React.FunctionComponent = () => {
  const account = useAppSelector(accountSelector)
  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
  } = useApiInfinite(
    getListModularByWallet,
    {
      ownerAddress: 'bc1pvtvqjx4yx9nzceunsppvav3h90nkdd2up7hkyv32nf08y7hwgn7qkfsva8', //account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      // shouldFetch: !!account?.address,
    },
  )
  console.log('dataInfinite', dataInfinite)
  return (
    <Virtuoso
      className={s.listBlocks}
      style={{ height: 'calc(100dvh - 300px)' }}
      data={dataInfinite}
      totalCount={dataInfinite.length}
      endReached={() => {
        if (isReachingEnd === false) {
          loadMore()
        }
      }}
      overscan={200}
      itemContent={(index, block) => {
        return <ItemBlock key={index} {...block} />
      }}
    />
  )
}

export default ListBlocks
