import { ModalProps, TModalSlice } from '@/types/store'
import { StateCreator } from 'zustand'

export const createModalSlice: StateCreator<TModalSlice> = (set) => ({
  modals: [],

  openModal: ({ id, component }: ModalProps) => {
    set((state) => ({
      ...state,
      modals: [{ id, component }, ...state.modals],
    }))
  },

  closeModal: (id) => {
    set((state) => ({
      ...state,
      modals: state.modals.filter((modal) => modal.id !== id),
    }))
  },
})
