import { expect, test } from '@playwright/test'

test('loading acompanha as fontes e libera a página sem progresso fictício', async ({ page }) => {
  let releaseFonts!: () => void
  const fonts = new Promise<void>(resolve => { releaseFonts = resolve })
  await page.route('**/*.woff2', async route => {
    await fonts
    await route.continue()
  })
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('#boot-loader')).toBeVisible()
    await expect(page.locator('#root')).toHaveAttribute('aria-busy', 'true')
    await expect(page.locator('#boot-loader')).not.toContainText('%')
    await expect(page.locator('.boot-name')).toHaveCSS('font-weight', '300')
    await expect(page.locator('.boot-track, .boot-caption, .boot-meta')).toHaveCount(0)
    await expect.poll(() => page.locator('#boot-loader').evaluate(el =>
      parseFloat((el as HTMLElement).style.getPropertyValue('--boot-fill')),
    )).toBeGreaterThan(0)
    const progress = await page.locator('#boot-loader').evaluate(el =>
      parseFloat((el as HTMLElement).style.getPropertyValue('--boot-fill')),
    )
    expect(progress).toBeLessThan(100)
    expect(await page.locator('.boot-name').evaluate(el => {
      const range = document.createRange()
      range.selectNodeContents(el)
      const bounds = range.getBoundingClientRect()
      return bounds.left >= 0 && bounds.right <= innerWidth
    })).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  } finally {
    releaseFonts()
  }
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  await expect(page.locator('#boot-loader')).toHaveCount(0)
  await expect(page.locator('#root')).toHaveAttribute('aria-busy', 'false')
  await expect(page.getByRole('heading', { name: 'Software, tempo real e IA.' })).toBeVisible()
})

test('fontes lentas não bloqueiam navegação por teclado', async ({ page }) => {
  let releaseFonts!: () => void
  const fonts = new Promise<void>(resolve => { releaseFonts = resolve })
  await page.route('**/*.woff2', async route => { await fonts; await route.continue() })
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('#boot-loader')).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
    await expect(page.locator('#boot-loader')).toHaveCount(0)
    await page.keyboard.press('Enter')
    await expect(page.locator('main')).toBeFocused()
    await expect(page.locator('.product-card').first()).toHaveCSS('opacity', '1')
  } finally {
    releaseFonts()
  }
})

test('falha no download oferece recarregar em vez de loading infinito', async ({ page }) => {
  await page.clock.install()
  await page.route('**/assets/*.js', route => route.abort())
  await page.goto('/')
  await page.clock.fastForward(8100)
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'error')
  await expect(page.getByRole('link', { name: 'Recarregar página' })).toBeVisible()
  await expect(page.locator('#boot-error')).toBeVisible()
})

test('SVGs e shimmer respondem ao foco sem mover o conteúdo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  await expect(page.locator('.hero-motifs svg')).toHaveCount(3)
  const card = page.getByRole('link', { name: 'Ver projeto Disk', exact: true })
  await expect(page.locator('.product-card').first()).toHaveCSS('opacity', '1')
  const before = await card.boundingBox()
  await card.focus()
  await expect(card).toBeFocused()
  expect(await card.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('card-shimmer')
  const after = await card.boundingBox()
  expect(after?.width).toBe(before?.width)
  expect(after?.height).toBe(before?.height)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projetos\/disk\/?$/)
})

test('movimento reduzido remove shimmer e animações do loading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' })
  let releaseFonts!: () => void
  const fonts = new Promise<void>(resolve => { releaseFonts = resolve })
  await page.route('**/*.woff2', async route => { await fonts; await route.continue() })
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(await page.locator('.boot-name').evaluate(el => getComputedStyle(el, '::after').transitionDuration)).toBe('0s')
    await expect(page.locator('#boot-loader')).toHaveCSS('background-color', 'rgb(20, 25, 35)')
  } finally {
    releaseFonts()
  }
  await expect(page.locator('#boot-loader')).toHaveCount(0)
  const card = page.getByRole('link', { name: 'Ver projeto Disk', exact: true })
  await card.focus()
  expect(await card.evaluate(el => getComputedStyle(el, '::after').display)).toBe('none')
  expect(await card.locator('.product-visual-footer svg').evaluate(el => {
    const transform = getComputedStyle(el).transform
    return new DOMMatrixReadOnly(transform === 'none' ? undefined : transform).isIdentity
  })).toBe(true)
})
