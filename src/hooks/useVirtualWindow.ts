import { useEffect, useMemo, useState } from 'react'

export function useVirtualWindow(total: number, itemEstimate = 320, buffer = 6) {
  const [scrollY, setScrollY] = useState(0)
  const [vh, setVh] = useState(
    typeof window === 'undefined' ? 900 : window.innerHeight,
  )

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || window.pageYOffset)
    const onResize = () => setVh(window.innerHeight)
    onScroll()
    onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return useMemo(() => {
    if (total <= 48) {
      return { start: 0, end: total, offsetY: 0, height: total * itemEstimate }
    }
    const start = Math.max(0, Math.floor(scrollY / itemEstimate) - buffer)
    const visible = Math.ceil(vh / itemEstimate) + buffer * 2
    const end = Math.min(total, start + visible)
    return {
      start,
      end,
      offsetY: start * itemEstimate,
      height: total * itemEstimate,
    }
  }, [total, itemEstimate, buffer, scrollY, vh])
}
