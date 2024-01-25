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
      ownerAddress: 'bc1p4psqwcglffqz87kl0ynzx26dtxvu3ep75a02d09fshy90awnpewqvkt7er', //account?.address,
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
