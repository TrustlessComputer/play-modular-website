import { TAtribute } from '@/types'

export let patterns = [
  ['Bitcoin', 15, 'Btc', 0, ['#FF6F00', '#9B4300', '#FF9646']],
  ['Optimism', 5, 'Op', 0, ['#FF010A', '#990005', '#FF4B51']],
  ['Polygon', 5, 'Pol', 0, ['#6F42E2', '#40218F', '#AC8BFF']],
  ['Uniswap', 5, 'Uni', 0, ['#FF007B', '#900046', '#FF73B7']],
  ['Celestia', 5, 'Cel', 0, ['#6F42E2', '#40218F', '#AC8BFF']],
  ['Ordinals', 5, 'Ord', 0, ['#6C6C6C', '#404040', '#ADADAD']],
  ['Eigen Da', 5, 'Eig', 0, ['#222222', '#000000', '#444444']],
  ['Solid Orange', 50, 'Sol', 2, ['#FF6F00', '#9B4300', '#FF9646']],
  ['Solid Red', 50, 'Sol', 2, ['#FF010A', '#990005', '#FF4B51']],
  ['Solid Yellow', 50, 'Sol', 2, ['#FFCC00', '#8D7100', '#FFDB4D']],
  ['Solid Pink', 50, 'Sol', 2, ['#FF007B', '#900046', '#FF73B7']],
  ['Solid Blue', 50, 'Sol', 2, ['#0095FF', '#005490', '#5EBCFF']],
  ['Solid Azure', 50, 'Sol', 2, ['#00CBF8', '#00728B', '#75E6FF']],
  ['Solid Yellow Green', 50, 'Sol', 2, ['#9DDA00', '#517000', '#D5FF67']],
  ['Solid Bright Green', 50, 'Sol', 2, ['#00D05E', '#007334', '#50FF9F']],
  ['Solid Brown', 50, 'Sol', 2, ['#AB3300', '#511800', '#FF763C']],
  ['Solid Nougat', 50, 'Sol', 2, ['#DF901A', '#935800', '#F6B578']],
  ['Solid Light Gray', 50, 'Sol', 2, ['#B8B8B8', '#9D9D9D', '#E0E0E0']],
  ['Solid Dark Gray', 50, 'Sol', 2, ['#6C6C6C', '#404040', '#ADADAD']],
  ['Solid Dark', 50, 'Sol', 2, ['#222222', '#000000', '#444444']],
  ['Solid Purple', 50, 'Sol', 2, ['#6F42E2', '#40218F', '#AC8BFF']],
]

export let shapes = ['S1x1', 'S2x2']

export const NONT_TEXTURE = '/assets/patterns/images/nontexture.jpg'

export const TEXTURE_LIST = [
  {
    name: 'Bitcoin',
    src: '/assets/patterns/coin.svg',
  },
  {
    name: 'Optimism',
    src: '/assets/patterns/optimic.svg',
  },
  {
    name: 'Polygon',
    src: '/assets/patterns/polygon.svg',
  },
  {
    name: 'Uniswap',
    src: '/assets/patterns/uni.svg',
  },
  {
    name: 'Celestia',
    src: '/assets/patterns/ces.svg',
  },
  {
    name: 'Ordinals',
    src: '/assets/patterns/ord.svg',
  },
  {
    name: 'Eigen Da',
    src: '/assets/patterns/eigen.svg',
  },
  {
    name: 'Solid Orange',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Red',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Yellow',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Azure',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Pink',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Blue',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Yellow Green',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Bright Green',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Brown',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Nougat',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Light Gray',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Dark Gray',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Dark',
    src: NONT_TEXTURE,
  },
  {
    name: 'Solid Purple',
    src: NONT_TEXTURE,
  },
]

export const DATA_FETCH = [
  {
    id: '1',
    PatternObject: 'Optimism',
    ShapeObject: '2x2',
    texture: '/assets/patterns/optimic.svg',
    img: '/assets/patterns/images/shape8.png',
    color: '#FF010A',
    count: 10,
  },
  {
    id: '2',
    PatternObject: 'Bitcoin',
    ShapeObject: '1x1',
    texture: '/assets/patterns/coin.svg',
    img: '/assets/patterns/images/shape2.png',
    color: '#FF6F00',
    count: 2,
  },
  {
    id: '3',
    PatternObject: 'Polygon',
    ShapeObject: '2x2',
    texture: '/assets/patterns/polygon.svg',
    img: '/assets/patterns/images/shape5.png',
    color: '#6F42E2',
    count: 3,
  },
  {
    id: '4',
    PatternObject: 'Uniswap',
    ShapeObject: '1x1',
    texture: '/assets/patterns/uni.svg',
    img: '/assets/patterns/images/shape9.png',
    color: '#FF007B',
    count: 20,
  },
  {
    id: '5',
    PatternObject: 'Ordinals',
    ShapeObject: '2x2',
    texture: '/assets/patterns/ord.svg',
    img: '/assets/patterns/images/shape10.png',
    color: '#6C6C6C',
    count: 10,
  },
  {
    id: '6',
    PatternObject: 'Solid Yellow',
    ShapeObject: '2x2',
    texture: NONT_TEXTURE,
    img: '/assets/patterns/images/shape16.png',
    color: '#FFCC00',
    count: 10,
  },
  {
    id: '9',
    PatternObject: 'Eigen Da',
    ShapeObject: '1x1',
    texture: '/assets/patterns/eig.svg',
    img: '/assets/patterns/images/shape15.png',
    color: '#222222',
    count: 10,
  },
  {
    id: '10',
    PatternObject: 'Solid Pink',
    ShapeObject: '2x2',
    texture: NONT_TEXTURE,
    img: '/assets/patterns/images/shape14.png',
    color: '#FF007B',
    count: 10,
  },
  {
    id: '7',
    PatternObject: 'Solid Light Gray',
    ShapeObject: '2x2',
    texture: NONT_TEXTURE,
    img: '/assets/patterns/images/shape12.png',
    color: '#B8B8B8',
    count: 10,
  },
  {
    id: '8',
    PatternObject: 'Solid  Bright Green',
    ShapeObject: '1x1',
    texture: NONT_TEXTURE,
    img: '/assets/patterns/images/shape13.png',
    color: '#00D05E',
    count: 10,
  },
]
