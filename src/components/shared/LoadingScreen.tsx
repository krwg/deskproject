import { useEffect, useMemo, useState } from 'react'
import { getHeroSet } from '@/data/sets'
import { assetUrl } from '@/utils/assetUrl'
import styles from './LoadingScreen.module.css'

const SESSION_KEY = 'tdp-archive-initialized'

type Props = {
  onComplete: () => void
}

const PHASES = [
  'INDEXING SETS...',
  'INITIALIZING INTERFACE...',
  'PREPARING ARCHIVE...',
] as const

async function loadCritical(): Promise<void> {
  const tasks: Promise<unknown>[] = []

  if (document.fonts?.ready) {
    tasks.push(document.fonts.ready)
  }

  const hero = getHeroSet()
  if (hero && !hero.main.awaiting) {
    tasks.push(
      new Promise<void>((resolve) => {
        if (hero.main.kind === 'video') {
          const video = document.createElement('video')
          video.preload = 'metadata'
          video.onloadedmetadata = () => resolve()
          video.onerror = () => resolve()
          video.src = assetUrl(hero.main.src)
        } else {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = assetUrl(hero.main.thumbnail || hero.main.src)
        }
      }),
    )
  } else {
    tasks.push(Promise.resolve())
  }

  await Promise.all(tasks)
}

export function LoadingScreen({ onComplete }: Props) {
  const skip = useMemo(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  }, [])

  const [progress, setProgress] = useState(skip ? 100 : 0)
  const [done, setDone] = useState(skip)
  const [phaseIdx, setPhaseIdx] = useState(0)

  useEffect(() => {
    if (skip) {
      onComplete()
      return
    }

    let cancelled = false
    let raf = 0

    const run = async () => {
      const start = performance.now()
      const minVisible = 480

      const tick = () => {
        if (cancelled) return
        setProgress((p) => (p >= 90 ? p : Math.min(90, p + 2.5)))
        setPhaseIdx((i) => (i + 1) % PHASES.length)
        raf = window.setTimeout(tick, 220)
      }
      tick()

      await loadCritical()
      if (cancelled) return

      window.clearTimeout(raf)
      setProgress(100)
      setPhaseIdx(PHASES.length - 1)

      const elapsed = performance.now() - start
      await new Promise((r) => setTimeout(r, Math.max(0, minVisible - elapsed)))
      if (cancelled) return

      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        
      }
      setDone(true)
      onComplete()
    }

    void run()

    return () => {
      cancelled = true
      window.clearTimeout(raf)
    }
  }, [skip, onComplete])

  if (skip && done) return null

  return (
    <div
      className={styles.root}
      data-done={done}
      role="status"
      aria-live="polite"
      aria-busy={!done}
    >
      <div className={styles.panel}>
        <div className={styles.brand}>
          <div className={styles.title}>THE DESK PROJECT / krwg</div>
          <div className={styles.author}>INITIALIZING ARCHIVE</div>
        </div>

        <div className={styles.status}>LOADING ARCHIVE</div>

        <div className={styles.barTrack} aria-hidden>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.row}>
          <span className={styles.phase}>{PHASES[phaseIdx]}</span>
          <span className={styles.pct}>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}
