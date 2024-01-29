import { RootState } from '@/stores';
import { WalletState } from "@/stores/states/wallet/types";
import { createSelector } from '@reduxjs/toolkit';

export const walletSelector = (state: RootState): WalletState | undefined => state.wallet;
export const accountSelector = createSelector(walletSelector, (wallet: WalletState) => wallet.accountStorage);
