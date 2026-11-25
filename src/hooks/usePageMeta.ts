import { useEffect } from 'react'
import { site } from '@/data/site'
import { absoluteUrl } from '@/utils/siteUrl'

export type PageMetaInput = {
  title?: string
  description?: string
  path?: string
  image?: string | null
  type?: 'website' | 'article'
}

function ensureMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function ensureLink(rel: string, href: string): void {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applyPageMeta(input: PageMetaInput): void {
  const title = input.title
    ? `${input.title} — ${site.title}`
    : `${site.title} / ${site.author}`
  const description =
    input.description?.trim() ||
    `${site.title} / ${site.author} — ${site.tagline}`
  const url = absoluteUrl(input.path || '/')
  const image = input.image ? absoluteUrl(input.image) : absoluteUrl('/favicon.svg')
  const type = input.type || 'website'

  document.title = title

  ensureMeta('name', 'description', description)
  ensureLink('canonical', url)

  ensureMeta('property', 'og:site_name', site.title)
  ensureMeta('property', 'og:title', title)
  ensureMeta('property', 'og:description', description)
  ensureMeta('property', 'og:url', url)
  ensureMeta('property', 'og:type', type)
  ensureMeta('property', 'og:image', image)

  ensureMeta('name', 'twitter:card', 'summary_large_image')
  ensureMeta('name', 'twitter:title', title)
  ensureMeta('name', 'twitter:description', description)
  ensureMeta('name', 'twitter:image', image)
  ensureMeta('name', 'application-name', site.title)
}

export function usePageMeta(input: PageMetaInput): void {
  useEffect(() => {
    applyPageMeta(input)
  }, [
    input.title,
    input.description,
    input.path,
    input.image,
    input.type,
  ])
}
