import { expect, test } from '@playwright/test'

test.use({ colorScheme: 'light' })

test('o portfólio usa sempre o tema escuro, mesmo com preferência clara salva', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.addInitScript(() => {
    try { localStorage.setItem('portfolio-theme', 'light') } catch { /* Storage is optional. */ }
  })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(0, 0, 0)')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#000000')
  await expect(page.getByRole('button', { name: 'Tema escuro', exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
})
