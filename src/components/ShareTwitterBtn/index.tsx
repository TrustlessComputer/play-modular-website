'use client'
import { DOMAIN_URL } from '@/constant/constant'
import React, { useState } from 'react'
import s from './ShareTwitterBtn.module.scss'
import IcTwitter from '@/icons/workshop/ic-twitter.svg'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { copyShareTW } from '@/utils'
import Tooltip from '../Tooltip'
import ShareInfo from '@/modules/workshop/UI/Panel/ShareInfo'
import IcInfo from '@/icons/workshop/ic-info.svg'

type Props = {
  data: any
}

const ShareTwitterBtn = ({ data }: Props) => {
  const account = useAppSelector(accountSelector)
  const [showShareTooltip, setShowShareTooltip] = useState(true)

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
      <Tooltip
        triggerEl={
          <button
            className='flex items-center gap-1 btn_submit uppercase'
            onClick={() => {
              copyShareTW(data?.data?.id, () => {
                handleShareTw()
              })
            }}
          >
            <IcTwitter /> Share <IcInfo />
          </button>
        }
      >
        <ShareInfo show={true} />
      </Tooltip>
      <div className={s.shareTooltip}>
        <ShareInfo
          show={showShareTooltip}
          showClose
          onClose={() => {
            setShowShareTooltip(false)
          }}
        />
      </div>
    </div>
  )
}

export default ShareTwitterBtn
