import { expect, test } from '@playwright/test'

test('carrega o perfil técnico com fonte local e sem overflow', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page).toHaveTitle('João Sousa | Software, voz e IA')
  await expect(
    page.getByRole('heading', { name: 'Voz, IA e software.' }),
  ).toBeVisible()
  await expect(page.locator('.hero-identity')).toContainText(
    'João Sousa / Tech Lead na LAI',
  )
  await expect(page.locator('.project-card').first()).toHaveCSS('opacity', '1')
  expect(
    await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      fontLoaded: [...document.fonts].some(
        (font) =>
          font.family.includes('Google Sans Flex') && font.status === 'loaded',
      ),
    })),
  ).toEqual({ overflow: false, fontLoaded: true })
  await page.getByRole('link', { name: 'Contato', exact: true }).click()
  await expect(page).toHaveURL(/#contato$/)
  await expect(
    page.getByRole('heading', { name: 'Qual problema vamos resolver?' }),
  ).toBeInViewport()
  expect(errors).toEqual([])
})

test('os projetos reais abrem e fecham seus detalhes de arquitetura', async ({
  page,
}) => {
  await page.goto('/')
  for (const project of ['wkix', 'worker-thoth', 'nani']) {
    const button = page.getByRole('button', {
      name: `Detalhes de ${project}`,
      exact: true,
    })
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator(`#${project}-details`)).toBeVisible()
    await expect(page.locator(`#${project}-details a`)).toHaveAttribute(
      'href',
      `https://github.com/JohnnyBoySou/${project}`,
    )
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator(`#${project}-details`)).toBeHidden()
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('teclado permite pular o menu, abrir projetos e acessar o código', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Pular para o conteúdo' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.keyboard.press('Tab')
  const project = page.getByRole('button', {
    name: 'Detalhes de wkix',
    exact: true,
  })
  await expect(project).toBeFocused()
  await expect(project).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(project).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Código de wkix no GitHub' }),
  ).toBeFocused()
})

test('movimento se adapta à preferência do sistema sem impedir leitura', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.project-card').first()).toHaveCSS('opacity', '1')
  const star = page.locator('.hero-asterisk')
  const original = await star.evaluate(
    (element) => getComputedStyle(element).transform,
  )
  await page.evaluate(() => window.scrollTo({ top: 550, behavior: 'instant' }))
  await expect
    .poll(() => star.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(original)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(star).toHaveCSS('transform', 'none')
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
  await expect(page.locator('.project--speech .project-visual')).toHaveCSS(
    'transform',
    'none',
  )
  await page
    .getByRole('button', { name: 'Detalhes de wkix', exact: true })
    .click()
  await expect(page.locator('#wkix-details')).toBeVisible()
  await expect(page.locator('#wkix-details')).toHaveCSS('transform', 'none')
})

test('atuação, decisões e stack refletem o trabalho técnico', async ({
  page,
}) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Explorar o portfólio' })
  await nav.getByRole('link', { name: 'Atuação técnica' }).click()
  await expect(page).toHaveURL(/#atuacao$/)
  const messaging = page
    .locator('details')
    .filter({
      has: page.locator('summary', { hasText: 'Mensageria e integrações' }),
    })
  await messaging.locator('summary').click()
  await expect(messaging).toHaveAttribute('open', '')
  await expect(messaging.getByText('HubSpot', { exact: true })).toBeVisible()
  await expect(page.locator('details').first()).not.toHaveAttribute('open')
  await messaging.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(messaging).not.toHaveAttribute('open')
  await nav.getByRole('link', { name: 'Decisões de engenharia' }).click()
  await expect(page).toHaveURL(/#processo$/)
  await expect(page.locator('.process-steps > li')).toHaveCount(3)
  await nav.getByRole('link', { name: 'Stack de trabalho' }).click()
  const selector = page.getByRole('group', { name: 'Escolher uma tecnologia' })
  for (const [name, heading] of [
    ['Go', 'Workers, concorrência e CLIs.'],
    ['Python', 'Modelos e pipelines de inferência.'],
    ['Dados e filas', 'Estado persistente e trabalho assíncrono.'],
    ['Tempo real', 'Chamadas, mídia e eventos.'],
    ['Infra e tooling', 'Operar e estender a plataforma.'],
    ['TypeScript', 'APIs, produto e ferramentas.'],
  ]) {
    const button = selector.getByRole('button', { name, exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(
      page
        .locator('#technology-detail')
        .getByRole('heading', { name: heading }),
    ).toBeVisible()
    await expect(selector.locator('[aria-pressed="true"]')).toHaveCount(1)
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('links públicos e contato têm os destinos reais', async ({ page }) => {
  await page.goto('/')
  for (const project of [
    'wkix',
    'worker-thoth',
    'nani',
    'worker-whisper',
    'bowser',
  ]) {
    await expect(
      page.getByRole('link', {
        name: `Código de ${project} no GitHub`,
        exact: true,
      }),
    ).toHaveAttribute('href', `https://github.com/JohnnyBoySou/${project}`)
  }
  await expect(
    page.getByRole('link', { name: 'Código de Walkmap no GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/adila-sh/walkmap')
  const contact = page.locator('#contato')
  await expect(
    contact.getByRole('link', { name: 'GitHub', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/JohnnyBoySou')
  await expect(
    contact.getByRole('link', { name: 'LinkedIn', exact: true }),
  ).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/jo%C3%A3o-sousa-8441321aa/',
  )
  await expect(
    contact.getByRole('link', { name: 'Vamos conversar' }),
  ).toHaveAttribute('href', 'mailto:joao.sousa@adila.co')
  await expect(
    page.getByText('Meus canais de contato chegam em breve.'),
  ).toHaveCount(0)
})
