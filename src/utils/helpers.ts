import { mergeBufferGeometries } from 'three-stdlib'
import { base, heightBase, knobSize } from '../constant/datablocks'
import { BoxGeometry, CylinderGeometry } from 'three'

export function CSSToHex(cssColor) {
  return parseInt(`0x${cssColor.substring(1)}`, 16)
}

export function getMeasurementsFromDimensions({ x, y, z }: { x: number; y?: number; z: number }) {
  return {
    width: base * x,
    height: base * y || heightBase,
    depth: base * z,
  }
}

export function mergeMeshes(geometries) {
  return mergeBufferGeometries(geometries)
}

export function createGeometry({ width, height, depth, dimensions, knobDim = knobSize }) {
  let geometries = []

  const cubeGeo = new BoxGeometry(base * dimensions.x, height, base * dimensions.z)
  geometries.push(cubeGeo)

  for (let i = 0; i < dimensions.x; i++) {
    for (let j = 0; j < dimensions.z; j++) {
      const x = i * base - (dimensions.x * base) / 2 + base / 2
      const z = j * base - (dimensions.z * base) / 2 + base / 2
      // cubeGeo.translate(x, 0, z)

      const cylinder = new CylinderGeometry(knobDim, knobDim, knobDim, 36)
      const y = height / 2 + knobDim / 2
      cylinder.translate(x, y, z)

      // geometries.push({ cube: cubeGeo, cylinder: cylinder })
      geometries.push(cylinder)
    }
  }

  return mergeBufferGeometries(geometries)

  return geometries
}

export function collisonXYZ(o1, o2) {
  if (Math.abs(o1.position.x - o2.position.x) > (o1.geometry.parameters.width + o2.geometry.parameters.width) / 2)
    return false
  if (Math.abs(o1.position.y - o2.position.y) > (o1.geometry.parameters.height + o2.geometry.parameters.height) / 2)
    return false
  if (Math.abs(o1.position.z - o2.position.z) > (o1.geometry.parameters.depth + o2.geometry.parameters.depth) / 2) {
    return false
  }
  return true
}

export function degToRad(angle) {
  return angle * (Math.PI / 180)
}

export function radToDeg(angle) {
  return 360 - (angle / Math.PI) * 180
}

export const checkCollision = (boundingBoxToCheck, otherBoundingBoxes) => {
  let isCollied = false
  let isSomethingBelow = false
  let isFirstLayer = Math.floor(boundingBoxToCheck.max.y) === Math.floor(heightBase)

  if (otherBoundingBoxes.length < 1) return true

  for (let index = 0; index < otherBoundingBoxes.length; index++) {
    if (!otherBoundingBoxes[index]) continue

    const brickBoundingBox = otherBoundingBoxes[index].brickBoundingBox

    const diffX = Math.round(boundingBoxToCheck.min.x - brickBoundingBox.min.x) - 1
    const diffZ = Math.round(boundingBoxToCheck.min.z - brickBoundingBox.min.z) - 1
    const diffY = Math.round(boundingBoxToCheck.min.y - brickBoundingBox.min.y)

    if (Math.abs(diffY) < heightBase) {
      // TOP LEFT CORNER
      if (Math.abs(diffX) === base && Math.abs(diffZ) === base) {
        isCollied = true
        break
      }

      // BOTTOM LEFT CORNER
      if ((Math.abs(diffX) === base || diffX === 0) && diffZ >= 0 && diffZ <= base) {
        isCollied = true
        break
      }

      if ((Math.abs(diffZ) === base || diffZ === 0) && diffX >= 0 && diffX <= base) {
        isCollied = true
        break
      }
    }

    // Filter out the top layer
    if (isFirstLayer || Math.abs(diffY) > heightBase) continue

    if (diffY === heightBase && Math.abs(diffX) <= base && Math.abs(diffZ) <= base) isSomethingBelow = true
  }
  console.log('isCollied', isCollied)
  return !isCollied //&& ((isSomethingBelow && !isFirstLayer) || isFirstLayer) // true if it is not colliding
}

export function uID(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

function hslToRgb(h, s, l) {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

export function generateSoftColors() {
  const hue = Math.random()
  const saturation = Math.random() * 0.2 + 0.4 // 40% to 60%
  const lightness = Math.random() * 0.3 + 0.5 // 50% to 80%

  const [r, g, b] = hslToRgb(hue, saturation, lightness)
  const hexColor = rgbToHex(r, g, b)

  return hexColor
}

export function isBlank(str) {
  return !str || /^\s*$/.test(str)
}

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

// Using fetch
export async function downloadImage(imageSrc, name) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
