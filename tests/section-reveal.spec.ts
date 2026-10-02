import { expect, test } from '@playwright/test'

test('seção surge ao entrar na tela e não desaparece ao voltar', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  const about = page.locator('#sobre')
  await expect(about).toHaveCSS('opacity', '0')
  await page.evaluate(() => {
    const element = document.querySelector('#sobre')!
    window.scrollTo({
      top: scrollY + element.getBoundingClientRect().top - innerHeight * 0.65,
      behavior: 'instant',
    })
  })
  await expect
    .poll(() =>
      about.evaluate((el) => {
        const opacity = Number(getComputedStyle(el).opacity)
        return opacity > 0 && opacity < 1
      }),
    )
    .toBe(true)
  await expect(about).toHaveCSS('opacity', '1')
  await expect(about).toHaveCSS('transform', 'none')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await about.scrollIntoViewIfNeeded()
  await expect(about).toHaveCSS('opacity', '1')
  await expect(about).toHaveCSS('transform', 'none')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('foco e links diretos revelam o conteúdo sem esperar a animação', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const about = page.locator('#sobre')
  await expect(about).toHaveCSS('opacity', '0')
  const link = about.getByRole('link', {
    name: 'Trajetória profissional no LinkedIn',
  })
  await link.focus()
  await expect(link).toBeFocused()
  await expect(about).toHaveCSS('opacity', '1')
  await expect(about).toHaveCSS('transform', 'none')
  await page.goto('/#ia')
  await expect(page.locator('.ai-intro')).toHaveCSS('opacity', '1')
  await expect(page.locator('.ai-showcase')).toHaveCSS('opacity', '1')
  await page.goto('/modelos#dit')
  await expect(page.locator('.models-grid')).toHaveCSS('opacity', '1')
  await expect(page.locator('#dit')).toBeInViewport()
})

test('movimento reduzido restaura seções e funciona nas páginas internas', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/projetos/disk')
  const section = page.locator('.project-overview')
  await expect(section).toHaveCSS('opacity', '0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(section).toHaveCSS('opacity', '1')
  await expect(section).toHaveCSS('transform', 'none')
  await page.goto('/')
  await expect(page.locator('#sobre')).toHaveCSS('opacity', '1')
  await expect(page.locator('#sobre')).toHaveCSS('transform', 'none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('#sobre')).toHaveCSS('opacity', '0')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('#sobre')).toHaveCSS('opacity', '1')
})
