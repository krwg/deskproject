import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './ScrollProgress.module.css'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const bar = barRef.current
    if (!bar || reduced) return

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`
      },
    })

    return () => st.kill()
  }, [reduced])

  if (reduced) return null

  return (
    <div className={styles.root} aria-hidden>
      <div ref={barRef} className={styles.bar} />
    </div>
  )
}
