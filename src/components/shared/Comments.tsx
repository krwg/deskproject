import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Giscus from '@giscus/react'
import { giscusConfig, isGiscusConfigured } from '@/data/giscus'
import { useTheme } from '@/hooks/useTheme'
import styles from './Comments.module.css'

function pageDiscussionTerm(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/' || clean.endsWith('/deskproject')) return 'page-home'
  if (clean.endsWith('/evolution')) return 'page-evolution'
  if (clean.endsWith('/gallery')) return 'page-gallery'
  if (clean.endsWith('/about')) return 'page-about'
  return `page-${clean.split('/').filter(Boolean).pop() || 'unknown'}`
}

export function Comments() {
  const { pathname } = useLocation()
  const { resolved } = useTheme()
  const term = pageDiscussionTerm(pathname)

  const themeHref = useMemo(() => {
    if (typeof window === 'undefined') return 'noborder_dark'
    const file = resolved === 'light' ? 'giscus-theme-light.css' : 'giscus-theme.css'
    return `${window.location.origin}${import.meta.env.BASE_URL}${file}`.replace(
      /([^:]\/)\/+/g,
      '$1',
    )
  }, [resolved])

  return (
    <section className={styles.section} aria-label="Archive comments">
      <div className={styles.head}>
        <div className={styles.kicker}>FIELD NOTES</div>
        <h2 className={styles.title}>COMMENTS</h2>
        <p className={styles.lead}>
          Public log via GitHub Discussions — one thread per page. Sign in with
          GitHub to leave a note.
        </p>
      </div>

      {isGiscusConfigured() ? (
        <div className={styles.frame}>
          <Giscus
            key={`${term}:${themeHref}`}
            id={`desk-giscus-${term}`}
            repo={giscusConfig.repo as `${string}/${string}`}
            repoId={giscusConfig.repoId!}
            category={giscusConfig.category!}
            categoryId={giscusConfig.categoryId!}
            mapping="specific"
            term={term}
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={themeHref}
            lang="en"
            loading="lazy"
          />
        </div>
      ) : (
        <div className={styles.pending}>
          <div className={styles.pendingLabel}>GISCUS NOT CONFIGURED</div>
          <p>
            Add <code>VITE_GISCUS_REPO</code>, <code>VITE_GISCUS_REPO_ID</code>,{' '}
            <code>VITE_GISCUS_CATEGORY</code>, <code>VITE_GISCUS_CATEGORY_ID</code>{' '}
            from <a href="https://giscus.app">giscus.app</a> to enable comments.
          </p>
        </div>
      )}
    </section>
  )
}
