import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  Box3,
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTheme } from '@/hooks/useTheme'
import { buildDeskScene } from './buildDeskScene'
import styles from './XRayCanvas.module.css'

type Props = {
  className?: string
}

const DARK_BG = 0x050505
const LIGHT_BG = 0xf6f6f4
const DARK_LINE = 0xe8e8e4
const LIGHT_LINE = 0x121212

export function XRayCanvas({ className }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { resolved } = useTheme()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const light = resolved === 'light'
    const bg = light ? LIGHT_BG : DARK_BG
    const line = light ? LIGHT_LINE : DARK_LINE

    const scene = new Scene()
    scene.background = new Color(bg)

    const camera = new PerspectiveCamera(32, 1, 0.05, 40)

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(bg, 1)
    host.appendChild(renderer.domElement)

    const { root, materials } = buildDeskScene(line)
    scene.add(root)
    scene.add(new AmbientLight(0xffffff, 0.8))

    const box = new Box3()
    root.traverse((obj) => {
      if (obj.name === 'chair') return
      const mesh = obj as { isLineSegments?: boolean; geometry?: unknown }
      if (!mesh.isLineSegments || !mesh.geometry) return
      box.expandByObject(obj)
    })
    if (box.isEmpty()) box.setFromObject(root)

    const size = box.getSize(new Vector3())
    const center = box.getCenter(new Vector3())
    const span = Math.max(size.x, size.y * 1.1, size.z)
    const fitDist = span * 0.95

    camera.position.set(
      center.x - fitDist * 0.78,
      center.y + fitDist * 0.48,
      center.z + fitDist * 0.92,
    )

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.minDistance = fitDist * 0.5
    controls.maxDistance = fitDist * 2.4
    controls.minPolarAngle = 0.28
    controls.maxPolarAngle = Math.PI / 2.02
    controls.target.set(center.x, center.y * 0.92, center.z)
    controls.autoRotate = !reduced
    controls.autoRotateSpeed = 0.45
    controls.update()

    let frame = 0
    let disposed = false

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (w < 1 || h < 1) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()

    const tick = () => {
      if (disposed) return
      frame = requestAnimationFrame(tick)
      controls.update()
      const t = performance.now() * 0.001
      materials[1].opacity = 0.42 + Math.sin(t * 1.2) * 0.1
      renderer.render(scene, camera)
    }
    tick()

    const stopAuto = () => {
      controls.autoRotate = false
    }

    const blockPageScroll = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    renderer.domElement.addEventListener('pointerdown', stopAuto)
    host.addEventListener('wheel', blockPageScroll, { passive: false })
    renderer.domElement.addEventListener('wheel', blockPageScroll, {
      passive: false,
    })

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointerdown', stopAuto)
      host.removeEventListener('wheel', blockPageScroll)
      renderer.domElement.removeEventListener('wheel', blockPageScroll)
      controls.dispose()
      materials.forEach((m) => m.dispose())
      root.traverse((obj) => {
        const geom = (obj as { geometry?: { dispose?: () => void } }).geometry
        geom?.dispose?.()
      })
      renderer.dispose()
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement)
      }
    }
  }, [reduced, resolved])

  return (
    <div
      ref={hostRef}
      className={[styles.canvas, className].filter(Boolean).join(' ')}
      data-lenis-prevent
      data-lenis-prevent-wheel
      role="img"
      aria-label="Interactive X-ray wireframe of the desk workstation"
    />
  )
}
