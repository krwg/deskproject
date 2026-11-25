import { useMemo } from 'react'
import { useLocation, useMatch } from 'react-router-dom'
import { getSet } from '@/data/sets'
import { displaySetTitle } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import { usePageMeta, type PageMetaInput } from '@/hooks/usePageMeta'

export function PageMeta() {
  const { pathname } = useLocation()
  const match = useMatch({ path: 'gallery/:setId', end: true })
  const setId = match?.params.setId
  const { messages, t } = useLocale()

  const meta = useMemo((): PageMetaInput => {
    const clean = pathname.replace(/\/+$/, '') || '/'

    if (setId) {
      const set = getSet(setId)
      if (set && !set.awaiting) {
        const cover = set.main.thumbnail || set.main.src
        return {
          title: displaySetTitle(set.title, messages),
          description:
            set.caption?.trim() ||
            t(messages.meta.setDesc, { id: set.id }),
          path: `/gallery/${set.id}`,
          image: cover,
          type: 'article',
        }
      }
    }

    if (clean === '/' || clean.endsWith('/deskproject')) {
      return {
        title: undefined,
        description: messages.meta.homeDesc,
        path: '/',
        image: null,
      }
    }
    if (clean.endsWith('/evolution')) {
      return {
        title: messages.meta.evolutionTitle,
        description: messages.meta.evolutionDesc,
        path: '/evolution',
      }
    }
    if (clean.endsWith('/gallery')) {
      return {
        title: messages.meta.galleryTitle,
        description: messages.meta.galleryDesc,
        path: '/gallery',
      }
    }
    if (clean.endsWith('/about')) {
      return {
        title: messages.meta.aboutTitle,
        description: messages.meta.aboutDesc,
        path: '/about',
      }
    }

    return {
      title: messages.meta.notFoundTitle,
      description: messages.meta.notFoundDesc,
      path: clean.startsWith('/') ? clean : `/${clean}`,
    }
  }, [pathname, setId, messages, t])

  usePageMeta(meta)
  return null
}
