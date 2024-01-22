import create from 'zustand';

export const useUiStore = create((set: any) => ({
    pageStatus: 'PAGE_LOADING',
    setPageStatus: (status: string) => set({pageStatus: status})
    // decrease: () => set((state: any) => ({count: state.count - 1})),
}));
