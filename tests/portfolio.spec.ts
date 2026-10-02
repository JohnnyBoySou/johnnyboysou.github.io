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
    page.getByRole('heading', { name: 'Software, tempo real e IA.' }),
  ).toBeVisible()
  await expect(page.locator('.hero-identity')).toContainText(
    'João Sousa / Tech Lead',
  )
  await expect(page.locator('.product-card').first()).toHaveCSS('opacity', '1')
  expect(
    await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      fontLoaded: [...document.fonts].some(
        (font) =>
          font.family.includes('Google Sans Flex') && font.status === 'loaded',
      ),
    })),
  ).toEqual({ overflow: false, fontLoaded: true })
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.getByRole('link', { name: 'Contato', exact: true }).click()
  await expect(page).toHaveURL(/#contato$/)
  await expect(
    page.getByRole('heading', { name: 'Qual problema vamos resolver?' }),
  ).toBeInViewport()
  expect(errors).toEqual([])
})

test('os cinco produtos abrem suas páginas próprias e permitem voltar', async ({
  page,
}) => {
  await page.goto('/')
  for (const [id, title] of [
    ['disk', 'Disk'],
    ['meetcore', 'MeetCore'],
    ['cadence', 'Cadence'],
    ['connect', 'Connect'],
    ['shamar', 'Meu Shamar'],
  ]) {
    await page
      .locator('.products-grid')
      .getByRole('link', { name: `Ver projeto ${title}`, exact: true })
      .click()
    await expect(page).toHaveURL(new RegExp(`/projetos/${id}$`))
    await expect(
      page.getByRole('heading', { level: 1, name: title, exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Como o produto funciona' }),
    ).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    await page
      .getByRole('link', { name: 'Todos os projetos', exact: true })
      .click()
    await expect(page).toHaveURL(/\/#projetos$/)
  }
})

test('teclado permite pular o menu, abrir produtos e acessar a página pública', async ({
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
  const project = page.getByRole('link', {
    name: 'Ver projeto Disk',
    exact: true,
  })
  await expect(project).toBeFocused()
  await expect(project).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projetos\/disk$/)
  await expect(
    page.getByRole('heading', { name: 'Disk', exact: true, level: 1 }),
  ).toBeVisible()
})

test('movimento se adapta à preferência do sistema sem impedir leitura', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.product-card').first()).toHaveCSS('opacity', '1')
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
  await expect(page.locator('.product--meetcore .product-art')).toHaveCSS(
    'transform',
    'none',
  )
  await page
    .getByRole('link', { name: 'Ver projeto Disk', exact: true })
    .click()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Disk', exact: true }),
  ).toBeVisible()
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto')
})

test('atuação, decisões e stack refletem o trabalho técnico', async ({
  page,
}) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Explorar o portfólio' })
  await nav.getByRole('link', { name: 'Atuação técnica' }).click()
  await expect(page).toHaveURL(/#atuacao$/)
  const messaging = page.locator('.capability-item').filter({
    has: page.getByRole('button', { name: 'Mensageria e integrações' }),
  })
  await messaging.getByRole('button').click()
  await expect(messaging.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  await expect(messaging.getByText('HubSpot', { exact: true })).toBeVisible()
  await expect(page.locator('.capability-trigger').first()).toHaveAttribute('aria-expanded', 'false')
  await messaging.getByRole('button').focus()
  await page.keyboard.press('Enter')
  await expect(messaging.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  await nav.getByRole('link', { name: 'Decisões de engenharia' }).click()
  await expect(page).toHaveURL(/#processo$/)
  const decisions = page.getByRole('group', { name: 'Explorar decisões de engenharia' })
  for (const [name, title, project] of [
    ['Telefonia worker-ari-go', 'Uma chamada precisa de um dono.', 'worker-ari-go'],
    ['Capacidade worker-thoth', 'A fila absorve o trabalho. A GPU tem limite.', 'worker-thoth'],
    ['Evidência worker-stt', 'Pouca evidência também é uma resposta.', 'worker-stt'],
    ['Dados Adila SQL', 'Exportar não pode repetir uma escrita.', 'sql'],
  ]) {
    const button = decisions.getByRole('button', { name, exact: true })
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(decisions.locator('[aria-pressed="true"]')).toHaveCount(1)
    await expect(page.locator('#engineering-decision h3')).toHaveText(title)
    await expect(page.locator('#engineering-decision .decision-project')).toHaveAttribute('href', `/projetos/${project}`)
  }
  await nav.getByRole('link', { name: 'Stack de trabalho' }).click()
  const filters = page.getByRole('group', { name: 'Filtrar tecnologias por área' })
  await filters.getByRole('button', { name: 'Infraestrutura', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(filters.getByRole('button', { name: 'Infraestrutura', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.stack-card').first().getByRole('heading')).toHaveText('Docker')
  await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('links públicos e contato têm os destinos reais', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.selected-projects')).toBeHidden()
  await expect(page.getByRole('group', { name: 'Filtrar código aberto e ferramentas' })).toHaveCount(0)
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
        includeHidden: true,
      }),
    ).toHaveAttribute('href', `https://github.com/JohnnyBoySou/${project}`)
  }
  await expect(
    page.getByRole('link', { name: 'Código de Walkmap no GitHub', includeHidden: true }),
  ).toHaveAttribute('href', 'https://github.com/adila-sh/walkmap')
  const contact = page.locator('#contato')
  await expect(
    contact.getByRole('link', { name: 'GitHub (abre em nova aba)', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/JohnnyBoySou')
  await expect(
    contact.getByRole('link', { name: 'LinkedIn (abre em nova aba)', exact: true }),
  ).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/jo%C3%A3o-sousa-8441321aa/',
  )
  await expect(
    contact.getByRole('link', { name: 'dev.joaosousa@gmail.com', exact: true }),
  ).toHaveAttribute('href', 'mailto:dev.joaosousa@gmail.com')
  const whatsapp = contact.getByRole('link', {
    name: 'Conversar no WhatsApp (abre em nova aba)',
    exact: true,
  })
  const whatsappUrl = new URL((await whatsapp.getAttribute('href'))!)
  expect(whatsappUrl.origin).toBe('https://wa.me')
  expect(whatsappUrl.pathname).toBe('/5549991935657')
  expect(whatsappUrl.searchParams.get('text')).toBe(
    'Olá, João! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
  )
  await expect(whatsapp).toHaveAttribute('target', '_blank')
  await expect(
    page.getByText('Meus canais de contato chegam em breve.'),
  ).toHaveCount(0)
})

test('produtos têm links públicos e o Shamar distingue os estágios dos modelos', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.product-card')).toHaveCount(9)
  for (const [name, url] of [
    ['Disk', 'https://disk.lai.ia.br'],
    ['MeetCore', 'https://meetcore.lai.ia.br'],
    ['Cadence', 'https://cadence.lai.ia.br'],
    ['Connect', 'https://connect.lai.ia.br'],
    ['Meu Shamar', 'https://meushamar.com.br'],
  ]) {
    await expect(
      page.getByRole('link', { name: `Conhecer ${name}`, exact: true }),
    ).toHaveAttribute('href', url)
  }
  await page
    .getByRole('link', { name: 'Ver projeto Meu Shamar', exact: true })
    .click()
  const details = page.locator('main')
  await expect(details).toContainText('revisão humana')
  for (const [name, status] of [
    ['Lume', 'Em pesquisa'],
    ['Dália', 'Integrado à plataforma'],
    ['Lira', 'Em avaliação'],
    ['Sonata', 'Pesquisa inicial'],
    ['Vita', 'Protótipo funcional'],
  ]) {
    await expect(
      details
        .locator('.related-models')
        .getByRole('listitem')
        .filter({ hasText: name }),
    ).toContainText(status)
  }
  await expect(
    details.getByRole('link', { name: 'Solução para clínicas' }),
  ).toHaveAttribute('href', 'https://meushamar.com.br/para-clinicas')
  await expect(
    details.getByRole('link', { name: 'Modelos de IA' }),
  ).toHaveAttribute('href', 'https://meushamar.com.br/modelos')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})

test('aba de modelos filtra por produto, funciona pelo teclado e liga ao projeto', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Modelos', exact: true })
    .click()
  await expect(page).toHaveURL(/\/modelos$/)
  await expect(page).toHaveTitle('Modelos treinados | João Sousa')
  await expect(page.locator('.model-card')).toHaveCount(6)
  const filters = page.getByRole('group', {
    name: 'Filtrar modelos por produto',
  })
  await filters.getByRole('button', { name: 'Shamar', exact: true }).click()
  await expect(page.locator('.model-card')).toHaveCount(5)
  await expect(page.getByRole('status')).toHaveText('5 modelos')
  await filters.getByRole('button', { name: 'Cadence', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.model-card')).toHaveCount(1)
  await expect(
    page.getByRole('heading', { name: 'Dit 1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Relatório técnico', exact: true }),
  ).toHaveAttribute('href', 'https://cadence.lai.ia.br/dit/relatorio-tecnico')
  await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await filters.getByRole('button', { name: 'Todos', exact: true }).click()
  await expect(page.locator('.model-card')).toHaveCount(6)
  await page
    .locator('#dit')
    .getByRole('link', { name: 'Cadence', exact: true })
    .click()
  await expect(page).toHaveURL(/\/projetos\/cadence$/)
  await page.getByRole('link', { name: /Dit 1 Auditoria de conversas/ }).click()
  await expect(page).toHaveURL(/\/modelos#dit$/)
  await expect(page.locator('#dit')).toBeInViewport()
})

test('rotas diretas, atualização, histórico e páginas de código aberto', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const [id, title] of [
    ['disk', 'Disk'],
    ['meetcore', 'MeetCore'],
    ['cadence', 'Cadence'],
    ['connect', 'Connect'],
    ['shamar', 'Meu Shamar'],
    ['wkix', 'wkix'],
    ['worker-thoth', 'worker-thoth'],
    ['nani', 'nani'],
    ['walkmap', 'Walkmap'],
    ['worker-whisper', 'worker-whisper'],
    ['bowser', 'bowser'],
  ]) {
    await page.goto(`/projetos/${id}`)
    await expect(page).toHaveTitle(`${title} | Projetos de João Sousa`)
    await expect(
      page.getByRole('heading', { name: title, exact: true, level: 1 }),
    ).toBeVisible()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
  }
  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'bowser', exact: true, level: 1 }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Próximo projeto wkix' }).click()
  await expect(page).toHaveURL(/\/projetos\/wkix$/)
  await page.goBack()
  await expect(page).toHaveURL(/\/projetos\/bowser$/)
  await page.goForward()
  await expect(page).toHaveURL(/\/projetos\/wkix$/)
  await page.goto('/projetos/nao-existe')
  await expect(
    page.getByRole('heading', { name: 'Página não encontrada.' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Voltar ao início' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(
    'Software, tempo real e IA.',
  )
  expect(errors).toEqual([])
})
