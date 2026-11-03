import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import type { MediaFile } from '@/types'
import styles from './BeforeAfter.module.css'

type Props = {
  before: MediaFile
  after: MediaFile
  aspect?: string
}

export function BeforeAfter({ before, after, aspect = '16 / 10' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = rootRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX)
  }

  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{ aspectRatio: aspect }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 3))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 3))
      }}
    >
      <div className={`${styles.layer} ${styles.before}`}>
        <ArchiveMedia media={before} aspect={aspect} showLabel={false} autoplay={false} />
      </div>
      <div
        className={`${styles.layer} ${styles.after}`}
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <ArchiveMedia media={after} aspect={aspect} showLabel={false} autoplay={false} />
      </div>
      <div className={styles.handle} style={{ left: `${pos}%` }}>
        <div className={styles.handleKnob}>⟷</div>
      </div>
      <div className={styles.labels}>
        <span>BEFORE</span>
        <span>AFTER</span>
      </div>
    </div>
  )
}
