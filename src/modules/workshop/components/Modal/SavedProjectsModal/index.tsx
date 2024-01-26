import React from 'react'
import s from './SavedProjectsModal.module.scss'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListSavedProject } from '@/services/api/generative'
import { Virtuoso } from 'react-virtuoso'
import { useProjectStore } from '@/stores/blocks'

type Props = {
  show: boolean
  onClose: () => void
}

const SavedProjectsModal = ({ show, onClose }: Props) => {
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

  if (!show) return <></>

  return (
    <div className={s.wrapper}>
      <div className={`${s.header} flex justify-between`}>
        <h3>Saved Projects</h3>
        <button onClick={onClose}>Close</button>
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
            return <div key={index} {...block} onClick={() => handleLoadProject(block.projectId, block.projectName)} />
          }}
        />
      </div>
    </div>
  )
}

export default SavedProjectsModal
