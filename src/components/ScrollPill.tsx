import { tx } from "../i18n"
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollPill.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** A visual scrollbar; the document keeps its native scrolling and GSAP pins. */
export function ScrollPill() {
  const shell = useRef<HTMLDivElement>(null)
  const [sections, setSections] = useState<{ label: string; target: HTMLElement }[]>([])
  const markers = useRef<HTMLElement>(null)
  const navigation = useRef<gsap.core.Tween | null>(null)
  const control = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLSpanElement>(null)
  const thumb = useRef<HTMLSpanElement>(null)
  const drag = useRef<{ pointer: number; offset: number } | null>(null)
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight)

  useEffect(() => {
    const main = document.getElementById('conteudo')
    if (!main) return
    const labels: Record<string, string> = {
      projetos: 'Projetos', 'produto-operacao': 'Produto e operação', ia: 'Modelos de IA', atuacao: 'Atuação técnica',
      processo: 'Decisões de engenharia', sobre: 'Sobre mim', tecnologias: 'Minha stack', contato: 'Contato',
    }
    const collect = () => {
      const found = [{ label: 'Início', target: main }]
      main.querySelectorAll<HTMLElement>(':scope > section, .models-grid > article').forEach(target => {
        const title = target.querySelector('h2, h3')?.textContent?.trim()
        if (title) found.push({ label: labels[target.id] || title, target })
      })
      setSections(previous => previous.length === found.length && previous.every((item, i) => item.target === found[i].target)
        ? previous : found)
    }
    collect()
    const observer = new MutationObserver(collect)
    observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  function destination(target: HTMLElement) {
    // Section reveals translate content temporarily; navigate to its layout position.
    const revealOffset = new DOMMatrix(getComputedStyle(target).transform).m42
    const top = target.id === 'conteudo' ? 0 : target.getBoundingClientRect().top + scrollY - revealOffset - 112
    return gsap.utils.clamp(0, maxScroll(), top)
  }

  useGSAP(() => {
    const element = control.current!
    const rail = track.current!
    const handle = thumb.current!
    document.documentElement.classList.add('has-scroll-pill')
    const media = gsap.matchMedia()
    media.add({ all: 'all', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
      const reduced = context.conditions?.reduced
      const move = gsap.quickTo(handle, 'y', { duration: reduced ? 0 : 0.65, ease: 'elastic.out(1, 0.5)' })
      let frame = 0
      const update = () => {
        const maximum = maxScroll()
        const fraction = maximum ? gsap.utils.clamp(0, 1, scrollY / maximum) : 0
        const height = rail.clientHeight
        const size = Math.min(height, Math.max(28, height * innerHeight / (maximum + innerHeight)))
        handle.style.height = `${size}px`
        const y = fraction * (height - size)
        if (drag.current || reduced) {
          move.tween.pause()
          gsap.set(handle, { y })
        } else move(y)
        shell.current!.hidden = maximum < 1
        const buttons = [...(markers.current?.querySelectorAll<HTMLButtonElement>('button') || [])]
        const destinations = sections.map(section => destination(section.target))
        // Keep nearby section marks independently clickable even around long pins.
        const gap = 24
        const available = shell.current!.clientHeight - 28
        const positions = destinations.map(top => 14 + (maximum ? top / maximum : 0) * available)
        for (let i = positions.length - 2; i >= 0; i--) positions[i] = Math.min(positions[i], positions[i + 1] - gap)
        for (let i = 0; i < positions.length; i++) positions[i] = Math.max(positions[i], i === 0 ? 14 : positions[i - 1] + gap)
        let active = 0
        destinations.forEach((top, i) => { if (scrollY >= top - 3) active = i })
        buttons.forEach((button, i) => {
          button.style.top = `${positions[i]}px`
          if (i === active) button.setAttribute('aria-current', 'location')
          else button.removeAttribute('aria-current')
        })
        element.setAttribute('aria-valuenow', String(Math.round(fraction * 100)))
        element.setAttribute('aria-valuetext', `${Math.round(fraction * 100)}% da página`)
      }
      const schedule = () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(update)
      }
      const observer = new ResizeObserver(schedule)
      observer.observe(document.getElementById('root')!)
      observer.observe(rail)
      const cancelNavigation = () => { navigation.current?.kill(); navigation.current = null }
      window.addEventListener('wheel', cancelNavigation, { passive: true })
      window.addEventListener('touchstart', cancelNavigation, { passive: true })
      document.addEventListener('pointerdown', cancelNavigation, true)
      document.addEventListener('keydown', cancelNavigation, true)
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      document.addEventListener('portfolio:ready', schedule)
      ScrollTrigger.addEventListener('refresh', schedule)
      update()
      return () => {
        cancelNavigation()
        window.removeEventListener('wheel', cancelNavigation)
        window.removeEventListener('touchstart', cancelNavigation)
        document.removeEventListener('pointerdown', cancelNavigation, true)
        document.removeEventListener('keydown', cancelNavigation, true)
        cancelAnimationFrame(frame)
        observer.disconnect()
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        document.removeEventListener('portfolio:ready', schedule)
        ScrollTrigger.removeEventListener('refresh', schedule)
      }
    })
    return () => {
      media.revert()
      document.documentElement.classList.remove('has-scroll-pill')
    }
  }, { scope: shell, dependencies: [sections], revertOnUpdate: true })

  function goTo(top: number, smooth = true) {
    navigation.current?.kill()
    if (!smooth || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top, behavior: 'instant' })
      return
    }
    const position = { y: scrollY }
    navigation.current = gsap.to(position, {
      y: top,
      duration: gsap.utils.clamp(0.55, 1.25, Math.abs(top - scrollY) / 12000),
      ease: 'power3.inOut',
      onUpdate: () => window.scrollTo({ top: position.y, behavior: 'instant' }),
    })
  }

  function seek(clientY: number, offset: number, smooth = false) {
    const rail = track.current!.getBoundingClientRect()
    const travel = rail.height - thumb.current!.offsetHeight
    const fraction = travel > 0 ? gsap.utils.clamp(0, 1, (clientY - rail.top - offset) / travel) : 0
    goTo(fraction * maxScroll(), smooth)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return
    event.preventDefault()
    const handle = thumb.current!.getBoundingClientRect()
    const onHandle = event.clientY >= handle.top && event.clientY <= handle.bottom
    event.currentTarget.focus({ preventScroll: true })
    if (!onHandle) {
      seek(event.clientY, handle.height / 2, true)
      return
    }
    const offset = event.clientY - handle.top
    drag.current = { pointer: event.pointerId, offset }
    event.currentTarget.dataset.dragging = 'true'
    event.currentTarget.focus({ preventScroll: true })
    event.currentTarget.setPointerCapture(event.pointerId)
    seek(event.clientY, offset)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointer === event.pointerId) seek(event.clientY, drag.current.offset)
  }

  function endDrag() {
    drag.current = null
    if (control.current) delete control.current.dataset.dragging
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const targets: Record<string, number> = {
      ArrowDown: scrollY + 80, ArrowUp: scrollY - 80,
      PageDown: scrollY + innerHeight * 0.9, PageUp: scrollY - innerHeight * 0.9,
      Home: 0, End: maxScroll(),
    }
    if (targets[event.key] === undefined) return
    event.preventDefault()
    goTo(targets[event.key])
  }

  return (
    <div ref={shell} className="scroll-pill">
    <div ref={control} className="scroll-pill-control" role="scrollbar" tabIndex={0}
      aria-label={tx("Rolagem da página")} aria-controls="conteudo" aria-orientation="vertical"
      aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        endDrag()
      }}
      onPointerCancel={endDrag} onLostPointerCapture={endDrag} onKeyDown={onKeyDown}
    >
      <span className="scroll-pill-shell" aria-hidden="true">
        <span ref={track} className="scroll-pill-track">
          <span ref={thumb} className="scroll-pill-thumb" />
        </span>
      </span>
    </div>
    <nav ref={markers} className="scroll-pill-markers" aria-label={tx("Seções da página")}>
      {sections.map((section, index) => (
        <button key={`${index}-${section.label}`} type="button" className="scroll-pill-mark"
          aria-label={tx("Ir para {{value0}}", {value0: tx(section.label)})} aria-describedby={`scroll-tip-${index}`}
          onClick={() => goTo(destination(section.target))}
          onKeyDown={event => {
            if (event.key === 'Escape') { event.currentTarget.blur(); control.current?.focus({ preventScroll: true }) }
          }}>
          <span className="scroll-pill-tick" aria-hidden="true" />
          <span className="scroll-pill-tooltip" id={`scroll-tip-${index}`} role="tooltip">{tx(section.label)}</span>
        </button>
      ))}
    </nav>
    </div>
  )
}
