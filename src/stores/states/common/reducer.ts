import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from './types';

const initialState: CommonState = {
  needReload: 0,
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    requestReload: (state) => {
      alert('111')
      state.needReload += 1;
    },
  },
});

export const {
  requestReload,
} = slice.actions;

export default slice.reducer;
