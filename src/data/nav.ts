import type { Messages } from '@/i18n'
import { navItems as baseNav } from '@/data/site'

export function localizedNav(messages: Messages) {
  return baseNav.map((item) => ({
    ...item,
    label:
      item.path === '/'
        ? messages.nav.home
        : item.path === '/evolution'
          ? messages.nav.evolution
          : item.path === '/gallery'
            ? messages.nav.gallery
            : messages.nav.about,
  }))
}
