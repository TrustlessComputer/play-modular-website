/* eslint-disable @typescript-eslint/no-non-null-assertion */

// App configs
export const APP_ENV: string = process.env.NEXT_PUBLIC_MODE!
export const API_URL: string = process.env.NEXT_PUBLIC_API_URL!
export const TC_API_URL: string = process.env.NEXT_PUBLIC_API_URL_TC!
export const PROTOCOL_API_URL: string = process.env.NEXT_PUBLIC_API_URL_PROTOCOL!
export const TC_NETWORK_RPC: string = process.env.NEXT_PUBLIC_TC_NETWORK_RPC!
export const TC_LAYER2_NETWORK_RPC: string = process.env.NEXT_PUBLIC_TC_LAYER2_NETWORK_RPC!
export const TC_EXPLORER: string = process.env.NEXT_PUBLIC_TC_EXPLORER!
export const TC_LAYER2_EXPLORER: string = process.env.NEXT_PUBLIC_TC_LAYER2_EXPLORER!

export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!
export const CDN_URL_GE: string = process.env.NEXT_PUBLIC_CDN_URL_GE!
export const API_FAUCET: string = process.env.NEXT_PUBLIC_API_FAUCET!
export const API_TOPUP: string = process.env.NEXT_PUBLIC_API_URL_TOPUP!
export const API_DGAMES: string = process.env.NEXT_PUBLIC_API_DGAMES!
export const SOCKET_DGAMES: string = process.env.NEXT_PUBLIC_SOCKET_DGAMES!

export const API_FOC: string = process.env.NEXT_PUBLIC_API_FOC!
export const FOC_CONTRACT: string = process.env.NEXT_PUBLIC_FOC_CONTRACT!
export const JACKPOT_CONTRACT: string = process.env.NEXT_PUBLIC_JACKPOT_CONTRACT!
export const USERINFO_CONTRACT: string = process.env.NEXT_PUBLIC_USERINFO_CONTRACT!

export const TC_PAYMENT_ADDRESS: string = process.env.NEXT_PUBLIC_GM_PAYMENT_ADDRESS!

export const GG_PAYMENT_ADDRESS: string = process.env.NEXT_PUBLIC_GG_PAYMENT_ADDRESS!

export const GENERATIVE_PROJECT_CONTRACT = process.env.NEXT_PUBLIC_GENERATIVE_PROJECT_CONTRACT!

export const CDN_URL_ICONS: string = CDN_URL + '/nbc/icons'
export const CDN_URL_STICKERS: string = CDN_URL + '/nbc/stickers'
export const CDN_URL_IMAGES: string = CDN_URL + '/nbc/images'
export const CDN_URL_VIDEOS: string = CDN_URL + '/nbc/videos'
export const CDN_URL_GAMES: string = CDN_URL + '/nbc/game-fi'

// Contract configs
export const PHOTO_CONTRACT: string = process.env.NEXT_PUBLIC_PHOTO_CONTRACT!

// TC configs
export const TC_URL: string = process.env.NEXT_PUBLIC_TC_WEB_URL!
export const TC_CHAIN_ID: any = process.env.NEXT_PUBLIC_CHAIN_ID!
export const TRANSFER_TX_SIZE = 1000!
export const GM_PROJECT_ID = process.env.NEXT_PUBLIC_GM_ALLOW_LIST_ID!
export const ROOT_ADDRESS = '0x0000000000000000000000000000000000000000'
export const TC_ADDRESS = process.env.NEXT_PUBLIC_TC_ADDRESS!

// CLIENT KEYS
// export const OPENSEA_API_KEY = '9c4ad2aee78d4745b49ca5e9783c33f9';
// export const MORALIS_API_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQxZmNhY2M5LTA3ZDctNGE3My1hN2EyLWYzNDg2MWNkNjNmZSIsIm9yZ0lkIjoiMzI3NDI5IiwidXNlcklkIjoiMzM2NjQyIiwidHlwZUlkIjoiNGEyZTNhZTQtZDAxNy00ZTYzLWFlODgtZmE0ZWQyZGJhNDEwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODM5NDgwMDgsImV4cCI6NDgzOTcwODAwOH0.7oiCoODECGfvyXlpvJ8_ykryrYrj_DXVmgENhEUHFKI';
// export const COINMARKETCAP_KEY = '628bd9bd-8f47-449e-b38d-0c85c43d3c42';

// GOOGLE KEYS
export const GG_RECAPTCHA_SITE = process.env.NEXT_PUBLIC_RECAPTCHA_SITE!

// GA config
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''

// BRIDGE
export const TC_BRIDGE = process.env.NEXT_PUBLIC_TC_BRIDGE!
export const ETH_BRIDGE = process.env.NEXT_PUBLIC_ETH_BRIDGE!

export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
export const CONVERT_TC_ADDRESS = process.env.NEXT_PUBLIC_CONVERT_TC_ADDRESS!

export const BLOG_URL: string = process.env.NEXT_PUBLIC_BLOG_URL!
export const PLAYER_SHARES_URL: string = process.env.NEXT_PUBLIC_PLAYER_SHARES_URL!
export const PERP_API_URL = process.env.NEXT_PUBLIC_PERP_API!

// Firebase configs
export const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
export const FIREBASE_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
export const FIREBASE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
export const FIREBASE_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID
export const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
export const FIREBASE_MESSAGING_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY
export const FIREBASE_DATABASE_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

// PWA
export const PWA_NAME = process.env.NEXT_PUBLIC_PWA!
export const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!
/* eslint-enable @typescript-eslint/no-non-null-assertion */

// Alpha keys
export const ALPHA_KEY_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_ALPHA_KEY_FACTORY_ADDRESS!
export const ALPHA_KEY_SWEEP_FLOOR_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_ALPHA_KEY_SWEEP_FLOOR_FACTORY_ADDRESS!
export const BTC_L2_ADDRESS = process.env.NEXT_PUBLIC_BTC_L2_ADDRESS!
export const ETH_L2_ADDRESS = process.env.NEXT_PUBLIC_ETH_L2_ADDRESS!

export const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS!
export const TVL_ADDRESS = process.env.NEXT_PUBLIC_TVL_ADDRESS!

export const ASSETS_URL: string = `/assets`
export const APP_LOG_LEVEL = process.env.NEXT_PUBLIC_LOG_LEVEL!

export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL!

// Games
export const TOURNAMENT_ENABLE = process.env.NEXT_PUBLIC_TOURNAMENT_ENABLE! === 'true'
export const UNITY_LAUNCHER_URL = process.env.NEXT_PUBLIC_UNITY_LAUNCHER_URL!
export const MERGE_CONTRACT = process.env.NEXT_PUBLIC_MERGE_CONTRACT!
export const PEPE_CONTRACT = process.env.NEXT_PUBLIC_PEPE_CONTRACT!
export const SUM_21_CONTRACT = process.env.NEXT_PUBLIC_SUM21_CONTRACT!
export const BLAST_CONTRACT = process.env.NEXT_PUBLIC_BLAST_CONTRACT!
export const AA_TRACKING_API_KEY = process.env.NEXT_PUBLIC_AA_TRACKING_API_KEY!

export const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID!

const MIN_DECIMAL = 2
const MAX_DECIMAL = 6
const NATIVE_ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
const METAMASK_DOWNLOAD_PAGE = 'https://metamask.io/download/'

export { MIN_DECIMAL, MAX_DECIMAL, NATIVE_ETH_ADDRESS, METAMASK_DOWNLOAD_PAGE }

export const ALLOWED_ATTRIBUTES = {
  '*': ['style'],
  span: ['class'],
  a: ['href', 'target'],
  img: ['src', 'width', 'height'],
  iframe: ['src', 'width', 'height'],
}

export const DELAY_SNAPSHOT = 2000
