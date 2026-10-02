export const projectTags = ['IA', 'Worker', 'CLI'] as const
export type ProjectTag = (typeof projectTags)[number]

export type Project = {
  id: string
  kind?: 'indexer' | 'speech' | 'terminal'
  title: string
  category: string
  tags: ProjectTag[]
  description: string
  detail: string
  technologies: string[]
  url: string
}

export const profileLinks = {
  github: 'https://github.com/JohnnyBoySou',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-sousa-8441321aa/',
  whatsapp: 'https://wa.me/5549991935657',
}

// Baseado no LinkedIn, no README do perfil e nos repositórios públicos.
// Consulte docs/content-sources.md para os limites e as fontes de cada afirmação.
export const portfolio = {
  name: 'Sousa',
  fullName: 'João Sousa',
  role: 'Tech Lead',
  introduction:
    'Trabalho com TypeScript, Go e Python, conectando APIs, filas, mídia em tempo real e modelos. Construí Disk, MeetCore, Cadence, Connect e Meu Shamar, produtos em produção que vão da operação comercial ao cuidado conectado. Também desenvolvo ferramentas para outros devs.',
  about:
    'Sou João Sousa, Tech Lead. Construo sistemas de voz, mensageria e inferência: da integração com Asterisk e LiveKit aos workers que processam áudio, executam modelos e sustentam o produto.',
  interests: ['Rock', 'Games', 'Acampar', 'Energético'],
  email: 'dev.joaosousa@gmail.com',
  whatsapp: {
    message: 'Olá, João! Vim pelo seu portfólio e gostaria de conversar sobre um projeto.',
  },
  socials: [
    { label: 'GitHub', url: profileLinks.github },
    { label: 'LinkedIn', url: profileLinks.linkedin },
  ],
}

export const featuredProjects: Project[] = [
  {
    id: 'wkix',
    tags: ['IA', 'CLI'],
    kind: 'indexer',
    title: 'wkix',
    category: 'Código como contexto',
    description:
      'Indexador em Zig que transforma repositórios JavaScript e TypeScript em mapas estruturados para agentes de IA.',
    detail:
      'Extrai símbolos, imports e trechos de código com tree-sitter. A indexação incremental gera arquivos em .workspace/ e pode inserir instruções de navegação em CLAUDE.md e AGENTS.md.',
    technologies: ['Zig', 'tree-sitter', 'JavaScript / TypeScript'],
    url: 'https://github.com/JohnnyBoySou/wkix',
  },
  {
    id: 'worker-thoth',
    tags: ['IA', 'Worker'],
    kind: 'speech',
    title: 'worker-thoth',
    category: 'Áudio, filas e concorrência',
    description:
      'Worker assíncrono em Go que recebe áudio, enfileira jobs no Redis e coordena a transcrição com Whisper.',
    detail:
      'Usa Redis Streams e consumer groups. Mantém o áudio de upload em memória, os resultados com TTL e serializa o acesso ao Whisper para uma única GPU. Uploads exigem a mesma instância ou roteamento aderente.',
    technologies: ['Go', 'Redis Streams', 'Whisper'],
    url: 'https://github.com/JohnnyBoySou/worker-thoth',
  },
  {
    id: 'nani',
    tags: ['CLI'],
    kind: 'terminal',
    title: 'nani',
    category: 'Ferramentas de desenvolvimento',
    description:
      'Navegador de pastas e editor de terminal em Go, com integração ao micro e suporte real a LSP.',
    detail:
      'Navega com as setas, abre o arquivo no micro e retorna à mesma pasta. Integra gopls e tsgo para navegação de código e diagnósticos, respeitando o .gitignore do projeto.',
    technologies: ['Go', 'micro', 'LSP'],
    url: 'https://github.com/JohnnyBoySou/nani',
  },
]

export const moreProjects: Project[] = [
  {
    id: 'walkmap',
    tags: ['IA', 'CLI'],
    title: 'Walkmap',
    category: 'Developer tooling',
    description:
      'Indexação de código com oxc-parser: símbolos, grafo de dependências, hierarquia de tipos e artefatos para agentes de IA.',
    detail: 'Projeto público na organização adila-sh, destacado no meu GitHub.',
    technologies: ['TypeScript', 'oxc-parser', 'Bun / Node.js'],
    url: 'https://github.com/adila-sh/walkmap',
  },
  {
    id: 'worker-whisper',
    tags: ['IA', 'Worker'],
    title: 'worker-whisper',
    category: 'Inferência de áudio',
    description:
      'API de transcrição com FastAPI e OpenAI Whisper, com suporte a CUDA, configuração do modelo e execução em Docker.',
    detail: 'Serviço público de transcrição de áudio.',
    technologies: ['Python', 'FastAPI', 'Whisper', 'CUDA'],
    url: 'https://github.com/JohnnyBoySou/worker-whisper',
  },
  {
    id: 'sql',
    tags: [],
    title: 'Adila SQL',
    category: 'Ferramentas para PostgreSQL',
    description:
      'Cliente desktop para PostgreSQL em Rust e GPUI, com explorador de banco, histórico de consultas, exportação de resultados e planos de execução.',
    detail:
      'MVP com exportação CSV/JSON e visualização de EXPLAIN. Suporta apenas PostgreSQL; autocomplete e diagnósticos avançados ainda não estão implementados. O cancelamento local não garante a interrupção imediata da consulta no servidor.',
    technologies: ['Rust', 'GPUI', 'PostgreSQL', 'SQLx'],
    url: 'https://github.com/JohnnyBoySou/sql',
  },
  {
    id: 'worker-stt',
    tags: ['IA', 'Worker'],
    title: 'worker-stt',
    category: 'Reconhecimento de fala em PT-BR',
    description:
      'Reconhecedor de falas curtas em português brasileiro, com léxico configurável e rejeição de resultados quando a evidência é insuficiente.',
    detail:
      'Protótipo funcional para clipes de até 15 segundos, com encoder CTC, API HTTP, execução em CPU ou CUDA e interface de revisão de clipes. Os limiares precisam de calibração com áudio e rótulos humanos do ambiente de uso.',
    technologies: ['Python', 'FastAPI', 'wav2vec2', 'Docker'],
    url: 'https://github.com/JohnnyBoySou/worker-stt',
  },
  {
    id: 'worker-ari-go',
    tags: ['Worker'],
    title: 'worker-ari-go',
    category: 'Telefonia e sistemas distribuídos',
    description:
      'Worker em Go para controlar chamadas no Asterisk via ARI, com comandos por NATS, sharding e gerenciamento de gravações.',
    detail:
      'Projetado como sidecar do Asterisk, com reidratação de chamadas, drenagem e laboratório local para exercitar o fluxo. A camada de persistência usa o esquema do produto e precisa ser adaptada para outras aplicações.',
    technologies: ['Go', 'Asterisk ARI', 'NATS', 'PostgreSQL'],
    url: 'https://github.com/JohnnyBoySou/worker-ari-go',
  },
  {
    id: 'worker-diffusion',
    tags: ['IA', 'Worker'],
    title: 'worker-diffusion',
    category: 'Geração e processamento de imagens',
    description:
      'API de colorização de lineart com Stable Diffusion e ControlNet, que processa a imagem e entrega o resultado por callback HTTP.',
    detail:
      'Recebe imagem e prompt pela API FastAPI, executa a geração em segundo plano e envia o PNG em Base64 ao callback, sem gravar a imagem gerada em disco. Possui autenticação por API key e execução via Docker, com GPU NVIDIA recomendada.',
    technologies: ['Python', 'FastAPI', 'Stable Diffusion', 'ControlNet'],
    url: 'https://github.com/JohnnyBoySou/worker-diffusion',
  },
  {
    id: 'bowser',
    tags: ['CLI'],
    title: 'bowser',
    category: 'Ferramentas Linux',
    description:
      'Navegador de linha de comando para Linux, escrito em C, com abertura de páginas e captura de tela.',
    detail: 'Ferramenta pública de navegação e captura.',
    technologies: ['C', 'Linux'],
    url: 'https://github.com/JohnnyBoySou/bowser',
  },
]
