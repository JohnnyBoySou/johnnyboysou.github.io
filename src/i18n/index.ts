import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
const catalogs = {
  en: () => import('./en.json'),
  es: () => import('./es.json'),
  de: () => import('./de.json'),
}

export const languages = [
  { code: 'pt-BR', label: 'Português brasileiro', short: 'PT' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
] as const
export type Language = (typeof languages)[number]['code']

function initialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-language')
    if (languages.some(language => language.code === saved)) return saved as Language
  } catch { /* Storage is optional. */ }
  return 'pt-BR'
}

export const languageReady = i18n.use({
  type: 'backend' as const,
  read(language: string, _namespace: string, callback: (error: Error | null, data: Record<string, string> | null) => void) {
    const load = catalogs[language as keyof typeof catalogs]
    if (!load) return callback(null, {})
    void load().then(module => callback(null, module.default), error => callback(error, null))
  },
}).use(initReactI18next).init({
  lng: initialLanguage(),
  supportedLngs: languages.map(language => language.code),
  fallbackLng: 'pt-BR',
  load: 'currentOnly',
  resources: { 'pt-BR': { translation: {} } },
  partialBundledLanguages: true,
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
