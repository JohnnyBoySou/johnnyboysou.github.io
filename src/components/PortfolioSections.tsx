import { tx } from "../i18n"
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { capabilities, engineeringDecisions } from '../data/sections'
import { featuredProjects, moreProjects } from '../data/portfolio'
import { products } from '../data/products'
import { adilaProjects } from '../data/adila'
import { ArrowIcon } from './Icons'
import { CapabilityGlyph } from './CapabilityGlyph'
import './PortfolioSections.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const capabilityProjects = [
  ...[...products, ...featuredProjects, ...moreProjects].map(project => ({
    id: project.id, title: project.title, category: project.category,
    href: `/projetos/${project.id}`, external: false,
  })),
  ...adilaProjects.map(project => ({ ...project, href: project.url, external: true })),
]

export function CapabilitiesSection() {
  const [expanded, setExpanded] = useState<number | null>(0)

  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ScrollTrigger.refresh()
      }
    },
    { dependencies: [expanded] },
  )

  return (
    <section
      className="capabilities container"
      id="atuacao"
      aria-labelledby="atuacao-titulo"
    >
      <div className="capabilities-intro">
        <p className="section-kicker">{tx("Atuação técnica")}</p>
        <h2 id="atuacao-titulo">{tx("Sistemas que")}<br />{tx("eu construo.")}</h2>
        <p>{tx("Do produto que chega às pessoas às ferramentas de quem desenvolve. Construo sistemas de voz, IA e infraestrutura — e também editores, clientes desktop e componentes para criar o próximo sistema.")}</p>
        <a className="text-link" href="#contato">{tx("Conversar sobre um projeto")}<ArrowIcon diagonal />
        </a>
      </div>
      <div className="capability-list">
        {capabilities.map((capability, index) => (
          <div
            className="capability-item"
            key={capability.title}
            data-open={expanded === index}
          >
            <h3>
              <button
                className="capability-trigger"
                type="button"
                id={`capability-trigger-${index}`}
                aria-labelledby={`capability-title-${index}`}
                aria-describedby={`capability-summary-${index}`}
                aria-expanded={expanded === index}
                aria-controls={`capability-panel-${index}`}
                onClick={() =>
                  setExpanded((current) => (current === index ? null : index))
                }
              >
                <span className={`capability-symbol capability-symbol--${capability.glyph}`}><CapabilityGlyph kind={capability.glyph} /></span>
                <span className="capability-trigger-copy">
                  <span id={`capability-title-${index}`}>{tx(capability.title)}</span>
                  <small id={`capability-summary-${index}`}>{tx(capability.summary)}</small>
                </span>
                <span className="disclosure-icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="capability-panel"
              role="region"
              id={`capability-panel-${index}`}
              aria-labelledby={`capability-title-${index}`}
              aria-hidden={expanded !== index}
              inert={expanded !== index}
              onTransitionEnd={(event) => {
                if (
                  event.target === event.currentTarget &&
                  event.propertyName === 'grid-template-rows'
                ) {
                  ScrollTrigger.refresh()
                }
              }}
            >
              <div className="capability-panel-inner">
                <div className="capability-detail">
                  <p>{tx(capability.description)}</p>
                  <ul>
                    {capability.tags.map((tag) => (
                      <li key={tag}>{tx(tag)}</li>
                    ))}
                  </ul>
                  <div className="capability-projects">
                    <span>{tx("Na prática")}</span>
                    {capability.projectIds.map((id) => {
                      const project = capabilityProjects.find(
                        (item) => item.id === id,
                      )
                      return project ? (
                        <a key={id} href={project.href} target={project.external ? '_blank' : undefined} rel={project.external ? 'noreferrer' : undefined}>
                          <span><strong>{tx(project.title)}</strong><small>{tx(project.category)}</small></span>
                          <ArrowIcon diagonal />
                        </a>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DecisionSketch({
  decision,
}: {
  decision: (typeof engineeringDecisions)[number]
}) {
  return (
    <figure className={`decision-sketch decision-sketch--${decision.id}`}>
      <div className="decision-flow" aria-hidden="true">
        <span className="decision-input">{tx(decision.input)}</span>
        <span className="decision-connector" />
        <div className="decision-engine">
          {decision.id === 'queue' ? (
            <span className="decision-jobs">
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : decision.id === 'evidence' ? (
            <svg className="decision-wave" viewBox="0 0 180 40" fill="none">
              <path
                d="M0 20H20L28 12L36 31L45 5L54 35L64 13L74 23H95L105 9L115 32L126 14L138 24L150 20H180"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          ) : decision.id === 'export' ? (
            <span className="decision-query">{tx("SELECT …")}</span>
          ) : (
            <span className="decision-address">{tx("ari.cmd.shard-a")}</span>
          )}
          <strong>{tx(decision.engine)}</strong>
        </div>
        <span className="decision-connector" />
        <span className="decision-output">{tx(decision.output)}</span>
        {decision.id === 'routing' && (
          <span className="decision-aside">{tx("Uma chamada → o mesmo shard")}</span>
        )}
        {decision.id === 'queue' && (
          <span className="decision-aside">{tx("1 execução por vez")}</span>
        )}
        {decision.id === 'evidence' && (
          <span className="decision-aside">{tx("Evidência insuficiente → texto vazio")}</span>
        )}
        {decision.id === 'export' && (
          <span className="decision-aside">{tx("INSERT / UPDATE / DELETE → recusar")}</span>
        )}
      </div>
      <figcaption>{tx(decision.caption)}</figcaption>
    </figure>
  )
}

export function ProcessSection() {
  const [selected, setSelected] = useState(0)
  const section = useRef<HTMLElement>(null)
  const decision = engineeringDecisions[selected]

  useGSAP(() => ScrollTrigger.refresh(), {
    scope: section,
    dependencies: [selected],
  })

  return (
    <section
      className="process"
      id="processo"
      ref={section}
      aria-labelledby="processo-titulo"
    >
      <div className="container">
        <div className="process-heading">
          <div>
            <p className="section-kicker">{tx("Decisões de engenharia")}</p>
            <h2 id="processo-titulo">{tx("Cada sistema,")}<br />{tx("suas restrições.")}</h2>
          </div>
          <p>{tx("Estado, capacidade, evidência e integridade dos dados. Quatro decisões dos meus projetos e os compromissos por trás delas.")}</p>
        </div>
        <div
          className="decision-selector"
          role="group"
          aria-label={tx("Explorar decisões de engenharia")}
        >
          {engineeringDecisions.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-controls="engineering-decision"
              onClick={() => setSelected(index)}
            >
              <span>{tx(item.label)}</span>
              <small>{tx(item.project)}</small>
            </button>
          ))}
        </div>
        <div className="decision-case" id="engineering-decision">
          <DecisionSketch decision={decision} />
          <div className="decision-copy">
            <div aria-live="polite" aria-atomic="true">
              <h3>{tx(decision.title)}</h3>
              <dl className="decision-reasoning">
                <div>
                  <dt>{tx("A restrição")}</dt>
                  <dd>{tx(decision.constraint)}</dd>
                </div>
                <div>
                  <dt>{tx("A decisão")}</dt>
                  <dd>{tx(decision.decision)}</dd>
                </div>
                <div>
                  <dt>{tx("O compromisso")}</dt>
                  <dd>{tx(decision.tradeoff)}</dd>
                </div>
              </dl>
            </div>
            <a
              className="decision-project"
              href={`/projetos/${decision.projectId}`}
            >{tx("Explorar")}{tx(decision.project)} <ArrowIcon diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export { TechnologySection } from './TechnologySection'
