import {create} from 'zustand';

interface IProp {
  play: boolean,
  played: boolean,
  vidIsPlay: boolean,
  resetPlay: () => void
  setPlay: () => void
  setPlayed: () => void
  setVidIsPlay: (b: boolean) => void
}

const useAnimationStore = create<IProp>((set) => ({
  play: false,
  played: false,
  vidIsPlay: false,
  setPlay: () => set({play: true}),
  resetPlay: () => set({play: false}),
  setPlayed: () => set({played: true}),
  setVidIsPlay: (b: boolean) => set({vidIsPlay: b}),
}))

export default useAnimationStore;
