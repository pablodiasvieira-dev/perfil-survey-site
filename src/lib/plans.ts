export type BillingCycle = "monthly" | "annual"

export type PublicPlan = {
  id: "free" | "economy" | "plus_agency" | "plus_eleitoral" | "full"
  name: string
  audience: string
  description: string
  monthlyPrice: number
  annualMonthlyPrice: number
  annualTotal: number
  badge?: string
  tone?: "primary" | "electoral"
  features: string[]
}

export const publicPlans: PublicPlan[] = [
  {
    id: "free",
    name: "Free",
    audience: "Para experimentar",
    description: "Uma pesquisa pequena para conhecer o fluxo completo.",
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    annualTotal: 0,
    features: [
      "1 projeto ativo e 100 respostas",
      "2 entrevistadores simultâneos",
      "Pesquisas Comum e Enquete",
      "1 cliente por projeto",
    ],
  },
  {
    id: "economy",
    name: "Economy",
    audience: "Para profissionais autônomos",
    description: "Mais projetos, volume e exportação para uma operação individual.",
    monthlyPrice: 79,
    annualMonthlyPrice: 63,
    annualTotal: 756,
    features: [
      "3 projetos ativos",
      "2.000 respostas por mês",
      "5 entrevistadores simultâneos",
      "2 clientes por projeto",
      "Exportação CSV e XLSX",
    ],
  },
  {
    id: "plus_agency",
    name: "Plus Agency",
    audience: "Para empresas e consultorias",
    description: "Operação profissional, qualitativa e analítica para vários clientes.",
    monthlyPrice: 299,
    annualMonthlyPrice: 239,
    annualTotal: 2868,
    badge: "Mais escolhido",
    tone: "primary",
    features: [
      "10 projetos e 20.000 respostas por mês",
      "50 entrevistadores e 10 equipes",
      "Qualitativa com gravação de áudio",
      "Análise cruzada e Painel de BI",
      "IA limitada e 5 clientes por projeto",
    ],
  },
  {
    id: "plus_eleitoral",
    name: "Plus Eleitoral",
    audience: "Para institutos eleitorais",
    description: "Toda a operação Agency com método, território e preparação eleitoral.",
    monthlyPrice: 499,
    annualMonthlyPrice: 399,
    annualTotal: 4788,
    badge: "Pesquisa eleitoral",
    tone: "electoral",
    features: [
      "Tudo do Plus Agency",
      "Pesquisas e relatórios eleitorais",
      "Áreas, zonas e setores censitários",
      "Validação geográfica e ponderações",
      "Preparação para registro no TSE",
    ],
  },
  {
    id: "full",
    name: "Full",
    audience: "Para operações de alto volume",
    description: "Capacidade elevada, integração e governança para estruturas maiores.",
    monthlyPrice: 1490,
    annualMonthlyPrice: 1192,
    annualTotal: 14304,
    features: [
      "100 projetos e 500.000 respostas por mês",
      "500 entrevistadores e 100 equipes",
      "Todas as pesquisas e funcionalidades",
      "API, exportações em lote e governança",
      "IA ampliada com 1 milhão de tokens",
    ],
  },
]

export const formatBrl = (value: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
}).format(value)
