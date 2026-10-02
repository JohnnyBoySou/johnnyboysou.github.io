import { expect, test } from '@playwright/test'

test('pílula substitui a barra nativa e acompanha o progresso global e os filtros', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const pill = page.getByRole('scrollbar', { name: 'Rolagem da página' })
  await expect(pill).toBeVisible()
  await expect(page.locator('html')).toHaveCSS('scrollbar-width', 'none')
  await expect(pill).toHaveAttribute('aria-valuenow', '0')
  await page.evaluate(() => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) / 2, behavior: 'instant' }))
  await expect.poll(async () => Number(await pill.getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(49)
  await expect.poll(async () => Number(await pill.getAttribute('aria-valuenow'))).toBeLessThanOrEqual(51)
  await page.locator('.stack-filters').getByRole('button', { name: 'Infraestrutura', exact: true }).click()
  await expect.poll(async () => {
    const actual = await page.evaluate(() => Math.round(scrollY / (document.documentElement.scrollHeight - innerHeight) * 100))
    return Math.abs(Number(await pill.getAttribute('aria-valuenow')) - actual)
  }).toBeLessThanOrEqual(1)
  await pill.focus()
  await page.keyboard.press('End')
  await expect(pill).toHaveAttribute('aria-valuenow', '100')
  await expect(page.locator('.site-footer')).toBeInViewport()
  await page.keyboard.press('Home')
  await expect(pill).toHaveAttribute('aria-valuenow', '0')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
})

test('arraste e teclado navegam também nas páginas internas e em movimento reduzido', async ({ page, isMobile }) => {
  await page.goto('/projetos/disk')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const pill = page.getByRole('scrollbar', { name: 'Rolagem da página' })
  const track = (await page.locator('.scroll-pill-track').boundingBox())!
  const thumb = (await page.locator('.scroll-pill-thumb').boundingBox())!
  const x = track.x + track.width / 2
  const start = thumb.y + thumb.height / 2
  const end = track.y + track.height - thumb.height / 2
  if (isMobile) {
    const client = await page.context().newCDPSession(page)
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: start }] })
    for (let i = 1; i <= 8; i++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: start + (end - start) * i / 8 }] })
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await client.detach()
  } else {
    await page.mouse.move(x, start)
    await page.mouse.down()
    await page.mouse.move(x, end, { steps: 8 })
    await page.mouse.up()
  }
  await expect(pill).toHaveAttribute('aria-valuenow', '100')
  await expect(pill).not.toHaveAttribute('data-dragging')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await pill.focus()
  await expect(page.locator('.scroll-pill-shell')).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Home')
  await expect(pill).toHaveAttribute('aria-valuenow', '0')
  await page.keyboard.press('PageDown')
  await expect.poll(async () => Number(await pill.getAttribute('aria-valuenow'))).toBeGreaterThan(0)
  await page.keyboard.press('Home')
  await expect.poll(() => page.locator('.scroll-pill-thumb').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBe(0)
  await page.setViewportSize({ width: 320, height: 740 })
  const box = (await pill.boundingBox())!
  expect(box.x).toBeGreaterThanOrEqual(0)
  expect(box.x + box.width).toBeLessThanOrEqual(320)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('marcas identificam seções, mostram tooltip e navegam suavemente', async ({ page, isMobile }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const marks = page.getByRole('navigation', { name: 'Seções da página' })
  await expect(marks.getByRole('button')).toHaveCount(9)
  const about = marks.getByRole('button', { name: 'Ir para Sobre mim', exact: true })
  if (isMobile) await about.focus()
  else await about.hover()
  await expect(about.getByRole('tooltip')).toBeVisible()
  await expect(about.getByRole('tooltip')).toHaveText('Sobre mim')
  const reduced = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const target = await page.locator('#sobre').evaluate(el => el.getBoundingClientRect().top + scrollY - 112)
  await about.click()
  if (!reduced) {
    const intermediate = await page.evaluate(() => scrollY)
    expect(intermediate).toBeLessThan(target - 100)
  }
  await expect.poll(() => page.locator('#sobre').evaluate(el => Math.abs(el.getBoundingClientRect().top - 112))).toBeLessThan(3)
  await expect(about).toHaveAttribute('aria-current', 'location')
  const contact = marks.getByRole('button', { name: 'Ir para Contato', exact: true })
  await contact.focus()
  await expect(contact.getByRole('tooltip')).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page.locator('#contato')).toBeInViewport()
  await expect(contact).toHaveAttribute('aria-current', 'location')
  const boxes = await marks.getByRole('button').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().toJSON()))
  for (let i = 1; i < boxes.length; i++) expect(boxes[i].top - boxes[i - 1].bottom).toBeGreaterThanOrEqual(-1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('clique na trilha é suave e a roda interrompe a navegação', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const rail = (await page.locator('.scroll-pill-track').boundingBox())!
  const maximum = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
  await page.mouse.click(rail.x + rail.width / 2, rail.y + rail.height * .8)
  expect(await page.evaluate(() => scrollY)).toBeLessThan(maximum * .6)
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(maximum * .7)
  await page.getByRole('button', { name: 'Ir para Início', exact: true }).click()
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(maximum * .65)
  await page.mouse.move(200, 200)
  await page.mouse.wheel(0, 150)
  // Wait past the tween's maximum duration to detect a stale animation taking over.
  await page.waitForTimeout(1400)
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(100)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('button', { name: 'Ir para Início', exact: true }).click()
  await expect(page.getByRole('scrollbar')).toHaveAttribute('aria-valuenow', '0')
})
