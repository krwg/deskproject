import { useMemo, useState } from 'react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import {
  GallerySort,
  type GallerySortOrder,
} from '@/components/gallery/GallerySort'
import { flattenMedia, getGallerySets, sortSetsChrono } from '@/data/sets'
import { padIndex } from '@/utils/assetUrl'
import styles from './Gallery.module.css'

export function GalleryPage() {
  const [order, setOrder] = useState<GallerySortOrder>('asc')
  const sets = useMemo(
    () => sortSetsChrono(getGallerySets(), order),
    [order],
  )
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
        </header>

        <div className={styles.metaRow}>
          <div className={styles.count}>
            SETS {padIndex(sets.length)} / MEDIA {padIndex(mediaCount)}
          </div>
          <GallerySort value={order} onChange={setOrder} />
        </div>
      </div>

      <div className={styles.bridge} aria-hidden />

      <GalleryGrid sets={sets} />
    </div>
  )
}
