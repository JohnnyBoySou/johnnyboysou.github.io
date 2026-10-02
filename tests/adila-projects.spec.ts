import { expect, test } from '@playwright/test'

const featured = [
  ['adila-pay', 'Adila Pay', 'https://pay.adila.co'],
  ['adila-webhooks', 'Adila Webhooks', 'https://webhooks.adila.co'],
  ['adila-queues', 'Adila Queues', 'https://queues.adila.co'],
  ['adila-orbit', 'Adila Orbit', 'https://orbit.adila.co'],
] as const

test('novos projetos abrem páginas próprias com fluxo e destino público', async ({ page }) => {
  await page.goto('/')
  for (const [id, title, url] of featured) {
    const card = page.getByRole('link', { name: `Ver projeto ${title}`, exact: true })
    await expect(card.locator('.adila-art')).toHaveCount(1)
    await card.click()
    await expect(page).toHaveURL(new RegExp(`/projetos/${id}$`))
    await expect(page.getByRole('heading', { name: title, level: 1, exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Como o produto funciona' })).toBeVisible()
    await expect(page.locator('.project-flow li')).toHaveCount(3)
    await expect(page.getByRole('link', { name: `Visitar ${title}` })).toHaveAttribute('href', url)
    await expect(page.locator('.project-cover .adila-art')).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const response = await page.reload()
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(`${title} | Projetos de João Sousa`)
    await page.getByRole('link', { name: 'Todos os projetos', exact: true }).click()
    await expect(page).toHaveURL(/\/#projetos$/)
  }
})

test('catálogo permanece oculto sem remover os projetos em destaque', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#ecossistema-adila')).toHaveCount(0)
  await expect(page.locator('.product-card')).toHaveCount(9)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('HTML das novas rotas preserva título e descrição em acesso direto', async ({ request }) => {
  for (const [id, title] of featured) {
    const response = await request.get(`/projetos/${id}/`)
    expect(response.status()).toBe(200)
    const html = await response.text()
    expect(html).toContain(`<title>${title} | Projetos de João Sousa</title>`)
    expect(html).toMatch(/<meta\s+name="description"\s+content="[^"]+"/)
  }
})
