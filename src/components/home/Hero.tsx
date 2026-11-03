import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getHomeBackground } from '@/data/home'
import { site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { assetUrl } from '@/utils/assetUrl'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const bg = getHomeBackground()
  const bgUrl = bg ? assetUrl(bg.src) : null

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const targets = root.querySelectorAll('[data-hero-anim]')
    gsap.set(targets, { opacity: 0, y: 24 })

    const intro = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1.05,
      stagger: 0.09,
      ease: 'power3.out',
      delay: 0.08,
      overwrite: true,
    })

    let parallax: gsap.core.Tween | undefined
    if (bgRef.current) {
      parallax = gsap.to(bgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      intro.kill()
      parallax?.scrollTrigger?.kill()
      parallax?.kill()
      gsap.set(targets, { clearProps: 'opacity,transform' })
    }
  }, [reduced, bgUrl])

  const scrollToArchive = () => {
    document
      .getElementById('current-setup')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-label="Hero"
      style={
        bgUrl
          ? ({ ['--hero-bg']: `url("${bgUrl}")` } as CSSProperties)
          : undefined
      }
    >
      <div ref={bgRef} className={styles.bg} aria-hidden />
      <div className={styles.veil} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.brand} data-hero-anim>
            <h1 className={styles.title}>{site.title}</h1>
            <a
              className={styles.author}
              href={site.authorUrl}
              target="_blank"
              rel="noreferrer"
            >
              / {site.author}
            </a>
          </div>

          <p className={styles.tagline} data-hero-anim>
            {site.shortTagline}
          </p>

          <div className={styles.actions} data-hero-anim>
            <Link className="btn btn--light" to="/evolution">
              ENTER EVOLUTION
            </Link>
            <Link className="btn" to="/gallery">
              OPEN GALLERY
            </Link>
          </div>
        </div>

        <button
          type="button"
          className={styles.scrollCue}
          data-hero-anim
          onClick={scrollToArchive}
        >
          <span className={styles.scrollLine} aria-hidden />
          <span>SCROLL TO ARCHIVE</span>
          <span className={styles.scrollLine} aria-hidden />
        </button>
      </div>
    </section>
  )
}
