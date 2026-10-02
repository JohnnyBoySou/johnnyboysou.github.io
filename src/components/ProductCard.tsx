import { tx } from "../i18n"
import type { Product } from '../data/products'
import { ArrowIcon, Asterisk } from './Icons'
import { AdilaProductArtwork } from './AdilaProductArtwork'
import './ProductCard.css'

export function ProductArtwork({ id }: { id: Product['id'] }) {
  if (id === 'adila-pay' || id === 'adila-webhooks' || id === 'adila-queues' || id === 'adila-orbit') {
    return <AdilaProductArtwork id={id} />
  }
  if (id === 'disk')
    return (
      <span className="disk-art">
        <span className="dial-orbit">
          <span className="dial-symbol">↗</span>
        </span>
        <span className="dial-wave">
          {[20, 38, 64, 44, 82, 100, 65, 90, 50, 70, 36, 18].map(
            (height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ),
          )}
        </span>
        <span className="art-route">
          <span>{tx("Lead")}</span>
          <span>{tx("Ligação")}</span>
          <span>{tx("CRM")}</span>
        </span>
      </span>
    )
  if (id === 'meetcore')
    return (
      <span className="meeting-art">
        <span className="meeting-tiles">
          <span className="meeting-person">
            <i />
            <small>{tx("Cliente")}</small>
          </span>
          <span className="meeting-person">
            <i />
            <small>{tx("Equipe")}</small>
          </span>
        </span>
        <span className="copilot-note">
          <Asterisk />
          <span>{tx("Copiloto")}<small>{tx("Contexto para o próximo passo.")}</small>
          </span>
        </span>
        <span className="meeting-caption">{tx("Vídeo · Transcrição · Contexto")}</span>
      </span>
    )
  if (id === 'cadence')
    return (
      <span className="audit-art">
        <span className="audit-title">{tx("Da conversa à evidência.")}</span>
        <span className="audit-row">
          <i>✓</i>
          <span>{tx("Roteiro")}<small>{tx("Checkpoints versionados")}</small>
          </span>
        </span>
        <span className="audit-row">
          <i>⌁</i>
          <span>{tx("Evidência")}<small>{tx("Trechos da transcrição")}</small>
          </span>
        </span>
        <span className="audit-row">
          <i>↗</i>
          <span>{tx("Revisão")}<small>{tx("Decisão com histórico")}</small>
          </span>
        </span>
      </span>
    )
  if (id === 'connect')
    return (
      <span className="connect-art">
        <span className="chat-bubble">{tx("Uma conversa começa.")}<i>•••</i>
        </span>
        <span className="chat-bubble chat-reply">{tx("A equipe continua.")}<span className="chat-avatars">
            <i>↗</i>
            <i>↗</i>
            <i>↗</i>
          </span>
        </span>
        <span className="art-route">
          <span>{tx("WhatsApp")}</span>
          <span>{tx("Equipe")}</span>
          <span>{tx("Histórico")}</span>
        </span>
      </span>
    )
  return (
    <span className="care-art">
      <span className="care-top">
        <span>{tx("Família")}</span>
        <span>{tx("Equipe de cuidado")}</span>
      </span>
      <span className="care-center">
        <Asterisk />
        <strong>{tx("shamar")}</strong>
        <small>{tx("Cuidado conectado.")}</small>
      </span>
      <span className="care-bottom">
        <span>{tx("Rotinas")}</span>
        <span>{tx("Dispositivos")}</span>
        <span>{tx("Comunicação")}</span>
      </span>
    </span>
  )
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={`product-card product--${product.id}`}>
      <a
        className="product-visual"
        href={`/projetos/${product.id}`}
        aria-label={tx("Ver projeto {{value0}}", {value0: tx(product.title)})}
      >
        <span className="product-category" aria-hidden="true">
          {tx(product.category)}
        </span>
        <span className="product-art" aria-hidden="true">
          <ProductArtwork id={product.id} />
        </span>
        <span className="product-visual-footer" aria-hidden="true">
          <span>{tx("Explorar projeto")}</span>
          <ArrowIcon diagonal />
        </span>
      </a>
      <div className="product-caption">
        <h3>{tx(product.title)}</h3>
        <p>{tx(product.description)}</p>
        <ul className="product-features">
          {product.features.map((feature) => (
            <li key={feature}>{tx(feature)}</li>
          ))}
        </ul>
        <a className="product-link" href={product.url}>{tx("Conhecer")}{tx(product.title)}
          <ArrowIcon diagonal />
        </a>
      </div>
    </article>
  )
}
