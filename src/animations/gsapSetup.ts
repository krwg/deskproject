import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsap() {
  if (registered) return { gsap, ScrollTrigger }
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })
  registered = true
  return { gsap, ScrollTrigger }
}
