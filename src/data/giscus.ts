/** Public giscus IDs — baked in so GitHub Pages builds work without secrets. */
const defaults = {
  repo: 'krwg/deskproject',
  repoId: 'R_kgDOVgrd7A',
  category: 'General',
  categoryId: 'DIC_kwDOVgrd7M4DKQcR',
  mapping: 'pathname',
} as const

export const giscusConfig = {
  repo: (import.meta.env.VITE_GISCUS_REPO as string | undefined) || defaults.repo,
  repoId:
    (import.meta.env.VITE_GISCUS_REPO_ID as string | undefined) || defaults.repoId,
  category:
    (import.meta.env.VITE_GISCUS_CATEGORY as string | undefined) || defaults.category,
  categoryId:
    (import.meta.env.VITE_GISCUS_CATEGORY_ID as string | undefined) ||
    defaults.categoryId,
  mapping:
    (import.meta.env.VITE_GISCUS_MAPPING as string | undefined) || defaults.mapping,
}

export function isGiscusConfigured(): boolean {
  return Boolean(
    giscusConfig.repo &&
      giscusConfig.repoId &&
      giscusConfig.category &&
      giscusConfig.categoryId,
  )
}
