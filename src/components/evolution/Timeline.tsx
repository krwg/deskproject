import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { gsap } from 'gsap'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import { SetLightbox } from '@/components/shared/SetLightbox'
import { evolutionEntries } from '@/data/evolution'
import { getSet } from '@/data/sets'
import type { MediaSet } from '@/types'
import { padIndex } from '@/utils/assetUrl'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './Timeline.module.css'

function isInteractiveTarget(target: EventTarget | null) {
  return Boolean(
    target instanceof Element &&
      target.closest('button, a, input, textarea, [data-no-drag]'),
  )
}

export function Timeline() {
  const entries = evolutionEntries
  const [index, setIndex] = useState(0)
  const [openSet, setOpenSet] = useState<MediaSet | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const drag = useRef({ active: false, x: 0, left: 0 })

  const openEntry = useCallback(
    (i: number) => {
      const entry = entries[i]
      if (!entry) return
      const set = getSet(entry.setId)
      setIndex(i)
      if (set && !set.awaiting) {
        setOpenSet(set)
      }
    },
    [entries],
  )

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(entries.length - 1, Math.max(0, next))
      setIndex(clamped)
      const scroller = scrollerRef.current
      const col = scroller?.querySelectorAll<HTMLElement>(`.${styles.column}`)[
        clamped
      ]
      col?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    },
    [entries.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openSet) return
      if (e.key === 'ArrowLeft') go(index - 1)
      if (e.key === 'ArrowRight') go(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, openSet])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reduced) return
    const tween = gsap.to(grid, {
      backgroundPosition: '56px 0',
      duration: 18,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [reduced])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if (isInteractiveTarget(e.target)) return
    const el = scrollerRef.current
    if (!el) return
    drag.current = { active: true, x: e.clientX, left: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el || !drag.current.active) return
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    drag.current.active = false
    try {
      el?.releasePointerCapture(e.pointerId)
    } catch {
      
    }
  }

  return (
    <div className={styles.root}>
      <div ref={gridRef} className={styles.bgGrid} aria-hidden />
      <div className={styles.scan} aria-hidden />

      <div
        ref={scrollerRef}
        className={styles.scroller}
        data-lenis-prevent
        data-lenis-prevent-wheel
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.track}>
          <div className={styles.axis} aria-hidden />

          {entries.map((entry, i) => {
            const set = getSet(entry.setId)
            const label = `SET ${padIndex(Number(entry.label) || i + 1, 2)}`
            const above = entry.lane === 'above'

            return (
              <div key={entry.id} className={styles.column}>
                <div
                  className={[
                    styles.connector,
                    above ? styles.connectorAbove : styles.connectorBelow,
                  ].join(' ')}
                  aria-hidden
                />

                <article
                  className={[
                    styles.card,
                    above ? styles.cardAbove : styles.cardBelow,
                  ].join(' ')}
                  data-active={i === index}
                >
                  <button
                    type="button"
                    className={styles.cardThumb}
                    data-no-drag
                    aria-label={`Open ${label}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      openEntry(i)
                    }}
                  >
                    <ArchiveMedia
                      media={set?.main}
                      aspect="1 / 1"
                      showLabel={false}
                      autoplay={false}
                      mono
                      labelId={set?.folder}
                      sizes="72px"
                    />
                  </button>

                  <div className={styles.cardBody}>
                    <span className={styles.year}>{label}</span>
                    <button
                      type="button"
                      className={styles.openBtn}
                      data-no-drag
                      onClick={(e) => {
                        e.stopPropagation()
                        openEntry(i)
                      }}
                    >
                      OPEN SET →
                    </button>
                  </div>
                </article>

                <button
                  type="button"
                  className={styles.nodeBtn}
                  data-active={i === index}
                  onClick={() => go(i)}
                  aria-label={`Go to ${label}`}
                >
                  <span className={styles.dot} />
                  <span className={styles.nodeLabel}>
                    {padIndex(Number(entry.label) || i + 1, 2)}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.controls} aria-label="Timeline navigation">
        <button
          type="button"
          aria-label="Previous"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={index === entries.length - 1}
          onClick={() => go(index + 1)}
        >
          ›
        </button>
      </div>

      <div className={styles.hint}>
        ENTRY {padIndex(index + 1, 2)} / {padIndex(entries.length, 2)} / DRAG /
        SWIPE
      </div>

      {openSet && (
        <SetLightbox set={openSet} onClose={() => setOpenSet(null)} />
      )}
    </div>
  )
}
