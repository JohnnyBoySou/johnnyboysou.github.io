import { tx } from "../i18n"
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '../data/portfolio'
import { ArrowIcon } from './Icons'
import './ProjectCard.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function ProjectArtwork({ kind }: { kind: Project['kind'] }) {
  if (kind === 'indexer') {
    return (
      <div className="index-art">
        <span className="index-root">{tx("repo/")}</span>
        <span className="index-connector" />
        <div className="index-files">
          <span>{tx("app.ts")}</span>
          <span>{tx("api.ts")}</span>
          <span>{tx("ui.tsx")}</span>
        </div>
        <span className="index-connector" />
        <span className="index-engine">{tx("wkix")}<span>{tx("Zig + tree-sitter")}</span>
        </span>
        <span className="index-connector" />
        <div className="index-output">
          <span>{tx("symbols.json")}</span>
          <span>{tx("import_graph.json")}</span>
        </div>
      </div>
    )
  }
  if (kind === 'speech') {
    return (
      <div className="speech-art">
        <div className="waveform">
          {[
            18, 30, 50, 38, 68, 90, 64, 45, 72, 100, 80, 48, 28, 55, 76, 49, 24,
            40, 60, 32, 16,
          ].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <span className="speech-endpoint">{tx("POST /transcribe")}</span>
        <div className="pipeline-nodes">
          <span>{tx("HTTP")}</span>
          <span>{tx("Redis")}</span>
          <span>{tx("Whisper")}</span>
        </div>
        <span className="speech-result">202 {tx('{ jobId }')}</span>
      </div>
    )
  }
  return (
    <div className="terminal-art">
      <span className="terminal-header">
        <span>{tx("nani")}</span>
        <span>{tx("~/project")}</span>
      </span>
      <div className="terminal-content">
        <span className="terminal-folder">{tx("▸ src/")}</span>
        <span> {tx("components/")}</span>
        <span className="terminal-selected">
          {tx(' ')}{tx("main.go")}<span>←</span>
        </span>
        <span> {tx("go.mod")}</span>
        <span> {tx("README.md")}</span>
        <span className="terminal-divider" />
        <span className="terminal-code">{tx("func main()")} {tx('{')}</span>
        <span className="terminal-code"> {tx("run()")}</span>
        <span className="terminal-code">{tx('}')}</span>
      </div>
      <span className="terminal-footer">{tx("↑↓ navegar")}<span>{tx("↵ abrir")}</span>
      </span>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const card = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      ScrollTrigger.refresh()
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        if (expanded)
          gsap.from('.project-details', { opacity: 0, y: 8, duration: 0.35 })
      })
      return () => media.revert()
    },
    { scope: card, dependencies: [expanded], revertOnUpdate: true },
  )

  return (
    <article className={`project-card project--${project.kind}`} ref={card}>
      <button
        className="project-visual"
        type="button"
        aria-label={tx("Detalhes de {{value0}}", {value0: tx(project.title)})}
        aria-expanded={expanded}
        aria-controls={`${project.id}-details`}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="project-category" aria-hidden="true">
          {tx(project.category)}
        </span>
        <span className="project-art" aria-hidden="true">
          <ProjectArtwork kind={project.kind} />
        </span>
        <span className="project-visual-footer" aria-hidden="true">
          <span>{tx(expanded ? 'Fechar detalhes' : 'Explorar arquitetura')}</span>
          <span className="project-toggle">{tx(expanded ? '−' : '+')}</span>
        </span>
      </button>
      <div className="project-caption">
        <div className="project-title-row">
          <h3>{tx(project.title)}</h3>
          <a
            href={project.url}
            aria-label={tx("Código de {{value0}} no GitHub", {value0: tx(project.title)})}
          >
            <ArrowIcon diagonal />
          </a>
        </div>
        <p>{tx(project.description)}</p>
        <ul className="project-technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{tx(technology)}</li>
          ))}
        </ul>
      </div>
      <div
        className="project-details"
        id={`${project.id}-details`}
        hidden={!expanded}
      >
        <p>{tx(project.detail)}</p>
        <a href={project.url}>{tx("Ler código e documentação")}<ArrowIcon diagonal />
        </a>
      </div>
    </article>
  )
}
