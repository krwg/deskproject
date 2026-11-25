import { lazy, Suspense, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { giscusConfig, isGiscusConfigured } from '@/data/giscus'
import { useInView } from '@/hooks/useInView'
import { useLocale } from '@/i18n/LocaleProvider'
import { useTheme } from '@/hooks/useTheme'
import styles from './Comments.module.css'

const Giscus = lazy(() => import('@giscus/react'))

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
  const { locale, messages } = useLocale()
  const term = pageDiscussionTerm(pathname)
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: '240px 0px',
    once: true,
  })

  const themeHref = useMemo(() => {
    if (typeof window === 'undefined') return 'noborder_dark'
    const file = resolved === 'light' ? 'giscus-theme-light.css' : 'giscus-theme.css'
    return `${window.location.origin}${import.meta.env.BASE_URL}${file}`.replace(
      /([^:]\/)\/+/g,
      '$1',
    )
  }, [resolved])

  return (
    <section ref={ref} className={styles.section} aria-label={messages.comments.aria}>
      <div className={styles.head}>
        <div className={styles.kicker}>{messages.comments.kicker}</div>
        <h2 className={styles.title}>{messages.comments.title}</h2>
        <p className={styles.lead}>{messages.comments.lead}</p>
      </div>

      {isGiscusConfigured() ? (
        inView ? (
          <div className={styles.frame}>
            <Suspense
              fallback={
                <div className={styles.pending}>{messages.comments.loading}</div>
              }
            >
              <Giscus
                key={`${term}:${themeHref}:${locale}`}
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
                lang={locale}
                loading="lazy"
              />
            </Suspense>
          </div>
        ) : (
          <div className={styles.pending} aria-hidden>
            {messages.comments.deferred}
          </div>
        )
      ) : (
        <div className={styles.pending}>
          <div className={styles.pendingLabel}>{messages.comments.notConfigured}</div>
          <p>{messages.comments.notConfiguredBody}</p>
        </div>
      )}
    </section>
  )
}
