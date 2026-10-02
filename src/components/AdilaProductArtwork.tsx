import { tx } from "../i18n"
import { ArrowIcon } from './Icons'
import './AdilaProductArtwork.css'

export type AdilaProductId = 'adila-pay' | 'adila-webhooks' | 'adila-queues' | 'adila-orbit'

export function AdilaProductArtwork({ id }: { id: AdilaProductId }) {
  if (id === 'adila-pay') return (
    <span className="adila-art pay-art">
      <span className="pay-sheet">
        <span className="pay-sheet-heading"><span>{tx("Checkout")}</span><span className="pay-mark">↗</span></span>
        <span className="pay-methods"><span>{tx("Pix")}</span><span>{tx("Cartão")}</span><span>{tx("Boleto")}</span></span>
        <span className="pay-lines"><i /><i /></span>
        <span className="pay-action">{tx("Pagamento")} <ArrowIcon /></span>
      </span>
      <span className="pay-ledger"><span>{tx("Ledger")}</span><span>{tx("Conciliação")}</span><i /></span>
    </span>
  )
  if (id === 'adila-webhooks') return (
    <span className="adila-art webhook-art">
      <span className="webhook-event"><span>{tx("Evento recebido")}</span><code>{tx('{ payload }')}</code></span>
      <span className="webhook-route"><i /><span>{tx("Filtrar · transformar")}</span><i /></span>
      <span className="webhook-destinations"><span>{tx("Destino A")} <ArrowIcon diagonal /></span><span>{tx("Destino B")} <ArrowIcon diagonal /></span></span>
      <span className="webhook-replay">{tx("↻ Replay e retentativas")}</span>
    </span>
  )
  if (id === 'adila-queues') return (
    <span className="adila-art queue-art">
      <span className="queue-lanes">
        {['Na fila', 'Ativos', 'Concluídos'].map((label, index) => (
          <span className="queue-lane" key={label}>
            <small>{tx(label)}</small>
            <span className="queue-jobs">{Array.from({ length: 4 - index }, (_, i) => <i key={i}><span /><span /></i>)}</span>
          </span>
        ))}
      </span>
      <span className="queue-stream"><i /><span>{tx("Eventos · tentativas · histórico")}</span></span>
    </span>
  )
  return (
    <span className="adila-art orbit-art">
      <span className="orbit-roadmap"><span>{tx("Ideia")}</span><i /><span>{tx("Projeto")}</span><i /><span>{tx("Entrega")}</span></span>
      <span className="orbit-board">
        <span><small>{tx("Planejar")}</small><span className="orbit-task">{tx("Próximo ciclo")}<i /><i /></span></span>
        <span><small>{tx("Construir")}</small><span className="orbit-task">{tx("API")}<i /><i /></span><span className="orbit-task orbit-task--small">{tx("Interface")}<i /></span></span>
        <span><small>{tx("Entregar")}</small><span className="orbit-task">{tx("Revisão")}<i /><i /></span></span>
      </span>
    </span>
  )
}
