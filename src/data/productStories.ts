import type { Product } from './products'

type ProductStory = {
  title: string
  description: string
  steps: { title: string; text: string }[]
  capabilities?: {
    title: string
    items: { title: string; text: string }[]
  }
}
export const productStories: Record<Product['id'], ProductStory> = {
  disk: {
    title: 'Uma operação de voz conectada ao comercial.',
    description:
      'O Disk reúne a organização dos leads, a telefonia e o registro do resultado. O histórico acompanha a operação entre o discador e o CRM.',
    steps: [
      {
        title: 'Organizar a fila',
        text: 'Leads e etapas ficam no Kanban da marca. Regras de cadência definem intervalos e limites de tentativas.',
      },
      {
        title: 'Conduzir a ligação',
        text: 'Discagem automática ou preditiva, roteiro e gravação fazem parte do fluxo de atendimento.',
      },
      {
        title: 'Registrar o resultado',
        text: 'A telefonia alimenta a tabulação. Integrações com CRM conectam resultados e histórico, com acompanhamento por marca e vendedor.',
      },
    ],
  },
  meetcore: {
    title: 'A reunião como parte do fluxo de trabalho.',
    description:
      'Vídeo, contexto e registro trabalham juntos. O MeetCore leva o copiloto para a conversa e organiza o que fica depois dela.',
    steps: [
      {
        title: 'Abrir a sala',
        text: 'Reuniões no navegador com links próprios para anfitrião e cliente, agendamento e entrada por integrações.',
      },
      {
        title: 'Acompanhar a conversa',
        text: 'O copiloto sugere abordagens e próximos passos. A transcrição identifica os interlocutores.',
      },
      {
        title: 'Preservar o contexto',
        text: 'Gravação, resumo e integração com HubSpot conectam o conteúdo da reunião à operação comercial.',
      },
    ],
  },
  cadence: {
    title: 'Da avaliação automática à revisão com evidência.',
    description:
      'O Cadence transforma o roteiro da operação em critérios explícitos. Cada julgamento pode ser revisado com a transcrição e a versão que o originou.',
    steps: [
      {
        title: 'Publicar a régua',
        text: 'O roteiro é extraído em blocos e checkpoints. Uma pessoa revisa os critérios antes de publicar a versão usada na auditoria.',
      },
      {
        title: 'Auditar com o Dit 1',
        text: 'O modelo avalia o alcance da conversa e cada checkpoint, com status e trechos da transcrição que sustentam a avaliação.',
      },
      {
        title: 'Revisar e acompanhar',
        text: 'A gerência registra concordância ou discordância com justificativa. Reauditorias preservam versões e histórico.',
      },
    ],
  },
  connect: {
    title: 'Continuidade entre conversa, equipe e atendimento.',
    description:
      'O Connect centraliza o atendimento WhatsApp e dá à equipe acesso ao contexto dos contatos, às chamadas e ao acompanhamento de leads.',
    steps: [
      {
        title: 'Receber a conversa',
        text: 'WhatsApp Business API e histórico de contatos em uma central para múltiplos atendentes.',
      },
      {
        title: 'Organizar o atendimento',
        text: 'Responsáveis, etiquetas e Kanban ajudam a acompanhar o funil, com acessos segregados por marca.',
      },
      {
        title: 'Recuperar o contexto',
        text: 'Chamadas com gravação e transcrição, resumos de conversas e indicadores apoiam a continuidade do trabalho.',
      },
    ],
  },
  shamar: {
    title: 'Rotina, comunicação e inteligência no mesmo cuidado.',
    description:
      'O Meu Shamar reúne a organização do cuidado e os canais para agir sobre o que acontece. Famílias e cuidadores compartilham a rotina; equipes de saúde acompanham o contexto, recebem atualizações e se comunicam por telefone ou vídeo em tempo real.',
    steps: [
      {
        title: 'Compartilhar a rotina',
        text: 'Agenda, tarefas, check-ins e pedidos de ajuda aproximam a família e quem participa do cuidado.',
      },
      {
        title: 'Acompanhar e avisar',
        text: 'Dispositivos compatíveis, histórico e filas de alertas dão contexto ao acompanhamento. Notificações push levam avisos da rotina e pedidos de ajuda a quem participa do cuidado.',
      },
      {
        title: 'Conversar e dar continuidade',
        text: 'Ligações telefônicas e vídeo em tempo real aproximam família e equipe. O histórico e o registro de condutas preservam o contexto para o próximo atendimento, com permissões e revisão humana.',
      },
    ],
    capabilities: {
      title: 'Comunicação e IA a serviço do cuidado',
      items: [
        {
          title: 'Ligações telefônicas',
          text: 'A telefonia faz parte da plataforma e do acompanhamento. A equipe pode entrar em contato com familiares e pessoas assistidas, esclarecer uma situação e combinar os próximos passos do cuidado.',
        },
        {
          title: 'Vídeo em tempo real',
          text: 'Videochamadas acrescentam a presença visual à conversa entre as pessoas envolvidas no cuidado. Um canal para aproximar família, cuidadores e equipe durante o acompanhamento à distância.',
        },
        {
          title: 'Notificações push',
          text: 'Avisos sobre a rotina e pedidos de ajuda chegam aos dispositivos de quem acompanha o cuidado, conforme as preferências e permissões de recebimento. As notificações conectam o que acontece na plataforma à atenção de quem precisa agir.',
        },
        {
          title: 'Agentes de IA',
          text: 'Agentes apoiam a interação com a plataforma e a organização de informações, com contexto e acesso controlado. No trabalho com documentos, Dália organiza os campos extraídos para revisão humana antes da aplicação dos dados clínicos.',
        },
      ],
    },
  },
  'adila-pay': {
    title: 'Da cobrança ao acompanhamento financeiro.',
    description:
      'O Pay reúne a experiência de pagamento e a operação que continua depois dela. Cobranças, movimentações e integrações ficam conectadas ao mesmo produto.',
    steps: [
      { title: 'Criar a cobrança', text: 'Checkout hospedado e links de pagamento oferecem caminhos para cobrar por Pix, cartão ou boleto.' },
      { title: 'Conectar o pagamento', text: 'A API e os webhooks levam os eventos financeiros aos sistemas que precisam acompanhar o estado da cobrança.' },
      { title: 'Acompanhar a operação', text: 'Carteira, ledger, conciliação, reembolsos e repasses organizam a continuidade do trabalho financeiro.' },
    ],
  },
  'adila-webhooks': {
    title: 'Visibilidade entre a origem e o destino do evento.',
    description:
      'O Webhooks aproxima a investigação da operação. Uma requisição capturada pode ser inspecionada, preparada para um destino e reenviada com histórico.',
    steps: [
      { title: 'Capturar e inspecionar', text: 'Uma URL pública recebe os eventos e expõe headers, corpo e status para acompanhar o que chegou.' },
      { title: 'Preparar a entrega', text: 'Filtros, transformações e assinatura HMAC configuram o encaminhamento para cada destino.' },
      { title: 'Investigar e reenviar', text: 'Histórico, retentativas com backoff e replay individual ou em lote ajudam a tratar falhas de integração.' },
    ],
  },
  'adila-queues': {
    title: 'Entender o job antes de decidir o próximo passo.',
    description:
      'O Queues conecta diferentes brokers a uma interface de inspeção e operação. O estado da fila, os eventos e as ações ficam próximos de quem investiga.',
    steps: [
      { title: 'Conectar o broker', text: 'BullMQ, Redis Streams, RabbitMQ, Kafka e NATS JetStream compartilham uma interface, preservando os conceitos de cada broker.' },
      { title: 'Acompanhar o fluxo', text: 'Tráfego ao vivo, payloads, tentativas, métricas de backlog e capturas mostram o caminho dos jobs.' },
      { title: 'Operar com histórico', text: 'Retentar, pausar e outras ações disponíveis por broker deixam um registro. Alertas por limiar apoiam o acompanhamento das filas.' },
    ],
  },
  'adila-orbit': {
    title: 'O detalhe da tarefa conectado à direção do produto.',
    description:
      'O Orbit organiza o trabalho em torno de tarefas, projetos e roadmaps. O planejamento preserva o contexto de quem executa e acompanha a entrega.',
    steps: [
      { title: 'Dar contexto à tarefa', text: 'Responsável, prioridade, comentários e dependências ajudam a definir o que precisa acontecer.' },
      { title: 'Organizar a execução', text: 'Projetos e visões em Kanban, lista ou timeline permitem acompanhar o trabalho por diferentes perspectivas.' },
      { title: 'Planejar o próximo ciclo', text: 'Roadmaps conectam as entregas à direção do produto e ajudam a revisar prioridades conforme o trabalho avança.' },
    ],
  },
}
