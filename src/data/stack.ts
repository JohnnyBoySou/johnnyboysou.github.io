export const stackAreas = [
  { name: 'Infraestrutura', color: '#c6dbfa' },
  { name: 'IA e inferência', color: '#d8c9f4' },
  { name: 'Voz e tempo real', color: '#d1e5ae' },
  { name: 'Dados e mensageria', color: '#f1dfa8' },
  { name: 'Linguagens', color: '#b9e0e7' },
  { name: 'Produto e ferramentas', color: '#efbcae' },
] as const
export type StackArea = (typeof stackAreas)[number]['name']
export type Technology = {
  name: string
  symbol: string
  area: StackArea
  role: string
  usage: string
}

// Atuação confirmada pelo autor e pelos perfis/repositórios públicos.
// A associação é com o trabalho profissional, sem inferir a stack de cada produto.
export const technologies: Technology[] = [
  {
    name: 'Docker',
    symbol: 'Dk',
    area: 'Infraestrutura',
    role: 'Serviços e workers em containers.',
    usage:
      'Empacotamento de APIs e pipelines de modelos, com ambientes reproduzíveis para execução e operação.',
  },
  {
    name: 'Asterisk / ARI',
    symbol: 'ARI',
    area: 'Voz e tempo real',
    role: 'Controle da telefonia.',
    usage:
      'Criação, acompanhamento e encerramento de chamadas. No worker-ari-go, a telefonia se conecta a uma operação distribuída por NATS.',
  },
  {
    name: 'vLLM',
    symbol: 'vL',
    area: 'IA e inferência',
    role: 'Serving de modelos de linguagem.',
    usage:
      'Execução de inferência e exposição de modelos por API, conectando o modelo ao restante da aplicação.',
  },
  {
    name: 'TypeScript',
    symbol: 'TS',
    area: 'Linguagens',
    role: 'APIs, produto e ferramentas.',
    usage:
      'Serviços com Bun e Elysia, interfaces React, integrações e indexação de código com oxc-parser.',
  },
  {
    name: 'Go',
    symbol: 'Go',
    area: 'Linguagens',
    role: 'Concorrência, voz e workers.',
    usage:
      'Telefonia no worker-ari-go, orquestração de transcrições no worker-thoth e ferramentas de terminal como o nani.',
  },
  {
    name: 'Python',
    symbol: 'Py',
    area: 'Linguagens',
    role: 'Modelos e pipelines de IA.',
    usage:
      'Treinamento, transcrição, diarização, embeddings e processamento de imagens, com APIs para integrar os resultados ao produto.',
  },
  {
    name: 'Rust',
    symbol: 'Rs',
    area: 'Linguagens',
    role: 'Aplicações nativas para dados.',
    usage:
      'Adila SQL: cliente desktop PostgreSQL, com interface GPUI, execução assíncrona com Tokio e acesso ao banco com SQLx.',
  },
  {
    name: 'Zig',
    symbol: 'Zig',
    area: 'Linguagens',
    role: 'Indexação incremental de código.',
    usage:
      'No wkix, extração de símbolos e imports para gerar mapas de repositórios JavaScript e TypeScript usados por agentes.',
  },
  {
    name: 'C',
    symbol: 'C',
    area: 'Linguagens',
    role: 'Ferramentas de sistema.',
    usage:
      'No bowser, um navegador de linha de comando para Linux com abertura de páginas e captura de tela.',
  },
  {
    name: 'Traefik',
    symbol: 'Tf',
    area: 'Infraestrutura',
    role: 'Entrada e roteamento dos serviços.',
    usage:
      'Proxy reverso na infraestrutura, conectando os endereços públicos aos serviços da plataforma.',
  },
  {
    name: 'Linux',
    symbol: 'Lx',
    area: 'Infraestrutura',
    role: 'Ambiente de desenvolvimento e execução.',
    usage:
      'Base para serviços, ferramentas de terminal e utilitários de sistema presentes nos meus projetos.',
  },
  {
    name: 'S3',
    symbol: 'S3',
    area: 'Infraestrutura',
    role: 'Armazenamento de objetos.',
    usage:
      'Arquivos e artefatos acessados pelos serviços, compondo a infraestrutura de armazenamento da plataforma.',
  },
  {
    name: 'OpenTelemetry',
    symbol: 'OT',
    area: 'Infraestrutura',
    role: 'Rastreamento entre serviços.',
    usage:
      'Instrumentação e tracing para acompanhar o caminho de uma requisição e dar contexto à operação distribuída.',
  },
  {
    name: 'CUDA',
    symbol: 'GPU',
    area: 'Infraestrutura',
    role: 'Execução de modelos em GPU.',
    usage:
      'Aceleração dos pipelines de inferência, incluindo a execução de Whisper no worker-whisper.',
  },
  {
    name: 'PyTorch',
    symbol: 'PT',
    area: 'IA e inferência',
    role: 'Treinamento e inferência.',
    usage:
      'Base para desenvolver, ajustar e executar modelos nos pipelines de inteligência artificial.',
  },
  {
    name: 'Transformers',
    symbol: 'HF',
    area: 'IA e inferência',
    role: 'Modelos especializados por tarefa.',
    usage:
      'Carregamento, adaptação e execução de modelos de linguagem e percepção nos serviços de IA.',
  },
  {
    name: 'PEFT / LoRA',
    symbol: 'LoRA',
    area: 'IA e inferência',
    role: 'Fine-tuning com adaptadores.',
    usage:
      'Ajuste de modelos para tarefas específicas, como parte do trabalho de treinamento e especialização.',
  },
  {
    name: 'TRL',
    symbol: 'TRL',
    area: 'IA e inferência',
    role: 'Pipelines de fine-tuning.',
    usage:
      'Ferramentas de treinamento e ajuste de modelos de linguagem no ecossistema Transformers.',
  },
  {
    name: 'Whisper',
    symbol: 'STT',
    area: 'IA e inferência',
    role: 'Áudio em texto.',
    usage:
      'Transcrição no worker-whisper e nos jobs assíncronos coordenados pelo worker-thoth.',
  },
  {
    name: 'faster-whisper',
    symbol: 'FW',
    area: 'IA e inferência',
    role: 'Inferência de transcrição.',
    usage:
      'Reconhecimento de fala nos pipelines de voz, compondo o caminho entre captura de áudio e contexto textual.',
  },
  {
    name: 'pyannote.audio',
    symbol: 'PA',
    area: 'IA e inferência',
    role: 'Diarização de áudio.',
    usage:
      'Separação de falantes para organizar a conversa por interlocutor e dar contexto à transcrição.',
  },
  {
    name: 'sentence-transformers',
    symbol: 'Emb',
    area: 'IA e inferência',
    role: 'Representações semânticas.',
    usage:
      'Geração de embeddings para trabalhar com similaridade e contexto textual nos pipelines de IA.',
  },
  {
    name: 'wav2vec2',
    symbol: 'W2V',
    area: 'IA e inferência',
    role: 'Reconhecimento de fala curta.',
    usage:
      'No worker-stt, participa da análise de hipóteses de transcrição com critérios de aceitação e léxico configurável.',
  },
  {
    name: 'Stable Diffusion',
    symbol: 'SD',
    area: 'IA e inferência',
    role: 'Processamento generativo de imagens.',
    usage:
      'No worker-diffusion, participa do pipeline de colorização que entrega o resultado por callback HTTP.',
  },
  {
    name: 'ControlNet',
    symbol: 'CN',
    area: 'IA e inferência',
    role: 'Condicionamento da geração.',
    usage:
      'Controle do processamento de imagens no pipeline de colorização com Stable Diffusion.',
  },
  {
    name: 'LangGraph',
    symbol: 'LG',
    area: 'IA e inferência',
    role: 'Agentes com estado.',
    usage:
      'Orquestração de conversas e fluxos de agentes, com checkpointing em PostgreSQL para preservar o contexto.',
  },
  {
    name: 'PostgreSQL',
    symbol: 'PG',
    area: 'Dados e mensageria',
    role: 'Estado persistente da aplicação.',
    usage:
      'Dados de produto, estado de conversas e acesso via Drizzle, Prisma ou SQLx, conforme o serviço.',
  },
  {
    name: 'Redis',
    symbol: 'Rd',
    area: 'Dados e mensageria',
    role: 'Filas e estado temporário.',
    usage:
      'Redis Streams no worker-thoth, resultados com TTL e coordenação de trabalhos assíncronos.',
  },
  {
    name: 'BullMQ',
    symbol: 'BQ',
    area: 'Dados e mensageria',
    role: 'Jobs em segundo plano.',
    usage:
      'Filas baseadas em Redis para conectar tarefas assíncronas ao fluxo dos serviços.',
  },
  {
    name: 'NATS',
    symbol: 'N',
    area: 'Dados e mensageria',
    role: 'Eventos e comandos distribuídos.',
    usage:
      'Comunicação entre serviços e roteamento de comandos para o nó responsável pela chamada no worker-ari-go.',
  },
  {
    name: 'Drizzle',
    symbol: 'Dr',
    area: 'Dados e mensageria',
    role: 'Acesso tipado ao banco.',
    usage:
      'Consultas e modelagem de dados nos serviços TypeScript conectados ao PostgreSQL.',
  },
  {
    name: 'Prisma',
    symbol: 'Pr',
    area: 'Dados e mensageria',
    role: 'Persistência nas APIs.',
    usage:
      'Camada de acesso e modelagem de dados nas aplicações que usam PostgreSQL.',
  },
  {
    name: 'LiveKit',
    symbol: 'LK',
    area: 'Voz e tempo real',
    role: 'Transporte de mídia.',
    usage:
      'Captura de áudio e vídeo, salas de reunião e integração da mídia aos pipelines de conversação.',
  },
  {
    name: 'WebRTC VAD',
    symbol: 'VAD',
    area: 'Voz e tempo real',
    role: 'Detecção de atividade de voz.',
    usage:
      'Identificação de segmentos de fala para organizar o processamento do áudio nos pipelines de conversação.',
  },
  {
    name: 'WebSockets',
    symbol: 'WS',
    area: 'Voz e tempo real',
    role: 'Atualizações em tempo real.',
    usage:
      'Eventos e comunicação contínua entre interfaces e serviços, incluindo fluxos com Socket.io.',
  },
  {
    name: 'React',
    symbol: 'Re',
    area: 'Produto e ferramentas',
    role: 'Interfaces e design system.',
    usage:
      'Construção das telas de produto e de componentes compartilhados para aplicações web.',
  },
  {
    name: 'Bun',
    symbol: 'Bun',
    area: 'Produto e ferramentas',
    role: 'Runtime e ferramentas TypeScript.',
    usage:
      'Execução de serviços, scripts e ferramentas, além do gerenciamento de dependências no desenvolvimento.',
  },
  {
    name: 'Elysia',
    symbol: 'El',
    area: 'Produto e ferramentas',
    role: 'APIs no runtime Bun.',
    usage:
      'Implementação das rotas e contratos dos serviços TypeScript que conectam produto e integrações.',
  },
  {
    name: 'FastAPI',
    symbol: 'FA',
    area: 'Produto e ferramentas',
    role: 'APIs para pipelines Python.',
    usage:
      'Exposição de inferência e processamento por HTTP nos workers de transcrição, fala e imagem.',
  },
  {
    name: 'Wails',
    symbol: 'Wa',
    area: 'Produto e ferramentas',
    role: 'Aplicações desktop com Go.',
    usage:
      'Integração entre serviços em Go e interfaces web para ferramentas de desenvolvimento e operação.',
  },
  {
    name: 'GPUI',
    symbol: 'GP',
    area: 'Produto e ferramentas',
    role: 'Interface nativa em Rust.',
    usage:
      'No Adila SQL, constrói a experiência de consulta, exploração e análise de dados PostgreSQL.',
  },
  {
    name: 'Tokio',
    symbol: 'Tk',
    area: 'Produto e ferramentas',
    role: 'Execução assíncrona em Rust.',
    usage:
      'Coordenação do trabalho assíncrono no Adila SQL, separando as operações da interface.',
  },
  {
    name: 'SQLx',
    symbol: 'SQL',
    area: 'Produto e ferramentas',
    role: 'Consultas PostgreSQL em Rust.',
    usage:
      'Acesso ao banco no Adila SQL, incluindo consulta e fluxo de resultados para exportação.',
  },
  {
    name: 'tree-sitter',
    symbol: 'AST',
    area: 'Produto e ferramentas',
    role: 'Análise sintática de código.',
    usage:
      'Extração de símbolos e imports no wkix para transformar repositórios em contexto navegável.',
  },
  {
    name: 'oxc-parser',
    symbol: 'oxc',
    area: 'Produto e ferramentas',
    role: 'Indexação de JavaScript e TypeScript.',
    usage:
      'No Walkmap, análise de código para gerar símbolos, dependências e artefatos usados por agentes.',
  },
  {
    name: 'MCP',
    symbol: 'MCP',
    area: 'Produto e ferramentas',
    role: 'Ferramentas acessíveis a agentes.',
    usage:
      'Exposição de capacidades da plataforma para integrar agentes aos serviços e ao fluxo de trabalho.',
  },
]
