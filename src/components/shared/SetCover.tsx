import { Link } from 'react-router-dom'
import { ArchiveMedia } from '@/components/shared/ArchiveMedia'
import type { MediaSet } from '@/types'
import styles from './SetCover.module.css'

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
  const media = (
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
      alt={set.title}
    />
  )

  if (set.awaiting) return media

  return (
    <Link
      to={`/gallery/${set.id}`}
      className={styles.link}
      aria-label={`Open set ${set.folder}: ${set.title}`}
    >
      {media}
    </Link>
  )
}
