import React from 'react'
import s from './SavedProjectItem.module.scss'
import { getProjectDetail } from '@/services/api/generative'
import { useProjectStore } from '@/stores/blocks'

type Props = {
  name: string
  id: string
  onClose: () => void
}

const ProjectItem = (props: Props) => {
  const { loadProject } = useProjectStore()

  const handleClickOpen = async () => {
    try {
      const res = await getProjectDetail({ id: props.id })
      // console.log('darta', JSON.parse(res.metaData))
      if (!!res.metaData) {
        loadProject({
          projectId: props.id,
          projectName: props.name,
          renderFile: res.metaData,
        })
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
