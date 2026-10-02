export type Product = {
  id: 'disk' | 'meetcore' | 'cadence' | 'connect' | 'shamar' | 'adila-pay' | 'adila-webhooks' | 'adila-queues' | 'adila-orbit'
  title: string
  category: string
  description: string
  detail: string
  features: string[]
  url: string
  links?: { label: string; url: string }[]
}

// Produtos e atuação confirmados pelo autor. Funcionalidades: páginas públicas
// e complementos confirmados na conversa, registrados nas fontes abaixo.
// Fontes e limites em docs/content-sources.md.
export const products: Product[] = [
  {
    id: 'disk',
    title: 'Disk',
    category: 'Telefonia e operação comercial',
    description:
      'Discagem automática e preditiva, telefonia e cadência em um só lugar. Da fila de leads ao resultado registrado no CRM.',
    detail:
      'Operação por marca, com Kanban, roteiros de ligação, gravações e tabulação automática a partir da telefonia. Integrações com HubSpot, Pipedrive e Bitrix24 conectam tentativas, resultados e histórico à operação comercial.',
    features: ['Discagem preditiva', 'Telefonia', 'CRM', 'Multi-marca'],
    url: 'https://disk.lai.ia.br',
  },
  {
    id: 'meetcore',
    title: 'MeetCore',
    category: 'Vídeo e inteligência na conversa',
    description:
      'Salas de vídeo com copiloto de vendas, gravação e transcrição por interlocutor. Contexto durante a conversa e registro depois dela.',
    detail:
      'Reuniões no navegador com links de acesso para anfitrião e cliente. O copiloto sugere abordagens, respostas a objeções e próximos passos; resumos, integração com HubSpot, webhooks e API conectam a reunião ao fluxo de trabalho.',
    features: ['Vídeo em tempo real', 'Copiloto', 'Transcrição', 'HubSpot'],
    url: 'https://meetcore.lai.ia.br',
  },
  {
    id: 'cadence',
    title: 'Cadence',
    category: 'Qualidade com evidências',
    description:
      'Monitoria de qualidade com IA. Roteiros viram checkpoints, com evidências da transcrição, revisão humana e relatórios.',
    detail:
      'Roteiros revisados e versionados orientam a auditoria das ligações. Cada avaliação preserva evidências e permite concordar ou discordar com justificativa. Reauditorias geram novas versões, mantendo o histórico das decisões.',
    features: [
      'Auditoria com IA',
      'Evidências',
      'Revisão humana',
      'Versionamento',
    ],
    url: 'https://cadence.lai.ia.br',
  },
  {
    id: 'connect',
    title: 'Connect',
    category: 'Atendimento e mensageria',
    description:
      'Uma central de WhatsApp para toda a equipe. Conversas, leads e chamadas de voz com histórico e IA para apoiar o atendimento.',
    detail:
      'WhatsApp Business API com múltiplos atendentes, responsáveis, etiquetas e funil em Kanban. Chamadas com gravação e transcrição, resumos de conversas e indicadores ajudam a acompanhar a operação, com acessos segregados por marca.',
    features: [
      'WhatsApp Business API',
      'Multiatendimento',
      'Kanban',
      'IA conversacional',
    ],
    url: 'https://connect.lai.ia.br',
  },
  {
    id: 'shamar',
    title: 'Meu Shamar',
    category: 'Tecnologia para o cuidado conectado',
    description:
      'Famílias, cuidadores e equipes de saúde conectados por rotinas compartilhadas, ligações telefônicas e vídeo em tempo real. Notificações push e agentes de IA apoiam a comunicação e o acompanhamento.',
    detail:
      'Agenda compartilhada, tarefas, check-ins e pedidos de ajuda para famílias. Para clínicas, home care e ILPIs, uma central reúne sinais de dispositivos compatíveis, filas de alertas, histórico, chamadas e registro de condutas pela equipe. O ecossistema também inclui integração com Alexa e modelos próprios de IA em diferentes estágios. Dália organiza informações de documentos para revisão humana.',
    features: [
      'Cuidado familiar',
      'Telemonitoramento',
      'Ligações telefônicas',
      'Vídeo em tempo real',
      'Notificações push',
      'Agentes de IA',
      'Dispositivos conectados',
    ],
    url: 'https://meushamar.com.br',
    links: [
      {
        label: 'Solução para clínicas',
        url: 'https://meushamar.com.br/para-clinicas',
      },
      { label: 'Modelos de IA', url: 'https://meushamar.com.br/modelos' },
    ],
  },
  {
    id: 'adila-pay',
    title: 'Adila Pay',
    category: 'Pagamentos e operação financeira',
    description:
      'Checkout hospedado, links de pagamento e acompanhamento financeiro. Pix, cartão e boleto conectados à rotina do produto.',
    detail:
      'Dashboard, carteira e ledger organizam saldos e movimentações. API e webhooks conectam a cobrança aos sistemas do negócio, com recursos para conciliação, reembolsos, auditoria e repasses.',
    features: ['Checkout', 'Pix, cartão e boleto', 'Ledger', 'Conciliação'],
    url: 'https://pay.adila.co',
  },
  {
    id: 'adila-webhooks',
    title: 'Adila Webhooks',
    category: 'Eventos e integrações',
    description:
      'Captura, inspeção e encaminhamento de webhooks em uma central. Headers, payloads e histórico ajudam a entender cada entrega.',
    detail:
      'Endpoints de captura recebem eventos e permitem inspecionar as requisições em tempo real. Filtros e transformações preparam os dados para cada destino; retentativas com backoff, assinatura HMAC e replay apoiam a operação das integrações.',
    features: ['Inspeção ao vivo', 'Retentativas', 'HMAC', 'Replay'],
    url: 'https://webhooks.adila.co',
  },
  {
    id: 'adila-queues',
    title: 'Adila Queues',
    category: 'Filas e processamento assíncrono',
    description:
      'Uma visão das filas por dentro. Tráfego ao vivo, jobs, tentativas e falhas, com ferramentas para investigar e agir.',
    detail:
      'Conexões com BullMQ, Redis Streams, RabbitMQ, Kafka e NATS JetStream reúnem estados de jobs, capturas de eventos e métricas. Retentativas, pausas, alertas por limiar e histórico de ações apoiam a operação de cada broker.',
    features: ['Cinco brokers', 'Jobs ao vivo', 'Capturas', 'Auditoria'],
    url: 'https://queues.adila.co',
  },
  {
    id: 'adila-orbit',
    title: 'Adila Orbit',
    category: 'Projetos e gestão de produto',
    description:
      'Tasks, projetos e roadmaps para organizar o trabalho da equipe. Do contexto de cada tarefa à direção do próximo ciclo.',
    detail:
      'Status, prioridades, comentários, dependências e histórico acompanham as tarefas. Projetos e roadmaps conectam planejamento e execução, com visões em Kanban, lista e timeline para acompanhar as entregas.',
    features: ['Tasks e projetos', 'Kanban', 'Roadmaps', 'Dependências'],
    url: 'https://orbit.adila.co',
  },
]
