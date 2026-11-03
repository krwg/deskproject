import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

import '@/styles/global.css'
import 'lenis/dist/lenis.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
