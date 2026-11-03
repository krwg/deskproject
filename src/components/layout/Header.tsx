import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navItems, site } from '@/data/site'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandTitle} aria-label={`${site.title} home`}>
            {site.title}
          </Link>
          <a
            className={styles.brandAuthor}
            href={site.authorUrl}
            target="_blank"
            rel="noreferrer"
          >
            / {site.author}
          </a>
        </div>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className={styles.mobilePanel} aria-label="Mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [styles.mobileLink, isActive ? styles.mobileActive : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <span>{item.label}</span>
              <span>{item.index}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
