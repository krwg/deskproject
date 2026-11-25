import { useLocale } from '@/i18n/LocaleProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './Intro.module.css'

export function Intro() {
  const ref = useScrollReveal<HTMLElement>()
  const { messages } = useLocale()

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className={styles.layout}>
        <div className={styles.kicker}>{messages.home.projectNote}</div>
        <p className={styles.text}>{messages.site.intro}</p>
      </div>
    </section>
  )
}
