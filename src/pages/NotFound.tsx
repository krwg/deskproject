import { Link } from 'react-router-dom'
import { site } from '@/data/site'
import { useLocale } from '@/i18n/LocaleProvider'
import styles from './NotFound.module.css'

export function NotFoundPage() {
  const { messages, t } = useLocale()

  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.kicker}>{messages.notFound.kicker}</div>
      <h1 className={styles.title}>{messages.notFound.title}</h1>
      <p className={styles.lead}>
        {t(messages.notFound.lead, { title: site.title })}
      </p>
      <nav className={styles.nav} aria-label={messages.notFound.recovery}>
        <Link className="btn" to="/">
          {messages.notFound.home}
        </Link>
        <Link className="btn" to="/gallery">
          {messages.notFound.gallery}
        </Link>
        <Link className="btn" to="/about">
          {messages.notFound.about}
        </Link>
      </nav>
    </div>
  )
}
