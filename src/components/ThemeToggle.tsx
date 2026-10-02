import { tx } from "../i18n"
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

type Theme = 'light' | 'dark'
const storageKey = 'portfolio-theme'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#141923' : '#fafbff')
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const [busy, setBusy] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const pending = useRef(false)
  const explicitChoice = useRef(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      explicitChoice.current = saved === 'light' || saved === 'dark'
    } catch {
      /* Storage can be unavailable in private or embedded contexts. */
    }
    const system = matchMedia('(prefers-color-scheme: dark)')
    const syncSystem = () => {
      if (explicitChoice.current || pending.current) return
      const next = system.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    system.addEventListener('change', syncSystem)
    return () => system.removeEventListener('change', syncSystem)
  }, [])

  async function toggle() {
    if (pending.current) return
    const next = theme === 'light' ? 'dark' : 'light'
    explicitChoice.current = true
    const update = () => {
      applyTheme(next)
      flushSync(() => setTheme(next))
      try {
        localStorage.setItem(storageKey, next)
      } catch {
        /* Keep the in-memory choice. */
      }
    }
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
    if (!document.startViewTransition || reducedMotion.matches) {
      update()
      return
    }

    const rect = button.current!.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const full = `circle(${radius}px at ${x}px ${y}px)`
    const point = `circle(0px at ${x}px ${y}px)`
    const root = document.documentElement
    pending.current = true
    setBusy(true)
    root.dataset.themeTransition = next
    const transition = document.startViewTransition(update)
    const skip = () => {
      if (reducedMotion.matches) transition.skipTransition()
    }
    reducedMotion.addEventListener('change', skip)
    try {
      await transition.ready
      // The light snapshot contracts into the switch, revealing the night palette.
      // Turning it back on lets the same pool of light grow across the viewport.
      const animation = root.animate(
        {
          clipPath: next === 'dark' ? [full, point] : [point, full],
          filter:
            next === 'dark'
              ? ['brightness(1)', 'brightness(0.45)']
              : ['brightness(1.15)', 'brightness(1)'],
        },
        {
          duration: 900,
          easing: 'cubic-bezier(0.65, 0, 0.25, 1)',
          fill: 'forwards',
          pseudoElement:
            next === 'dark'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
        },
      )
      await animation.finished
    } catch {
      // An interrupted snapshot must never prevent changing the theme.
      transition.skipTransition()
    } finally {
      await transition.finished.catch(() => {})
      reducedMotion.removeEventListener('change', skip)
      delete root.dataset.themeTransition
      pending.current = false
      setBusy(false)
    }
  }

  return (
    <button
      ref={button}
      type="button"
      className="theme-toggle"
      aria-label={tx("Tema escuro")}
      aria-pressed={theme === 'dark'}
      aria-disabled={busy}
      title={tx(theme === 'dark' ? 'Acender a luz' : 'Apagar a luz')}
      onClick={() => void toggle()}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g
          className="bulb-rays"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M12 1v2M3.5 4.5 5 6M1 12h2M21 12h2M19 6l1.5-1.5" />
        </g>
        <path
          className="bulb-glass"
          d="M8.5 16.5C8.5 14 6 13.5 6 10a6 6 0 0 1 12 0c0 3.5-2.5 4-2.5 6.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 19h6M10 22h4M12 16v-5m-2-1 2 1 2-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
