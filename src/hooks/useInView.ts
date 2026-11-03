import { useEffect, useRef, useState } from 'react'

type Options = {
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { rootMargin = '200px 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, once])

  return { ref, inView }
}
