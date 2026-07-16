const SLIDES_DATA = [
  {
    id: "cover",
    section: "Capa",
    title: "EdgeMarket",
    subtitle: "O Marketplace de Espaços Publicitários OOH",
    body: "Conectamos fornecedores de espaços publicitários físicos a marcas e anunciantes — em uma plataforma white-label personalizável.",
    cta: "Apresentação Comercial 2026"
  },
  {
    id: "quem-somos",
    section: "Quem Somos",
    title: "Quem Somos",
    subtitle: "Missão e Visão",
    items: [
      { icon: "mission", label: "Missão", text: "Digitalizar o mercado de mídia exterior, conectando de forma inteligente quem tem espaço a quem quer divulgar." },
      { icon: "vision", label: "Visão", text: "Ser a principal plataforma B2B de compra e venda de espaços OOH na América Latina até 2028." },
      { icon: "value", label: "Proposta de Valor", text: "Uma plataforma white-label que permite empresas e anunciantes conectarem-se diretamente com fornecedores de espaços publicitários físicos." }
    ]
  },
  {
    id: "mercado",
    section: "Mercado OOH",
    title: "O Mercado OOH no Brasil",
    subtitle: "Números que comprovam a oportunidade",
    stats: [
      { value: "R$ 3,2 bi", label: "Faturamento anual do setor OOH no Brasil (2025)" },
      { value: "12%", label: "Crescimento anual médio nos últimos 5 anos" },
      { value: "450 mil+", label: "Pontos de mídia exterior no país" },
      { value: "68%", label: "Dos anunciantes querem investir mais em OOH digital" }
    ],
    footnote: "Fontes: ABOOH, Painel, IBGE — estimativas 2025/2026"
  },
  {
    id: "problema",
    section: "Problema / Dor",
    title: "O Problema",
    subtitle: "Por que o mercado OOH ainda é manual e ineficiente",
    painPoints: [
      { icon: "manual", title: "Processo Manual", desc: "Compra e venda de espaços ainda dependem de planilhas, ligações e intermediários." },
      { icon: "visibility", title: "Baixa Visibilidade", desc: "Fornecedores não conseguem expor seu catálogo para o mercado certo." },
      { icon: "data", title: "Falta de Dados", desc: "Sem métricas de impressão, ocupação ou ROI, decisões são no escuro." },
      { icon: "scale", title: "Dificuldade de Escalar", desc: "Cada região opera de forma isolada, sem padronização ou integração." }
    ]
  },
  {
    id: "solucao",
    section: "Solução",
    title: "A Solução",
    subtitle: "EdgeMarket — o marketplace que conecta o OOH ao digital",
    description: "Uma plataforma completa que digitaliza toda a jornada de compra e venda de espaços publicitários físicos, desde a catalogação até a gestão de campanhas.",
    highlights: [
      "Catálogo digital com geolocalização e disponibilidade em tempo real",
      "Processo de compra automatizado com contratos digitais",
      "Dashboard de métricas e performance para fornecedores e anunciantes",
      "Modelo white-label para cada operador ter sua marca"
    ]
  },
  {
    id: "como-funciona",
    section: "Como Funciona",
    title: "Como Funciona",
    subtitle: "4 passos para começar",
    steps: [
      { number: "01", title: "Cadastre seu Espaço", desc: "O fornecedor cadastra seus pontos de mídia com fotos, localização, dimensões e disponibilidade." },
      { number: "02", title: "Configure e Publique", desc: "Define preços, regras de uso e publica no marketplace. Tudo com validação automática." },
      { number: "03", title: "Anunciantes Encontram", desc: "Marcas e agências buscam espaços por região, formato, período e budget — com filtros inteligentes." },
      { number: "04", title: "Gestão e Relatórios", desc: "Contratos, pagamentos, instalação e métricas de performance — tudo em um painel unificado." }
    ]
  },
  {
    id: "fornecedores",
    section: "Para os Fornecedores",
    title: "Para os Fornecedores",
    subtitle: "Maximize a ocupação dos seus espaços",
    benefits: [
      { icon: "reach", title: "Alcance Nacional", text: "Exponha seu catálogo para milhares de anunciantes em todo o Brasil." },
      { icon: "revenue", title: "Aumente a Receita", text: "Reduza o tempo ocioso dos seus painéis com bookings recorrentes." },
      { icon: "dashboard", title: "Painel Completo", text: "Acompanhe ocupação, receita, contratos e métricas em tempo real." },
      { icon: "contract", title: "Contratos Digitais", text: "Gere, assine e gerencie contratos sem papel e sem dor de cabeça." }
    ]
  },
  {
    id: "parceiros",
    section: "Para os Parceiros",
    title: "Para os Parceiros",
    subtitle: "Uma nova fonte de receita para sua operação",
    benefits: [
      { icon: "whitelabel", title: "Modelo White-Label", text: "Lance seu próprio marketplace com sua marca e identidade visual." },
      { icon: "commission", title: "Comissionamento", text: "Gere receita recorrente com comissão sobre cada transação na plataforma." },
      { icon: "support", title: "Suporte Dedicado", text: "Onboarding, treinamento e suporte técnico contínuo para seus clientes." },
      { icon: "ecosystem", title: "Ecossistema", text: "Integração com CRMs, ERPs e ferramentas de gestão de mídia." }
    ]
  },
  {
    id: "features",
    section: "Features",
    title: "Features Principais",
    subtitle: "Tudo que você precisa em uma plataforma",
    features: [
      { icon: "catalog", title: "Catálogo Inteligente", desc: "Busca por geolocalização, formato, audiência e disponibilidade" },
      { icon: "booking", title: "Booking Online", desc: "Reserva instantânea com calendário de disponibilidade" },
      { icon: "contracts", title: "Contratos Digitais", desc: "Geração automática com assinatura eletrônica" },
      { icon: "payments", title: "Pagamentos Integrados", desc: "Boleto, PIX, cartão — split de pagamento automático" },
      { icon: "analytics", title: "Analytics & BI", desc: "Métricas de impressão, ocupação, receita e ROI" },
      { icon: "api", title: "API Aberta", desc: "Integração com sistemas externos via REST API" },
      { icon: "multi", title: "Multi-tenant", desc: "Várias operações na mesma plataforma, isoladas e personalizáveis" },
      { icon: "mobile", title: "Mobile Ready", desc: "Acesso completo via dispositivos móveis" }
    ]
  },
  {
    id: "whitelabel",
    section: "White-Label",
    title: "Plataforma White-Label",
    subtitle: "Personalize cada detalhe para sua marca",
    customization: [
      { label: "Identidade Visual", desc: "Logo, cores, tipografia e imagens próprias" },
      { label: "Domínio Próprio", desc: "Subdomínio ou domínio exclusivo para sua operação" },
      { label: "Regras de Negócio", desc: "Comissões, prazos, regras de aprovação personalizáveis" },
      { label: "Integrações", desc: "Conecte com seus ERPs, CRMs e ferramentas existentes" },
      { label: "Idioma e Moeda", desc: "Suporte a múltiplos idiomas e moedas para operações regionais" },
      { label: "Onboarding", desc: "Fluxo de cadastro e treinamento customizado para seus clientes" }
    ]
  },
  {
    id: "pricing",
    section: "Pricing",
    title: "Planos",
    subtitle: "Escolha o plano ideal para sua operação",
    plans: [
      {
        name: "Starter",
        price: "R$ 497",
        period: "/mês",
        features: [
          "Até 50 espaços cadastrados",
          "1 usuário administrador",
          "Relatórios básicos",
          "Suporte por e-mail",
          "Integração via API limitada"
        ],
        highlight: false
      },
      {
        name: "Business",
        price: "R$ 1.497",
        period: "/mês",
        features: [
          "Até 500 espaços cadastrados",
          "10 usuários",
          "Relatórios avançados + BI",
          "Suporte prioritário",
          "API completa",
          "White-label incluso"
        ],
        highlight: true
      },
      {
        name: "Enterprise",
        price: "Sob consulta",
        period: "",
        features: [
          "Espaços ilimitados",
          "Usuários ilimitados",
          "Dashboard customizado",
          "Suporte 24/7 + SLA",
          "API + Integrações sob demanda",
          "Onboarding dedicado",
          "Multi-tenant avançado"
        ],
        highlight: false
      }
    ]
  },
  {
    id: "seguranca",
    section: "Segurança",
    title: "Segurança & Compliance",
    subtitle: "Seus dados protegidos em cada camada",
    items: [
      { icon: "lgpd", title: "LGPD", desc: "Total conformidade com a Lei Geral de Proteção de Dados brasileira." },
      { icon: "encrypt", title: "Criptografia", desc: "Dados em trânsito (TLS 1.3) e em repouso (AES-256)." },
      { icon: "sla", title: "SLA 99.9%", desc: "Infraestrutura em cloud com alta disponibilidade e redundância." },
      { icon: "audit", title: "Auditoria", desc: "Logs de auditoria completos para todas as ações na plataforma." }
    ]
  },
  {
    id: "comparativo",
    section: "Comparativo",
    title: "Antes vs. Depois",
    subtitle: "A transformação que o EdgeMarket proporciona",
    comparison: {
      before: [
        "Processo 100% manual e demorado",
        "Comunicação por e-mail e telefone",
        "Sem dados de performance",
        "Contratos em papel",
        "Pagamentos via boleto manual",
        "Escalabilidade limitada"
      ],
      after: [
        "Processo digital automatizado",
        "Comunicação integrada na plataforma",
        "Dashboard com métricas em tempo real",
        "Contratos digitais com assinatura eletrônica",
        "Pagamentos integrados com split automático",
        "Escalabilidade ilimitada via cloud"
      ]
    }
  },
  {
    id: "cta",
    section: "Próximos Passos",
    title: "Vamos Começar?",
    subtitle: "Dê o próximo passo com o EdgeMarket",
    steps: [
      { number: "01", title: "Agende uma Demo", desc: "Apresentação personalizada para sua operação em 30 minutos." },
      { number: "02", title: "Piloto Gratuito", desc: "Teste a plataforma com até 20 espaços por 30 dias sem custo." },
      { number: "03", title: "Lance seu Marketplace", desc: "Configure, publique e comece a gerar receita em até 2 semanas." }
    ]
  },
  {
    id: "contato",
    section: "Contato",
    title: "Contato",
    subtitle: "Estamos prontos para conversar",
    contact: {
      email: "comercial@edgemarket.com.br",
      phone: "+55 (11) 4002-8922",
      website: "www.edgemarket.com.br",
      linkedin: "linkedin.com/company/edgemarket"
    },
    closing: "Obrigado pela atenção. Vamos transformar o mercado OOH juntos."
  }
];
