import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { useLenis } from '@/hooks/useLenis'
import styles from './Layout.module.css'

export function Layout() {
  useLenis(true)
  const location = useLocation()

  return (
    <div className={styles.shell}>
      <ScrollProgress />
      <Header />
      <main className={styles.main}>
        <div key={location.pathname} className={styles.pageEnter}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
