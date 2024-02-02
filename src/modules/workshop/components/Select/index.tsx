import * as React from 'react'
import * as THREE from 'three'
import { SelectionBox } from 'three-stdlib'
import { useThree } from '@react-three/fiber'
import { shallow } from 'zustand/shallow'
import { useStoreGlobal } from '@/stores/blocks'
import { EDIT_MODE } from '@/utils'

type TSelect = {
  box: any
  multiple: boolean
  children: React.ReactNode
  onChange?: () => void
  onChangePointerUp?: () => void
  border?: string
  backgroundColor?: string
  filter?: (item: any) => void
}

export function Select({
  box,
  multiple,
  children,
  onChange,
  onChangePointerUp,
  border = '1px solid #55aaff',
  backgroundColor = 'rgba(75, 160, 255, 0.1)',
  filter: customFilter = (item) => item,
  ...props
}: TSelect) {
  const [downed, down] = React.useState(false)
  const { setEvents, camera, raycaster, gl, controls, size, get } = useThree() as any

  const { mode, setSelectedBricks, selectedBricks, blockCurrent } = useStoreGlobal()

  const enable = mode === EDIT_MODE
  const onClick = React.useCallback(
    (e) => {
      e.stopPropagation()
      if (!enable || selectedBricks.length) {
        if (selectedBricks[0].userData.uID !== e.object.userData.uID) {
          setSelectedBricks({})
        }

        return
      }
      setSelectedBricks({
        object: customFilter([e.object])[0],
        shift: e.shiftKey,
      })
    },
    [customFilter, enable, setSelectedBricks],
  )

  const onPointerMissed = React.useCallback((e) => {
    setSelectedBricks({})
  }, [])

  const ref = React.useRef(null)

  const selectionOverTimeoutId = React.useRef<NodeJS.Timeout>(null)
  const selectionStartTimeoutId = React.useRef<NodeJS.Timeout>(null)

  React.useEffect(() => {
    if (!enable) {
      setSelectedBricks({})
    }
  }, [enable])

  React.useEffect(() => {
    if (!box || !multiple || !enable) return

    const selBox = new SelectionBox(camera, ref.current)

    const element = document.createElement('div')
    element.style.pointerEvents = 'none'
    element.style.border = border
    element.style.backgroundColor = backgroundColor
    element.style.position = 'fixed'

    const startPoint = new THREE.Vector2()
    const pointTopLeft = new THREE.Vector2()
    const pointBottomRight = new THREE.Vector2()

    const oldRaycasterEnabled = get().events.enabled
    const oldControlsEnabled = controls?.enabled as any

    let isDown = false

    function prepareRay(event, vec) {
      const { offsetX, offsetY } = event
      const { width, height } = size
      vec.set((offsetX / width) * 2 - 1, -(offsetY / height) * 2 + 1)
    }

    function onSelectStart(event) {
      if (controls) controls.enabled = false

      if (selectionStartTimeoutId.current) {
        clearTimeout(selectionStartTimeoutId.current)
      }
      selectionStartTimeoutId.current = setTimeout(() => setEvents({ enabled: false }), 500)

      down((isDown = true))
      gl.domElement.parentElement?.appendChild(element)
      element.style.left = `${event.clientX}px`
      element.style.top = `${event.clientY}px`
      element.style.width = '0px'
      element.style.height = '0px'
      startPoint.x = event.clientX
      startPoint.y = event.clientY
    }

    function onSelectMove(event) {
      pointBottomRight.x = Math.max(startPoint.x, event.clientX)
      pointBottomRight.y = Math.max(startPoint.y, event.clientY)
      pointTopLeft.x = Math.min(startPoint.x, event.clientX)
      pointTopLeft.y = Math.min(startPoint.y, event.clientY)
      element.style.left = `${pointTopLeft.x}px`
      element.style.top = `${pointTopLeft.y}px`
      element.style.width = `${pointBottomRight.x - pointTopLeft.x}px`
      element.style.height = `${pointBottomRight.y - pointTopLeft.y}px`
    }

    function onSelectOver() {
      if (isDown) {
        if (controls) controls.enabled = oldControlsEnabled

        if (selectionOverTimeoutId.current) {
          clearTimeout(selectionOverTimeoutId.current)
        }

        selectionOverTimeoutId.current = setTimeout(() => setEvents({ enabled: oldRaycasterEnabled }), 200)

        down((isDown = false))
        element.parentElement?.removeChild(element)
      }
    }

    function pointerDown(event) {
      if (event.shiftKey) {
        var vec = new THREE.Vector3()
        var pos = new THREE.Vector3()

        vec.set((event.offsetX / window.innerWidth) * 2 - 1, -(event.offsetY / window.innerHeight) * 2 + 1, 0.5)

        vec.unproject(camera)

        vec.sub(camera.position).normalize()

        var distance = -camera.position.z / vec.z

        pos.copy(camera.position).add(vec.multiplyScalar(distance))

        onSelectStart(event)
        prepareRay(event, selBox.startPoint)
      }
    }

    let previous = []
    function pointerMove(event) {
      if (isDown) {
        onSelectMove(event)
        prepareRay(event, selBox.endPoint)
        const allSelected = selBox
          .select()
          .sort((o) => Number(o.uuid))
          .filter((o) => o.isMesh)
        if (!shallow(allSelected, previous)) {
          previous = allSelected
          setSelectedBricks({ object: customFilter(allSelected) })
        }
      }
    }

    function pointerUp(event) {
      if (isDown) onSelectOver()
    }

    document.addEventListener('pointerdown', pointerDown, { passive: true })
    document.addEventListener('pointermove', pointerMove, {
      passive: true,
      capture: true,
    })
    document.addEventListener('pointerup', pointerUp, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', pointerDown)
      document.removeEventListener('pointermove', pointerMove)
      document.removeEventListener('pointerup', pointerUp)
    }
  }, [size.width, size.height, raycaster, camera, controls, gl, enable])
  return (
    <group ref={ref} onClick={onClick} onPointerMissed={onPointerMissed} {...props}>
      {children}
    </group>
  )
}
