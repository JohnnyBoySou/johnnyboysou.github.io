import { expect, test } from '@playwright/test'

test('destaque de IA permite explorar os seis modelos e abrir seus detalhes', async ({
  page,
}) => {
  await page.goto('/')
  const section = page.locator('#ia')
  await page
    .getByRole('navigation', { name: 'Explorar o portfólio' })
    .getByRole('link', { name: 'IA aplicada', exact: true })
    .click()
  await expect(
    section.getByRole('heading', { name: 'Modelos com um propósito.' }),
  ).toBeInViewport()
  const selector = section.getByRole('group', {
    name: 'Escolher um modelo de IA',
  })
  await expect(
    selector.getByRole('button', { name: 'Dit 1', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(
    section.getByRole('link', { name: 'Ler relatório técnico' }),
  ).toHaveAttribute('href', 'https://cadence.lai.ia.br/dit/relatorio-tecnico')
  for (const [id, name, status] of [
    ['lume', 'Lume', 'Em pesquisa'],
    ['dalia', 'Dália', 'Integrado à plataforma'],
    ['lira', 'Lira', 'Em avaliação'],
    ['sonata', 'Sonata', 'Pesquisa inicial'],
    ['vita', 'Vita', 'Protótipo funcional'],
    ['dit', 'Dit 1', ''],
  ]) {
    const button = selector.getByRole('button', { name, exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toBeFocused()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(selector.locator('[aria-pressed="true"]')).toHaveCount(1)
    const detail = section.getByRole('region', { name: `Aplicação de ${name}` })
    await expect(
      detail.getByRole('heading', { name, exact: true }),
    ).toBeVisible()
    if (status) await expect(detail).toContainText(status)
    await expect(detail.getByText('Entrada', { exact: true })).toBeVisible()
    await expect(detail.getByText('Saída', { exact: true })).toBeVisible()
    await expect(
      detail.getByRole('link', { name: `Explorar ${name}`, exact: true }),
    ).toHaveAttribute('href', `/modelos#${id}`)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
  }
  await section
    .getByRole('link', { name: 'Explorar Dit 1', exact: true })
    .click()
  await expect(page).toHaveURL(/\/modelos#dit$/)
  await expect(page.locator('#dit')).toBeInViewport()
})

test('painel de IA permanece legível no tema escuro e com movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/#ia')
  const selector = page.getByRole('group', { name: 'Escolher um modelo de IA' })
  await selector.getByRole('button', { name: 'Dália', exact: true }).click()
  await expect(page.locator('#ai-model-detail')).toHaveCSS('opacity', '1')
  await expect(page.locator('#ai-model-detail')).toHaveCSS('transform', 'none')
  await expect(page.locator('#ai-model-detail')).toContainText(
    'confirma os dados antes da aplicação',
  )
  await expect(
    page
      .locator('#ia')
      .getByRole('heading', { name: 'Treinamento e fine-tuning' }),
  ).toBeVisible()
  await expect(
    page
      .locator('#ia')
      .getByRole('heading', { name: 'Avaliação com contexto' }),
  ).toBeVisible()
  await expect(
    page.locator('#ia').getByRole('heading', { name: 'Inferência no produto' }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})
