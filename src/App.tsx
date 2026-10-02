import { tx } from "./i18n"
import { useRef, useState } from 'react'
import { SiteHeader, SiteFooter } from './components/SiteChrome'
import {
  portfolio,
  featuredProjects,
  moreProjects,
  profileLinks,
  projectTags,
  type ProjectTag,
} from './data/portfolio'
import { AISection } from './components/AISection'
import { ProductCard } from './components/ProductCard'
import { products } from './data/products'
import './components/ProjectCard.css'
import { ArrowIcon, Asterisk } from './components/Icons'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'
import { useSectionReveal } from './hooks/useSectionReveal'
import {
  CapabilitiesSection,
  ProcessSection,
  TechnologySection,
} from './components/PortfolioSections'
import './App.css'
import { HeroMotifs } from './components/MotionGlyphs'
import { ChalkPortrait } from './components/ChalkPortrait'
import { ProductOwnership } from './components/ProductOwnership'

function App() {
  const page = useRef<HTMLDivElement>(null)
  const [projectFilter, setProjectFilter] = useState<ProjectTag | 'Todos'>(
    'Todos',
  )
  const filteredProjects = [...featuredProjects, ...moreProjects].filter(
    (project) =>
      projectFilter === 'Todos' || project.tags.includes(projectFilter),
  )
  usePortfolioMotion(page, projectFilter)
  useSectionReveal(
    page,
    '.selected-projects, .ownership > .container, .ai-intro, .ai-model-picker, .ai-showcase, .ai-practice-heading, .ai-practices, .capabilities, .process > .container, .about, .stack-heading, .contact > .container',
  )
  return (
    <div ref={page}>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1}>
        <section className="hero container" aria-labelledby="titulo">
          <p className="hero-identity">
            <strong>{tx(portfolio.fullName)}</strong> / {tx(portfolio.role)}
          </p>
          <h1 id="titulo" aria-label={tx("Software, tempo real e IA.")}>
            <span className="hero-line" aria-hidden="true">
              <span>{tx("Software,")}</span>
            </span>
            <span className="hero-line hero-line--last" aria-hidden="true">
              <span>{tx("tempo real e IA")}<Asterisk className="hero-asterisk" />.
              </span>
            </span>
          </h1>
          <p className="hero-description">{tx("Desenvolvo produtos, sistemas em tempo real e modelos de inteligência artificial, da pesquisa à aplicação.")}<br />
            <span>{tx("TypeScript, Go e Python. APIs, infraestrutura e inferência.")}</span>
          </p>
          <HeroMotifs />
        </section>
        <section
          className="lab container"
          id="projetos"
          aria-labelledby="lab-titulo"
        >
          <div className="lab-header">
            <h2 id="lab-titulo">{tx("Produtos que construí")}</h2>
            <span className="lab-rule" />
            <p>{tx("Produtos, IA e infraestrutura")}<span aria-hidden="true">↓</span>
            </p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="lab-footnote">{tx("Voz, cuidado, pagamentos, integrações e gestão de produto. Explore cada produto e conheça sua página pública.")}</p>
          {/* Catálogo Adila temporariamente oculto; componente e dados preservados. */}
          <nav className="section-nav" aria-label={tx("Explorar o portfólio")}>
            <a href="#produto-operacao">{tx("Produto e operação")}<ArrowIcon />
            </a>
            <a href="#ia">{tx("IA aplicada")}<ArrowIcon />
            </a>
            <a href="#atuacao">{tx("Atuação técnica")}<ArrowIcon />
            </a>
            <a href="#processo">{tx("Decisões de engenharia")}<ArrowIcon />
            </a>
            <a href="#tecnologias">{tx("Stack de trabalho")}<ArrowIcon />
            </a>
          </nav>
          {/* Temporarily hidden; keep the catalog and filters for reactivation. */}
          <div className="selected-projects" hidden>
            <div className="project-list-heading">
              <h2>{tx("Código aberto e ferramentas")}</h2>
              <a href={`${profileLinks.github}?tab=repositories`}>{tx("Todos os repositórios")}</a>
            </div>
            <div
              className="project-filters"
              role="group"
              aria-label={tx("Filtrar código aberto e ferramentas")}
            >
              {(['Todos', ...projectTags] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="project-filter"
                  aria-pressed={projectFilter === tag}
                  aria-controls="project-results"
                  onClick={() => setProjectFilter(tag)}
                >
                  {tx(tag)}
                </button>
              ))}
            </div>
            <p className="sr-only" role="status">
              {tx(filteredProjects.length)} {tx("projetos exibidos. Filtro:")}{' '}
              {tx(projectFilter)}.
            </p>
            <div id="project-results">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-row">
                  <div>
                    <h3>
                      <a
                        href={`/projetos/${project.id}`}
                        aria-label={tx("Ver projeto {{value0}}", {value0: tx(project.title)})}
                      >
                        {tx(project.title)}
                      </a>
                    </h3>
                    <p>{tx(project.description)}</p>
                    <ul>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{tx(technology)}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    className="circle-link"
                    href={project.url}
                    aria-label={tx("Código de {{value0}} no GitHub", {value0: tx(project.title)})}
                  >
                    <ArrowIcon diagonal />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ProductOwnership />
        <AISection />
        <CapabilitiesSection />
        <ProcessSection />
        <section
          className="about container"
          id="sobre"
          aria-labelledby="sobre-titulo"
        >
          <div className="about-label">
            <div className="about-identity">
              <strong>{tx(portfolio.fullName)}</strong>
              <span>{tx(portfolio.role)}</span>
            </div>
            <ChalkPortrait />
          </div>
          <div className="about-content">
            <h2 id="sobre-titulo">{tx("Engenharia")}<br />{tx("de software.")}<br />
              <span>{tx("IA aplicada")}<br />{tx("a produto.")}</span>
            </h2>
            <div className="about-copy">
              <p>{tx(portfolio.about)}</p>
              <p>{tx(portfolio.introduction)}</p>
            </div>
            <ul className="stack" aria-label={tx("Interesses pessoais")}>
              {portfolio.interests.map((interest) => (
                <li key={interest}>{tx(interest)}</li>
              ))}
            </ul>
            <a className="about-profile-link" href={profileLinks.linkedin}>{tx("Trajetória profissional no LinkedIn")}<ArrowIcon diagonal />
            </a>
          </div>
        </section>
        <TechnologySection />
        <section
          className="contact"
          id="contato"
          aria-labelledby="contato-titulo"
        >
          <div className="container">
            <div className="contact-top">
              <span>{tx("Vamos falar de engenharia")}</span>
              <Asterisk />
            </div>
            <h2 id="contato-titulo">{tx("Qual problema")}<br />{tx("vamos resolver?")}</h2>
            <p className="contact-description">{tx("Um produto novo, uma integração ou um desafio de engenharia. Me conte o que você tem em mente no meu WhatsApp profissional.")}</p>
            <div className="contact-bottom">
              <div>
                <div className="contact-actions">
                  <a
                    className="contact-link"
                    href={`${profileLinks.whatsapp}?text=${encodeURIComponent(tx(portfolio.whatsapp.message))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tx("Conversar no WhatsApp (abre em nova aba)")}
                  >{tx("Conversar no WhatsApp")}<ArrowIcon diagonal />
                  </a>
                  {portfolio.socials.map((social) => (
                    <a
                      key={social.label}
                      className="contact-link contact-link--social"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tx("{{value0}} (abre em nova aba)", {value0: tx(social.label)})}
                    >
                      {tx(social.label)} <ArrowIcon diagonal />
                    </a>
                  ))}
                </div>
                <div className="contact-email">
                  <span>{tx("Prefere e-mail?")}</span>
                  <a href={`mailto:${portfolio.email}`}>{tx(portfolio.email)}</a>
                </div>
              </div>
              <a className="back-top" href="#inicio">{tx("De volta ao topo")}<ArrowIcon direction="up" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
export default App
