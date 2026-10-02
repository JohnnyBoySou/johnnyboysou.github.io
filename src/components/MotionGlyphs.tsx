type GlyphProps = { className?: string }

export function SignalGlyph({ className = '' }: GlyphProps) {
  return <svg className={`signal-glyph ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {[18, 32, 46, 26, 38, 16].map((height, index) =>
      <rect className="signal-bar" key={index} x={9 + index * 9} y={(64 - height) / 2} width="4" height={height} rx="2" fill="currentColor" />,
    )}
  </svg>
}

export function OrbitGlyph({ className = '' }: GlyphProps) {
  return <svg className={`orbit-glyph ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="28" ry="13" stroke="currentColor" strokeWidth="1.5" transform="rotate(-35 32 32)" />
    <ellipse cx="32" cy="32" rx="28" ry="13" stroke="currentColor" strokeWidth="1.5" transform="rotate(35 32 32)" />
    <circle cx="32" cy="32" r="5" fill="currentColor" />
    <circle cx="54" cy="17" r="4" fill="var(--page)" stroke="currentColor" strokeWidth="1.5" />
  </svg>
}

export function SparkGlyph({ className = '' }: GlyphProps) {
  return <svg className={`spark-glyph ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 5c2 17 10 25 27 27-17 2-25 10-27 27C30 42 22 34 5 32 22 30 30 22 32 5Z" fill="currentColor" />
    <path d="M52 5v10m-5-5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
}

export function HeroMotifs() {
  return <div className="hero-motifs" aria-hidden="true">
    <span className="hero-motif"><SignalGlyph /></span>
    <span className="motif-connector" />
    <span className="hero-motif"><OrbitGlyph /></span>
    <span className="motif-connector" />
    <span className="hero-motif"><SparkGlyph /></span>
  </div>
}
