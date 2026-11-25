import { Timeline } from '@/components/evolution/Timeline'
import { useLocale } from '@/i18n/LocaleProvider'
import styles from './Evolution.module.css'

export function EvolutionPage() {
  const { messages } = useLocale()

  return (
    <div className={`page ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.kicker}>{messages.evolution.kicker}</div>
        <h1 className={styles.title}>{messages.evolution.title}</h1>
        <p className={styles.lead}>{messages.evolution.lead}</p>
      </header>
      <Timeline />
    </div>
  )
}
