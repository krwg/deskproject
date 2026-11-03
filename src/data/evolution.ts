import type { EvolutionEntry } from '@/types'
import { mediaSets } from './sets'

export const evolutionEntries: EvolutionEntry[] = mediaSets
  .filter((s) => !s.awaiting)
  .map((set, index) => ({
    id: `entry-${set.id}`,
    date: set.date,
    label: set.id,
    title: set.title,
    description:
      set.caption ||
      `Workspace archive entry ${set.id}. Click cover to open the set.`,
    setId: set.id,
    lane: index % 2 === 0 ? 'above' : 'below',
  }))
