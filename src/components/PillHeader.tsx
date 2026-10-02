import { tx } from "../i18n"
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { portfolio } from '../data/portfolio'
import { ArrowIcon, Asterisk } from './Icons'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import './PillHeader.css'

gsap.registerPlugin(useGSAP)

const links = [
  { label: 'Projetos', detail: 'Produtos e código aberto', href: '/#projetos', section: 'projects' },
  { label: 'Produto e operação', detail: 'Cliente, infraestrutura e custos', href: '/#produto-operacao' },
  { label: 'Modelos', detail: 'Pesquisa e inteligência artificial', href: '/modelos', section: 'models' },
  { label: 'Sobre mim', detail: 'Trajetória e jeito de trabalhar', href: '/#sobre' },
  { label: 'Contato', detail: 'Vamos conversar', href: '/#contato' },
]

export function PillHeader({ section }: { section?: 'projects' | 'models' }) {
  const [open, setOpen] = useState(false)
  const pill = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope: pill })

  useLayoutEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let lastHeight = -1
    const resizePanel = contextSafe(() => {
      const height = open ? content.current!.offsetHeight : 0
      if (height === lastHeight && !motion.matches) return
      lastHeight = height
      gsap.to(panel.current, {
        height,
        duration: motion.matches ? 0 : 0.42,
        ease: 'power3.inOut',
        overwrite: true,
      })
    })
    const animate = contextSafe(() => {
      resizePanel()
      gsap.to(pill.current, {
        '--menu-width': open ? '560px' : '360px',
        borderRadius: open ? 30 : 38,
        duration: motion.matches ? 0 : 0.42,
        ease: 'power3.inOut',
        overwrite: 'auto',
      })
      gsap.to('.pill-menu-link, .pill-menu-note', {
        opacity: open ? 1 : 0,
        y: open ? 0 : 12,
        duration: motion.matches ? 0 : open ? 0.38 : 0.16,
        delay: motion.matches || !open ? 0 : 0.1,
        stagger: motion.matches || !open ? 0 : 0.045,
        ease: 'power3.out',
        overwrite: true,
      })
    })
    animate()
    const observer = new ResizeObserver(resizePanel)
    observer.observe(content.current!)
    motion.addEventListener('change', animate)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', animate)
    }
  }, [open, contextSafe])

  useEffect(() => {
    if (!open) return
    const outside = (event: Event) => {
      if (event.target instanceof Node && !pill.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      trigger.current?.focus({ preventScroll: true })
      setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setOpen(false)
    const url = new URL(event.currentTarget.href)
    if (url.pathname !== window.location.pathname || !url.hash) return
    const target = document.getElementById(url.hash.slice(1))
    if (!target) return
    // Move keyboard focus to the destination before making the menu inert.
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1')
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
    }
    target.focus({ preventScroll: true })
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">{tx("Pular para o conteúdo")}</a>
      <header className="site-masthead" id="inicio">
        <div className="header-pill" ref={pill} data-open={open}>
          <div className="pill-bar">
            <a className="wordmark" href="/" aria-label={tx("{{value0}}, início", {value0: tx(portfolio.fullName)})}>
              <Asterisk />{tx("sousa")}<span className="wordmark-dot">.</span>
            </a>
            <div className="pill-controls">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                ref={trigger}
                className="menu-trigger"
                type="button"
                aria-label={tx(open ? 'Fechar menu' : 'Abrir menu')}
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={() => setOpen(value => !value)}
              >
                <span className="menu-mark" aria-hidden="true"><i /><i /></span>
              </button>
            </div>
          </div>
          <div ref={panel} id="site-menu" className="pill-menu-panel" inert={!open} aria-hidden={!open}>
            <div className="pill-menu-content" ref={content}>
              <nav className="pill-menu-nav" aria-label={tx("Navegação principal")}>
                {links.map(link => (
                  <a
                    key={link.href}
                    className="pill-menu-link"
                    href={link.href}
                    aria-label={tx(link.label)}
                    aria-current={link.section && section === link.section ? 'page' : undefined}
                    onClick={navigate}
                  >
                    <span><strong>{tx(link.label)}</strong><small>{tx(link.detail)}</small></span>
                    <ArrowIcon diagonal />
                  </a>
                ))}
              </nav>
              <p className="pill-menu-note"><span aria-hidden="true" />{tx("Disponível para trabalho remoto")}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
