import { site } from '@/data/site'
import { versionHistory } from '@/data/versionHistory'
import { useLocale } from '@/i18n/LocaleProvider'
import styles from './About.module.css'

export function AboutPage() {
  const { messages, t } = useLocale()

  const body = versionHistory
    .map((entry) => {
      const localized = messages.versions[entry.id]
      const title = localized?.title ?? entry.title
      const description = localized?.description ?? entry.description
      const head = entry.date ? `${title}  ${entry.date}` : title
      return `${head}\n${description}`
    })
    .join('\n\n')

  return (
    <div className={`page ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.kicker}>{messages.about.kicker}</div>
        <h1 className={styles.title}>{messages.about.title}</h1>
      </header>

      <div className={styles.grid}>
        <div className={styles.block}>
          <div className={styles.label}>{messages.about.statement}</div>
          <p className={styles.text}>
            <strong>
              {site.title} / {site.author}
            </strong>{' '}
            {messages.about.statementBody}
          </p>
          <p className={styles.text}>{messages.site.intro}</p>
        </div>

        <div className={styles.block}>
          <div className={styles.label}>{messages.about.structure}</div>
          <ul className={styles.list}>
            <li>
              <span>01 {messages.nav.home}</span>
              <span>{messages.about.homeDesc}</span>
            </li>
            <li>
              <span>02 {messages.nav.evolution}</span>
              <span>{messages.about.evolutionDesc}</span>
            </li>
            <li>
              <span>03 {messages.nav.gallery}</span>
              <span>{messages.about.galleryDesc}</span>
            </li>
            <li>
              <span>04 {messages.nav.about}</span>
              <span>{messages.about.aboutDesc}</span>
            </li>
            <li>
              <span>X-RAY</span>
              <span>{messages.about.xrayDesc}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.label}>{messages.about.privacy}</div>
        <p className={styles.text}>{messages.about.privacyBody}</p>
      </div>

      <section className={styles.versions} aria-label={messages.about.versionsAria}>
        <div className={styles.versionsBg} aria-hidden>
          <div className={styles.versionsGrid} />
          <div className={styles.versionsScan} />
        </div>
        <div className={styles.versionsInner}>
          <div className={styles.label}>
            {t(messages.about.versions, { version: site.version })}
          </div>
          <p className={styles.versionBody}>{body}</p>
        </div>
      </section>
    </div>
  )
}
