import { tx } from "../i18n"
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { models } from '../data/models'
import { ArrowIcon, Asterisk } from './Icons'
import './AISection.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const practices = [
  {
    title: 'Treinamento e fine-tuning',
    description:
      'Trabalho com PyTorch e Transformers no treinamento e na adaptação de modelos, incluindo ajustes com PEFT/LoRA e TRL. A tarefa do produto orienta a especialização.',
    tools: ['PyTorch', 'Transformers', 'PEFT / LoRA', 'TRL'],
  },
  {
    title: 'Avaliação com contexto',
    description:
      'No Dit 1, a avaliação considera checkpoints, alcance da conversa e evidências. Nos modelos do Shamar, cada frente tem critérios e estágios próprios de pesquisa e validação.',
    tools: ['dit-bench', 'Qualidade do sinal', 'Revisão humana'],
  },
  {
    title: 'Inferência no produto',
    description:
      'Construo APIs e workers GPU para executar modelos, com filas, controle de concorrência e observabilidade. Serving e quantização fazem parte da engenharia de inferência.',
    tools: ['Workers GPU', 'FastAPI', 'Filas', 'Quantização'],
  },
]

export function AISection() {
  const [selectedId, setSelectedId] = useState('dit')
  const model = models.find((item) => item.id === selectedId)!
  const section = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      ScrollTrigger.refresh()
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ai-model-content', {
          opacity: 0,
          y: 6,
          duration: 0.28,
          ease: 'power2.out',
        })
      })
      return () => media.revert()
    },
    { scope: section, dependencies: [selectedId], revertOnUpdate: true },
  )

  return (
    <section
      className="ai-section container"
      id="ia"
      aria-labelledby="models-preview-title"
      ref={section}
    >
      <div className="ai-intro">
        <div>
          <p className="section-kicker">{tx("Treinamento, pesquisa e aplicação")}</p>
          <h2 id="models-preview-title">{tx("Modelos com")}<br />{tx("um propósito.")}</h2>
        </div>
        <div className="ai-intro-copy">
          <p className="ai-statement">{tx("Treino modelos e construo os sistemas que os colocam em operação.")}</p>
          <p>{tx("Meu trabalho com IA passa por treinamento, fine-tuning, avaliação e inferência. São frentes de linguagem, documentos, vídeo e séries temporais que se conectam ao cuidado no Shamar e à auditoria de conversas no Cadence.")}</p>
          <a className="product-link" href="/modelos">{tx("Explorar modelos treinados")}<ArrowIcon diagonal />
          </a>
        </div>
      </div>

      <div
        className="ai-model-picker"
        role="group"
        aria-label={tx("Escolher um modelo de IA")}
      >
        {models.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={tx(item.name)}
            aria-pressed={model.id === item.id}
            aria-controls="ai-model-detail"
            onClick={() => setSelectedId(item.id)}
          >
            <span>{tx(item.name)}</span>
            <small>{tx(item.product)}</small>
            <span className="ai-picker-mark" aria-hidden="true">
              {model.id === item.id ? <ArrowIcon diagonal /> : '+'}
            </span>
          </button>
        ))}
      </div>

      <div className={`ai-showcase ai-showcase--${model.id}`}>
        <div
          id="ai-model-detail"
          className="ai-model-content"
          role="region"
          aria-label={tx("Aplicação de {{value0}}", {value0: tx(model.name)})}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="ai-model-heading">
            <div>
              <p>{tx(model.field)}</p>
              <h3>{tx(model.name)}</h3>
            </div>
            {model.status !== 'Em produção' && (
              <span className="ai-model-stage">{tx(model.status)}</span>
            )}
          </div>
          <div className="ai-model-copy">
            <p className="ai-model-description">{tx(model.description)}</p>
            <p className="ai-model-context">{tx(model.context)}</p>
          </div>
          <div
            className="ai-flow"
            aria-label={tx("Fluxo de aplicação de {{value0}}", {value0: tx(model.name)})}
          >
            <div>
              <span className="ai-flow-label">{tx("Entrada")}</span>
              <p>{tx(model.input)}</p>
            </div>
            <div className="ai-flow-model">
              <Asterisk />
              <span>{tx(model.name)}</span>
              <small>{tx(model.product)}</small>
            </div>
            <div>
              <span className="ai-flow-label">{tx("Saída")}</span>
              <p>{tx(model.output)}</p>
            </div>
          </div>
          <div className="ai-model-links">
            <a href={`/modelos#${model.id}`}>{tx('Explorar {{name}}', { name: model.name })} <ArrowIcon diagonal />
            </a>
            <a href={`/projetos/${model.projectId}`}>
              {tx(model.product)} {tx("no portfólio")} <ArrowIcon diagonal />
            </a>
            {model.reportUrl && (
              <a href={model.reportUrl}>{tx("Ler relatório técnico")}<ArrowIcon diagonal />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="ai-practice-heading">
        <h3>{tx("Do treinamento")}<br />{tx("à operação.")}</h3>
        <p>{tx("Especialização do modelo, avaliação das saídas e integração com o sistema que vai utilizá-las.")}</p>
      </div>
      <div className="ai-practices">
        {practices.map((practice) => (
          <article key={practice.title}>
            <h4>{tx(practice.title)}</h4>
            <p>{tx(practice.description)}</p>
            <ul
              aria-label={tx("Tecnologias e práticas de {{value0}}", {value0: tx(practice.title).toLowerCase()})}
            >
              {practice.tools.map((tool) => (
                <li key={tool}>{tx(tool)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
