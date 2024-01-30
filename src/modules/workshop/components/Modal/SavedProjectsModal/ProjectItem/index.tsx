import IcSelected from '@/icons/workshop/ic-selected-check.svg'
import { useProjectStore } from '@/stores/blocks'
import cs from 'classnames'
import dayjs from 'dayjs'
import React, { useCallback, useMemo } from 'react'
import s from './SavedProjectItem.module.scss'
import Image from 'next/image'

type Props = {
  name: string
  id: string
  onClose: () => void
  // onClick: () => void
  updatedAt?: string
  createdAt?: string
  thumbnail?: string
}

const ProjectItem = (props: Props) => {
  const { selectedProject, setSelectedProject } = useProjectStore()
  const handleOnClick = useCallback(
    (block) => {
      if (props.id === selectedProject.id) {
        return
      }
      setSelectedProject({
        id: block.id,
        name: block.name,
      })
    },
    [selectedProject.id],
  )

  const showDate = useMemo(() => {
    const date = dayjs(props.updatedAt || props.createdAt)
    return date.format('DD/MM/YYYY')
  }, [props.updatedAt, props.createdAt])

  const isSelected = useMemo(() => {
    return props.id === selectedProject.id
  }, [props.id, selectedProject.id])

  return (
    <div className={cs(s.wrapper, { [s.active]: isSelected })} onClick={() => handleOnClick(props)}>
      <div className=''>
        <p className={`${s.name} truncate`}>{props.name}</p>
        <p className={`${s.time}`}>{showDate}</p>
      </div>
      <div className={s.thumbnail_wrapper}>
        <Image
          src={'https://cdn.generative.xyz/upload/1706599034259555736-1706599034-thumbnail'}
          alt='thumbnail'
          fill={true}
          className={s.thumbnail}
        />
      </div>
    </div>
  )
}

export default React.memo(ProjectItem)
