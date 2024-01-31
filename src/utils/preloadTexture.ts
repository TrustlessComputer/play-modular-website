import { TEXTURE_LIST } from '@/constant/trait-data'
import { useTexture } from '@react-three/drei'

for (let i = 0; i < TEXTURE_LIST.length; i++) {
    useTexture.preload(`${TEXTURE_LIST[i].src}`)
}
useTexture.preload('/assets/patterns/images/nontexture.jpg')

export { }
