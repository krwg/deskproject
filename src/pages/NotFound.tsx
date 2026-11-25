import { Link } from 'react-router-dom'
import { site } from '@/data/site'
import styles from './NotFound.module.css'

export function NotFoundPage() {
  return (
    <div className={`page ${styles.page}`}>
      <div className={styles.kicker}>404</div>
      <h1 className={styles.title}>Path not in the archive</h1>
      <p className={styles.lead}>
        This URL is not part of {site.title}. The specimen may have moved, or
        the link is incomplete.
      </p>
      <nav className={styles.nav} aria-label="Recovery">
        <Link className="btn" to="/">
          Home
        </Link>
        <Link className="btn" to="/gallery">
          Gallery
        </Link>
        <Link className="btn" to="/about">
          About
        </Link>
      </nav>
    </div>
  )
}
