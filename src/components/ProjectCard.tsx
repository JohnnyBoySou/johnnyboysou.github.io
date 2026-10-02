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
        <span className="index-root">repo/</span>
        <span className="index-connector" />
        <div className="index-files">
          <span>app.ts</span>
          <span>api.ts</span>
          <span>ui.tsx</span>
        </div>
        <span className="index-connector" />
        <span className="index-engine">
          wkix<span>Zig + tree-sitter</span>
        </span>
        <span className="index-connector" />
        <div className="index-output">
          <span>symbols.json</span>
          <span>import_graph.json</span>
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
        <span className="speech-endpoint">POST /transcribe</span>
        <div className="pipeline-nodes">
          <span>HTTP</span>
          <span>Redis</span>
          <span>Whisper</span>
        </div>
        <span className="speech-result">202 {'{ jobId }'}</span>
      </div>
    )
  }
  return (
    <div className="terminal-art">
      <span className="terminal-header">
        <span>nani</span>
        <span>~/project</span>
      </span>
      <div className="terminal-content">
        <span className="terminal-folder">▸ src/</span>
        <span> components/</span>
        <span className="terminal-selected">
          {' '}
          main.go <span>←</span>
        </span>
        <span> go.mod</span>
        <span> README.md</span>
        <span className="terminal-divider" />
        <span className="terminal-code">func main() {'{'}</span>
        <span className="terminal-code"> run()</span>
        <span className="terminal-code">{'}'}</span>
      </div>
      <span className="terminal-footer">
        ↑↓ navegar <span>↵ abrir</span>
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
        aria-label={`Detalhes de ${project.title}`}
        aria-expanded={expanded}
        aria-controls={`${project.id}-details`}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="project-category" aria-hidden="true">
          {project.category}
        </span>
        <span className="project-art" aria-hidden="true">
          <ProjectArtwork kind={project.kind} />
        </span>
        <span className="project-visual-footer" aria-hidden="true">
          <span>{expanded ? 'Fechar detalhes' : 'Explorar arquitetura'}</span>
          <span className="project-toggle">{expanded ? '−' : '+'}</span>
        </span>
      </button>
      <div className="project-caption">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <a
            href={project.url}
            aria-label={`Código de ${project.title} no GitHub`}
          >
            <ArrowIcon diagonal />
          </a>
        </div>
        <p>{project.description}</p>
        <ul className="project-technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
      <div
        className="project-details"
        id={`${project.id}-details`}
        hidden={!expanded}
      >
        <p>{project.detail}</p>
        <a href={project.url}>
          Ler código e documentação <ArrowIcon diagonal />
        </a>
      </div>
    </article>
  )
}
