import { tx } from "../i18n"
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import App from '../App'
import { useSectionReveal } from '../hooks/useSectionReveal'
import { usePointerMotion } from '../hooks/usePointerMotion'
import { SiteHeader, SiteFooter } from '../components/SiteChrome'
import { ProductArtwork } from '../components/ProductCard'
import { ArrowIcon, Asterisk } from '../components/Icons'
import { products } from '../data/products'
import { featuredProjects, moreProjects } from '../data/portfolio'
import { models } from '../data/models'
import type { TrainedModel } from '../data/models'
import { productStories } from '../data/productStories'
import './PortfolioPages.css'

const repositories = [...featuredProjects, ...moreProjects]
const homeDescription =
  'João Sousa, Tech Lead. Engenharia de software, sistemas de voz, mensageria, modelos de IA e ferramentas para desenvolvedores.'

function PageMeta({
  title,
  description,
}: {
  title: string
  description: string
}) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content')
    meta?.setAttribute('content', description)
    return () => {
      if (previous) meta?.setAttribute('content', previous)
    }
  }, [title, description])
  return null
}

function PageLayout({
  children,
  section,
}: {
  children: ReactNode
  section?: 'projects' | 'models'
}) {
  const main = useRef<HTMLElement>(null)
  useSectionReveal(
    main,
    '.project-cover, .repository-cover, .project-overview, .project-flow, .related-models, .models-grid, .page-closing',
  )
  return (
    <>
      <SiteHeader section={section} />
      <main
        ref={main}
        id="conteudo"
        tabIndex={-1}
        className="inner-page container"
      >
        {tx(children)}
      </main>
      <SiteFooter />
    </>
  )
}

function ModelArtwork({ model }: { model: TrainedModel }) {
  return (
    <div className={`model-art model-art--${model.id}`} aria-hidden="true">
      {model.id === 'lume' ? (
        <div className="language-sketch">
          <span>{tx("Intenção")}</span>
          <Asterisk />
          <span>{tx("Próximo passo")}</span>
        </div>
      ) : model.id === 'dalia' ? (
        <div className="document-sketch">
          <span>{tx("Documento")}</span>
          <i />
          <i />
          <i />
          <span>{tx("Campos → revisão")}</span>
        </div>
      ) : model.id === 'dit' ? (
        <div className="judgment-sketch">
          <span>{tx("Roteiro")}</span>
          <span>{tx("Transcrição")}</span>
          <strong>{tx("Julgamento")}<br />{tx("+ evidência")}</strong>
        </div>
      ) : (
        <div className="signal-sketch">
          <svg viewBox="0 0 360 110" fill="none">
            <path d="M0 75H360M0 40H360" stroke="currentColor" opacity=".15" />
            <path
              d="M0 62L28 60L36 45L44 88L54 18L62 64L88 60L116 64L132 36L146 85L158 12L168 62L194 59L214 66L235 30L247 86L260 22L272 58L296 63L324 49L344 57L360 50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {model.id === 'lira' && (
              <rect
                x="107"
                y="4"
                width="170"
                height="98"
                rx="20"
                stroke="currentColor"
                strokeDasharray="4 5"
              />
            )}
            {model.id === 'vita' && (
              <path
                d="M0 64Q100 48 180 59T360 42"
                stroke="currentColor"
                strokeDasharray="6 6"
                opacity=".5"
              />
            )}
          </svg>
          <span>
            {tx(model.id === 'lira'
              ? 'Vídeo → sinal'
              : model.id === 'vita'
                ? 'Histórico → tendência'
                : 'Sinais → sequências')}
          </span>
        </div>
      )}
    </div>
  )
}

function ModelCard({ model }: { model: TrainedModel }) {
  return (
    <article className={`model-card model-card--${model.id}`} id={model.id}>
      <ModelArtwork model={model} />
      <div className="model-card-body">
        <div className="model-meta">
          <a href={`/projetos/${model.projectId}`}>{tx(model.product)}</a>
          {model.status !== 'Em produção' && <span>{tx(model.status)}</span>}
        </div>
        <h2>{tx(model.name)}</h2>
        <p className="model-field">{tx(model.field)}</p>
        <p>{tx(model.description)}</p>
        <dl className="model-io">
          <div>
            <dt>{tx("Entrada")}</dt>
            <dd>{tx(model.input)}</dd>
          </div>
          <div>
            <dt>{tx("Saída")}</dt>
            <dd>{tx(model.output)}</dd>
          </div>
        </dl>
        <p className="model-context">{tx(model.context)}</p>
        <div className="page-actions">
          <a href={model.url}>{tx("Sobre")}{tx(model.name)}
            <ArrowIcon diagonal />
          </a>
          {model.reportUrl && (
            <a href={model.reportUrl}>{tx("Relatório técnico")}<ArrowIcon diagonal />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function ModelsPage() {
  const [filter, setFilter] = useState('Todos')
  const visible = models.filter(
    (model) => filter === 'Todos' || model.product === filter,
  )
  return (
    <PageLayout section="models">
      <PageMeta
        title={tx("Modelos treinados | João Sousa")}
        description={tx("Lume, Dália, Lira, Sonata, Vita e Dit 1: modelos e pesquisa aplicados ao Shamar e ao Cadence.")}
      />
      <div className="page-intro models-intro">
        <p className="page-kicker">{tx("Modelos treinados")}</p>
        <h1>{tx("Da pesquisa")}<br />{tx("ao produto.")}</h1>
        <p>{tx("Linguagem, documentos, vídeo e sinais. Os modelos que desenvolvo nas frentes do Shamar e do Cadence, com aplicações e estágios de evolução distintos.")}</p>
      </div>
      <div className="model-toolbar">
        <div
          className="model-filters"
          role="group"
          aria-label={tx("Filtrar modelos por produto")}
        >
          {['Todos', 'Shamar', 'Cadence'].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              aria-controls="model-results"
              onClick={() => setFilter(option)}
            >
              {tx(option)}
            </button>
          ))}
        </div>
        <p role="status">
          {tx(visible.length)} {tx(visible.length === 1 ? 'modelo' : 'modelos')}
        </p>
      </div>
      <div className="models-grid" id="model-results">
        {visible.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      <div className="page-closing">
        <p>{tx("Modelos fazem parte de sistemas.")}</p>
        <a href="/#projetos">{tx("Conheça os produtos onde esse trabalho acontece")}<ArrowIcon />
        </a>
      </div>
    </PageLayout>
  )
}

function ProjectPage({ id }: { id: string }) {
  const product = products.find((item) => item.id === id)
  const repository = repositories.find((item) => item.id === id)
  const project = product ?? repository
  if (!project) return <NotFoundPage />
  const story = product ? productStories[product.id] : undefined
  const relatedModels = models.filter((model) => model.projectId === id)
  const group = product ? products : repositories
  const next =
    group[(group.findIndex((item) => item.id === id) + 1) % group.length]
  return (
    <PageLayout section="projects">
      <PageMeta
        title={tx("{{value0}} | Projetos de João Sousa", {value0: tx(project.title)})}
        description={tx(project.description)}
      />
      <a
        className="page-back pill-link"
        href="/#projetos"
        aria-label={tx("Todos os projetos")}
      >
        <ArrowIcon direction="left" />{tx("Todos os projetos")}</a>
      <div className="page-intro project-intro">
        <p className="page-kicker">{tx(project.category)}</p>
        <h1>{tx(project.title)}</h1>
        <p>{tx(project.description)}</p>
        <div className="page-actions">
          {!product && (
            <span className="project-status-label">{tx("Código público")}</span>
          )}
          <a href={project.url}>
            {tx(product
              ? `Visitar ${project.title}`
              : `Código de ${project.title} no GitHub`)}
            <ArrowIcon diagonal />
          </a>
        </div>
      </div>
      {product ? (
        <div className={`project-cover product--${product.id}`}>
          <div className="product-visual">
            <span className="product-category">{tx(product.category)}</span>
            <span className="product-art" aria-hidden="true">
              <ProductArtwork id={product.id} />
            </span>
            <span className="cover-label">{tx(product.title)}</span>
          </div>
        </div>
      ) : (
        <div className="repository-cover">
          <span aria-hidden="true">
            {tx('{')}
            <Asterisk />
            {tx('}')}
          </span>
          <p>{repository?.technologies.join(' / ')}</p>
        </div>
      )}
      <section className="project-overview" aria-labelledby="overview-title">
        <h2 id="overview-title">
          {story?.title ?? 'O que este projeto resolve.'}
        </h2>
        <div>
          <p>{story?.description ?? project.description}</p>
          <p>{tx(project.detail)}</p>
          <ul className="project-features">
            {(product?.features ?? repository?.technologies ?? []).map(
              (feature) => (
                <li key={feature}>{tx(feature)}</li>
              ),
            )}
          </ul>
        </div>
      </section>
      {story && (
        <section className="project-flow" aria-labelledby="flow-title">
          <h2 id="flow-title">{tx("Como o produto funciona")}</h2>
          <ol>
            {story.steps.map((step) => (
              <li key={step.title}>
                <h3>{tx(step.title)}</h3>
                <p>{tx(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {story?.capabilities && (
        <section
          className="project-capabilities"
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title">{tx(story.capabilities.title)}</h2>
          <ul>
            {story.capabilities.items.map((item) => (
              <li key={item.title}>
                <h3>{tx(item.title)}</h3>
                <p>{tx(item.text)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {relatedModels.length > 0 && (
        <section
          className="related-models"
          aria-labelledby="related-models-title"
        >
          <div className="project-list-heading">
            <h2 id="related-models-title">{tx("Modelos por trás do produto")}</h2>
            <a href="/modelos">{tx("Todos os modelos")}</a>
          </div>
          <ul>
            {relatedModels.map((model) => (
              <li key={model.id}>
                <a href={`/modelos#${model.id}`}>
                  <strong>{tx(model.name)}</strong>
                  <span>{tx(model.field)}</span>
                  <span className="related-status">
                    {tx(model.status !== 'Em produção' ? model.status : null)}
                  </span>
                  <ArrowIcon diagonal />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {product?.links && (
        <div className="page-actions project-resources">
          {product.links.map((link) => (
            <a href={link.url} key={link.url}>
              {tx(link.label)}
              <ArrowIcon diagonal />
            </a>
          ))}
        </div>
      )}
      <nav className="next-project" aria-label={tx("Navegação entre projetos")}>
        <a href="/#projetos">{tx("Voltar aos projetos")}</a>
        {next && (
          <a href={`/projetos/${next.id}`}>
            <small>{tx("Próximo projeto")}</small>
            {tx(next.title)}
            <ArrowIcon />
          </a>
        )}
      </nav>
    </PageLayout>
  )
}

function NotFoundPage() {
  return (
    <PageLayout>
      <PageMeta
        title={tx("Página não encontrada | João Sousa")}
        description={tx("Explore os projetos e modelos de João Sousa.")}
      />
      <div className="page-intro">
        <p className="page-kicker">404</p>
        <h1>{tx("Página não")}<br />{tx("encontrada.")}</h1>
        <p>{tx("Este endereço não corresponde a um projeto do portfólio.")}</p>
        <a className="product-link" href="/">{tx("Voltar ao início")}<ArrowIcon />
        </a>
      </div>
    </PageLayout>
  )
}

export default function PortfolioRoutes() {
  usePointerMotion()
  useEffect(() => {
    if (!window.location.hash) return
    let cancelled = false
    // The browser can look for the fragment before React has mounted the cards.
    void document.fonts.ready.then(() => {
      if (cancelled) return
      const target = document.getElementById(window.location.hash.slice(1))
      target?.scrollIntoView({ behavior: 'instant', block: 'start' })
      target?.focus({ preventScroll: true })
    })
    return () => {
      cancelled = true
    }
  }, [])
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/')
    return (
      <>
        <PageMeta
          title={tx("João Sousa | Software, voz e IA")}
          description={tx(homeDescription)}
        />
        <App />
      </>
    )
  if (path === '/modelos') return <ModelsPage />
  const projectMatch = path.match(/^\/projetos\/([^/]+)$/)
  if (projectMatch) return <ProjectPage id={projectMatch[1] ?? ''} />
  return <NotFoundPage />
}
