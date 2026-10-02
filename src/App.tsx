import { useRef } from 'react'
import {
  portfolio,
  featuredProjects,
  moreProjects,
  profileLinks,
} from './data/portfolio'
import { ProjectCard } from './components/ProjectCard'
import { ArrowIcon, Asterisk } from './components/Icons'
import { usePortfolioMotion } from './hooks/usePortfolioMotion'
import {
  CapabilitiesSection,
  ProcessSection,
  TechnologySection,
} from './components/PortfolioSections'
import './App.css'

const currentYear = new Date().getFullYear()

function App() {
  const page = useRef<HTMLDivElement>(null)
  usePortfolioMotion(page)
  return (
    <div ref={page}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header container" id="inicio">
        <a
          className="wordmark"
          href="#inicio"
          aria-label={`${portfolio.fullName}, início`}
        >
          <Asterisk />
          {portfolio.name.toLowerCase()}
          <span className="wordmark-dot">.</span>
        </a>
        <nav aria-label="Navegação principal">
          <a className="nav-lab" href="#projetos">
            Projetos
          </a>
          <a className="pill-link" href="#sobre">
            Sobre mim
          </a>
          <a className="circle-link" href="#contato" aria-label="Contato">
            <ArrowIcon diagonal />
          </a>
        </nav>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <section className="hero container" aria-labelledby="titulo">
          <p className="hero-identity">
            <strong>{portfolio.fullName}</strong> / {portfolio.role}
          </p>
          <h1 id="titulo" aria-label="Voz, IA e software.">
            <span className="hero-line" aria-hidden="true">
              <span>Voz, IA e</span>
            </span>
            <span className="hero-line hero-line--last" aria-hidden="true">
              <span>
                software
                <Asterisk className="hero-asterisk" />.
              </span>
            </span>
          </h1>
          <p className="hero-description">
            Construo sistemas que conectam pessoas, modelos e produto.
            <br />
            <span>TypeScript, Go e Python. Da API ao worker.</span>
          </p>
        </section>
        <section
          className="lab container"
          id="projetos"
          aria-labelledby="lab-titulo"
        >
          <div className="lab-header">
            <h2 id="lab-titulo">
              <span className="status-dot" />
              Projetos com código aberto
            </h2>
            <span className="lab-rule" />
            <p>
              Arquitetura, implementação e documentação{' '}
              <span aria-hidden="true">↓</span>
            </p>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <p className="lab-footnote">
            Explore os detalhes de cada projeto ou abra o código no GitHub. Os
            diagramas ilustram a arquitetura; não são execuções ao vivo.
          </p>
          <nav className="section-nav" aria-label="Explorar o portfólio">
            <a href="#atuacao">
              Atuação técnica <ArrowIcon />
            </a>
            <a href="#processo">
              Decisões de engenharia <ArrowIcon />
            </a>
            <a href="#tecnologias">
              Stack de trabalho <ArrowIcon />
            </a>
          </nav>
          <div className="selected-projects">
            <div className="project-list-heading">
              <h2>Outros projetos públicos</h2>
              <a href={`${profileLinks.github}?tab=repositories`}>
                Todos os repositórios
              </a>
            </div>
            {moreProjects.map((project) => (
              <article key={project.id} className="project-row">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="circle-link"
                  href={project.url}
                  aria-label={`Código de ${project.title} no GitHub`}
                >
                  <ArrowIcon diagonal />
                </a>
              </article>
            ))}
          </div>
          <p className="professional-note">
            Parte do meu trabalho na LAI está em repositórios privados. Aqui
            estão os projetos públicos; a atuação com voz, mensageria e modelos
            está descrita no{' '}
            <a href={profileLinks.github}>meu perfil técnico</a>.
          </p>
        </section>
        <CapabilitiesSection />
        <ProcessSection />
        <section
          className="about container"
          id="sobre"
          aria-labelledby="sobre-titulo"
        >
          <div className="about-label">
            <span>
              {portfolio.fullName}
              <br />
              {portfolio.role}
            </span>
            <Asterisk className="about-orbit" />
          </div>
          <div className="about-content">
            <h2 id="sobre-titulo">
              Engenharia
              <br />
              de software.
              <br />
              <span>
                IA aplicada
                <br />a produto.
              </span>
            </h2>
            <div className="about-copy">
              <p>{portfolio.about}</p>
              <p>{portfolio.introduction}</p>
            </div>
            <ul className="stack" aria-label="Tecnologias principais">
              {portfolio.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <a className="about-profile-link" href={profileLinks.linkedin}>
              Trajetória profissional no LinkedIn <ArrowIcon diagonal />
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
              <span>Vamos falar de engenharia</span>
              <Asterisk />
            </div>
            <h2 id="contato-titulo">
              Qual problema
              <br />
              vamos resolver?
            </h2>
            <div className="contact-bottom">
              <div>
                <a className="contact-link" href={`mailto:${portfolio.email}`}>
                  Vamos conversar <ArrowIcon diagonal />
                </a>
                <span className="contact-email">{portfolio.email}</span>
              </div>
              <a className="back-top" href="#inicio">
                De volta ao topo <span aria-hidden="true">↑</span>
              </a>
            </div>
            <ul className="socials">
              {portfolio.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.url}>{social.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <a
          className="wordmark"
          href="#inicio"
          aria-label={`${portfolio.fullName}, início`}
        >
          {portfolio.name.toLowerCase()}.
        </a>
        <span>Software, sistemas em tempo real e IA aplicada.</span>
        <span>
          © {currentYear} {portfolio.fullName}
        </span>
      </footer>
    </div>
  )
}
export default App
