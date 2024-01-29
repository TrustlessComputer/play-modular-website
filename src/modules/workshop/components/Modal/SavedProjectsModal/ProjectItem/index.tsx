import React from 'react'
import s from './SavedProjectItem.module.scss'
import { getProjectDetail, handleGetData } from '@/services/api/generative'
import { useProjectStore, useStoreGlobal } from '@/stores/blocks'

type Props = {
  name: string
  id: string
  onClose: () => void
}

const ProjectItem = (props: Props) => {
  const { loadProject } = useProjectStore()
  const { setDataCurrent } = useStoreGlobal()
  const handleClickOpen = async () => {
    try {
      const res = await getProjectDetail({ id: props.id })
      const data = await handleGetData() // reset listData when open
      if (!!res.metaData) {
        loadProject({
          projectId: props.id,
          projectName: props.name,
          renderFile: res.metaData,
        })
        setDataCurrent(data)
        props.onClose()
      }
    } catch (error) {
      //
    }
  }

  return (
    <div className={s.wrapper}>
      {props.name}
      <button onClick={handleClickOpen}>Open</button>
    </div>
  )
}

export default ProjectItem
