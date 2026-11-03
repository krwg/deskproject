import { site } from '@/data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './Intro.module.css'

export function Intro() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className={styles.layout}>
        <div className={styles.kicker}>PROJECT NOTE / 02</div>
        <p className={styles.text}>{site.intro}</p>
      </div>
    </section>
  )
}
