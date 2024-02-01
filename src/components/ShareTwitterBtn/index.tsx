'use client'
import { DOMAIN_URL } from '@/constant/constant'
import React from 'react'
import s from './ShareTwitterBtn.module.scss'
import IcTwitter from '@/icons/workshop/ic-twitter.svg'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { copyShareTW } from '@/utils'

type Props = {
  data: any
}

const ShareTwitterBtn = ({ data }: Props) => {
  const account = useAppSelector(accountSelector)

  const handleShareTw = () => {
    // e.preventDefault()
    // e.stopPropagation()
    // const shareUrl = `${DOMAIN_URL}/workshop/${projectId}`

    window.open(`https://twitter.com/BVMnetwork/status/1752952381007171646`, '_blank')
    // setTriggerSubmit(true);
    // setIsProcessing(true);
  }

  if (account?.address !== data?.data?.owner_addr) return <></>

  return (
    <div className={s.wrapper}>
      <button
        className='flex items-center gap-1 btn_submit'
        onClick={() => {
          copyShareTW(data?.data?.id, () => {
            handleShareTw()
          })
        }}
      >
        <IcTwitter /> Share
      </button>
    </div>
  )
}

export default ShareTwitterBtn
