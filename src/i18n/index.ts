import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import es from './es.json'

export const languages = [
  { code: 'pt-BR', label: 'Português brasileiro', short: 'PT' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
] as const
export type Language = (typeof languages)[number]['code']

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-language')
    if (languages.some(language => language.code === saved)) return saved as Language
  } catch { /* Storage is optional. */ }
  return 'pt-BR'
}

void i18n.use(initReactI18next).init({
  lng: initialLanguage(),
  supportedLngs: languages.map(language => language.code),
  fallbackLng: 'pt-BR',
  load: 'currentOnly',
  resources: { 'pt-BR': { translation: {} }, en: { translation: en }, es: { translation: es } },
  keySeparator: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
  initAsync: false,
  react: { useSuspense: false },
})

function syncLanguage(language: string) {
  document.documentElement.lang = language
  try { localStorage.setItem('portfolio-language', language) } catch { /* Storage is optional. */ }
}
syncLanguage(i18n.language)
i18n.on('languageChanged', syncLanguage)

/** Source-language keys keep editorial data separate from IDs, URLs and filters. */
export function tx<T>(value: T, variables?: Record<string, unknown>): T {
  return (typeof value === 'string'
    ? i18n.t(value, { defaultValue: value, ...variables })
    : value) as T
}

export default i18n
