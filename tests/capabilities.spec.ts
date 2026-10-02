import { expect, test } from '@playwright/test'

test('Adila conecta as ferramentas e áreas aos nove repositórios públicos', async ({ page }) => {
  await page.goto('/#atuacao')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const section = page.locator('#atuacao')
  for (const [title, repos] of [
    ['Aplicações desktop e dados', ['coder-app', 'stash-app', 'putch-app']],
    ['CLIs e ferramentas para código', ['walkmap', 'memorywalk']],
    ['Agentes e modelos de IA', ['ops-worker']],
    ['Observabilidade e operação', ['pulse-sdk', 'dash-mcp']],
    ['Design systems e interfaces', ['system-design']],
  ] as const) {
    const button = section.getByRole('button', { name: title, exact: true })
    await button.click()
    const panel = section.getByRole('region', { name: title, exact: true })
    await expect(panel).toHaveCSS('opacity', '1')
    for (const repo of repos) {
      const link = panel.locator(`a[href="https://github.com/adila-sh/${repo}"]`)
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('rel', 'noreferrer')
    }
    await expect(section.locator('.capability-trigger[aria-expanded="true"]')).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})

test('acordeão anima a troca e acompanha cliques durante a transição', async ({ page }) => {
  await page.goto('/#atuacao')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const triggers = page.locator('.capability-trigger')
  const panels = page.locator('.capability-panel')
  const initialHeight = await panels.first().evaluate(el => el.getBoundingClientRect().height)
  await triggers.nth(1).click()
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true')
  await expect(triggers.first()).toHaveAttribute('aria-expanded', 'false')
  const reduced = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (!reduced) {
    await expect.poll(() => panels.evaluateAll((elements, height) => {
      const closing = elements[0].getBoundingClientRect().height
      const opening = elements[1].getBoundingClientRect().height
      return closing > 0 && closing < height && opening > 0
    }, initialHeight)).toBe(true)
  }
  // Reverse an ongoing transition, then choose a different item immediately.
  await triggers.evaluateAll(elements => {
    (elements[0] as HTMLButtonElement).click()
    requestAnimationFrame(() => (elements[2] as HTMLButtonElement).click())
  })
  await expect(triggers.nth(2)).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('.capability-trigger[aria-expanded="true"]')).toHaveCount(1)
  await expect(panels.first()).toHaveCSS('height', '0px')
  await expect(panels.nth(1)).toHaveCSS('height', '0px')
  await expect(panels.nth(2)).toHaveCSS('opacity', '1')
  await expect(panels.nth(2).getByRole('link', { name: 'Cadence' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('teclado ignora painéis fechados e movimento reduzido dispensa animação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#atuacao')
  const triggers = page.locator('.capability-trigger')
  const panels = page.locator('.capability-panel')
  await triggers.nth(1).focus()
  await page.keyboard.press('Enter')
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true')
  await expect(panels.first()).toHaveCSS('height', '0px')
  await expect(panels.nth(1)).toHaveCSS('transition-duration', '0s')
  await triggers.first().focus()
  await page.keyboard.press('Tab')
  await expect(triggers.nth(1)).toBeFocused()
  await page.keyboard.press('Space')
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'false')
  await expect(panels.nth(1)).toHaveCSS('height', '0px')
  await page.keyboard.press('Tab')
  await expect(triggers.nth(2)).toBeFocused()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(panels.nth(2).getByRole('link', { name: 'Cadence' })).toBeFocused()
})
