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
      ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn', //account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      // shouldFetch: !!account?.address,
    },
  )
  return (
    <Virtuoso
      className={s.listBlocks}
      style={{ height: 'calc(100dvh - 300px)', pointerEvents: 'auto' }}
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
