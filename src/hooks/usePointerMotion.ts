import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/** Pointer effects move artwork, never the link's hit area or reading content. */
export function usePointerMotion() {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const root = document.getElementById('root')
        if (!root) return
        const events = new AbortController()
        const active = new Set<() => void>()
        const cleanup: (() => void)[] = []
        const options = { signal: events.signal, passive: true }
        const follow = (target: Element, property: string, duration = 0.5) =>
          gsap.quickTo(target, property, { duration, ease: 'power3.out' })

        // Each tween is created inside matchMedia and reused on pointermove.
        // This keeps cleanup automatic and avoids allocating a tween per event.
        const bind = (
          surface: HTMLElement,
          move: (x: number, y: number) => void,
          rest: () => void,
        ) => {
          const reset = () => {
            if (!active.delete(reset)) return
            delete surface.dataset.pointerActive
            rest()
          }
          const onMove = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse' || surface.matches(':focus-visible')) return
            const rect = surface.getBoundingClientRect()
            if (!rect.width || !rect.height) return
            active.add(reset)
            surface.dataset.pointerActive = 'true'
            move(
              gsap.utils.clamp(-1, 1, ((event.clientX - rect.left) / rect.width - 0.5) * 2),
              gsap.utils.clamp(-1, 1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
            )
          }
          surface.addEventListener('pointerenter', onMove, options)
          surface.addEventListener('pointermove', onMove, options)
          surface.addEventListener('pointerleave', reset, options)
          surface.addEventListener('pointercancel', reset, options)
          surface.addEventListener('focusin', reset, options)
          cleanup.push(() => { delete surface.dataset.pointerActive })
        }

        root.querySelectorAll<HTMLElement>('.product-visual').forEach(surface => {
          const art = surface.querySelector<HTMLElement>('.product-art > span')
          if (!art) return
          gsap.set(surface, { '--pointer-x': 50, '--pointer-y': 50, '--pointer-light': 0 })
          gsap.set(art, { transformPerspective: 850, x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1 })
          const lightX = follow(surface, '--pointer-x', 0.3)
          const lightY = follow(surface, '--pointer-y', 0.3)
          const light = follow(surface, '--pointer-light', 0.35)
          const xTo = follow(art, 'x')
          const yTo = follow(art, 'y')
          const tiltX = follow(art, 'rotationX')
          const tiltY = follow(art, 'rotationY')
          const scale = follow(art, 'scale')
          bind(surface, (x, y) => {
            lightX((x + 1) * 50)
            lightY((y + 1) * 50)
            light(1)
            xTo(x * 12)
            yTo(y * 8)
            tiltX(-y * 5)
            tiltY(x * 6)
            scale(1.025)
          }, () => {
            light(0)
            xTo(0)
            yTo(0)
            tiltX(0)
            tiltY(0)
            scale(1)
          })
        })

        const hero = root.querySelector<HTMLElement>('.hero')
        if (hero) {
          const motifs = [...hero.querySelectorAll<HTMLElement>('.hero-motif')].map((motif, index) => {
            gsap.set(motif, { x: 0, y: 0, rotation: 0 })
            return {
              x: follow(motif, 'x', 0.65),
              y: follow(motif, 'y', 0.65),
              rotation: follow(motif, 'rotation', 0.65),
              depth: [10, -7, 14][index] ?? 10,
            }
          })
          bind(hero, (x, y) => {
            motifs.forEach(motif => {
              motif.x(x * motif.depth)
              motif.y(y * motif.depth * 0.6)
              motif.rotation(x * motif.depth * 0.5)
            })
          }, () => {
            motifs.forEach(motif => { motif.x(0); motif.y(0); motif.rotation(0) })
          })
        }

        root.querySelectorAll<HTMLElement>(
          '.circle-link, .contact-link, .back-top, .footer-links a, .page-actions a',
        ).forEach(link => {
          const icon = link.querySelector('svg')
          if (!icon) return
          link.dataset.pointerIcon = 'true'
          cleanup.push(() => { delete link.dataset.pointerIcon })
          gsap.set(icon, { x: 0, y: 0 })
          const xTo = follow(icon, 'x', 0.35)
          const yTo = follow(icon, 'y', 0.35)
          bind(link, (x, y) => { xTo(x * 5); yTo(y * 5) }, () => { xTo(0); yTo(0) })
        })

        const resetAll = () => { active.forEach(reset => reset()) }
        window.addEventListener('blur', resetAll, options)
        window.addEventListener('scroll', resetAll, options)
        window.addEventListener('resize', resetAll, options)
        document.addEventListener('visibilitychange', resetAll, options)
        document.addEventListener('keydown', event => {
          if (event.key === 'Tab') resetAll()
        }, options)
        return () => {
          events.abort()
          active.clear()
          cleanup.forEach(dispose => dispose())
        }
      },
    )
    return () => media.revert()
  }, [])
}
