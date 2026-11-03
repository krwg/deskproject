import { useMemo } from 'react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { flattenMedia, getGallerySets } from '@/data/sets'
import { padIndex } from '@/utils/assetUrl'
import styles from './Gallery.module.css'

export function GalleryPage() {
  const sets = useMemo(() => getGallerySets(), [])
  const mediaCount = useMemo(() => flattenMedia(sets).length, [sets])

  return (
    <div className={styles.page}>
      <div className={styles.rail}>
        <header className={styles.header}>
          <div className={styles.kicker}>GALLERY</div>
          <h1 className={styles.title}>PHOTOGRAPHIC ARCHIVE</h1>
          <p className={styles.lead}>
            Covers only. Click a set to open clarifying frames and short loops —
            each folder is one specimen in the chronological hall.
          </p>
          <div className={styles.count}>
            SETS {padIndex(sets.length)} / MEDIA {padIndex(mediaCount)}
          </div>
        </header>
      </div>

      <div className={styles.bridge} aria-hidden />

      <GalleryGrid sets={sets} />
    </div>
  )
}
