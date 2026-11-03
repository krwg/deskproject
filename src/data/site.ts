import type { NavItem } from '@/types'

export const site = {
  title: 'THE DESK PROJECT',
  author: 'krwg',
  authorUrl: 'https://krwg.github.io/krwg/',
  tagline: 'A DIGITAL ARCHIVE OF MY WORKSPACE EVOLUTION.',
  shortTagline: 'A DIGITAL ARCHIVE OF MY WORKSPACE.',
  status: 'ACTIVE',
  configLabel: 'CURRENT CONFIGURATION',
  version: '1.0',
  intro:
    'This project documents the evolution of my personal workspace — from a simple laptop setup to a fully developed workstation.',
} as const

export const navItems: NavItem[] = [
  { path: '/', label: 'HOME', index: '01' },
  { path: '/evolution', label: 'EVOLUTION', index: '02' },
  { path: '/gallery', label: 'GALLERY', index: '03' },
  { path: '/about', label: 'ABOUT', index: '04' },
]
