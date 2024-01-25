import { create } from 'zustand'
import { createBlocksSlice } from './slice/blockSlice'
import { createTraitBlockSlice } from './slice/traitBlockSlice'
import { createPreviewSlice } from './slice/previewSlice'
import { TAtributeBlock, TBlockSlice, TPreviewSlice } from '@/types/store'

export const useStoreGlobal = create<TBlockSlice & TPreviewSlice & TAtributeBlock>((...a) => ({
  ...createBlocksSlice(...a),
  ...createTraitBlockSlice(...a),
  ...createPreviewSlice(...a),
}))
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import { persistCombineReducers, persistStore } from 'redux-persist'
import { getPersistConfig } from 'redux-deep-persist'
import persistLocalStorage from 'redux-persist/lib/storage'

const reducers = combineReducers(reducer)

const persistConfig = getPersistConfig({
  key: 'root',
  storage: persistLocalStorage,
  whitelist: ['wallet.accountStorage'],
  rootReducer: reducers,
})

const persistedReducer = persistCombineReducers(persistConfig, reducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat([]),
  })
}

export const store = makeStore()
export const persistor = persistStore(store)

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
