import { tx } from "../i18n"
import { ArrowIcon } from './Icons'
import { products } from '../data/products'
import './ProductOwnership.css'

const responsibilities = [
  {
    id: 'produto',
    label: 'Produto e sucesso do cliente',
    title: 'Começa no problema. Continua no uso.',
    description:
      'Conecto visão de produto, experiência e engenharia para transformar uma necessidade em algo que faça parte da rotina do cliente.',
    items: [
      {
        title: 'Definir o que vale construir',
        text: 'Entender o contexto, priorizar a dor e definir o resultado esperado. Equilibrar valor para o cliente, esforço de entrega e direção do negócio.',
      },
      {
        title: 'Construir o roadmap e coordenar a equipe',
        text: 'Traduzir prioridades em um roadmap de entregas, com etapas, dependências e critérios de conclusão. Alinhar responsabilidades com a equipe, acompanhar a execução e remover impedimentos para manter as entregas conectadas ao resultado esperado.',
      },
      {
        title: 'Cuidar da jornada inteira',
        text: 'Do primeiro acesso à tarefa concluída: onboarding, interface, integrações e suporte precisam ajudar o cliente a chegar ao resultado.',
      },
      {
        title: 'Evoluir com quem usa',
        text: 'Olhar para ativação, uso recorrente e pontos de atrito. Transformar feedback e dificuldades do atendimento em prioridades de produto.',
      },
    ],
  },
  {
    id: 'operacao',
    label: 'Infraestrutura e eficiência',
    title: 'Confiabilidade para crescer. Critério para gastar.',
    description:
      'Assumo também a operação: ambientes, serviços, deploys e observabilidade. Capacidade e custo entram nas decisões desde o desenho da solução.',
    items: [
      {
        title: 'Gerenciar a infraestrutura',
        text: 'Organizar ambientes e serviços, acompanhar deploys e investigar falhas com logs e rastreamento. Manter visibilidade sobre o que sustenta cada produto.',
      },
      {
        title: 'Observabilidade e tratamento de erros',
        text: 'Instrumentar serviços com OpenTelemetry, acompanhar métricas no Prometheus e visualizar a operação no Grafana. Usar Sentry para capturar exceções, priorizar falhas pelo impacto e investigar a causa com contexto, acompanhando a correção.',
      },
      {
        title: 'Dimensionar pela demanda',
        text: 'Separar APIs de tarefas pesadas, controlar concorrência e distribuir trabalho em filas. Escolher recursos de CPU, GPU e armazenamento conforme a carga.',
      },
      {
        title: 'Reduzir desperdício e custos',
        text: 'Revisar recursos ociosos, retenção de dados e chamadas a provedores. Acompanhar consumo e cobrança para otimizar gastos preservando a experiência do cliente.',
      },
    ],
  },
]

export function ProductOwnership() {
  return (
    <section className="ownership" id="produto-operacao" aria-labelledby="ownership-title">
      <div className="container">
        <div className="ownership-heading">
          <div>
            <p className="section-kicker">{tx("Produto, cliente e operação")}</p>
            <h2 id="ownership-title">{tx("Produto que resolve.")}<br /><span>{tx("Operação que sustenta.")}</span></h2>
          </div>
          <p className="ownership-intro">{tx("Construí produtos de ponta a ponta, conectando a visão de negócio à execução técnica. Meu foco é o sucesso de quem usa: entregar valor, acompanhar a experiência e cuidar da estrutura que mantém tudo funcionando.")}</p>
        </div>
        <ol className="ownership-cycle" aria-label={tx("Como conduzo a evolução do produto")}>
          {['Entender o problema', 'Priorizar valor', 'Construir e operar', 'Aprender com o uso'].map((step, index) => (
            <li key={step}>
              <span className="ownership-step" aria-hidden="true">0{index + 1}</span>
              <span>{tx(step)}</span>
              <ArrowIcon direction={index === 3 ? 'up' : undefined} />
            </li>
          ))}
        </ol>
        <p className="ownership-cycle-note">{tx("O uso real orienta a próxima decisão.")}</p>
        <div className="ownership-columns">
          {responsibilities.map((area) => (
            <article key={area.id} className={`ownership-area ownership-area--${area.id}`} aria-labelledby={`ownership-${area.id}`}>
              <p className="ownership-area-label"><span aria-hidden="true" />{tx(area.label)}</p>
              <h3 id={`ownership-${area.id}`}>{tx(area.title)}</h3>
              <p className="ownership-area-description">{tx(area.description)}</p>
              <ul>
                {area.items.map((item) => (
                  <li key={item.title}>
                    <h4>{tx(item.title)}</h4>
                    <p>{tx(item.text)}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="ownership-projects">
          <p>{tx("Essa visão, nos produtos que construí")}</p>
          <ul aria-label={tx("Produtos que conectam visão e execução")}>
            {products.map((product) => (
              <li key={product.id}>
                <a href={`/projetos/${product.id}`}>{tx(product.title)}<ArrowIcon diagonal /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
