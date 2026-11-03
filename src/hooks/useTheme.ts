import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import {
  applyResolvedTheme,
  persistThemePreference,
  readThemePreference,
  type ResolvedTheme,
  type ThemePreference,
} from '@/theme/theme'

function subscribeSystem(cb: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getSystemSnapshot() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getServerSnapshot(): ResolvedTheme {
  return 'dark'
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'system' : readThemePreference(),
  )
  const system = useSyncExternalStore(subscribeSystem, getSystemSnapshot, getServerSnapshot)
  const resolved: ResolvedTheme =
    preference === 'system' ? system : preference

  useEffect(() => {
    applyResolvedTheme(resolved, preference)
  }, [resolved, preference])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    persistThemePreference(next)
  }, [])

  return { preference, resolved, setPreference }
}
