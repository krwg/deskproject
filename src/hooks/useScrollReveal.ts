import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type Options = {
  y?: number
  delay?: number
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const { y = 28, delay = 0, once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { clearProps: 'opacity,transform' })
      return
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        overwrite: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(el, { clearProps: 'opacity,transform' })
    }
  }, [reduced, y, delay, once])

  return ref
}
