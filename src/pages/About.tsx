import { site } from '@/data/site'
import { versionHistory } from '@/data/versionHistory'
import styles from './About.module.css'

export function AboutPage() {
  const body = versionHistory
    .map((entry) => {
      const head = entry.date ? `${entry.title}  ${entry.date}` : entry.title
      return `${head}\n${entry.description}`
    })
    .join('\n\n')

  return (
    <div className={`page ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.kicker}>ABOUT</div>
        <h1 className={styles.title}>PROJECT INFO</h1>
      </header>

      <div className={styles.grid}>
        <div className={styles.block}>
          <div className={styles.label}>STATEMENT</div>
          <p className={styles.text}>
            <strong>
              {site.title} / {site.author}
            </strong>{' '}
            is a digital archive of personal workspace evolution — photographs
            and interactive documentation presented as a technical museum.
          </p>
          <p className={styles.text}>{site.intro}</p>
        </div>

        <div className={styles.block}>
          <div className={styles.label}>ARCHIVE STRUCTURE</div>
          <ul className={styles.list}>
            <li>
              <span>01 HOME</span>
              <span>Current setup</span>
            </li>
            <li>
              <span>02 EVOLUTION</span>
              <span>Timeline</span>
            </li>
            <li>
              <span>03 GALLERY</span>
              <span>Photo archive</span>
            </li>
            <li>
              <span>04 ABOUT</span>
              <span>Info & notes</span>
            </li>
            <li>
              <span>X-RAY</span>
              <span>Spatial desk on Home</span>
            </li>
          </ul>
        </div>
      </div>

      <section className={styles.versions} aria-label="Version history">
        <div className={styles.versionsBg} aria-hidden>
          <div className={styles.versionsGrid} />
          <div className={styles.versionsScan} />
        </div>
        <div className={styles.versionsInner}>
          <div className={styles.label}>
            VERSION HISTORY [{site.version}]
          </div>
          <p className={styles.versionBody}>{body}</p>
        </div>
      </section>
    </div>
  )
}
