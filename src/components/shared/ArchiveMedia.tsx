import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { ImageTone, MediaFile } from '@/types'
import { toneToCssVars } from '@/data/tones'
import { assetUrl } from '@/utils/assetUrl'
import { useInView } from '@/hooks/useInView'
import styles from './ArchiveMedia.module.css'

const VIDEO_LOOP_SEC = 5

type Props = {
  media?: MediaFile | null
  alt?: string
  className?: string
  aspect?: string
  eager?: boolean
  sizes?: string
  onClick?: () => void
  showLabel?: boolean
  
  autoplay?: boolean
  labelId?: string
  
  mono?: boolean
  
  fill?: boolean
  
  tone?: ImageTone | null
}

export function ArchiveMedia({
  media,
  alt,
  className,
  aspect = '16 / 10' as string,
  eager = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  onClick,
  showLabel = true,
  autoplay = true,
  labelId,
  mono = false,
  fill = false,
  tone = null,
}: Props) {
  const [failed, setFailed] = useState(false)
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: '280px 0px',
    once: true,
  })
  const videoRef = useRef<HTMLVideoElement>(null)
  const awaiting = !media || media.awaiting || failed
  const shouldLoad = eager || inView
  const loopSec = media?.durationSec && media.durationSec > 0
    ? Math.min(media.durationSec, VIDEO_LOOP_SEC)
    : VIDEO_LOOP_SEC
  const imageThumb: string | null =
    media?.thumbnail &&
    /\.(webp|jpe?g|png|gif|avif)$/i.test(media.thumbnail)
      ? media.thumbnail
      : null
  // Lightbox/grid: still frame — paused <video> is often black without a real poster.
  const showVideoStill = Boolean(
    media?.kind === 'video' && !autoplay && imageThumb,
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video || media?.kind !== 'video' || showVideoStill) return

    if (autoplay && inView) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [autoplay, inView, media?.kind, showVideoStill])

  const toneVars = mono && tone
    ? (toneToCssVars({
        exposure: tone.exposure ?? 1,
        brightness: tone.brightness ?? 0.86,
        contrast: tone.contrast ?? 1.28,
        grayscale: tone.grayscale ?? 1,
      }) as CSSProperties)
    : undefined

  return (
    <figure
      ref={ref}
      className={[
        styles.root,
        mono ? styles.mono : '',
        fill ? styles.fill : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(fill || aspect === 'auto' ? {} : { aspectRatio: aspect }),
        ...toneVars,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {awaiting ? (
        <div className={styles.placeholder} aria-label="Awaiting asset">
          <div className={styles.wire} aria-hidden />
          {showLabel && (
            <div className={styles.placeholderInner}>
              <div className={styles.placeholderLabel}>AWAITING ASSET</div>
              <div className={styles.placeholderMeta}>
                {labelId || media?.id || 'UNASSIGNED'}
              </div>
            </div>
          )}
        </div>
      ) : !shouldLoad ? (
        <div className={styles.placeholder} aria-hidden />
      ) : showVideoStill ? (
        <img
          className={styles.media}
          src={assetUrl(imageThumb)}
          alt={alt || media.caption || media.id}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : media.kind === 'video' ? (
        <video
          ref={videoRef}
          className={styles.media}
          src={assetUrl(media.src)}
          poster={imageThumb ? assetUrl(imageThumb) : undefined}
          muted
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            if (v.currentTime >= loopSec) {
              v.currentTime = 0
              void v.play().catch(() => {})
            }
          }}
          onEnded={(e) => {
            const v = e.currentTarget
            v.currentTime = 0
            void v.play().catch(() => {})
          }}
        />
      ) : (
        <img
          className={styles.media}
          src={assetUrl(media.thumbnail || media.src)}
          srcSet={
            media.src !== media.thumbnail
              ? `${assetUrl(media.thumbnail)} 640w, ${assetUrl(media.src)} 1600w`
              : undefined
          }
          sizes={sizes}
          alt={alt || media.caption || media.id}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  )
}
