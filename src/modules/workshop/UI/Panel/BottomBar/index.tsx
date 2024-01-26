'use client'
import { useUndoRedoShortcut } from '@/hooks/useShortcuts'
import { useStoreGlobal } from '@/stores/blocks'
import { views } from '@/utils'
import s from './styles.module.scss'
import { IconClear, IconPreview, IconRedo, IconTrash, IconUndo } from '@/components/IconSvgs'
import ListBlocksApi from '@/modules/workshop/ListBlocksApi'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import useApiInfinite from '@/hooks/useApiInfinite'
import { getListModularByWallet } from '@/services/api/generative'
import { useEffect } from 'react'
import { TListCurrent } from '@/types'
import { handleConvertData } from '@/utils/convertTraits'

type TDataFetch = {
  list: TListCurrent
}

export default function BottomBar() {
  const { undo, redo, mode, viewPreview, setViewPreview, deleteAlls, blockCurrent, setDataCurrent } = useStoreGlobal()
  const account = useAppSelector(accountSelector)
  const {
    dataInfinite = [],
    isReachingEnd,
    loadMore,
  } = useApiInfinite(
    getListModularByWallet,
    {
      ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn', //account?.address,
      page: 1,
      limit: 20,
    },
    {
      revalidateOnFocus: true,
      parallel: true,
      shouldFetch: !!account?.address,
    },
  )

  const undoAction = () => {
    undo()
  }

  const redoAction = () => {
    redo()
  }

  const saveAction = () => {
    console.log('DATA', JSON.stringify(blockCurrent))
  }

  const handleDeleteAll = () => {
    deleteAlls()
  }
  const handleGetData = async () => {
    const data = (await getListModularByWallet({
      ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
      page: 1,
      limit: 20,
    })) as TDataFetch
    const convertData =
      Array.isArray(data.list) &&
      data.list.map((item) => {
        const traits = handleConvertData(item.attributes)
        return { ...item, traits }
      })
    setDataCurrent(convertData)
  }

  useUndoRedoShortcut(undo, redo)

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <div className={s.bottomBar}>
      <button className={s.bottomBar_btn} onClick={undoAction}>
        <IconUndo /> Undo
      </button>
      <button className={s.bottomBar_btn} onClick={redoAction}>
        <IconRedo /> Redo
      </button>
      <button className={s.bottomBar_btn} onClick={() => handleDeleteAll()}>
        <IconClear />
        Clear
      </button>

      <button className={s.bottomBar_btn}>
        <IconTrash /> Delete
      </button>

      <button className={s.bottomBar_btn} onClick={saveAction}>
        Save
      </button>

      {/* <button onClick={() => setViewPreview(!viewPreview)} className={`${s.bottomBar_btn} ${s.bottomBar_btn_preview}`}>
        Preview: {viewPreview ? 'On' : 'Off'} <IconPreview />
      </button> */}
    </div>
  )
}
// const allViews = Object.values(views)

// BottomBar.PreviewScene = function BottomBarPreviewScene() {
//   const { view, setView } = useStoreGlobal()

//   return (
//     <div className={s.bottomBar_changeView}>
//       {allViews.map((v) => (
//         <button
//           key={v}
//           className={`${s.bottomBar_changeView_btn} ${view === v ? s.active : ''}`}
//           onClick={() => setView(v)}
//         >
//           {v}
//         </button>
//       ))}
//     </div>
//   )
// }
