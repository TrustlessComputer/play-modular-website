import useApiInfinite from '@/hooks/useApiInfinite'
import { getListSavedProject } from '@/services/api/generative'
import { useModalStore } from '@/stores/blocks'
import React, { useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'
import s from './SavedProjectsModal.module.scss'
// import { MOCK_ADDRESS } from '@/constant/mock-data'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'

import VirtualScrollKeepPosition from '@/hocs/VirtualScrollKeepPosition'
import OpenButton from './OpenButton'
import ProjectItem from './ProjectItem'
import Spinner from '@/components/Spinner'

export const SAVED_PROJECTS_MODAL_ID = 'SAVED_PROJECTS_MODAL_ID'

const SavedProjectsModal = () => {
  const { closeModal } = useModalStore()

  const account = useAppSelector(accountSelector)

  const { dataInfinite, isReachingEnd, loadMore, hasFirstFetching, refresh } = useApiInfinite(
    getListSavedProject,
    {
      address: account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      shouldFetch: !!account?.address,
    },
  )

  const Empty = () => {
    return (
      <div className={'flex justify-center'}>
        <div className={s.subtitle}>No saved model</div>
      </div>
    )
  }

  useEffect(() => {
    refresh()
  }, [])

  const BodyContent = () => {
    return (
      <div className={s.wrapper}>
        <div className={`${s.header} flex justify-between`}>
          <div className={s.title}>Open Model</div>
          {/* <div
            className={s.close}
            onClick={() => {
              closeModal(SAVED_PROJECTS_MODAL_ID)
            }}
          >
            Close
          </div> */}
        </div>
        <div className={s.body}>
          {hasFirstFetching === false && <div className='flex items-center justify-center'>
            <Spinner
              size='w-6 h-6'
              color='dark:text-transparent fill-gray-600'
            ></Spinner>
          </div>}
          <VirtualScrollKeepPosition
            keyStore="saved-project-current-position-index">
            {(ref, state, handleSaveSnapshot) => {
              if (hasFirstFetching === true && dataInfinite.length === 0) {
                return <div style={{ height: 'calc(100dvh - 300px)' }}>
                  <Empty />
                </div>
              }

              return (
                <Virtuoso
                  ref={ref}
                  restoreStateFrom={state}
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
                    return (
                      <div key={index}>
                        <ProjectItem
                          {...block}
                          onClose={() => {
                            closeModal(SAVED_PROJECTS_MODAL_ID)
                          }}
                        />
                      </div>
                    )
                  }}
                  onScroll={handleSaveSnapshot}
                />
              )
            }}
          </VirtualScrollKeepPosition>
        </div>
        <div className={s.footer}>
          <OpenButton />
        </div>
      </div>
    )
  }

  return <BodyContent />
}

export default React.memo(SavedProjectsModal)
