import { useState } from 'react'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import { SetLightbox } from '@/components/shared/SetLightbox'
import type { MediaSet } from '@/types'

type Props = {
  set: MediaSet
  aspect?: string
  eager?: boolean
  sizes?: string
  className?: string
  showLabel?: boolean
  fill?: boolean
}

export function SetCover({
  set,
  aspect,
  eager,
  sizes,
  className,
  showLabel = true,
  fill = false,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ArchiveMedia
        media={set.main}
        aspect={fill ? 'auto' : aspect || set.aspect}
        eager={eager}
        sizes={sizes}
        className={className}
        showLabel={showLabel}
        labelId={`SET-${set.folder}`}
        autoplay
        mono
        fill={fill}
        tone={set.tone}
        onClick={() => setOpen(true)}
        alt={set.title}
      />
      {open && <SetLightbox set={set} onClose={() => setOpen(false)} />}
    </>
  )
}
