import { Hero } from '@/components/home/Hero'
import { CurrentSetup } from '@/components/home/CurrentSetup'
import { Intro } from '@/components/home/Intro'
import { XRayDesk } from '@/components/home/XRayDesk'
import { NavPreview } from '@/components/home/NavPreview'

export function HomePage() {
  return (
    <>
      <Hero />
      <CurrentSetup />
      <Intro />
      <XRayDesk />
      <NavPreview />
    </>
  )
}
