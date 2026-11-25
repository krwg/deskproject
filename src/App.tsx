import { lazy, Suspense, useCallback, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { LoadingScreen } from '@/components/shared/LoadingScreen'

const HomePage = lazy(() =>
  import('@/pages/Home').then((m) => ({ default: m.HomePage })),
)
const EvolutionPage = lazy(() =>
  import('@/pages/Evolution').then((m) => ({ default: m.EvolutionPage })),
)
const GalleryPage = lazy(() =>
  import('@/pages/Gallery').then((m) => ({ default: m.GalleryPage })),
)
const AboutPage = lazy(() =>
  import('@/pages/About').then((m) => ({ default: m.AboutPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })),
)

export default function App() {
  const [ready, setReady] = useState(false)
  const onComplete = useCallback(() => setReady(true), [])

  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LoadingScreen onComplete={onComplete} />
        {ready && (
          <Suspense fallback={null}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="evolution" element={<EvolutionPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="gallery/:setId" element={<GalleryPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        )}
      </BrowserRouter>
    </ErrorBoundary>
  )
}
