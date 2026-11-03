import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { startLenis, stopLenis } from '@/animations/lenisBridge'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import { getSetMedia } from '@/data/sets'
import type { MediaSet } from '@/types'
import { padIndex } from '@/utils/assetUrl'
import styles from './SetLightbox.module.css'

type Props = {
  set: MediaSet
  onClose: () => void
  
  startIndex?: number | null
}

type Mode = 'grid' | 'viewer'

export function SetLightbox({ set, onClose, startIndex = null }: Props) {
  const media = useMemo(() => getSetMedia(set), [set])
  const [mode, setMode] = useState<Mode>(
    startIndex != null ? 'viewer' : 'grid',
  )
  const [index, setIndex] = useState(startIndex ?? 0)
  const touchX = useRef<number | null>(null)
  const current = media[index]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopLenis()

    return () => {
      document.body.style.overflow = prev
      startLenis()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mode === 'viewer') {
          setMode('grid')
          return
        }
        onClose()
        return
      }
      if (mode !== 'viewer') return
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight')
        setIndex((i) => Math.min(media.length - 1, i + 1))
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [media.length, mode, onClose])

  const openViewer = (i: number) => {
    setIndex(i)
    setMode('viewer')
  }

  const ui = (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={set.title}
      data-lenis-prevent
      data-lenis-prevent-wheel
    >
      <div className={styles.top}>
        <span>
          SET {set.folder}
          {mode === 'viewer'
            ? ` / ${padIndex(index + 1)} / ${padIndex(media.length)}`
            : ` / ${padIndex(media.length)} MEDIA`}
        </span>
        <div className={styles.topActions}>
          {mode === 'viewer' && (
            <button
              type="button"
              className={styles.back}
              onClick={() => setMode('grid')}
            >
              ← GALLERY
            </button>
          )}
          <button type="button" className={styles.close} onClick={onClose}>
            CLOSE / ESC
          </button>
        </div>
      </div>

      {mode === 'grid' ? (
        <div className={styles.gridWrap} data-lenis-prevent data-lenis-prevent-wheel>
          <div className={styles.gridMeta}>
            <span className={styles.gridTitle}>{set.title}</span>
            <span>SET {set.folder}</span>
          </div>

          <div className={styles.grid}>
            {media.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={styles.cell}
                onClick={() => openViewer(i)}
              >
                <ArchiveMedia
                  media={item}
                  aspect={i === 0 ? set.aspect || '16 / 10' : '1 / 1'}
                  showLabel={false}
                  autoplay={false}
                  sizes="(max-width: 720px) 50vw, 25vw"
                  labelId={item.id}
                />
                <div className={styles.cellMeta}>
                  <span>{i === 0 ? 'COVER' : `IMG ${padIndex(i)}`}</span>
                  <span>{item.kind === 'video' ? 'VIDEO' : 'PHOTO'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : current ? (
        <div
          className={styles.viewer}
          onTouchStart={(e) => {
            touchX.current = e.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
            touchX.current = null
            if (Math.abs(dx) < 48) return
            if (dx < 0) setIndex((i) => Math.min(media.length - 1, i + 1))
            else setIndex((i) => Math.max(0, i - 1))
          }}
        >
          <div className={styles.stage}>
            <div className={styles.frame}>
              <ArchiveMedia
                media={current}
                aspect="auto"
                eager
                autoplay
                sizes="100vw"
                showLabel={false}
                labelId={current.id}
              />
            </div>
            <div className={styles.nav}>
              <button
                type="button"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => setIndex((i) => i - 1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                disabled={index === media.length - 1}
                onClick={() => setIndex((i) => i + 1)}
              >
                →
              </button>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.meta}>
              <span>
                {index === 0 ? 'COVER' : `IMG ${padIndex(index)}`}
                {current.kind === 'video' ? ' / LOOP' : ''}
              </span>
              <span className={styles.caption}>{set.title}</span>
            </div>
            {media.length > 1 && (
              <div className={styles.thumbs} aria-label="Frames">
                {media.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      styles.thumb,
                      i === index ? styles.thumbActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setIndex(i)}
                    aria-label={`Open ${i + 1}`}
                  >
                    <ArchiveMedia
                      media={item}
                      aspect="1 / 1"
                      showLabel={false}
                      autoplay={false}
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )

  return createPortal(ui, document.body)
}
