import React, { useEffect } from 'react'
import s from './SavedProjectsModal.module.scss'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListSavedProject } from '@/services/api/generative'
import { Virtuoso } from 'react-virtuoso'
import { useProjectStore } from '@/stores/blocks'
import AlertDialog from '@/components/AlertDialog'
import { MOCK_ADDRESS } from '@/constant/mock-data'
import ProjectItem from './ProjectItem'

type Props = {
  show: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedProjectsModal = ({ show, setIsOpen }: Props) => {
  const { loadProject } = useProjectStore()

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

  const BodyContent = () => {
    return (
      <div className={s.wrapper}>
        <div className={`${s.header} flex justify-between`}>
          <div className={s.title}>Saved Projects</div>
          <div
            className={s.close}
            onClick={() => {
              setIsOpen(false)
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
                    setIsOpen(false)
                  }}
                />
              )
            }}
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (show) {
      refresh()
    }
  }, [show])

  if (!show) return <></>

  return (
    <AlertDialog isOpen={show} setIsOpen={setIsOpen}>
      <BodyContent />
    </AlertDialog>
  )
}

export default SavedProjectsModal
