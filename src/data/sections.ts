// Síntese dos perfis e projetos públicos documentados em docs/content-sources.md.
export const capabilities = [
  {
    title: 'Telefonia e mídia em tempo real',
    glyph: 'voice',
    summary: 'Chamadas, reuniões e gravações conectadas.',
    description:
      'Construo o caminho entre iniciar uma chamada, transportar a mídia e preservar o que aconteceu. Asterisk/ARI no controle da telefonia, LiveKit nas reuniões e gravações conectadas ao contexto da operação, com recuperação de estado e encerramento coordenado das chamadas.',
    tags: ['Asterisk / ARI', 'LiveKit', 'WebSockets', 'Go'],
    projectIds: ['disk', 'meetcore', 'worker-ari-go'],
  },
  {
    title: 'Mensageria e integrações',
    glyph: 'messaging',
    summary: 'Conversas que atravessam produtos e equipes.',
    description:
      'Conecto WhatsApp, equipes de atendimento e CRM para que a conversa tenha continuidade. Histórico, responsáveis, funis e eventos fazem parte do mesmo fluxo, com filas e estado persistente para integrar serviços e acompanhar o resultado de cada interação.',
    tags: ['WhatsApp Business API', 'HubSpot', 'Redis / BullMQ', 'PostgreSQL'],
    projectIds: ['connect', 'disk'],
  },
  {
    title: 'Agentes e modelos de IA',
    glyph: 'agents',
    summary: 'Contexto, treinamento e modelos dentro do produto.',
    description:
      'Desenvolvo modelos e agentes ligados a tarefas do produto: assistência durante reuniões, auditoria de conversas e leitura de documentos. Trabalho com contexto, ferramentas, estado de execução e avaliação; evidências e revisão humana entram nos fluxos que precisam de conferência.',
    tags: ['LangGraph', 'PyTorch', 'Transformers', 'PEFT / LoRA'],
    projectIds: ['cadence', 'meetcore', 'shamar', 'ops-worker'],
  },
  {
    title: 'Processamento de áudio e imagens',
    glyph: 'media',
    summary: 'Da entrada de mídia à execução do modelo.',
    description:
      'Transformo modelos em serviços de transcrição e geração de imagens. Isso inclui reconhecimento de falas curtas em PT-BR com léxico configurável, rejeição de hipóteses sem evidência suficiente e colorização de lineart com entrega por callback.',
    tags: ['FastAPI', 'Whisper / wav2vec2', 'Stable Diffusion', 'ControlNet'],
    projectIds: ['worker-stt', 'worker-whisper', 'worker-diffusion'],
  },
  {
    title: 'Sistemas distribuídos e workers',
    glyph: 'workers',
    summary: 'Filas, concorrência e orquestração de serviços.',
    description:
      'Organizo trabalho assíncrono com filas, concorrência e limites de recursos explícitos. Na telefonia, comandos seguem para o shard responsável pela chamada; na transcrição, o acesso à GPU é controlado. Drenagem, reidratação e estado dos jobs fazem parte do desenho.',
    tags: ['NATS', 'Redis Streams', 'Goroutines', 'Docker'],
    projectIds: ['worker-ari-go', 'worker-thoth', 'dash-mcp'],
  },
  {
    title: 'CLIs e ferramentas para código',
    glyph: 'code',
    summary: 'Repositórios e memórias como contexto para agentes.',
    description:
      'Crio ferramentas para navegar e entender repositórios, tanto para pessoas quanto para agentes. Indexação incremental, extração de símbolos, grafos de dependências e integração com LSP levam o contexto do código ao terminal. Na Adila, Walkmap organiza repositórios e Memorywalk indexa memórias, detecta duplicatas e recupera contexto entre sessões.',
    tags: ['Zig', 'tree-sitter', 'oxc-parser', 'LSP'],
    projectIds: ['wkix', 'adila-walkmap', 'memorywalk', 'nani'],
  },
  {
    title: 'Aplicações desktop e dados',
    glyph: 'desktop',
    summary: 'Ferramentas para código, Git, APIs e bancos.',
    description:
      'Desenvolvo ferramentas desktop para o trabalho de quem programa. Na Adila, a IDE reúne editor, terminal e LSP; o Stash organiza Git e pull requests; o Putch trabalha com APIs e coleções locais. No Adila SQL, Rust e GPUI dão forma ao cliente PostgreSQL.',
    tags: ['Go / Wails', 'React / Monaco', 'Rust / GPUI', 'PostgreSQL'],
    projectIds: ['coder-app', 'stash-app', 'putch-app', 'sql'],
  },
  {
    title: 'Produtos e plataformas web',
    glyph: 'web',
    summary: 'Da API à experiência de quem usa o produto.',
    description:
      'Levo funcionalidades da API à interface: autenticação, permissões, integrações e jornadas de uso. Construo aplicações React e serviços TypeScript para operações comerciais e cuidado conectado, com componentes reutilizáveis e decisões de produto refletidas nos contratos do sistema.',
    tags: ['TypeScript', 'Bun / Elysia', 'React', 'Design systems'],
    projectIds: ['disk', 'connect', 'shamar'],
  },
  {
    title: 'Observabilidade e operação',
    glyph: 'pulse',
    summary: 'Eventos, rastreamento e infraestrutura acessível por IA.',
    description:
      'Construo as ferramentas que ajudam a acompanhar e operar um produto. O Pulse SDK reúne eventos, feature flags, tracing e envio de replay para a API da Adila. O Adila MCP conecta agentes ao control plane para consultar serviços, logs e deploys, respeitando as permissões do usuário.',
    tags: ['TypeScript', 'MCP', 'Feature flags', 'Tracing'],
    projectIds: ['pulse-sdk', 'dash-mcp'],
  },
  {
    title: 'Design systems e interfaces',
    glyph: 'design',
    summary: 'Uma linguagem visual compartilhada entre produtos.',
    description:
      'Transformo padrões de interface em componentes reutilizáveis. O Adila UI reúne componentes React, tokens, tipografia e temas claro e escuro, com CSS pré-compilado. A documentação vive no mesmo monorepo e conecta exemplos aos resultados dos testes dos componentes.',
    tags: ['React', 'Design tokens', 'Fumadocs', 'TanStack Start'],
    projectIds: ['system-design'],
  },
] as const

export const engineeringDecisions = [
  {
    id: 'routing',
    label: 'Telefonia',
    projectId: 'worker-ari-go',
    project: 'worker-ari-go',
    title: 'Uma chamada precisa de um dono.',
    constraint:
      'O estado da chamada pertence ao worker que a iniciou. Enviar o comando de encerramento para outro nó deixa o controle no lugar errado.',
    decision:
      'Endereço os comandos ao shard responsável pela chamada, usando NATS. Na saída de um worker, a drenagem coordena o encerramento do trabalho.',
    tradeoff:
      'Distribuir chamadas exige acompanhar o estado e a disponibilidade de cada shard. A afinidade da chamada faz parte do contrato.',
    input: 'Iniciar · acompanhar · encerrar',
    engine: 'NATS',
    output: 'Shard da chamada',
    caption: 'Os comandos continuam no nó que conhece a chamada.',
  },
  {
    id: 'queue',
    label: 'Capacidade',
    projectId: 'worker-thoth',
    project: 'worker-thoth',
    title: 'A fila absorve o trabalho. A GPU tem limite.',
    constraint:
      'Receber vários áudios ao mesmo tempo não aumenta a capacidade de uma única GPU. A execução precisa respeitar esse recurso compartilhado.',
    decision:
      'Recebo os jobs de forma assíncrona pelo Redis Streams e serializo o acesso ao Whisper. O estado do job acompanha o processamento.',
    tradeoff:
      'Em picos de entrada, aumenta o tempo de espera na fila. Aceitar o job e concluir a transcrição são etapas distintas.',
    input: 'Áudios recebidos',
    engine: 'Redis Streams',
    output: 'Whisper / GPU',
    caption: 'Jobs em espera; uma transcrição por vez na GPU.',
  },
  {
    id: 'evidence',
    label: 'Evidência',
    projectId: 'worker-stt',
    project: 'worker-stt',
    title: 'Pouca evidência também é uma resposta.',
    constraint:
      'Falas curtas, silêncio e ruído podem gerar hipóteses parecidas. Uma transcrição plausível pode não ter evidência suficiente no áudio.',
    decision:
      'Comparo as hipóteses com um léxico configurável e critérios de aceitação. Quando a evidência não basta, o serviço devolve texto vazio e o motivo da rejeição.',
    tradeoff:
      'Algumas falas serão rejeitadas. Os limiares precisam de calibração com áudio e rótulos humanos do ambiente de uso.',
    input: 'Clipe de fala curta',
    engine: 'Léxico + evidência',
    output: 'Texto + motivo da decisão',
    caption: 'Sem evidência suficiente, a saída é texto vazio.',
  },
  {
    id: 'export',
    label: 'Dados',
    projectId: 'sql',
    project: 'Adila SQL',
    title: 'Exportar não pode repetir uma escrita.',
    constraint:
      'Para exportar todas as linhas, o Adila SQL executa novamente a consulta do resultado exibido. Repetir uma escrita poderia alterar os dados outra vez.',
    decision:
      'A exportação aceita consultas classificadas como leitura e recusa escritas ou instruções que não consegue classificar com segurança. As linhas seguem em fluxo para CSV ou JSON.',
    tradeoff:
      'Como a consulta é executada novamente, os dados exportados podem diferir da tela se o banco mudou nesse intervalo.',
    input: 'Consulta do resultado exibido',
    engine: 'Verificar se é leitura',
    output: 'CSV / JSON',
    caption: 'Uma consulta de escrita é recusada antes da exportação.',
  },
] as const
