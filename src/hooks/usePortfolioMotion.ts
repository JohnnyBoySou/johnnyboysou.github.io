import type { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function usePortfolioMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
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
            '.lab-header, .project-card',
            { opacity: 0, y: 32, duration: 0.75, stagger: 0.08 },
            '-=0.4',
          )

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
        gsap.from('.process-track > span', {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 0.6,
          },
        })
        gsap.fromTo(
          '.about-orbit',
          { rotation: -25 },
          {
            rotation: 65,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      })
      media.add(
        '(min-width: 800px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to('.project--speech .project-visual', {
            y: 48,
            ease: 'none',
            scrollTrigger: {
              trigger: '.projects-grid',
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
}
