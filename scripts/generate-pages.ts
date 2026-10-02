import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { products } from '../src/data/products'
import { featuredProjects, moreProjects, profileLinks } from '../src/data/portfolio'

// Real HTML entry points keep direct URLs and reloads working on static hosts.
const template = await readFile('dist/index.html', 'utf8')
const origin = 'https://johnnyboysou.github.io'
const routes = [
  {
    path: 'index.html',
    title: 'João Sousa | Software, voz e IA',
    description: 'João Sousa, Tech Lead. Engenharia de software, sistemas de voz, mensageria, modelos de IA e ferramentas para desenvolvedores.',
  },
  {
    path: 'modelos/index.html',
    title: 'Modelos treinados | João Sousa',
    description:
      'Lume, Dália, Lira, Sonata, Vita e Dit 1: modelos e pesquisa aplicados ao Shamar e ao Cadence.',
  },
  ...[...products, ...featuredProjects, ...moreProjects].map((project) => ({
    path: `projetos/${project.id}/index.html`,
    title: `${project.title} | Projetos de João Sousa`,
    description: project.description,
  })),
  {
    path: '404.html',
    title: 'Página não encontrada | João Sousa',
    description: 'Explore os projetos e modelos de João Sousa.',
  },
]
function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        character
      ]!,
  )
}
for (const route of routes) {
  const url = `${origin}/${route.path.replace(/index\.html$/, '')}`
  const notFound = route.path === '404.html'
  const person = {
    '@type': 'Person',
    '@id': `${origin}/#joao-sousa`,
    name: 'João Sousa',
    jobTitle: 'Tech Lead',
    url: `${origin}/`,
    sameAs: [profileLinks.github, profileLinks.linkedin],
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': route.path === 'index.html' ? 'ProfilePage' : 'WebPage',
    url,
    name: route.title,
    description: route.description,
    inLanguage: 'pt-BR',
    ...(route.path === 'index.html' ? { mainEntity: person } : { author: person }),
  }
  const metadata = [
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow'}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="pt_BR" />',
    '<meta property="og:site_name" content="João Sousa" />',
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
    .replace('</head>', `    ${metadata}\n  </head>`)
  const destination = `dist/${route.path}`
  await mkdir(destination.slice(0, destination.lastIndexOf('/')), {
    recursive: true,
  })
  await writeFile(destination, html)
}
const locations = routes
  .filter(route => route.path !== '404.html')
  .map(route => `  <url><loc>${escapeHtml(`${origin}/${route.path.replace(/index\.html$/, '')}`)}</loc></url>`)
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.join('\n')}\n</urlset>\n`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
console.log(`Generated ${routes.length} static page entry points.`)
