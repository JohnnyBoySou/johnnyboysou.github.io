import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { capabilities, processSteps, technologies } from '../data/sections'
import { ArrowIcon, Asterisk } from './Icons'
import './PortfolioSections.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function CapabilitiesSection() {
  return (
    <section
      className="capabilities container"
      id="atuacao"
      aria-labelledby="atuacao-titulo"
    >
      <div className="capabilities-intro">
        <p className="section-kicker">Atuação técnica</p>
        <h2 id="atuacao-titulo">
          Sistemas que
          <br />
          eu construo.
        </h2>
        <p>
          Voz, mensageria, inferência e as ferramentas que mantêm tudo
          conectado.
        </p>
        <a className="text-link" href="#contato">
          Conversar sobre um projeto <ArrowIcon diagonal />
        </a>
      </div>
      <div className="capability-list">
        {capabilities.map((capability, index) => (
          <details
            name="capabilities"
            key={capability.title}
            open={index === 0}
            onToggle={() => ScrollTrigger.refresh()}
          >
            <summary>
              <span>{capability.title}</span>
              <span className="disclosure-icon" aria-hidden="true" />
            </summary>
            <div className="capability-detail">
              <p>{capability.description}</p>
              <ul>
                {capability.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function ProcessSketch({
  kind,
}: {
  kind: (typeof processSteps)[number]['sketch']
}) {
  if (kind === 'discover') {
    return (
      <div className="process-sketch sketch-discover" aria-hidden="true">
        <span className="idea-circle">serviços</span>
        <span className="idea-note note-one">controle</span>
        <span className="idea-note note-two">inferência</span>
        <span className="sketch-spark">✳</span>
      </div>
    )
  }
  if (kind === 'prototype') {
    return (
      <div className="process-sketch queue-sketch" aria-hidden="true">
        <span className="queue-label">Redis Stream</span>
        <div className="queue-jobs">
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="queue-gate">1 chamada por vez</span>
        <span className="queue-worker">Whisper / GPU</span>
      </div>
    )
  }

  return (
    <div className="process-sketch sketch-build" aria-hidden="true">
      <div className="build-window">
        <span className="build-window-top">
          <i />
          <i />
          <i />
        </span>
        <span className="build-code">
          {'job.status'}
          <br />
          <span>processing</span>
          <br />
          {'→ completed'}
        </span>
      </div>
      <span className="build-check">✓</span>
    </div>
  )
}

export function ProcessSection() {
  return (
    <section
      className="process"
      id="processo"
      aria-labelledby="processo-titulo"
    >
      <div className="container">
        <div className="process-heading">
          <div>
            <p className="section-kicker">Decisões de engenharia</p>
            <h2 id="processo-titulo">
              Cada sistema,
              <br />
              suas restrições.
            </h2>
          </div>
          <p>
            Separação de responsabilidades, controle de concorrência e
            visibilidade sobre cada etapa.
          </p>
        </div>
        <div className="process-track" aria-hidden="true">
          <span />
        </div>
        <ol className="process-steps">
          {processSteps.map((step, index) => (
            <li key={step.sketch}>
              <div className="step-meta">
                <span className="step-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{step.label}</span>
              </div>
              <ProcessSketch kind={step.sketch} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="process-note">
          <Asterisk />
          <p>Aceitar um job é diferente de concluir o processamento.</p>
        </div>
      </div>
    </section>
  )
}

export function TechnologySection() {
  const [selected, setSelected] = useState(0)
  const section = useRef<HTMLElement>(null)
  const technology = technologies[selected]

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.technology-emblem',
          { scale: 0.82, rotation: -12 },
          { scale: 1, rotation: 0, duration: 0.6, ease: 'power3.out' },
        )
      })
      return () => media.revert()
    },
    { scope: section, dependencies: [selected], revertOnUpdate: true },
  )

  return (
    <section
      className="technology"
      ref={section}
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
    >
      <div className="container technology-layout">
        <div className="technology-copy">
          <p className="section-kicker">Por trás da experiência</p>
          <h2 id="tecnologias-titulo">
            Minha stack.
            <br />
            <span>Cada peça, um papel.</span>
          </h2>
          <p>
            As linguagens e ferramentas que uso em serviços, modelos, produtos e
            infraestrutura.
          </p>
          <div
            className="technology-selector"
            role="group"
            aria-label="Escolher uma tecnologia"
          >
            {technologies.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected === index}
                aria-controls="technology-detail"
                onClick={() => setSelected(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="technology-playground">
          <div className="technology-art" aria-hidden="true">
            <div className="tech-orbit orbit-outer" />
            <div className="tech-orbit orbit-inner" />
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <span className="orbit-plus plus-one">+</span>
            <span className="orbit-plus plus-two">+</span>
            <span
              className="technology-emblem"
              style={{ backgroundColor: technology.color }}
            >
              {technology.symbol}
              <span>{technology.name}</span>
            </span>
            <span className="tech-art-caption">{technology.detail}</span>
          </div>
          <div
            className="technology-detail"
            id="technology-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3>{technology.role}</h3>
            <p>{technology.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
