import { useMemo } from 'react'
import { useLocation, useMatch } from 'react-router-dom'
import { getSet } from '@/data/sets'
import { site } from '@/data/site'
import { usePageMeta, type PageMetaInput } from '@/hooks/usePageMeta'

function metaForPath(pathname: string, setId?: string): PageMetaInput {
  const clean = pathname.replace(/\/+$/, '') || '/'

  if (setId) {
    const set = getSet(setId)
    if (set && !set.awaiting) {
      const cover = set.main.thumbnail || set.main.src
      return {
        title: set.title,
        description:
          set.caption?.trim() ||
          `Set ${set.id} in the ${site.title} photographic archive.`,
        path: `/gallery/${set.id}`,
        image: cover,
        type: 'article',
      }
    }
  }

  if (clean === '/' || clean.endsWith('/deskproject')) {
    return {
      title: undefined,
      description: `${site.tagline} Photographs, timeline, and interactive desk documentation.`,
      path: '/',
      image: null,
    }
  }
  if (clean.endsWith('/evolution')) {
    return {
      title: 'Evolution',
      description:
        'Chronological timeline of workspace changes — setups, gear, and layout shifts.',
      path: '/evolution',
    }
  }
  if (clean.endsWith('/gallery')) {
    return {
      title: 'Gallery',
      description:
        'Photographic archive of desk setups. Open a set for clarifying frames and short loops.',
      path: '/gallery',
    }
  }
  if (clean.endsWith('/about')) {
    return {
      title: 'About',
      description: `Project info, version history, and notes for ${site.title} / ${site.author}.`,
      path: '/about',
    }
  }

  return {
    title: 'Not found',
    description: `This path is not part of the ${site.title} archive.`,
    path: clean.startsWith('/') ? clean : `/${clean}`,
  }
}

export function PageMeta() {
  const { pathname } = useLocation()
  const match = useMatch({ path: 'gallery/:setId', end: true })
  const setId = match?.params.setId

  const meta = useMemo(
    () => metaForPath(pathname, setId),
    [pathname, setId],
  )

  usePageMeta(meta)
  return null
}
