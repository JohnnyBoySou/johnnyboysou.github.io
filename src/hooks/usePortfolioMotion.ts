import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function usePortfolioMotion(
  scope: RefObject<HTMLDivElement | null>,
  projectFilter: string,
) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({
          defaults: { ease: 'power3.out' },
          paused: document.documentElement.dataset.boot !== 'ready',
        })
        intro
          .from('.hero-line > span', {
            yPercent: 112,
            rotation: 3,
            duration: 1.15,
            stagger: 0.12,
          })
          .from(
            '.hero-description',
            { opacity: 0, y: 18, duration: 0.6 },
            '-=0.55',
          )
          .from(
            '.lab-header, .product-card',
            { opacity: 0, y: 32, duration: 0.75, stagger: 0.08 },
            '-=0.4',
          )
        let introStarted = false
        const startIntro = (event: Event) => {
          const immediate = event instanceof CustomEvent && event.detail?.immediate
          if (introStarted && !immediate) return
          introStarted = true
          if (immediate) intro.progress(1)
          else intro.play()
          ScrollTrigger.refresh()
        }
        document.addEventListener('portfolio:reveal', startIntro, { once: true })
        document.addEventListener('portfolio:ready', startIntro, { once: true })

        // Only decorative art moves with scroll; links and content keep their positions.
        gsap.to('.hero-asterisk', {
          rotation: 140,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        })
        return () => {
          document.removeEventListener('portfolio:reveal', startIntro)
          document.removeEventListener('portfolio:ready', startIntro)
        }
      })
      media.add(
        '(min-width: 800px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to('.product--meetcore .product-art', {
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.product--meetcore',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.7,
            },
          })
        },
      )
      return () => media.revert()
    },
    { scope },
  )
  useGSAP(() => ScrollTrigger.refresh(), {
    scope,
    dependencies: [projectFilter],
  })
}
