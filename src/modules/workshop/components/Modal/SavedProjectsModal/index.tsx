import React, { useEffect } from 'react'
import s from './SavedProjectsModal.module.scss'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListSavedProject } from '@/services/api/generative'
import { Virtuoso } from 'react-virtuoso'
import { useModalStore, useProjectStore } from '@/stores/blocks'
import AlertDialog from '@/components/AlertDialog'
import { MOCK_ADDRESS } from '@/constant/mock-data'
import ProjectItem from './ProjectItem'

export const SAVED_PROJECTS_MODAL_ID = 'SAVED_PROJECTS_MODAL_ID'


const SavedProjectsModal = () => {
  const { loadProject } = useProjectStore()

  const { closeModal } = useModalStore()

  const { dataInfinite, isReachingEnd, loadMore, hasFirstFetching, refresh } = useApiInfinite(
    getListSavedProject,
    {
      address: MOCK_ADDRESS,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      // shouldFetch: !!account?.address,
    },
  )

  useEffect(() => {
    refresh()
  }, [])


  const BodyContent = () => {
    return (
      <div className={s.wrapper}>
        <div className={`${s.header} flex justify-between`}>
          <div className={s.title}>Saved Model</div>
          <div
            className={s.close}
            onClick={() => {
              closeModal(SAVED_PROJECTS_MODAL_ID)
            }}
          >
            Close
          </div>
        </div>
        <div className={s.body}>
          {hasFirstFetching === false && <div>Loading...</div>}

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
              return (
                <ProjectItem
                  key={index}
                  {...block}
                  onClose={() => {
                    closeModal(SAVED_PROJECTS_MODAL_ID)

                  }}
                />
              )
            }}
          />
        </div>
      </div>
    )
  }



  return (
    <BodyContent />
  )
}

export default SavedProjectsModal
