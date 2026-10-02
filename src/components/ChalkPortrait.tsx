import { tx } from "../i18n"
import { useEffect, useId, useRef, useState } from 'react'
import './ChalkPortrait.css'

export function ChalkPortrait() {
  const portrait = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  const [loadImage, setLoadImage] = useState(false)
  const id = useId()

  useEffect(() => {
    const element = portrait.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(element)
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadImage(true)
        preload.disconnect()
      }
    }, { rootMargin: '500px' })
    preload.observe(element)
    return () => { observer.disconnect(); preload.disconnect() }
  }, [])

  return (
    <svg
      ref={portrait}
      className={`chalk-portrait${visible ? ' is-visible' : ''}`}
      viewBox="0 0 400 420"
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>{tx("Retrato de João Sousa desenhado em giz")}</title>
      <defs>
        <mask id={`${id}-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="420">
          <path
            className="chalk-portrait-reveal"
            d="M-50 20 H450 L-50 100 H450 L-50 180 H450 L-50 260 H450 L-50 340 H450 L-50 420 H450"
            fill="none"
            stroke="white"
            strokeWidth="110"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength="1"
          />
        </mask>
      </defs>
      <g mask={`url(#${id}-reveal)`}>
        <image
          className="chalk-portrait-image chalk-portrait-image--light"
          href={loadImage ? '/images/joao-sousa-chalk.webp' : undefined}
          width="400"
          height="400"
        />
        <image
          className="chalk-portrait-image chalk-portrait-image--dark"
          href={loadImage ? '/images/joao-sousa-chalk-dark.webp' : undefined}
          width="400"
          height="400"
        />
      </g>
      <path
        className="chalk-portrait-flourish"
        d="M98 405 Q185 393 305 403 M133 412 Q200 405 263 409"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        pathLength="1"
        aria-hidden="true"
      />
    </svg>
  )
}
