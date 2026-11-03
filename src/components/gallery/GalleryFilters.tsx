import { galleryCategoryLabels } from '@/data/site'
import type { GalleryCategory } from '@/types'
import styles from './GalleryFilters.module.css'

type Props = {
  categories: Array<GalleryCategory | 'all'>
  active: GalleryCategory | 'all'
  onChange: (value: GalleryCategory | 'all') => void
}

export function GalleryFilters({ categories, active, onChange }: Props) {
  return (
    <div className={styles.root} role="tablist" aria-label="Gallery categories">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={active === cat}
          className={[styles.chip, active === cat ? styles.active : '']
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChange(cat)}
        >
          {cat === 'all' ? 'ALL' : galleryCategoryLabels[cat]}
        </button>
      ))}
    </div>
  )
}
