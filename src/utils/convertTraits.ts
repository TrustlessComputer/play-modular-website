import { TEXTURE_LIST, patterns } from '@/constant/trait-data'
import { TAtribute } from '@/types'

const handleConverTrait = (traits: TAtribute) => {
    const SHAPE = 'Shape'
    const TYPE = 'Pattern'
    const shape = traits.find((item) => item.traitType.includes(SHAPE))
    const size = shape.value.slice(1)
    const type = traits.find((item) => item.traitType.includes(TYPE))

    return {
        shape: size,
        type: type.value,
    }
}
const handleGetColor = (type: string, dataTrait = patterns) => {
    const dataTraitFilter = dataTrait.filter((item) => item[0] === type)[0]
    return dataTraitFilter[4][0]
}
export const handleConvertData = (attributes: TAtribute) => {
    const trait = handleConverTrait(attributes)
    const color = handleGetColor(trait.type)
    const texture = TEXTURE_LIST.find((item) => item.name === trait.type)
    return {
        ...trait,
        color,
        texture: texture?.src,
    }
}
