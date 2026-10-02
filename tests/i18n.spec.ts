import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
const [en, es, de] = ['en', 'es', 'de'].map(language => JSON.parse(readFileSync(new URL(`../src/i18n/${language}.json`, import.meta.url), 'utf8')) as Record<string, string>)

test('catálogos têm as mesmas traduções e preservam interpolações', () => {
  const keys = Object.keys(en).sort()
  for (const catalog of [en, es, de]) {
    expect(Object.keys(catalog).sort()).toEqual(keys)
    for (const [source, translation] of Object.entries(catalog)) {
      expect(translation.trim()).not.toBe('')
      const variables = (text: string) => [...text.matchAll(/{{\s*(\w+)\s*}}/g)].map(match => match[1]).sort()
      expect(variables(translation), source).toEqual(variables(source))
    }
  }
})

test('bandeira ao lado do tema troca os quatro idiomas e persiste entre páginas', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  await expect(page.locator('.language-switcher + .theme-toggle')).toHaveCount(1)
  for (const [label, code, flag, headline] of [
    ['Deutsch', 'de', '🇩🇪', 'Echtzeit und KI'],
    ['English', 'en', '🇺🇸', 'real time and AI'],
    ['Español', 'es', '🇪🇸', 'tiempo real e IA'],
    ['Português brasileiro', 'pt-BR', '🇧🇷', 'tempo real e IA'],
  ]) {
    await page.locator('.language-trigger').click()
    await expect(page.locator('.language-options button')).toHaveCount(4)
    await page.getByRole('button', { name: label, exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', code)
    await expect(page.locator('.language-trigger')).toHaveText(flag)
    await expect(page.locator('h1')).toContainText(headline)
    await expect(page.locator('.language-options')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.locator('.language-trigger').click()
  await page.getByRole('button', { name: 'Deutsch', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.locator('.language-trigger')).toHaveText('🇩🇪')
  await page.goto('/projetos/cadence')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.getByRole('link', { name: 'Cadence besuchen', exact: true })).toHaveAttribute('href', 'https://cadence.lai.ia.br')
  await page.goto('/modelos')
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  await expect(page.locator('h1')).toContainText('Forschung')
  expect(await page.evaluate(() => localStorage.getItem('portfolio-language'))).toBe('de')
  expect(errors).toEqual([])
})

test('seletor funciona pelo teclado, fecha com Escape e cabe na tela', async ({ page }) => {
  await page.goto('/')
  const trigger = page.locator('.language-trigger')
  await trigger.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Português brasileiro', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Deutsch', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveText('🇩🇪')
  await page.keyboard.press('Enter')
  const box = await page.locator('.language-options').boundingBox()
  expect(box!.x).toBeGreaterThanOrEqual(0)
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await trigger.click()
  await page.locator('.theme-toggle').focus()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('tradução preserva o filtro da stack e o tema', async ({ page }) => {
  await page.goto('/#tecnologias')
  const infrastructure = page.getByRole('button', { name: 'Infraestrutura', exact: true })
  await infrastructure.focus()
  await page.keyboard.press('Enter')
  const count = await page.locator('#stack-viewport li').count()
  expect(count).toBeGreaterThan(0)
  await page.locator('.language-trigger').click()
  await page.getByRole('button', { name: 'Deutsch', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Infrastruktur', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#stack-viewport li')).toHaveCount(count)
  await expect(page.locator('#stack-viewport')).toContainText('Dienste und Worker in Containern.')
  await page.locator('.theme-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.locator('.language-trigger').click()
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('button', { name: 'Infrastructure', exact: true })).toHaveAttribute('aria-pressed', 'true')
})
