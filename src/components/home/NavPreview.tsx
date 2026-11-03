import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './NavPreview.module.css'

const previews = [
  {
    index: '02',
    path: '/evolution',
    title: 'EVOLUTION',
    description:
      'Interactive horizontal timeline of the workspace as it changed over time.',
  },
  {
    index: '03',
    path: '/gallery',
    title: 'GALLERY',
    description:
      'Photographic archive with category filters and fullscreen inspection.',
  },
  {
    index: '04',
    path: '/about',
    title: 'ABOUT',
    description: 'Project statement, version history, and field notes.',
  },
] as const

export function NavPreview() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className="section-label">
        <span className="section-label__index">04</span>
        <h2 className="section-label__title">CONTINUE EXPLORING</h2>
      </div>

      <div className={styles.list}>
        {previews.map((item) => (
          <Link key={item.path} to={item.path} className={styles.item}>
            <span className={styles.index}>{item.index}</span>
            <div>
              <div className={styles.title}>{item.title}</div>
              <p className={styles.desc}>{item.description}</p>
            </div>
            <span className={styles.cta}>OPEN →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
