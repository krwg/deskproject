import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SetCover } from '@/components/shared/SetCover'
import { getCurrentSetupSets } from '@/data/sets'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './CurrentSetup.module.css'

gsap.registerPlugin(ScrollTrigger)

export function CurrentSetup() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const shots = getCurrentSetupSets()
  const drag = useRef({
    active: false,
    moved: false,
    x: 0,
    left: 0,
  })

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || reduced || shots.length === 0) return

    const cards = track.querySelectorAll<HTMLElement>(`.${styles.item}`)
    
    gsap.set(cards, { opacity: 0, y: 14 })

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.07,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(cards, { clearProps: 'opacity,transform' })
    }
  }, [reduced, shots])

  useEffect(() => {
    const scroller = scrollerRef.current
    const track = trackRef.current
    if (!scroller || !track || shots.length === 0) return

    const sync = () => {
      const fits = track.scrollWidth <= scroller.clientWidth + 2
      scroller.dataset.centered = fits ? '1' : '0'
      if (fits) scroller.scrollLeft = 0
    }

    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(scroller)
    ro.observe(track)
    window.addEventListener('resize', sync)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [shots])

  
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (el.dataset.centered === '1') return
      if (el.scrollWidth <= el.clientWidth) return

      const mostlyVertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX)
      const delta = mostlyVertical ? e.deltaY : e.deltaX
      if (delta === 0) return

      const max = el.scrollWidth - el.clientWidth
      const next = Math.min(max, Math.max(0, el.scrollLeft + delta))
      if (next === el.scrollLeft) return

      e.preventDefault()
      el.scrollLeft = next
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [shots])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const el = scrollerRef.current
    if (!el || el.dataset.centered === '1') return
    drag.current = {
      active: true,
      moved: false,
      x: e.clientX,
      left: el.scrollLeft,
    }
    el.setPointerCapture(e.pointerId)
    el.classList.add(styles.dragging)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el || !drag.current.active) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 6) drag.current.moved = true
    el.scrollLeft = drag.current.left - dx
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    drag.current.active = false
    el?.classList.remove(styles.dragging)
    try {
      el?.releasePointerCapture(e.pointerId)
    } catch {
      
    }
  }

  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <section
      id="current-setup"
      ref={sectionRef}
      className={`page-section ${styles.section}`}
    >
      <div className={`page ${styles.header}`}>
        <div className="section-label">
          <span className="section-label__index">01</span>
          <h2 className="section-label__title">CURRENT SETUP</h2>
        </div>
        <p className={styles.hint}>DRAG / SCROLL →</p>
      </div>

      {shots.length === 0 ? (
        <div className={`page empty-note ${styles.empty}`}>
          NO HOME SETS YET — drop media into public/images/sets/NN/ then run
          npm run images
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className={styles.scroller}
          data-lenis-prevent
          data-lenis-prevent-wheel
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          <div ref={trackRef} className={styles.track}>
            {shots.map((set) => (
              <article key={set.id} className={styles.item}>
                <div className={styles.frame}>
                  <SetCover
                    set={set}
                    fill
                    sizes="(max-width: 720px) 78vw, 380px"
                  />
                </div>
                <div className={styles.meta}>
                  <span>SET {set.folder}</span>
                  <span>{set.items.length + 1} MEDIA</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
