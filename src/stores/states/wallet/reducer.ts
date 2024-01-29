import { createSlice } from '@reduxjs/toolkit';
import { WalletState } from './types';
import { IAccount } from "@/providers/wallet/types";

const initialState: WalletState = {
  requestReload: 0,
  accountStorage: undefined
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    requestReloadWallet: (state) => {
      state.requestReload += 1;
    },
    setAccount: (state, action) => {
      state.accountStorage = action.payload as IAccount;
    },
    clearAccount: (state) => {
      state.accountStorage = undefined;
    },
  },
});

export const {
  requestReloadWallet,
  setAccount,
  clearAccount,
} = slice.actions;

export default slice.reducer;
