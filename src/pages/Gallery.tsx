import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import {
  GallerySort,
  type GallerySortOrder,
} from '@/components/gallery/GallerySort'
import { SetLightbox } from '@/components/shared/SetLightbox'
import { flattenMedia, getGallerySets, getSet, sortSetsChrono } from '@/data/sets'
import { padIndex } from '@/utils/assetUrl'
import styles from './Gallery.module.css'

export function GalleryPage() {
  const { setId } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [order, setOrder] = useState<GallerySortOrder>('asc')
  const sets = useMemo(
    () => sortSetsChrono(getGallerySets(), order),
    [order],
  )
  const mediaCount = useMemo(() => flattenMedia(sets).length, [sets])
  const openSet = setId ? getSet(setId) : undefined

  const frameRaw = searchParams.get('frame')
  const frameParsed =
    frameRaw != null && frameRaw !== '' ? Number.parseInt(frameRaw, 10) : null
  const startIndex =
    frameParsed != null && Number.isFinite(frameParsed) ? frameParsed : null

  useEffect(() => {
    if (!setId) return
    if (!openSet || openSet.awaiting) {
      navigate('/gallery', { replace: true })
    }
  }, [setId, openSet, navigate])

  const onFrameChange = (index: number | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (index == null) next.delete('frame')
        else next.set('frame', String(index))
        return next
      },
      { replace: true },
    )
  }

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

      {openSet && !openSet.awaiting && (
        <SetLightbox
          set={openSet}
          startIndex={startIndex}
          onFrameChange={onFrameChange}
          onClose={() => navigate('/gallery', { replace: true })}
        />
      )}
    </div>
  )
}
