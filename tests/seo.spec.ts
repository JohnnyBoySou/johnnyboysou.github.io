import { expect, test } from '@playwright/test'

test('HTML direto, sitemap e robots apresentam URLs e metadados consistentes', async ({ request }) => {
  const origin = 'https://johnnyboysou.github.io'
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`)
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const locations = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  expect(locations).toContain(`${origin}/`)
  expect(locations).toContain(`${origin}/modelos/`)
  expect(locations).not.toContain(`${origin}/404.html`)
  expect(new Set(locations).size).toBe(locations.length)
  for (const url of locations) {
    const response = await request.get(new URL(url).pathname)
    expect(response.status(), url).toBe(200)
    const html = await response.text()
    expect(html).toContain(`<link rel="canonical" href="${url}"`)
    expect(html).toContain(`<meta property="og:url" content="${url}"`)
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)![1])
    expect(schema.url).toBe(url)
    expect(schema.name).toBeTruthy()
    expect(schema.description).toBeTruthy()
    expect(schema.mainEntity?.name ?? schema.author?.name).toBe('João Sousa')
  }
  expect(await (await request.get('/404.html')).text()).toContain('content="noindex, follow"')
})

test('retratos não competem com o carregamento inicial e chegam ao aproximar a seção', async ({ page }) => {
  const images: string[] = []
  page.on('request', request => {
    if (request.url().includes('joao-sousa-chalk')) images.push(request.url())
  })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-boot', 'ready')
  expect(images).toHaveLength(0)
  await page.locator('.chalk-portrait').scrollIntoViewIfNeeded()
  await expect.poll(() => images.length).toBeGreaterThan(0)
  expect(images.every(url => url.endsWith('.webp'))).toBe(true)
  await expect(page.locator('.chalk-portrait')).toBeInViewport()
})
