import { Link } from 'react-router-dom'
import { navItems, site } from '@/data/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.title}>
              {site.title} / {site.author}
            </div>
            <div className={styles.meta}>{site.tagline}</div>
          </div>
          <nav className={styles.nav} aria-label="Footer">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span>VERSION [{site.version}]</span>
          <a href={site.authorUrl} target="_blank" rel="noreferrer">
            / {site.author}
          </a>
        </div>
      </div>
    </footer>
  )
}
