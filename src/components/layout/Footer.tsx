import { Link } from 'react-router-dom'
import { localizedNav } from '@/data/nav'
import { getGallerySets } from '@/data/sets'
import { site } from '@/data/site'
import { useLocale } from '@/i18n/LocaleProvider'
import { padIndex } from '@/utils/assetUrl'
import styles from './Footer.module.css'

export function Footer() {
  const { messages, t } = useLocale()
  const setCount = getGallerySets().length
  const items = localizedNav(messages)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.title}>
              {site.title} / {site.author}
            </div>
            <div className={styles.meta}>{messages.site.tagline}</div>
          </div>
          <nav className={styles.nav} aria-label="Footer">
            {items.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>
            {t(messages.footer.archiveLine, {
              from: site.archiveFrom,
              to: site.archiveTo,
              sets: padIndex(setCount),
              version: site.version,
            })}
          </span>
          <a href={site.authorUrl} target="_blank" rel="noreferrer">
            / {site.author}
          </a>
        </div>
      </div>
    </footer>
  )
}
