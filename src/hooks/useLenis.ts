import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenisInstance } from '@/animations/lenisBridge'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useLenis(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    setLenisInstance(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      gsap.ticker.remove(ticker)
      setLenisInstance(null)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [enabled, reduced])
}
