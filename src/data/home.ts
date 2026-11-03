import { getSet, getHeroSet } from '@/data/sets'
import homeManifest from './home.manifest.json'

type HomeManifest = {
  generatedAt: string | null
  src: string | null
  thumbnail: string | null
}

const disk = homeManifest as HomeManifest

const HOME_BG_SET_ID = '42'

export function getHomeBackground(): { src: string; thumbnail: string } | null {
  if (disk.src) {
    return {
      src: disk.src,
      thumbnail: disk.thumbnail || disk.src,
    }
  }

  const preferred = getSet(HOME_BG_SET_ID)
  if (preferred && !preferred.awaiting) {
    return {
      src: preferred.main.src,
      thumbnail: preferred.main.thumbnail || preferred.main.src,
    }
  }

  const hero = getHeroSet()
  if (!hero || hero.awaiting) return null
  return {
    src: hero.main.src,
    thumbnail: hero.main.thumbnail || hero.main.src,
  }
}
