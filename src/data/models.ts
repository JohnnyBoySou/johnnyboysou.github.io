export type TrainedModel = {
  id: string
  name: string
  product: 'Shamar' | 'Cadence'
  projectId: 'shamar' | 'cadence'
  field: string
  status: string
  description: string
  input: string
  output: string
  context: string
  url: string
  reportUrl?: string
}

export const models: TrainedModel[] = [
  {
    id: 'lume',
    name: 'Lume',
    product: 'Shamar',
    projectId: 'shamar',
    field: 'Linguagem e assistência',
    status: 'Em pesquisa',
    description:
      'Modelo experimental de linguagem para aproximar pedidos em linguagem natural das informações e tarefas do Shamar.',
    input: 'Pedido em linguagem natural e contexto da interface',
    output: 'Proposta de navegação ou próximo passo',
    context:
      'A pesquisa avalia compreensão de pedidos e limites de atuação. Ações sensíveis dependem de permissões e confirmação da pessoa.',
    url: 'https://meushamar.com.br/modelos/lume',
  },
  {
    id: 'dalia',
    name: 'Dália',
    product: 'Shamar',
    projectId: 'shamar',
    field: 'Inteligência documental',
    status: 'Integrado à plataforma',
    description:
      'Leitura e extração de informações de documentos e receitas, com o arquivo original disponível para conferência.',
    input: 'Foto ou arquivo de um documento',
    output: 'Campos organizados para revisão',
    context:
      'A equipe revisa, corrige e confirma os dados antes da aplicação. Informações ambíguas ou ilegíveis exigem conferência humana.',
    url: 'https://meushamar.com.br/modelos/dalia',
  },
  {
    id: 'lira',
    name: 'Lira',
    product: 'Shamar',
    projectId: 'shamar',
    field: 'Percepção por vídeo',
    status: 'Em avaliação',
    description:
      'Estimativa experimental de frequência cardíaca a partir de vídeo, com verificações da qualidade do sinal.',
    input: 'Vídeo autorizado com condições adequadas de captura',
    output: 'Estimativa experimental de batimentos',
    context:
      'Luz, movimento e estabilidade da imagem fazem parte da avaliação. A precisão clínica ainda não foi validada; o próximo passo é comparar com medições de referência.',
    url: 'https://meushamar.com.br/modelos/lira',
  },
  {
    id: 'sonata',
    name: 'Sonata',
    product: 'Shamar',
    projectId: 'shamar',
    field: 'Séries temporais de saúde',
    status: 'Pesquisa inicial',
    description:
      'Experimentos de previsão e estimativa de batimentos com sinais simulados, para estudar variações ao longo do tempo.',
    input: 'Sequências de sinais simulados',
    output: 'Previsões e estimativas experimentais',
    context:
      'A identificação de anomalias clínicas é uma direção futura de pesquisa. Os experimentos atuais ainda não demonstram desempenho em pessoas.',
    url: 'https://meushamar.com.br/modelos/sonata',
  },
  {
    id: 'vita',
    name: 'Vita',
    product: 'Shamar',
    projectId: 'shamar',
    field: 'Previsão e referência individual',
    status: 'Protótipo funcional',
    description:
      'Previsão de frequência cardíaca e construção de uma referência individual a partir do histórico de sinais.',
    input: 'Histórico de sinais e suas lacunas',
    output: 'Tendências, referência individual e relatórios experimentais',
    context:
      'O protótipo está preparado para avaliação controlada. Previsões e referências individuais ainda não têm validação clínica.',
    url: 'https://meushamar.com.br/modelos/vita',
  },
  {
    id: 'dit',
    name: 'Dit 1',
    product: 'Cadence',
    projectId: 'cadence',
    field: 'Auditoria de conversas',
    status: 'Em produção',
    description:
      'Modelo de auditoria que avalia ligações contra o roteiro publicado, checkpoint por checkpoint, e associa cada julgamento à evidência na transcrição.',
    input: 'Transcrição, roteiro versionado e contexto da marca',
    output: 'Alcance, status dos checkpoints e citações verificáveis',
    context:
      'Executa na infraestrutura do Cadence. O relatório técnico documenta a avaliação em ligações sintéticas, a dificuldade com execuções parciais e as diferenças observadas na operação real.',
    url: 'https://cadence.lai.ia.br/dit',
    reportUrl: 'https://cadence.lai.ia.br/dit/relatorio-tecnico',
  },
]
