
export const giscusConfig = {
  repo: import.meta.env.VITE_GISCUS_REPO as string | undefined,
  repoId: import.meta.env.VITE_GISCUS_REPO_ID as string | undefined,
  category: import.meta.env.VITE_GISCUS_CATEGORY as string | undefined,
  categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID as string | undefined,
  mapping: (import.meta.env.VITE_GISCUS_MAPPING as string) || 'pathname',
}

export function isGiscusConfigured(): boolean {
  return Boolean(
    giscusConfig.repo &&
      giscusConfig.repoId &&
      giscusConfig.category &&
      giscusConfig.categoryId,
  )
}
