import { lazy, Suspense } from 'react'
import { useLocale } from '@/i18n/LocaleProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './XRayDesk.module.css'

const XRayCanvas = lazy(() =>
  import('./xray/XRayCanvas').then((m) => ({ default: m.XRayCanvas })),
)

export function XRayDesk() {
  const ref = useScrollReveal<HTMLElement>()
  const { messages } = useLocale()

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className="section-label">
        <span className="section-label__index">03</span>
        <h2 className="section-label__title">{messages.home.xrayTitle}</h2>
      </div>

      <div className={styles.stage}>
        <div
          className={styles.viewport}
          data-lenis-prevent
          data-lenis-prevent-wheel
        >
          <Suspense fallback={<div className={styles.fallback}>{messages.home.xrayLoading}</div>}>
            <XRayCanvas />
          </Suspense>
          <div className={styles.scan} aria-hidden />
          <div className={styles.vignette} aria-hidden />
          <span className={styles.badge}>{messages.home.xrayBadge}</span>
        </div>

        <aside className={styles.side}>
          <div className={styles.sideLabel}>{messages.home.xrayNote}</div>
          <p className={styles.blurb}>{messages.home.xrayBlurb}</p>
        </aside>
      </div>
    </section>
  )
}
