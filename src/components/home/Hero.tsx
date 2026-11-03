import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getHomeBackgroundSlides } from '@/data/home'
import { site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { assetUrl } from '@/utils/assetUrl'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const HOLD_S = 6.8
const WIPE_S = 1.05

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const slides = useMemo(() => getHomeBackgroundSlides(), [])
  const urls = useMemo(() => slides.map((s) => assetUrl(s.src)), [slides])

  useEffect(() => {
    urls.forEach((url) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = url
    })
  }, [urls])

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
    if (stackRef.current) {
      parallax = gsap.to(stackRef.current, {
        yPercent: 10,
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
  }, [reduced])

  useEffect(() => {
    const stack = stackRef.current
    if (!stack || urls.length === 0) return

    const layers = Array.from(
      stack.querySelectorAll<HTMLElement>(`.${styles.bgLayer}`),
    )
    if (layers.length === 0) return

    const tweens: gsap.core.Tween[] = []
    let index = 0
    let timer = 0

    const clearLayerProps =
      'opacity,visibility,transform,clip-path,z-index'

    const drift = (layer: HTMLElement) => {
      const t = gsap.fromTo(
        layer,
        { scale: 1.04 },
        {
          scale: 1.1,
          duration: HOLD_S + WIPE_S,
          ease: 'none',
        },
      )
      tweens.push(t)
      return t
    }

    gsap.set(layers, {
      autoAlpha: 0,
      scale: 1.04,
      clipPath: 'inset(0 0% 0 0)',
      zIndex: 0,
    })
    gsap.set(layers[0], { autoAlpha: 1, zIndex: 1 })
    drift(layers[0])

    if (reduced || layers.length < 2) {
      return () => {
        tweens.forEach((t) => t.kill())
        gsap.set(layers, { clearProps: clearLayerProps })
      }
    }

    const advance = () => {
      const current = layers[index]
      const nextIndex = (index + 1) % layers.length
      const next = layers[nextIndex]

      gsap.set(next, {
        autoAlpha: 1,
        scale: 1.04,
        clipPath: 'inset(0 100% 0 0)',
        zIndex: 2,
      })
      gsap.set(current, { zIndex: 1 })

      tweens.push(
        gsap.to(next, {
          clipPath: 'inset(0 0% 0 0)',
          duration: WIPE_S,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(current, {
              autoAlpha: 0,
              clipPath: 'inset(0 0% 0 0)',
              zIndex: 0,
            })
            gsap.set(next, { zIndex: 1 })
          },
        }),
      )
      drift(next)
      index = nextIndex
      timer = window.setTimeout(advance, (HOLD_S + WIPE_S) * 1000)
    }

    timer = window.setTimeout(advance, HOLD_S * 1000)

    return () => {
      window.clearTimeout(timer)
      tweens.forEach((t) => t.kill())
      gsap.set(layers, { clearProps: clearLayerProps })
    }
  }, [urls, reduced])

  const scrollToArchive = () => {
    document
      .getElementById('current-setup')
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section ref={rootRef} className={styles.hero} aria-label="Hero">
      <div ref={stackRef} className={styles.bgStack} aria-hidden>
        {urls.length === 0 ? (
          <div className={`${styles.bgLayer} ${styles.bgFallback}`} />
        ) : (
          urls.map((url, i) => {
            const slide = slides[i]
            const focusY = slide?.focusY
            return (
              <div
                key={`${slide?.id ?? i}-${url}`}
                className={styles.bgLayer}
                style={{
                  backgroundImage: `url("${url}")`,
                  ...(typeof focusY === 'number'
                    ? {
                        backgroundPosition: `center ${focusY}%`,
                        transformOrigin: `center ${focusY}%`,
                      }
                    : null),
                }}
              />
            )
          })
        )}
      </div>
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
