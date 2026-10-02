import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { products } from '../src/data/products'
import { featuredProjects, moreProjects } from '../src/data/portfolio'

// Real HTML entry points keep direct URLs and reloads working on static hosts.
const template = await readFile('dist/index.html', 'utf8')
const routes = [
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
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
  const destination = `dist/${route.path}`
  await mkdir(destination.slice(0, destination.lastIndexOf('/')), {
    recursive: true,
  })
  await writeFile(destination, html)
}
console.log(`Generated ${routes.length} static page entry points.`)
