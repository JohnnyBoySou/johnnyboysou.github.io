import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/google-sans-flex'
import './index.css'
import './i18n'
import { LocalizedPortfolio } from './i18n/LocalizedPortfolio'
import './theme.css'
import './microinteractions.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizedPortfolio />
  </StrictMode>,
)
