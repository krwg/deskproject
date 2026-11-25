import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { startLenis, stopLenis } from '@/animations/lenisBridge'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import { getSetMedia } from '@/data/sets'
import { displaySetTitle } from '@/i18n'
import { useLocale } from '@/i18n/LocaleProvider'
import type { MediaSet } from '@/types'
import { padIndex } from '@/utils/assetUrl'
import { absoluteUrl } from '@/utils/siteUrl'
import styles from './SetLightbox.module.css'

type Props = {
  set: MediaSet
  onClose: () => void
  startIndex?: number | null
  onFrameChange?: (index: number | null) => void
}

type Mode = 'grid' | 'viewer'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function SetLightbox({
  set,
  onClose,
  startIndex = null,
  onFrameChange,
}: Props) {
  const { messages, t } = useLocale()
  const media = useMemo(() => getSetMedia(set), [set])
  const clampedStart =
    startIndex == null
      ? null
      : Math.min(Math.max(0, startIndex), Math.max(0, media.length - 1))
  const [mode, setMode] = useState<Mode>(
    clampedStart != null ? 'viewer' : 'grid',
  )
  const [index, setIndex] = useState(clampedStart ?? 0)
  const [copied, setCopied] = useState(false)
  const touchX = useRef<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const current = media[index]
  const titleId = `set-lightbox-title-${set.id}`
  const caption = set.caption?.trim() || ''
  const setTitle = displaySetTitle(set.title, messages)

  useEffect(() => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopLenis()

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prev
      startLenis()
      restoreFocusRef.current?.focus?.()
    }
  }, [])

  useEffect(() => {
    if (clampedStart == null) return
    setMode('viewer')
    setIndex(clampedStart)
  }, [clampedStart, set.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (mode === 'viewer') {
          setMode('grid')
          onFrameChange?.(null)
          return
        }
        onClose()
        return
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const nodes = [
          ...overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ].filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)
        if (nodes.length === 0) {
          e.preventDefault()
          return
        }
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey) {
          if (active === first || !overlayRef.current.contains(active)) {
            e.preventDefault()
            last.focus()
          }
        } else if (active === last || !overlayRef.current.contains(active)) {
          e.preventDefault()
          first.focus()
        }
        return
      }

      if (mode !== 'viewer') return
      if (e.key === 'ArrowLeft') {
        setIndex((i) => {
          const next = Math.max(0, i - 1)
          onFrameChange?.(next)
          return next
        })
      }
      if (e.key === 'ArrowRight') {
        setIndex((i) => {
          const next = Math.min(media.length - 1, i + 1)
          onFrameChange?.(next)
          return next
        })
      }
    }

    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [media.length, mode, onClose, onFrameChange])

  const openViewer = (i: number) => {
    setIndex(i)
    setMode('viewer')
    onFrameChange?.(i)
  }

  const goFrame = (i: number) => {
    setIndex(i)
    onFrameChange?.(i)
  }

  const backToGrid = () => {
    setMode('grid')
    onFrameChange?.(null)
  }

  const copyLink = async () => {
    const path =
      mode === 'viewer'
        ? `/gallery/${set.id}?frame=${index}`
        : `/gallery/${set.id}`
    const url = absoluteUrl(path)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('Copy link', url)
    }
  }

  const ui = (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      data-lenis-prevent-wheel
    >
      <div className={styles.top}>
        <span>
          SET {set.folder}
          {mode === 'viewer'
            ? ` / ${padIndex(index + 1)} / ${padIndex(media.length)}`
            : ` / ${padIndex(media.length)} MEDIA`}
        </span>
        <div className={styles.topActions}>
          {mode === 'viewer' && (
            <button type="button" className={styles.back} onClick={backToGrid}>
              {messages.lightbox.galleryBack}
            </button>
          )}
          <button
            type="button"
            className={styles.back}
            onClick={() => void copyLink()}
          >
            {copied ? messages.lightbox.copied : messages.lightbox.copyLink}
          </button>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            {messages.lightbox.close}
          </button>
        </div>
      </div>

      {mode === 'grid' ? (
        <div className={styles.gridWrap} data-lenis-prevent data-lenis-prevent-wheel>
          <div className={styles.gridMeta}>
            <div className={styles.gridHead}>
              <span className={styles.gridTitle} id={titleId}>
                {setTitle}
              </span>
              {caption ? <p className={styles.gridCaption}>{caption}</p> : null}
            </div>
            <span>SET {set.folder}</span>
          </div>

          <div className={styles.grid}>
            {media.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={styles.cell}
                onClick={() => openViewer(i)}
              >
                <ArchiveMedia
                  media={item}
                  aspect={i === 0 ? set.aspect || '16 / 10' : '1 / 1'}
                  showLabel={false}
                  autoplay={false}
                  sizes="(max-width: 720px) 50vw, 25vw"
                  labelId={item.id}
                />
                <div className={styles.cellMeta}>
                  <span>
                    {i === 0
                      ? messages.lightbox.cover
                      : t(messages.lightbox.img, { n: padIndex(i) })}
                  </span>
                  <span>
                    {item.kind === 'video'
                      ? messages.lightbox.video
                      : messages.lightbox.photo}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : current ? (
        <div
          className={styles.viewer}
          onTouchStart={(e) => {
            touchX.current = e.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
            touchX.current = null
            if (Math.abs(dx) < 48) return
            if (dx < 0) {
              goFrame(Math.min(media.length - 1, index + 1))
            } else {
              goFrame(Math.max(0, index - 1))
            }
          }}
        >
          <span id={titleId} className={styles.srOnly}>
            {setTitle}
          </span>
          <div className={styles.stage}>
            <div className={styles.frame}>
              <ArchiveMedia
                media={current}
                aspect="auto"
                eager
                autoplay
                sizes="100vw"
                showLabel={false}
                labelId={current.id}
              />
            </div>
            <div className={styles.nav}>
              <button
                type="button"
                aria-label={messages.lightbox.previous}
                disabled={index === 0}
                onClick={() => goFrame(index - 1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label={messages.lightbox.next}
                disabled={index === media.length - 1}
                onClick={() => goFrame(index + 1)}
              >
                →
              </button>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.meta}>
              <span>
                {index === 0
                  ? messages.lightbox.cover
                  : t(messages.lightbox.img, { n: padIndex(index) })}
                {current.kind === 'video' ? messages.lightbox.loop : ''}
              </span>
              <div className={styles.captionBlock}>
                <span className={styles.caption}>{setTitle}</span>
                {caption ? <span className={styles.captionNote}>{caption}</span> : null}
              </div>
            </div>
            {media.length > 1 && (
              <div className={styles.thumbs} aria-label={messages.lightbox.frames}>
                {media.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      styles.thumb,
                      i === index ? styles.thumbActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => goFrame(i)}
                    aria-label={t(messages.lightbox.openFrame, { n: i + 1 })}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <ArchiveMedia
                      media={item}
                      aspect="1 / 1"
                      showLabel={false}
                      autoplay={false}
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )

  return createPortal(ui, document.body)
}
