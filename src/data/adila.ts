// Repositórios públicos consultados em 02/10/2026; fontes em docs/content-sources.md.
export const adilaProjects = [
  { id: 'coder-app', title: 'Adila IDE', category: 'Editor, terminal e LSP', description: 'Um ambiente para escrever código, navegar pelo projeto e trabalhar com Git.', technologies: 'Go · Wails · Monaco', glyph: 'code', url: 'https://github.com/adila-sh/coder-app' },
  { id: 'stash-app', title: 'Stash', category: 'Git e GitHub no desktop', description: 'Branches, diffs e revisão de pull requests no mesmo lugar.', technologies: 'Go · Wails · React', glyph: 'branches', url: 'https://github.com/adila-sh/stash-app' },
  { id: 'putch-app', title: 'Putch', category: 'Cliente HTTP local', description: 'Requisições, testes e coleções em YAML que acompanham o repositório.', technologies: 'Go · Wails · YAML', glyph: 'request', url: 'https://github.com/adila-sh/putch-app' },
  { id: 'adila-walkmap', title: 'Walkmap', category: 'Código como contexto', url: 'https://github.com/adila-sh/walkmap' },
  { id: 'memorywalk', title: 'Memorywalk', category: 'Memória para agentes', url: 'https://github.com/adila-sh/memorywalk' },
  { id: 'ops-worker', title: 'Ops Worker', category: 'Treinamento e serving de IA', url: 'https://github.com/adila-sh/ops-worker' },
  { id: 'dash-mcp', title: 'Adila MCP', category: 'Operação de infraestrutura', url: 'https://github.com/adila-sh/dash-mcp' },
  { id: 'pulse-sdk', title: 'Pulse SDK', category: 'Eventos, flags e tracing', url: 'https://github.com/adila-sh/pulse-sdk' },
  { id: 'system-design', title: 'Adila UI', category: 'Componentes e tokens', url: 'https://github.com/adila-sh/system-design' },
] as const

// Produtos apresentados no site e no catálogo da Adila, consultados em 02/10/2026.
// O link público não implica que o código-fonte do produto seja público.
export const adilaCatalog = [
  {
    title: 'Plataformas e operação',
    projects: [
      { title: 'Adila Identity', category: 'Identidade e acesso', description: 'Conta única, SSO, organizações e controle de sessões para conectar os produtos.', url: 'https://auth.adila.co' },
      { title: 'Adila Pulse', category: 'Analytics de produto', description: 'Eventos, jornadas, funis, feature flags e experimentos na mesma base.', url: 'https://pulse.adila.co' },
      { title: 'Adila Dash', category: 'Publicação de aplicações', description: 'Repositórios conectados a builds, ambientes, logs e acompanhamento dos deploys.', url: 'https://dash.adila.co' },
      { title: 'Adila Monitor', category: 'Erros e qualidade de código', description: 'Ocorrências em runtime, sinais dos pull requests e histórico de qualidade por commit.', url: 'https://monitor.adila.co' },
      { title: 'Adila Workflow', category: 'Automação visual', description: 'Fluxos com nós, integrações e agentes de IA, com acompanhamento das execuções.', url: 'https://workflow.adila.co' },
      { title: 'Adila Ops', category: 'Operação de IA', description: 'Projetos, modelos, embeddings, datasets e logs em uma interface de operação.', url: 'https://ops.adila.co' },
    ],
  },
  {
    title: 'Ferramentas para criar',
    projects: [
      { title: 'Adila IDE', category: 'Editor de código', description: 'Editor, terminal, Git e integração com LSP em um ambiente de desenvolvimento.', url: 'https://ide.adila.co' },
      { title: 'Adila Stash', category: 'Git no desktop', description: 'Commits, branches, diffs e revisão de pull requests em uma janela.', url: 'https://stash.adila.co' },
      { title: 'Adila Putch', category: 'Cliente HTTP', description: 'Requisições, scripts e testes em coleções YAML que acompanham o repositório.', url: 'https://putch.adila.co' },
      { title: 'Adila Drums', category: 'Produção musical', description: 'Sequenciador, sintetizadores, mixer e exportação WAV em um aplicativo local.', url: 'https://drums.adila.co' },
      { title: 'Memorywalk', category: 'Contexto para agentes', description: 'Indexação, busca e identificação de duplicatas em memórias de agentes.', url: 'https://github.com/adila-sh/memorywalk' },
      { title: 'Adila UI', category: 'Design system', description: 'Componentes React, tokens e temas com documentação e exemplos de uso.', url: 'https://ds.adila.co' },
    ],
  },
] as const
