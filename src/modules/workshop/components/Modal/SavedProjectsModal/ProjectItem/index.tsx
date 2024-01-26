import React from 'react'
import s from './SavedProjectItem.module.scss'

type Props = {}

const ProjectItem = (props: Props) => {
  const handleClickOpen = () => {}

  return (
    <div className={s.wrapper}>
      {props.name}
      <button onClick={handleClickOpen}>Open</button>
    </div>
  )
}

export default ProjectItem
