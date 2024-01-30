export const nfts = [
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 1',
    trait: {
      shape: '3x1',
      texture: 'wave',
      color: '#7AC8BC',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 2',
    trait: {
      shape: '2x2',
      texture: 'wood',
      color: '#BA5D3B',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 3',
    trait: {
      shape: '2x2',
      texture: 'brick',
      color: '#D7873E',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 4',
    trait: {
      shape: '2x2',
      texture: 'sand',
      color: '#E0B443',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 5',
    trait: {
      shape: '1x1',
      texture: 'whool',
      color: '#FF99BC',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 6',
    trait: {
      shape: '2x2',
      texture: 'stone',
      color: '#888888',
    },
  },
  {
    address: '0x97as6dfas97df6a9s7d6fas7d6f',
    name: 'NFT 6',
    trait: {
      shape: '1x1',
      texture: 'slime',
      color: '#007334',
    },
  },
]

const prefix = 'assets/'
export const mapTexture = {
  wave: `${prefix}/patterns/wave.svg`,
  brick: `${prefix}/patterns/brick.svg`,
  sand: `${prefix}/patterns/sand.svg`,
  whool: `${prefix}/patterns/whool.svg`,
  wood: `${prefix}/patterns/wood.svg`,
  stone: `${prefix}/patterns/stone.svg`,
  slime: `${prefix}/patterns/slime.svg`,
}

export const listMaterial = nfts.map((nft) => {
  return { color: nft.trait.color, texture: mapTexture[nft.trait.texture], shape: nft.trait.shape }
})

export const MOCK_ADDRESS = process.env.NEXT_PUBLIC_MOCK_ADDRESS
