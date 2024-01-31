import { Vector3 } from 'three'
import { base } from '@/constant/datablocks'
import { Brick } from '@/modules/workshop/components/Brick'
import { Lights } from '@/modules/workshop/components/Lights'

type TSence = {
  data: any
}

const Sence = ({data}: TSence) => {
  return <>
    {data.map((b, i) => {
      const { dimensions, rotation, intersect } = b
      const height = 1
      const position = () => {
        const evenWidth = rotation === 0 ? dimensions.x % 2 === 0 : dimensions.z  % 2 === 0
        const evenDepth = rotation === 0 ? dimensions.z % 2 === 0 : dimensions.x % 2 === 0
        return new Vector3()
          .copy(intersect.point)
          .add(intersect.face.normal)
          .divide(new Vector3(base, height, base))
          .floor()
          .multiply(new Vector3(base, height, base))
          .add(new Vector3(evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2))
      }

      return (
        <Brick
          key={b.uID}
          {...b}
          position={position()}
        />
      )
    })}
    <Lights />
  </>
}

export default Sence;
