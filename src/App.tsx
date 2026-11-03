import { useCallback, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LoadingScreen } from '@/components/shared/LoadingScreen'
import { HomePage } from '@/pages/Home'
import { EvolutionPage } from '@/pages/Evolution'
import { GalleryPage } from '@/pages/Gallery'
import { AboutPage } from '@/pages/About'

export default function App() {
  const [ready, setReady] = useState(false)
  const onComplete = useCallback(() => setReady(true), [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LoadingScreen onComplete={onComplete} />
      {ready && (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="evolution" element={<EvolutionPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="hardware" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}
