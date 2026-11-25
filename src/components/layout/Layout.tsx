import { useEffect, useRef } from 'react'
import { Outlet, useLocation, matchPath } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageMeta } from './PageMeta'
import { Comments } from '@/components/shared/Comments'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { useLenis } from '@/hooks/useLenis'
import styles from './Layout.module.css'

export function Layout() {
  useLenis(true)
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstPath = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname === firstPath.current) return
    firstPath.current = location.pathname

    const lightboxOpen = Boolean(
      matchPath({ path: '/gallery/:setId', end: true }, location.pathname),
    )
    if (lightboxOpen) return

    mainRef.current?.focus({ preventScroll: true })
  }, [location.pathname])

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <PageMeta />
      <ScrollProgress />
      <Header />
      <main
        ref={mainRef}
        id="main-content"
        className={styles.main}
        tabIndex={-1}
      >
        <div key={location.pathname} className={styles.pageEnter}>
          <Outlet />
          <div className={styles.comments}>
            <Comments />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
