import React from 'react'
import s from './SavedProjectsModal.module.scss'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListSavedProject } from '@/services/api/generative'
import { Virtuoso } from 'react-virtuoso'
import { useProjectStore } from '@/stores/blocks'
import AlertDialog from '@/components/AlertDialog'

type Props = {
  show: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedProjectsModal = ({ show, setIsOpen }: Props) => {
  const { loadProject } = useProjectStore()

  const { dataInfinite, isReachingEnd, loadMore, hasFirstFetching } = useApiInfinite(
    getListSavedProject,
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

  const handleLoadProject = (projectId: string, projectName: string) => {
    loadProject({
      projectId,
      projectName,
    })
    onClose()
  }

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
                <div key={index} {...block} onClick={() => handleLoadProject(block.projectId, block.projectName)} />
              )
            }}
          />
        </div>
      </div>
    )
  }

  if (!show) return <></>

  return (
    <AlertDialog isOpen={show} setIsOpen={setIsOpen}>
      <BodyContent />
    </AlertDialog>
  )
}

export default SavedProjectsModal
