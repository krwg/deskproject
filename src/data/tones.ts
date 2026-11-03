import type { ImageTone } from '@/types'

function setNum(id: string): number {
  const n = Number.parseInt(id, 10)
  return Number.isFinite(n) ? n : 0
}

const TONE_OVERRIDES: Record<string, ImageTone> = {
  
  '02': { exposure: 1.1, brightness: 0.94, contrast: 1.18, grayscale: 1 },
  '04': { exposure: 1.08, brightness: 0.92, contrast: 1.2, grayscale: 1 },
  '06': { exposure: 1.06, brightness: 0.9, contrast: 1.24, grayscale: 1 },
  '07': { exposure: 1.07, brightness: 0.91, contrast: 1.2, grayscale: 1 },
  '10': { exposure: 1.05, brightness: 0.9, contrast: 1.22, grayscale: 1 },
  
  '01': { exposure: 1.0, brightness: 0.86, contrast: 1.28, grayscale: 1 },
  '09': { exposure: 0.98, brightness: 0.84, contrast: 1.3, grayscale: 0.98 },
  '11': { exposure: 0.99, brightness: 0.85, contrast: 1.3, grayscale: 1 },
  '19': { exposure: 0.97, brightness: 0.83, contrast: 1.32, grayscale: 0.97 },
}

export function defaultToneForSet(id: string): ImageTone {
  if (TONE_OVERRIDES[id]) return { ...TONE_OVERRIDES[id] }

  const n = setNum(id)
  if (n <= 5) {
    return { exposure: 1.06, brightness: 0.9, contrast: 1.22, grayscale: 1 }
  }
  if (n <= 12) {
    return { exposure: 1.02, brightness: 0.86, contrast: 1.28, grayscale: 1 }
  }
  return { exposure: 0.99, brightness: 0.84, contrast: 1.32, grayscale: 0.98 }
}

export function resolveTone(
  id: string,
  override?: ImageTone | null,
): Required<ImageTone> {
  const base = defaultToneForSet(id)
  const merged = { ...base, ...override }
  return {
    exposure: merged.exposure ?? 1,
    brightness: merged.brightness ?? 0.86,
    contrast: merged.contrast ?? 1.28,
    grayscale: merged.grayscale ?? 1,
  }
}

export function toneToCssVars(tone: Required<ImageTone>): Record<string, string> {
  return {
    '--tone-exposure': String(tone.exposure),
    '--tone-brightness': String(tone.brightness),
    '--tone-contrast': String(tone.contrast),
    '--tone-gray': String(tone.grayscale),
  }
}
