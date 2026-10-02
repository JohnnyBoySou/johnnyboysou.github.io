const paths = {
  voice: 'M5 18h4l3-10 5 20 5-24 4 14h5',
  messaging: 'M5 7h22v15H15l-7 6v-6H5Z M11 13h10 M11 17h6',
  agents: 'M10 7h12l5 9-5 9H10l-5-9Z M10 7l6 9 6-9 M5 16h22 M10 25l6-9 6 9',
  media: 'M5 24V12h7V5h8v14h7v8H5 M9 18v3 M16 10v10 M24 23v1',
  workers: 'M4 5h9v8H4Z M19 5h9v8h-9Z M11 22h10v7H11Z M8 13v5h16v-5 M16 18v4',
  code: 'M11 9l-7 7 7 7 M21 9l7 7-7 7 M18 5l-4 22',
  desktop: 'M4 5h24v18H4Z M11 29h10 M16 23v6 M4 10h24',
  web: 'M4 6h24v22H4Z M4 12h24 M12 12v16 M8 9h1 M13 9h1',
  pulse: 'M3 18h6l4-11 6 20 4-13 3 4h3',
  design: 'M4 4h10v10H4Z M20 4h8v10h-8Z M4 20h10v8H4Z M20 20h8v8h-8Z',
  branches: 'M9 6v20 M9 20c0-9 14-2 14-13 M6 3h6v6H6Z M6 25h6v6H6Z M20 3h6v6h-6Z',
  request: 'M4 10h22 M21 5l5 5-5 5 M28 23H6 M11 18l-5 5 5 5',
}

export type CapabilityGlyphKind = keyof typeof paths

export function CapabilityGlyph({ kind }: { kind: CapabilityGlyphKind }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d={paths[kind]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
