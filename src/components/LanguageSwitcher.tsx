import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages, tx } from '../i18n'
import './LanguageSwitcher.css'

const flags = { 'pt-BR': '🇧🇷', es: '🇪🇸', en: '🇺🇸', de: '🇩🇪' }
export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const current = languages.find(language => language.code === i18n.language) || languages[0]
  useEffect(() => {
    if (!open) return
    const outside = (event: Event) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); event.stopPropagation() }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    root.current?.addEventListener('keydown', escape)
    const element = root.current
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
      element?.removeEventListener('keydown', escape)
    }
  }, [open])
  return (
    <div className="language-switcher" ref={root}>
      <button ref={button} type="button" className="language-trigger"
        aria-label={tx('Trocar idioma. Atual: {{language}}', { language: current.label })}
        title={current.label} aria-expanded={open} aria-controls="language-options"
        onClick={() => setOpen(value => !value)}>
        <span aria-hidden="true">{flags[current.code]}</span>
      </button>
      {open && <div className="language-options" id="language-options" role="group" aria-label={tx('Idioma')}>
        {languages.map(language => (
          <button key={language.code} type="button" lang={language.code}
            aria-label={language.label} aria-pressed={i18n.language === language.code}
            onClick={() => {
              void i18n.changeLanguage(language.code)
              setOpen(false)
              button.current?.focus({ preventScroll: true })
            }}>
            <span aria-hidden="true">{flags[language.code]}</span>{language.label}
          </button>
        ))}
      </div>}
    </div>
  )
}
