import { Timeline } from '@/components/evolution/Timeline'
import styles from './Evolution.module.css'

export function EvolutionPage() {
  return (
    <div className={`page ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.kicker}>EVOLUTION</div>
        <h1 className={styles.title}>WORKSPACE TIMELINE</h1>
        <p className={styles.lead}>
          Horizontal museum timeline. Cards sit above and below the axis —
          open a set from the cover or OPEN SET.
        </p>
      </header>
      <Timeline />
    </div>
  )
}
