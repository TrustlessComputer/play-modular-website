import { useModalStore } from '@/stores/blocks'
import React from 'react'
import s from './ModalManager.module.scss'
import AlertDialog from '@/components/AlertDialog'

type Props = {}

const ModalManager = (props: Props) => {
  const { modals, closeModal } = useModalStore()
  if (!modals.length) return null

  return (
    <div className={s.wrapper}>
      {modals.map((modal) => {
        const { component, id } = modal
        const show = modals[0].id === id
        const onClose = () => {
          console.log('🚀 ~ onClose ~ id:', id)
          closeModal(id)
        }

        return (
          <AlertDialog isOpen={show} closeModal={onClose} key={id}>
            {component}
          </AlertDialog>
        )
      })}
    </div>
  )
}

export default ModalManager
