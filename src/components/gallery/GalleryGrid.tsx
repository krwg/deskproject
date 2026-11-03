import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SetCover } from '@/components/shared/SetCover'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { MediaSet } from '@/types'
import styles from './GalleryGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  sets: MediaSet[]
}

export function GalleryGrid({ sets }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced || sets.length === 0) return

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    gsap.set(items, { opacity: 0, y: 10 })

    const triggers = ScrollTrigger.batch(items, {
      start: 'top 92%',
      once: true,
      onEnter: (entering) => {
        gsap.to(entering, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: true,
        })
      },
    })

    return () => {
      triggers.forEach((st) => st.kill())
      gsap.killTweensOf(items)
      gsap.set(items, { clearProps: 'opacity,transform' })
    }
  }, [sets, reduced])

  if (sets.length === 0) {
    return (
      <div className={`empty-note ${styles.empty}`}>
        NO SETS YET — DROP MEDIA INTO public/images/sets/NN/ THEN RUN npm run
        images
      </div>
    )
  }

  return (
    <div ref={rootRef} className={styles.grid}>
      {sets.map((set) => (
        <article
          key={set.id}
          className={styles.item}
          data-reveal
          style={{ opacity: reduced ? 1 : undefined }}
        >
          <div className={styles.frame}>
            <SetCover
              set={set}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          </div>
          <div className={styles.meta}>
            <span>{set.items.length + 1} MEDIA</span>
          </div>
        </article>
      ))}
    </div>
  )
}
