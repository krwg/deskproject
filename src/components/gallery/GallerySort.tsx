import { useEffect, useId, useRef, useState } from 'react'
import styles from './GallerySort.module.css'

export type GallerySortOrder = 'asc' | 'desc'

const OPTIONS: { value: GallerySortOrder; label: string }[] = [
  { value: 'asc', label: 'От старых к новым' },
  { value: 'desc', label: 'От новых к старым' },
]

type Props = {
  value: GallerySortOrder
  onChange: (value: GallerySortOrder) => void
}

export function GallerySort({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (next: GallerySortOrder) => {
    onChange(next)
    setOpen(false)
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Sort: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerLabel}>{current.label}</span>
        <span className={styles.chevron} data-open={open} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className={styles.menu} id={menuId} role="menu" aria-label="Sort">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={value === opt.value}
              className={[styles.item, value === opt.value ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => choose(opt.value)}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span className={styles.check} aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
