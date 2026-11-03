import { lazy, Suspense } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './XRayDesk.module.css'

const XRayCanvas = lazy(() =>
  import('./xray/XRayCanvas').then((m) => ({ default: m.XRayCanvas })),
)

export function XRayDesk() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className="section-label">
        <span className="section-label__index">03</span>
        <h2 className="section-label__title">X-RAY</h2>
      </div>

      <div className={styles.stage}>
        <div
          className={styles.viewport}
          data-lenis-prevent
          data-lenis-prevent-wheel
        >
          <Suspense fallback={<div className={styles.fallback}>LOADING…</div>}>
            <XRayCanvas />
          </Suspense>
          <div className={styles.scan} aria-hidden />
          <div className={styles.vignette} aria-hidden />
          <span className={styles.badge}>LIVE WEBGL</span>
        </div>

        <aside className={styles.side}>
          <div className={styles.sideLabel}>NOTE</div>
          <p className={styles.blurb}>
            Measured desk schematic in X-ray wireframe. Drag to orbit, scroll to
            zoom — page scroll stays locked while the pointer is over the plate.
          </p>
        </aside>
      </div>
    </section>
  )
}
