import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PortfolioRoutes from '../pages/PortfolioPages'
import { SiteReady } from '../components/SiteReady'
import { ScrollPill } from '../components/ScrollPill'

export function LocalizedPortfolio() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      document.dispatchEvent(new Event('portfolio:language'))
    })
    return () => cancelAnimationFrame(frame)
  }, [i18n.language])
  return <><PortfolioRoutes /><SiteReady /><ScrollPill /></>
}
