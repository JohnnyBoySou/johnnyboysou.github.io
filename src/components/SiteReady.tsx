import { useEffect } from 'react'
import { tx } from '../i18n'

/** Dismisses the static HTML loader after React and the page fonts are ready. */
export function SiteReady() {
  useEffect(() => {
    const html = document.documentElement
    const loader = document.getElementById('boot-loader')
    const root = document.getElementById('root')
    if (!loader) return
    loader.setAttribute('aria-label', tx('Carregando portfólio'))
    let disposed = false
    let leaving = false
    let completionTimer = 0
    let exitTimer = 0
    let frame = 0
    const motion = matchMedia('(prefers-reduced-motion: reduce)')

    const reveal = (immediate: boolean) => {
      if (disposed || html.dataset.boot === 'ready') return
      clearTimeout(completionTimer)
      clearTimeout(exitTimer)
      clearTimeout(safetyTimer)
      html.dataset.boot = 'ready'
      root?.setAttribute('aria-busy', 'false')
      loader.remove()
      document.dispatchEvent(new CustomEvent('portfolio:ready', { detail: { immediate } }))
    }
    const finish = (immediate = false) => {
      if (disposed || html.dataset.boot === 'ready') return
      if (immediate || motion.matches) return reveal(true)
      if (leaving) return
      leaving = true
      // The word fills at readiness milestones, never from a simulated timer.
      loader.style.setProperty('--boot-fill', '100%')
      html.dataset.boot = 'completing'
      completionTimer = window.setTimeout(() => {
        html.dataset.boot = 'leaving'
        document.dispatchEvent(new Event('portfolio:reveal'))
        exitTimer = window.setTimeout(() => reveal(false), 480)
      }, 320)
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && root?.contains(event.target)) finish(true)
    }
    const onMotion = () => { if (motion.matches) finish(true) }
    const onInteraction = () => finish(true)
    const checkFonts = () => {
      if (!disposed && !leaving) loader.style.setProperty('--boot-fill', '72%')
      frame = requestAnimationFrame(() => {
        void document.fonts.ready.then(() => finish(), () => finish())
      })
    }
    // A slow font or third-party resource must never block the usable page.
    const safetyTimer = window.setTimeout(() => finish(), 3000)
    loader.style.setProperty('--boot-fill', '45%')
    if (document.readyState === 'complete') checkFonts()
    else window.addEventListener('load', checkFonts, { once: true })
    document.addEventListener('focusin', onFocus)
    document.addEventListener('pointerdown', onInteraction, { once: true })
    motion.addEventListener('change', onMotion)
    return () => {
      disposed = true
      clearTimeout(safetyTimer)
      clearTimeout(completionTimer)
      clearTimeout(exitTimer)
      cancelAnimationFrame(frame)
      window.removeEventListener('load', checkFonts)
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('pointerdown', onInteraction)
      motion.removeEventListener('change', onMotion)
    }
  }, [])
  return null
}
