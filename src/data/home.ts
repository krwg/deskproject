import { getSet, getHeroSet } from '@/data/sets'
import homeManifest from './home.manifest.json'

type HomeManifest = {
  generatedAt: string | null
  src: string | null
  thumbnail: string | null
}

export type HomeBackgroundSlide = {
  id: string
  src: string
  thumbnail: string
}

const disk = homeManifest as HomeManifest

/** Hero plate slideshow — set covers under the title. */
const HERO_BG_SET_IDS = ['38', '41', '42', '23', '19'] as const

export function getHomeBackgroundSlides(): HomeBackgroundSlide[] {
  const fromSets: HomeBackgroundSlide[] = []
  for (const id of HERO_BG_SET_IDS) {
    const set = getSet(id)
    if (!set || set.awaiting) continue
    fromSets.push({
      id,
      src: set.main.src,
      thumbnail: set.main.thumbnail || set.main.src,
    })
  }

  if (fromSets.length > 0) return fromSets

  if (disk.src) {
    return [
      {
        id: 'manifest',
        src: disk.src,
        thumbnail: disk.thumbnail || disk.src,
      },
    ]
  }

  const hero = getHeroSet()
  if (!hero || hero.awaiting) return []
  return [
    {
      id: hero.id,
      src: hero.main.src,
      thumbnail: hero.main.thumbnail || hero.main.src,
    },
  ]
}

/** @deprecated Prefer getHomeBackgroundSlides — kept for callers expecting one frame. */
export function getHomeBackground(): { src: string; thumbnail: string } | null {
  return getHomeBackgroundSlides()[0] ?? null
}
