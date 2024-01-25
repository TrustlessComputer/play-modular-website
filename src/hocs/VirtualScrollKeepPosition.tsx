import { useRef } from 'react'
import { StateSnapshot, VirtuosoHandle } from 'react-virtuoso'

import sessionStorage from '@/utils/storage/session-storage'

const VirtualScrollKeepPosition = ({
  keyStore,
  children,
}: {
  keyStore: string
  children(
    ref: React.MutableRefObject<VirtuosoHandle | null>,
    state: StateSnapshot | undefined,
    handleSaveSnapshot: () => void,
  ): React.ReactNode
}) => {
  const ref = useRef<VirtuosoHandle>(null)
  const state = useRef<StateSnapshot | undefined>(sessionStorage.get(keyStore) || undefined)

  const handleSaveSnapshot = () => {
    ref.current?.getState((snapshot) => {
      sessionStorage.set(keyStore, snapshot)
    })
  }

  return children(ref, state.current, handleSaveSnapshot)
}

export default VirtualScrollKeepPosition
