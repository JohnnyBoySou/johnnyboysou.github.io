import { tx } from "../i18n"
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { technologies, stackAreas } from '../data/stack'
import type { StackArea } from '../data/stack'
import { ArrowIcon } from './Icons'
import './TechnologySection.css'

export function TechnologySection() {
  const [area, setArea] = useState<StackArea | 'Todas'>('Todas')
  const viewport = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const drag = useRef<{ pointer: number; x: number; left: number } | null>(null)
  const [range, setRange] = useState({
    first: 1,
    last: 1,
    previous: false,
    next: true,
  })
  const items = technologies.filter(
    (item) => area === 'Todas' || item.area === area,
  )

  useEffect(() => {
    const rail = viewport.current
    if (!rail) return
    let frame = 0
    rail.scrollTo({ left: 0, behavior: 'instant' })
    const update = () => {
      const card = rail.querySelector<HTMLElement>('.stack-card')
      const track = rail.querySelector<HTMLElement>('.stack-track')
      if (!card || !track) return
      const step =
        card.getBoundingClientRect().width +
        parseFloat(getComputedStyle(track).gap)
      const first = Math.min(
        items.length,
        Math.floor(rail.scrollLeft / step) + 1,
      )
      const last = Math.min(
        items.length,
        Math.ceil((rail.scrollLeft + rail.clientWidth) / step),
      )
      const distance = rail.scrollWidth - rail.clientWidth
      const fraction = distance > 0 ? rail.scrollLeft / distance : 1
      if (fill.current) fill.current.style.transform = `scaleX(${fraction})`
      progress.current?.setAttribute('aria-valuenow', String(Math.round(fraction * 100)))
      const previous = rail.scrollLeft > 2
      const next = rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2
      setRange((old) =>
        old.first === first &&
        old.last === last &&
        old.previous === previous &&
        old.next === next
          ? old
          : { first, last, previous, next },
      )
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(rail)
    rail.addEventListener('scroll', schedule, { passive: true })
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      rail.removeEventListener('scroll', schedule)
    }
  }, [area, items.length])

  function selectArea(name: StackArea | 'Todas') {
    if (name === area) return
    setArea(name)
  }

  function scrollTo(left: number) {
    const rail = viewport.current
    if (!rail) return
    rail.scrollTo({ left: Math.max(0, Math.min(left, rail.scrollWidth - rail.clientWidth)), behavior: 'instant' })
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    // Touch and pen keep native horizontal swiping and vertical page scrolling.
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const rail = event.currentTarget
    if (rail.scrollWidth <= rail.clientWidth) return
    event.preventDefault()
    rail.focus({ preventScroll: true })
    drag.current = { pointer: event.pointerId, x: event.clientX, left: rail.scrollLeft }
    rail.classList.add('is-dragging')
    rail.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current
    if (!current || current.pointer !== event.pointerId) return
    event.currentTarget.scrollLeft = current.left + current.x - event.clientX
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer !== event.pointerId) return
    const rail = event.currentTarget
    const left = rail.scrollLeft
    drag.current = null
    rail.classList.remove('is-dragging')
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId)
    rail.scrollTo({ left, behavior: 'instant' })
  }
  function move(direction: number) {
    const rail = viewport.current
    if (rail) scrollTo(rail.scrollLeft + direction * rail.clientWidth * 0.85)
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    const rail = viewport.current
    if (!rail) return
    const step =
      (rail.querySelector('.stack-card')?.getBoundingClientRect().width ??
        280) + 20
    const positions: Record<string, number> = {
      ArrowRight: rail.scrollLeft + step,
      ArrowLeft: rail.scrollLeft - step,
      Home: 0,
      End: Number.POSITIVE_INFINITY,
      PageDown: rail.scrollLeft + rail.clientWidth,
      PageUp: rail.scrollLeft - rail.clientWidth,
    }
    const left = positions[event.key]
    if (left !== undefined) {
      event.preventDefault()
      scrollTo(left)
    }
  }

  return (
    <section
      className="technology"
      id="tecnologias"
      aria-labelledby="tecnologias-titulo"
    >
      <div className="container">
        <div className="stack-heading">
          <div>
            <p className="section-kicker">{tx("Da aplicação à infraestrutura")}</p>
            <h2 id="tecnologias-titulo">{tx("Minha stack.")}<br />
              <span>{tx("Cada peça, um papel.")}</span>
            </h2>
          </div>
          <p>{tx("Construo a interface, os serviços, os pipelines de IA e a infraestrutura que sustenta tudo isso. Aqui estão as tecnologias que uso e o papel de cada uma no meu trabalho.")}</p>
        </div>
        <div className="stack-stage">
        <div
          className="stack-filters"
          role="group"
          aria-label={tx("Filtrar tecnologias por área")}
        >
          {(['Todas', ...stackAreas.map((item) => item.name)] as const).map(
            (name) => (
              <button
                key={name}
                type="button"
                aria-pressed={area === name}
                aria-controls="stack-viewport"
                onClick={() => selectArea(name)}
              >
                {tx(name)}
              </button>
            ),
          )}
        </div>
        <p className="sr-only" role="status">
          {tx(items.length)} {tx("tecnologias. Área:")} {tx(area)}.
        </p>
        <div className="stack-toolbar">
          <p id="stack-instructions">
            {tx("Use as setas ou deslize para explorar.")}
          </p>
          <div className="stack-controls">
            <button
              type="button"
              aria-label={tx("Tecnologias anteriores")}
              aria-controls="stack-viewport"
              disabled={!range.previous}
              onClick={() => move(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label={tx("Próximas tecnologias")}
              aria-controls="stack-viewport"
              disabled={!range.next}
              onClick={() => move(1)}
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div
          ref={viewport}
          id="stack-viewport"
          className="stack-viewport"
          tabIndex={0}
          role="region"
          aria-label={tx("Tecnologias e suas utilizações")}
          aria-describedby="stack-instructions"
          onKeyDown={onKeyDown}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
        >
          <ul className="stack-track">
            {items.map((item) => (
              <li className="stack-card" key={item.name}>
                <div className="stack-card-top">
                  <span
                    className="stack-symbol"
                    style={{
                      color: stackAreas.find(
                        (category) => category.name === item.area,
                      )?.color,
                    }}
                    aria-hidden="true"
                  >
                    {tx(item.symbol)}
                  </span>
                  <span>{tx(item.area)}</span>
                </div>
                <h3>{tx(item.name)}</h3>
                <p className="stack-role">{tx(item.role)}</p>
                <p className="stack-usage">{tx(item.usage)}</p>
              </li>
            ))}
          </ul>
        </div>
        <div ref={progress} className="stack-progress" role="progressbar"
          aria-label={tx("Progresso pelas tecnologias")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
          <span ref={fill} />
        </div>
        <div className="stack-footer">
          <span>
            {tx(area === 'Todas'
              ? 'A stack completa, conectada pelo trabalho.'
              : area)}
          </span>
          <span aria-hidden="true">
            {tx(items.length)}{' '}{tx("tecnologias")}</span>
        </div>
        </div>
      </div>
    </section>
  )
}
