// Síntese editorial de atuação descrita nos perfis públicos, sem métricas inventadas.
export const capabilities = [
  {
    title: 'Voz e mídia em tempo real',
    description:
      'Controle de chamadas com Asterisk/ARI e captura de mídia com LiveKit. Pipelines de conversação com detecção de turnos, transcrição e integração com modelos, além de captura e análise de reuniões.',
    tags: ['Asterisk / ARI', 'LiveKit', 'WebRTC VAD', 'faster-whisper'],
  },
  {
    title: 'Mensageria e integrações',
    description:
      'Sistemas de WhatsApp, agentes com estado, filas e integrações com CRM. Trabalho com HubSpot, NATS, Redis e PostgreSQL para conectar os fluxos de comunicação ao restante do produto.',
    tags: ['LangGraph', 'Redis / BullMQ', 'NATS', 'HubSpot'],
  },
  {
    title: 'Inferência e modelos de IA',
    description:
      'Workers GPU especializados em transcrição, diarização, visão e embeddings. Serving e treinamento com PyTorch e Transformers, incluindo ajustes com LoRA, quantização e orquestração de jobs.',
    tags: ['PyTorch', 'Transformers', 'PEFT / LoRA', 'pyannote.audio'],
  },
  {
    title: 'Plataforma e developer tooling',
    description:
      'API gateways, gestão de chaves, billing, rastreamento de serviços e ferramentas para desenvolvedores. Também construo CLIs, aplicações desktop, indexadores de código e um design system em React.',
    tags: ['OpenTelemetry', 'MCP', 'Go / Wails', 'React'],
  },
]

export const processSteps = [
  {
    title: 'Separar as responsabilidades.',
    description:
      'Controle de chamadas, mídia e inferência têm necessidades diferentes. Organizo essas partes em serviços e workers com funções claras.',
    sketch: 'discover',
    label: 'Arquitetura',
  },
  {
    title: 'Controlar o trabalho em fila.',
    description:
      'Concorrência, backpressure e recursos limitados entram no desenho. No worker-thoth, a fila é assíncrona e o acesso à GPU é serializado.',
    sketch: 'prototype',
    label: 'Orquestração',
  },
  {
    title: 'Dar contexto à operação.',
    description:
      'Status de jobs, TTL e tracing tornam o fluxo inspecionável. APIs e ferramentas precisam deixar claro o que foi aceito, processado ou falhou.',
    sketch: 'build',
    label: 'Observabilidade',
  },
] as const

export const technologies = [
  {
    name: 'TypeScript',
    symbol: 'TS',
    role: 'APIs, produto e ferramentas.',
    description:
      'Bun e Elysia nos serviços; React no produto e no design system. Também uso TypeScript na indexação de código com oxc-parser e nas integrações da plataforma.',
    detail: 'Bun · Elysia · React · oxc',
    color: '#c5d4fa',
  },
  {
    name: 'Go',
    symbol: 'Go',
    role: 'Workers, concorrência e CLIs.',
    description:
      'Go na orquestração de jobs e nas ferramentas de desenvolvimento. O worker-thoth conecta HTTP, Redis Streams e Whisper; o nani leva navegação e LSP ao terminal.',
    detail: 'Goroutines · Redis Streams · CLI',
    color: '#c8e5f2',
  },
  {
    name: 'Python',
    symbol: 'Py',
    role: 'Modelos e pipelines de inferência.',
    description:
      'FastAPI, PyTorch e Transformers para servir modelos. Áudio com Whisper e pyannote.audio, embeddings com sentence-transformers e fine-tuning com PEFT e TRL.',
    detail: 'FastAPI · PyTorch · Transformers',
    color: '#eddfcc',
  },
  {
    name: 'Dados e filas',
    symbol: 'DB',
    role: 'Estado persistente e trabalho assíncrono.',
    description:
      'PostgreSQL com Drizzle ou Prisma; Redis e BullMQ nas filas. LangGraph com checkpointing em PostgreSQL para manter o estado das conversas.',
    detail: 'PostgreSQL · Redis · BullMQ',
    color: '#dcc9fc',
  },
  {
    name: 'Tempo real',
    symbol: 'RT',
    role: 'Chamadas, mídia e eventos.',
    description:
      'Asterisk/ARI para controle de chamadas, LiveKit para mídia e WebSockets ou Socket.io para atualização em tempo real. NATS conecta serviços por eventos.',
    detail: 'Asterisk · LiveKit · NATS',
    color: '#d7ef9b',
  },
  {
    name: 'Infra e tooling',
    symbol: '</>',
    role: 'Operar e estender a plataforma.',
    description:
      'Docker, Traefik, S3 e OpenTelemetry na infraestrutura. MCP, CLIs e clientes desktop com Wails para expor e operar as capacidades da plataforma.',
    detail: 'Docker · OpenTelemetry · MCP',
    color: '#f2c7bc',
  },
]
