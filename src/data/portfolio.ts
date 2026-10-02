export type Project = {
  id: string
  kind?: 'indexer' | 'speech' | 'terminal'
  title: string
  category: string
  description: string
  detail: string
  technologies: string[]
  url: string
}

export const profileLinks = {
  github: 'https://github.com/JohnnyBoySou',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-sousa-8441321aa/',
}

// Baseado no LinkedIn, no README do perfil e nos repositórios públicos.
// Consulte docs/content-sources.md para os limites e as fontes de cada afirmação.
export const portfolio = {
  name: 'Sousa',
  fullName: 'João Sousa',
  role: 'Tech Lead na LAI',
  introduction:
    'Trabalho com TypeScript, Go e Python, conectando APIs, filas, mídia em tempo real e modelos. Também mantenho a API do Meu Shamar e desenvolvo ferramentas para tornar o trabalho de outros devs mais direto.',
  about:
    'Sou João Sousa, Tech Lead na LAI. Construo sistemas de voz, mensageria e inferência: da integração com Asterisk e LiveKit aos workers que processam áudio, executam modelos e sustentam o produto.',
  stack: ['TypeScript', 'Go', 'Python', 'React', 'PostgreSQL', 'Redis'],
  email: 'joao.sousa@adila.co',
  socials: [
    { label: 'GitHub', url: profileLinks.github },
    { label: 'LinkedIn', url: profileLinks.linkedin },
  ],
}

export const featuredProjects: Project[] = [
  {
    id: 'wkix',
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
    title: 'worker-whisper',
    category: 'Inferência de áudio',
    description:
      'API de transcrição com FastAPI e OpenAI Whisper, com suporte a CUDA, configuração do modelo e execução em Docker.',
    detail: 'Serviço público de transcrição de áudio.',
    technologies: ['Python', 'FastAPI', 'Whisper', 'CUDA'],
    url: 'https://github.com/JohnnyBoySou/worker-whisper',
  },
  {
    id: 'bowser',
    title: 'bowser',
    category: 'Ferramentas Linux',
    description:
      'Navegador de linha de comando para Linux, escrito em C, com abertura de páginas e captura de tela.',
    detail: 'Ferramenta pública de navegação e captura.',
    technologies: ['C', 'Linux'],
    url: 'https://github.com/JohnnyBoySou/bowser',
  },
]
