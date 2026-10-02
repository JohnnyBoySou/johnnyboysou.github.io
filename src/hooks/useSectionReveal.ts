import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Reveals content once; focus and fragment navigation always make it readable. */
export function useSectionReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const root = scope.current
        if (!root) return
        const reveals: {
          element: HTMLElement
          tween: gsap.core.Tween
          trigger: ScrollTrigger
        }[] = []
        const fragment = () =>
          document.getElementById(window.location.hash.slice(1))
        const belongsTo = (element: HTMLElement, target: Node | null) =>
          !!target && (element.contains(target) || target.contains(element))

        root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          // Content already on screen (including a restored scroll position) stays visible.
          if (
            element.getBoundingClientRect().top <= innerHeight * 0.92 ||
            belongsTo(element, fragment())
          )
            return
          const tween = gsap.fromTo(
            element,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              paused: true,
              clearProps: 'opacity,transform',
            },
          )
          const trigger = ScrollTrigger.create({
            trigger: element,
            start: 'top 92%',
            once: true,
            onEnter: () => tween.play(),
          })
          reveals.push({ element, tween, trigger })
        })

        const finish = (target: Node | null) => {
          reveals.forEach(({ element, tween, trigger }) => {
            if (belongsTo(element, target)) {
              tween.progress(1)
              trigger.kill()
            }
          })
        }
        const onFocus = (event: FocusEvent) => {
          // Pointer focus must not move a link between pointerdown and click.
          if (
            event.target instanceof HTMLElement &&
            event.target.matches(':focus-visible')
          ) {
            const target = event.target
            reveals.forEach(({ element, tween, trigger }) => {
              if (element.contains(target)) {
                tween.progress(1)
                trigger.kill()
              }
            })
          }
        }
        const onHash = () => finish(fragment())
        const onReady = () => {
          onHash()
          ScrollTrigger.refresh()
        }
        root.addEventListener('focusin', onFocus)
        window.addEventListener('hashchange', onHash)
        document.addEventListener('portfolio:ready', onReady)
        return () => {
          root.removeEventListener('focusin', onFocus)
          window.removeEventListener('hashchange', onHash)
          document.removeEventListener('portfolio:ready', onReady)
        }
      })
      return () => media.revert()
    },
    { scope, dependencies: [selector], revertOnUpdate: true },
  )
}
