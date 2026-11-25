import { Link } from 'react-router-dom'
import { useLocale } from '@/i18n/LocaleProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './NavPreview.module.css'

export function NavPreview() {
  const ref = useScrollReveal<HTMLElement>()
  const { messages } = useLocale()

  const previews = [
    {
      index: '02',
      path: '/evolution',
      title: messages.nav.evolution,
      description: messages.home.previewEvolution,
    },
    {
      index: '03',
      path: '/gallery',
      title: messages.nav.gallery,
      description: messages.home.previewGallery,
    },
    {
      index: '04',
      path: '/about',
      title: messages.nav.about,
      description: messages.home.previewAbout,
    },
  ] as const

  return (
    <section ref={ref} className={`page page-section ${styles.section}`}>
      <div className="section-label">
        <span className="section-label__index">04</span>
        <h2 className="section-label__title">{messages.home.continueExploring}</h2>
      </div>

      <div className={styles.list}>
        {previews.map((item) => (
          <Link key={item.path} to={item.path} className={styles.item}>
            <span className={styles.index}>{item.index}</span>
            <div>
              <div className={styles.title}>{item.title}</div>
              <p className={styles.desc}>{item.description}</p>
            </div>
            <span className={styles.cta}>{messages.home.openCta}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
