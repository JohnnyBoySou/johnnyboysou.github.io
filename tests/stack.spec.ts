import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/#tecnologias')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  await expect(page.locator('#tecnologias > .container')).toHaveCSS('opacity', '1')
})

test('percorre a stack por controles e teclado, respeitando os limites', async ({ page }) => {
  const rail = page.getByRole('region', { name: 'Tecnologias e suas utilizações' })
  const previous = page.getByRole('button', { name: 'Tecnologias anteriores' })
  const next = page.getByRole('button', { name: 'Próximas tecnologias' })
  const position = () => rail.evaluate((element) => element.scrollLeft)
  await expect(rail.getByRole('listitem')).toHaveCount(46)
  for (const name of ['Docker', 'Asterisk / ARI', 'vLLM']) {
    await expect(rail.getByRole('heading', { name, exact: true })).toBeAttached()
  }
  await expect(previous).toBeDisabled()
  await next.click()
  await expect.poll(position).toBeGreaterThan(100)
  await expect(previous).toBeEnabled()
  await rail.focus()
  await page.keyboard.press('End')
  await expect(next).toBeDisabled()
  await expect(rail.getByRole('heading', { name: 'MCP', exact: true })).toBeInViewport()
  await page.keyboard.press('Home')
  await expect.poll(position).toBe(0)
  await expect(previous).toBeDisabled()
  await page.keyboard.press('ArrowRight')
  await expect.poll(position).toBeGreaterThan(100)
  await page.keyboard.press('ArrowLeft')
  await expect.poll(position).toBe(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('filtra por área e reinicia a faixa sem perder o foco', async ({ page }) => {
  const filters = page.getByRole('group', { name: 'Filtrar tecnologias por área' })
  const rail = page.locator('#stack-viewport')
  await rail.focus()
  await page.keyboard.press('End')
  await expect(page.getByRole('button', { name: 'Próximas tecnologias' })).toBeDisabled()
  for (const [area, technology] of [
    ['Infraestrutura', 'Docker'], ['IA e inferência', 'vLLM'],
    ['Voz e tempo real', 'Asterisk / ARI'], ['Dados e mensageria', 'PostgreSQL'],
    ['Linguagens', 'TypeScript'], ['Produto e ferramentas', 'React'],
  ]) {
    const button = filters.getByRole('button', { name: area, exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toBeFocused()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1)
    await expect(rail.getByRole('heading').first()).toHaveText(technology)
    await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBe(0)
    await expect(page.locator('#tecnologias [role="status"]')).toContainText(`Área: ${area}.`)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await filters.getByRole('button', { name: 'Todas', exact: true }).click()
  await expect(rail.getByRole('listitem')).toHaveCount(46)
})

test('rolar a página não move nem fixa a stack', async ({ page, isMobile }) => {
  const rail = page.locator('#stack-viewport')
  const stage = page.locator('.stack-stage')
  await rail.scrollIntoViewIfNeeded()
  await expect(stage).not.toHaveCSS('position', 'fixed')
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  const initialY = await page.evaluate(() => scrollY)
  if (isMobile) {
    const client = await page.context().newCDPSession(page)
    const box = (await rail.boundingBox())!
    const x = box.x + box.width / 2
    const y = Math.min(box.y + 260, (page.viewportSize()?.height ?? 740) - 50)
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
    for (let step = 1; step <= 8; step++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - step * 25 }] })
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await client.detach()
  } else {
    await rail.hover()
    await page.mouse.wheel(0, 400)
  }
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(initialY + 100)
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0)
  await expect(page.getByRole('progressbar', { name: 'Progresso pelas tecnologias' })).toHaveAttribute('aria-valuenow', '0')
  await expect(stage).not.toHaveCSS('position', 'fixed')
})

test('arraste e setas movem apenas a faixa horizontal', async ({ page, isMobile }) => {
  const rail = page.locator('#stack-viewport')
  await rail.scrollIntoViewIfNeeded()
  const initialY = await page.evaluate(() => scrollY)
  const box = (await rail.boundingBox())!
  const start = box.x + box.width * 0.85
  const end = box.x + box.width * 0.1
  const y = Math.max(box.y + 40, 150)
  if (isMobile) {
    const client = await page.context().newCDPSession(page)
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: start, y }] })
    for (let step = 1; step <= 8; step++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start + (end - start) * step / 8, y }] })
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await client.detach()
  } else {
    await page.mouse.move(start, y)
    await page.mouse.down()
    await page.mouse.move(end, y, { steps: 10 })
    await page.mouse.up()
  }
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(100)
  await expect(rail).not.toHaveClass(/is-dragging/)
  expect(Math.abs(await page.evaluate(() => scrollY) - initialY)).toBeLessThan(2)
  const next = page.getByRole('button', { name: 'Próximas tecnologias' })
  await next.focus()
  const before = await page.evaluate(() => scrollY)
  const left = await rail.evaluate(el => el.scrollLeft)
  await page.keyboard.press('Enter')
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(left)
  expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(2)
})

test('redimensionamento e movimento reduzido mantêm navegação e progresso', async ({ page }) => {
  const rail = page.locator('#stack-viewport')
  const progress = page.getByRole('progressbar', { name: 'Progresso pelas tecnologias' })
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    await page.emulateMedia({ reducedMotion })
    await page.setViewportSize({ width: 700, height: 800 })
    await rail.scrollIntoViewIfNeeded()
    await rail.focus()
    await page.keyboard.press('End')
    await expect(progress).toHaveAttribute('aria-valuenow', '100')
    await expect(rail.getByRole('heading', { name: 'MCP', exact: true })).toBeInViewport()
    await page.setViewportSize({ width: 320, height: 740 })
    await rail.scrollIntoViewIfNeeded()
    await rail.focus()
    await page.keyboard.press('Home')
    await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0)
    await expect(progress).toHaveAttribute('aria-valuenow', '0')
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
