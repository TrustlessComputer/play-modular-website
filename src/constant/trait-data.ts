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
        color: '#B97C19',
        count: 2,
    },
    {
        id: '3',
        PatternObject: 'Polygon',
        ShapeObject: '2x2',
        texture: '/assets/patterns/polygon.svg',
        img: '/assets/patterns/images/shape5.png',
        color: '#BA3FF4',
        count: 3,
    },
    {
        id: '4',
        PatternObject: 'Uniswap',
        ShapeObject: '1x1',
        texture: '/assets/patterns/uni.svg',
        img: '/assets/patterns/images/shape9.png',
        color: '#cb7b81',
        count: 20,
    },
    {
        id: '5',
        PatternObject: 'Uniswap',
        ShapeObject: '2x2',
        texture: '/assets/patterns/ord.svg',
        img: '/assets/patterns/images/shape10.png',
        color: '#000',
        count: 10,
    },
]

const handleSplitSize = (shape: string) => {
    const sizeArray = shape.split('x')
    const size = {
        w: Number(sizeArray[0]),
        d: Number(sizeArray[1]),
    }
}

// const handleInputData = (pattern: string, shape: string) => {
//     const

//  }
