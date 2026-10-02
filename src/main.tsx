import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import { languageReady } from './i18n'
import { LocalizedPortfolio } from './i18n/LocalizedPortfolio'
import './theme.css'
import './microinteractions.css'

void languageReady.then(() => createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizedPortfolio />
  </StrictMode>,
))
