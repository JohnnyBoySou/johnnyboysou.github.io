export function ArrowIcon({
  diagonal = false,
  direction = 'right',
}: {
  diagonal?: boolean
  direction?: 'right' | 'left' | 'up' | 'down'
}) {
  const rotation = { right: 0, left: 180, up: -90, down: 90 }[direction]
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'}
        transform={rotation ? `rotate(${rotation} 12 12)` : undefined}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((angle) => (
        <rect
          key={angle}
          x="43"
          y="6"
          width="14"
          height="88"
          rx="2"
          fill="currentColor"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  )
}
