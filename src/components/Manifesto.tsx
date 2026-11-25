import { tx } from '../i18n'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Manifesto.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const statement =
  'Gosto de software que some no uso. Por isso construo voz, tempo real e IA com o mesmo cuidado: simples por fora, sólido por dentro.'

export function Manifesto() {
  const section = useRef<HTMLElement>(null)
  const words = tx(statement).split(' ')

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        // Each word lights up as the reader scrolls through the statement.
        gsap.fromTo(
          '.manifesto-word',
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.manifesto-text',
              start: 'top 78%',
              end: 'bottom 42%',
              scrub: 0.6,
            },
          },
        )
      })
      return () => media.revert()
    },
    { scope: section, dependencies: [words.join(' ')], revertOnUpdate: true },
  )

  return (
    <section className="manifesto container" ref={section} aria-label={tx('Manifesto')}>
      <p className="manifesto-text">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="manifesto-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
