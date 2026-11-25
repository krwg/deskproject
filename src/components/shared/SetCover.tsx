import { useNavigate } from 'react-router-dom'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
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
  const navigate = useNavigate()

  return (
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
      onClick={() => {
        if (set.awaiting) return
        navigate(`/gallery/${set.id}`)
      }}
      alt={set.title}
    />
  )
}
