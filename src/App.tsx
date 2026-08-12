import { useState, type ComponentType } from "react"
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileChartColumn,
  Fingerprint,
  Gauge,
  GitBranch,
  Layers3,
  LockKeyhole,
  MapPin,
  Menu,
  MessageSquareText,
  MousePointerClick,
  Network,
  Route,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { formatBrl, publicPlans, type BillingCycle } from "@/lib/plans"
import { contactUrl, getRegisterUrl, loginUrl } from "@/lib/site-config"

type DemoTab = "visao" | "cotas" | "mapa"

type Capability = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

const navigation = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Pesquisa eleitoral", href: "#eleitoral" },
  { label: "Planos", href: "#planos" },
  { label: "Dúvidas", href: "#duvidas" },
]

const capabilities: Capability[] = [
  {
    icon: GitBranch,
    title: "Questionários que seguem a lógica do estudo",
    description:
      "Combine tipos de pergunta, validações, condições de exibição e saltos para conduzir cada pessoa pelo caminho certo.",
  },
  {
    icon: Target,
    title: "Amostra e cotas sob controle",
    description:
      "Planeje perfis, acompanhe metas e identifique cotas faltantes, atingidas ou excedidas sem conciliar planilhas.",
  },
  {
    icon: UsersRound,
    title: "Digital, campo ou os dois",
    description:
      "Publique por link, e-mail, embed ou QR code e distribua entrevistas para equipes externas no mesmo projeto.",
  },
  {
    icon: ShieldCheck,
    title: "Qualidade visível durante a coleta",
    description:
      "Revise respostas, acompanhe localização e duração e organize casos em auditoria antes que virem resultado.",
  },
  {
    icon: MessageSquareText,
    title: "Dados abertos também viram evidência",
    description:
      "Padronize respostas, crie codebooks e revise transcrições preservando o dado original e o histórico de tratamento.",
  },
  {
    icon: FileChartColumn,
    title: "Resultados prontos para circular",
    description:
      "Cruze variáveis, monte painéis e compartilhe uma leitura clara da pesquisa com clientes e gestores.",
  },
]

const process = [
  {
    step: "Planeje",
    detail: "Defina objetivo, público, método e tamanho da amostra.",
    icon: ClipboardCheck,
  },
  {
    step: "Construa",
    detail: "Crie o questionário e configure perfis, cotas e regras.",
    icon: SlidersHorizontal,
  },
  {
    step: "Colete",
    detail: "Distribua nos canais certos e oriente a operação de campo.",
    icon: MousePointerClick,
  },
  {
    step: "Acompanhe",
    detail: "Veja progresso, qualidade e cobertura enquanto acontece.",
    icon: ScanSearch,
  },
  {
    step: "Decida",
    detail: "Trate os dados e transforme respostas em relatórios.",
    icon: BarChart3,
  },
]

const faqs = [
  {
    question: "O Perfil Survey é apenas um criador de formulários?",
    answer:
      "Não. O questionário é só uma parte da operação. A plataforma também organiza método, amostra, cotas, publicação, equipes, coleta, auditoria, tratamento de dados e relatórios dentro do mesmo projeto.",
  },
  {
    question: "Posso usar a plataforma em pesquisa de campo?",
    answer:
      "Sim. O Perfil Survey contempla acesso por entrevistadores, sessões de trabalho, orientação de cotas, rascunhos, anexos e localização quando esses recursos são habilitados no projeto.",
  },
  {
    question: "É possível fazer coleta pública e autenticada?",
    answer:
      "Sim. Cada estudo pode adotar link aberto, login, lista de e-mails, equipes de entrevistadores, incorporação em site ou uma estratégia híbrida.",
  },
  {
    question: "Como a plataforma trata respostas abertas?",
    answer:
      "A resposta original é preservada. A equipe pode criar padronizações versionadas, categorias, codebooks, codificações e transcrições revisadas para análise sem apagar a evidência coletada.",
  },
  {
    question: "O módulo eleitoral registra a pesquisa no TSE?",
    answer:
      "A plataforma organiza áreas, dados e textos de apoio para preparar o registro no PesqEle. A conferência e o envio final continuam sob responsabilidade do instituto e do profissional técnico responsável.",
  },
  {
    question: "Como funciona a cobrança anual?",
    answer:
      "O ciclo anual é pré-pago por 12 meses e oferece 20% de economia em relação ao valor mensal. O preço exibido por mês é o equivalente mensal do pagamento anual.",
  },
  {
    question: "Respostas excluídas consomem o limite do plano?",
    answer:
      "Há tolerância de até 20% de respostas excluídas sobre o total de respostas válidas. Apenas o que ultrapassa essa margem aumenta o consumo diário e mensal.",
  },
  {
    question: "O plano Full é ilimitado?",
    answer:
      "Não usamos ilimitado literal. O Full oferece limites técnicos muito altos sob fair use; operações acima deles podem receber uma configuração personalizada.",
  },
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#inicio" className="brand-logo" aria-label="Perfil Survey — início">
      <span className={cn("brand-logo__mark", inverse && "brand-logo__mark--inverse")}>
        <img src="/perfil-survey-logo.svg" alt="" />
      </span>
      <span className={cn("brand-logo__text", inverse && "text-white")}>Perfil Survey</span>
    </a>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Logo />
        <nav className="site-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a href="#plataforma" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "hidden md:inline-flex")}>
            Ver a plataforma
          </a>
          <a href={loginUrl} className={cn(buttonVariants({ size: "lg" }), "rounded-full px-5")}>
            Entrar na aplicação
            <ArrowRight data-icon="inline-end" />
          </a>
        </div>
        <div className="site-header__mobile">
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="icon" aria-label="Abrir menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Conheça o Perfil Survey.</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Navegação móvel">
                {navigation.map((item) => (
                  <SheetClose key={item.href} render={<a href={item.href} className="mobile-nav__link" />}>
                    {item.label}
                    <ChevronRight />
                  </SheetClose>
                ))}
                <SheetClose
                  render={
                    <a
                      href={loginUrl}
                      className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full rounded-full")}
                    />
                  }
                >
                  Entrar na aplicação
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("visao")

  return (
    <div className="product-frame" aria-label="Demonstração do workspace Perfil Survey">
      <div className="product-frame__topbar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="product-frame__project">Pesquisa de hábitos e mobilidade</span>
        <Badge variant="secondary">Em coleta</Badge>
      </div>

      <div className="product-frame__body">
        <aside className="product-sidebar" aria-label="Navegação da demonstração">
          <div className="product-sidebar__brand">
            <img src="/perfil-survey-logo.svg" alt="" />
          </div>
          {[Gauge, Layers3, UsersRound, FileChartColumn].map((Icon, index) => (
            <span key={index} className={cn("product-sidebar__item", index === 1 && "is-active")}>
              <Icon />
            </span>
          ))}
        </aside>

        <div className="product-content">
          <div className="product-heading">
            <div>
              <p className="product-kicker">Workspace do projeto</p>
              <h2>Visão da coleta</h2>
            </div>
            <button type="button" className="product-refresh">Atualizado agora</button>
          </div>

          <div className="product-tabs" role="tablist" aria-label="Visões da demonstração">
            {([
              ["visao", "Visão geral"],
              ["cotas", "Cotas"],
              ["mapa", "Cobertura"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={activeTab === value}
                className={cn("product-tab", activeTab === value && "is-active")}
                onClick={() => setActiveTab(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "visao" ? <OverviewPanel /> : null}
          {activeTab === "cotas" ? <QuotaPanel /> : null}
          {activeTab === "mapa" ? <CoveragePanel /> : null}
        </div>
      </div>
    </div>
  )
}

function OverviewPanel() {
  const bars = [42, 58, 51, 66, 72, 61, 83, 74, 89, 78, 92, 96]

  return (
    <div className="demo-panel" role="tabpanel">
      <div className="metric-grid">
        <DemoMetric label="Entrevistas" value="684" change="72% da amostra" tone="primary" />
        <DemoMetric label="Respostas válidas" value="642" change="93,8% da coleta" tone="purple" />
        <DemoMetric label="Tempo médio" value="08:42" change="dentro do esperado" tone="orange" />
      </div>
      <div className="demo-grid">
        <div className="demo-card demo-card--chart">
          <div className="demo-card__header">
            <div>
              <span>Ritmo da coleta</span>
              <strong>Últimos 12 dias</strong>
            </div>
            <span className="demo-status"><i /> operação ativa</span>
          </div>
          <div className="bar-chart" aria-label="Gráfico ilustrativo do ritmo de coleta">
            {bars.map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <div className="demo-card demo-card--activity">
          <div className="demo-card__header">
            <strong>Atividade recente</strong>
          </div>
          {[
            ["Nova resposta validada", "agora"],
            ["Cota 18–24 atingiu 80%", "12 min"],
            ["Equipe Norte iniciou campo", "38 min"],
          ].map(([label, time]) => (
            <div key={label} className="activity-row">
              <CheckCircle2 />
              <span>{label}</span>
              <small>{time}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DemoMetric({ label, value, change, tone }: { label: string; value: string; change: string; tone: string }) {
  return (
    <div className={cn("demo-metric", `demo-metric--${tone}`)}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{change}</small>
    </div>
  )
}

function QuotaPanel() {
  const quotas = [
    { label: "Mulheres · 25–34", done: 138, target: 150, progress: 92, state: "Quase completa" },
    { label: "Homens · 18–24", done: 96, target: 120, progress: 80, state: "Em atenção" },
    { label: "Mulheres · 35–44", done: 110, target: 110, progress: 100, state: "Atingida" },
    { label: "Homens · 45+", done: 74, target: 125, progress: 59, state: "Faltante" },
  ]

  return (
    <div className="demo-panel" role="tabpanel">
      <div className="quota-summary">
        <div><span>Perfis acompanhados</span><strong>12</strong></div>
        <div><span>Cotas atingidas</span><strong>7</strong></div>
        <div><span>Faltam coletar</span><strong>266</strong></div>
      </div>
      <div className="quota-table">
        <div className="quota-table__header"><span>Perfil</span><span>Progresso</span><span>Estado</span></div>
        {quotas.map((quota) => (
          <div className="quota-row" key={quota.label}>
            <div><strong>{quota.label}</strong><small>{quota.done} de {quota.target}</small></div>
            <div className="quota-progress"><span style={{ width: `${quota.progress}%` }} /></div>
            <Badge variant={quota.progress === 100 ? "default" : "secondary"}>{quota.state}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoveragePanel() {
  return (
    <div className="demo-panel" role="tabpanel">
      <div className="coverage-grid">
        <div className="map-surface" aria-label="Mapa ilustrativo da cobertura da coleta">
          <svg viewBox="0 0 600 300" role="img" aria-label="Área de pesquisa com pontos coletados">
            <path className="map-road" d="M-20 64 C120 130, 180 10, 330 76 S510 185, 640 120" />
            <path className="map-road map-road--secondary" d="M70 -20 C95 70, 62 136, 150 220 S330 255, 360 330" />
            <path className="map-area" d="M162 52 L355 38 L481 126 L420 250 L222 265 L118 160 Z" />
            {[[190,92],[260,73],[338,89],[405,133],[174,156],[253,151],[325,139],[388,196],[228,221],[319,219]].map(([x,y], index) => (
              <g key={index} className="map-point">
                <circle cx={x} cy={y} r="12" />
                <text x={x} y={y + 4}>{index + 1}</text>
              </g>
            ))}
          </svg>
          <div className="map-legend"><MapPin /> 10 pontos visíveis</div>
        </div>
        <div className="coverage-list">
          <span>Cobertura por área</span>
          {[
            ["Centro", "92%"],
            ["Zona Norte", "81%"],
            ["Zona Sul", "68%"],
            ["Zona Leste", "57%"],
          ].map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-container hero-copy">
        <Badge variant="secondary" className="hero-badge">
          <Sparkles />
          Pesquisa de ponta a ponta
        </Badge>
        <h1>
          Da primeira pergunta à decisão que <span>move o negócio.</span>
        </h1>
        <p>
          Planeje o estudo, controle amostra e coleta, acompanhe a operação e transforme respostas em relatórios — tudo no mesmo projeto.
        </p>
        <div className="hero-actions">
          <a href={loginUrl} className={cn(buttonVariants({ size: "lg" }), "hero-primary-action rounded-full")}>
            Entrar na aplicação
            <ArrowRight data-icon="inline-end" />
          </a>
          <a href="#plataforma" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
            Explorar a plataforma
          </a>
        </div>
        <p className="hero-proof">
          <Check /> Questionários inteligentes
          <Check /> Coleta digital e de campo
          <Check /> Relatórios compartilháveis
        </p>
      </div>
      <div className="site-container hero-product">
        <div className="evidence-line evidence-line--left" aria-hidden="true" />
        <DashboardDemo />
        <div className="evidence-line evidence-line--right" aria-hidden="true" />
      </div>
    </section>
  )
}

function PlatformSection() {
  return (
    <section id="plataforma" className="section-block section-block--platform">
      <div className="site-container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-label">Uma operação, um contexto</p>
            <h2>Uma pesquisa não termina no formulário.</h2>
          </div>
          <p>
            O Perfil Survey conecta decisões metodológicas ao que acontece no campo e ao que chega à mesa de quem precisa decidir.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <article
                key={capability.title}
                className={cn(
                  "capability-card",
                  index === 0 && "capability-card--featured",
                  index === capabilities.length - 1 && "capability-card--report",
                )}
              >
                <div className="capability-card__icon"><Icon /></div>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
                {index === 0 ? <QuestionFlowMini /> : null}
                {index === capabilities.length - 1 ? <ReportMini /> : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ReportMini() {
  return (
    <div className="report-mini" aria-label="Prévia ilustrativa de um relatório">
      <div className="report-mini__header">
        <span>Percepção sobre o serviço</span>
        <Badge variant="secondary">684 respostas</Badge>
      </div>
      <div className="report-mini__content">
        <div className="report-donut">
          <svg viewBox="0 0 120 120" role="img" aria-label="Gráfico com 76 por cento de avaliação positiva">
            <circle cx="60" cy="60" r="44" />
            <circle className="report-donut__value" cx="60" cy="60" r="44" />
          </svg>
          <span><strong>76%</strong> positiva</span>
        </div>
        <div className="report-bars">
          {[
            ["Muito boa", 78],
            ["Boa", 62],
            ["Regular", 34],
          ].map(([label, width]) => (
            <div key={label}>
              <span>{label}</span>
              <i><b style={{ width: `${width}%` }} /></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuestionFlowMini() {
  return (
    <div className="question-flow" aria-label="Exemplo visual de regra de questionário">
      <div className="question-node question-node--start">
        <span>P3</span>
        <strong>Usa transporte público?</strong>
      </div>
      <div className="question-branch"><span>Sim</span><i /></div>
      <div className="question-node"><span>P4</span><strong>Qual a frequência?</strong></div>
      <div className="question-branch question-branch--skip"><span>Não</span><i /></div>
      <div className="question-node question-node--muted"><Route /><strong>Seguir para P7</strong></div>
    </div>
  )
}

function ProcessSection() {
  return (
    <section id="como-funciona" className="section-block process-section">
      <div className="site-container">
        <div className="section-heading section-heading--center">
          <p className="section-label">Do plano à evidência</p>
          <h2>O contexto acompanha a pesquisa inteira.</h2>
          <p>Você avança de etapa sem recomeçar a operação em outra ferramenta.</p>
        </div>

        <div className="process-track">
          <div className="process-track__line" aria-hidden="true" />
          {process.map((item, index) => {
            const Icon = item.icon
            return (
              <article key={item.step} className="process-step">
                <span className="process-step__index">{index + 1}</span>
                <div className="process-step__icon"><Icon /></div>
                <h3>{item.step}</h3>
                <p>{item.detail}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ElectoralSection() {
  return (
    <section id="eleitoral" className="electoral-section">
      <div className="electoral-grid" aria-hidden="true" />
      <div className="site-container electoral-layout">
        <div className="electoral-copy">
          <Badge className="electoral-badge" variant="secondary">Pesquisa eleitoral e territorial</Badge>
          <h2>Método, território e campo na mesma leitura.</h2>
          <p>
            Configure áreas de coleta, trabalhe com setores censitários e zonas eleitorais e acompanhe a cobertura geográfica das respostas.
          </p>
          <ul>
            {[
              "Dados de referência do IBGE e do TSE",
              "Amostra e cotas distribuídas por território",
              "Validação geográfica do ponto de resposta",
              "Textos e checklist de apoio ao PesqEle",
            ].map((item) => (
              <li key={item}><CheckCircle2 /> {item}</li>
            ))}
          </ul>
          <a href={loginUrl} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-5")}>
            Entrar e conhecer a plataforma
            <ArrowRight data-icon="inline-end" />
          </a>
        </div>

        <div className="territory-card">
          <div className="territory-card__header">
            <div><span>Área de coleta</span><strong>Porto Velho · RO</strong></div>
            <Badge variant="secondary">12 setores</Badge>
          </div>
          <div className="territory-map">
            <svg viewBox="0 0 580 430" role="img" aria-label="Mapa ilustrativo de setores censitários">
              <path className="territory-shape territory-shape--1" d="M48 88 L188 45 L270 116 L221 218 L81 201 Z" />
              <path className="territory-shape territory-shape--2" d="M270 116 L408 69 L514 145 L443 245 L318 238 L221 218 Z" />
              <path className="territory-shape territory-shape--3" d="M81 201 L221 218 L253 354 L112 389 L38 292 Z" />
              <path className="territory-shape territory-shape--4" d="M221 218 L318 238 L443 245 L415 362 L253 354 Z" />
              {[[142,130],[334,142],[418,177],[154,277],[300,292],[382,315]].map(([x,y], index) => (
                <g key={index} className="territory-pin">
                  <circle cx={x} cy={y} r="13" />
                  <text x={x} y={y + 4}>{index + 1}</text>
                </g>
              ))}
            </svg>
            <div className="territory-floating-stat"><MapPin /><span><strong>684</strong> entrevistas georreferenciadas</span></div>
          </div>
          <div className="territory-card__footer">
            <div><span>Cobertura</span><strong>78%</strong></div>
            <div><span>Setores completos</span><strong>7 de 12</strong></div>
            <div><span>Fora da área</span><strong>3 em auditoria</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GovernanceSection() {
  return (
    <section className="section-block governance-section">
      <div className="site-container governance-layout">
        <div className="governance-visual">
          <div className="access-card access-card--admin">
            <span className="access-card__avatar">AM</span>
            <div><strong>Ana Martins</strong><small>Administradora</small></div>
            <Badge>Organização</Badge>
          </div>
          <div className="access-connector" aria-hidden="true"><Network /></div>
          <div className="access-row">
            <div className="access-card"><span className="access-card__icon"><UsersRound /></span><div><strong>Equipe de campo</strong><small>14 entrevistadores</small></div></div>
            <div className="access-card"><span className="access-card__icon"><Fingerprint /></span><div><strong>Cliente externo</strong><small>Acesso a 2 projetos</small></div></div>
          </div>
          <div className="access-project"><LockKeyhole /><span><strong>Pesquisa Mobilidade 2026</strong><small>Acessos e responsabilidades definidos</small></span><ShieldCheck /></div>
        </div>

        <div className="governance-copy">
          <p className="section-label">Governança que acompanha a operação</p>
          <h2>Cada pessoa vê o que precisa. Cada projeto mantém seu controle.</h2>
          <p>
            Organize membros, equipes e usuários externos, distribua acesso por projeto e mantenha responsabilidades claras à medida que a operação cresce.
          </p>
          <div className="governance-points">
            <div><Check /> Organizações e equipes</div>
            <div><Check /> Papéis e permissões</div>
            <div><Check /> Convites e usuários externos</div>
            <div><Check /> Acesso específico por projeto</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const annual = billingCycle === "annual"

  return (
    <section id="planos" className="section-block pricing-section">
      <div className="site-container">
        <div className="section-heading section-heading--split pricing-heading">
          <div>
            <p className="section-label">Planos que acompanham a operação</p>
            <h2>Comece pequeno. Suba quando o trabalho pedir.</h2>
          </div>
          <div className="pricing-heading__aside">
            <p>O upgrade acompanha uma mudança real de volume, análise, especialização ou governança.</p>
            <div className="billing-cycle" role="group" aria-label="Ciclo de cobrança">
              <button
                type="button"
                className={cn("billing-cycle__option", !annual && "is-active")}
                aria-pressed={!annual}
                onClick={() => setBillingCycle("monthly")}
              >
                Mensal
              </button>
              <button
                type="button"
                className={cn("billing-cycle__option", annual && "is-active")}
                aria-pressed={annual}
                onClick={() => setBillingCycle("annual")}
              >
                Anual
                <span>20% de economia</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pricing-grid">
          {publicPlans.map((plan) => {
            const price = annual ? plan.annualMonthlyPrice : plan.monthlyPrice
            const destination = plan.id === "full" && contactUrl
              ? contactUrl
              : getRegisterUrl(plan.id, billingCycle)
            return (
              <article
                key={plan.id}
                className={cn(
                  "pricing-card",
                  plan.tone === "primary" && "pricing-card--primary",
                  plan.tone === "electoral" && "pricing-card--electoral",
                )}
              >
                <div className="pricing-card__header">
                  <div className="pricing-card__eyebrow">
                    <span>{plan.audience}</span>
                    {plan.badge ? <Badge variant={plan.tone === "primary" ? "default" : "secondary"}>{plan.badge}</Badge> : null}
                  </div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>

                <div className="pricing-card__price">
                  {price === 0 ? (
                    <strong>Grátis</strong>
                  ) : (
                    <>
                      <strong>{formatBrl(price)}</strong>
                      <span>/mês</span>
                    </>
                  )}
                  <small>
                    {annual && price > 0
                      ? `${formatBrl(plan.annualTotal)} cobrados por ano`
                      : price > 0 ? "cobrança mensal" : "sem cartão"}
                  </small>
                </div>

                <a
                  href={destination}
                  className={cn(
                    buttonVariants({ variant: plan.tone === "primary" ? "default" : "outline", size: "lg" }),
                    "pricing-card__action",
                  )}
                >
                  {plan.id === "free" ? "Começar grátis" : plan.id === "full" && contactUrl ? "Falar com a equipe" : `Criar conta para ${plan.name}`}
                  <ArrowRight data-icon="inline-end" />
                </a>

                <ul className="pricing-card__features">
                  {plan.features.map((feature) => (
                    <li key={feature}><Check aria-hidden="true" /> <span>{feature}</span></li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="pricing-notes">
          <p><ShieldCheck aria-hidden="true" /> O Free é permanente. Planos pagos são ativados para a organização após a confirmação do checkout.</p>
          <p><Gauge aria-hidden="true" /> O Full usa limites altos e fair use. Respostas excluídas têm tolerância de 20% sobre as válidas.</p>
          <p className="pricing-notes__full"><LockKeyhole aria-hidden="true" /> O cadastro não realiza cobrança nem solicita cartão. A contratação online será liberada somente quando a conexão de pagamentos estiver pronta.</p>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section id="duvidas" className="section-block faq-section">
      <div className="site-container faq-layout">
        <div className="faq-heading">
          <p className="section-label">Dúvidas frequentes</p>
          <h2>Antes de começar, vale saber.</h2>
          <p>O Perfil Survey foi pensado para operações que precisam de método, visibilidade e rastreabilidade.</p>
        </div>
        <Accordion defaultValue={["item-0"]} className="faq-accordion">
          {faqs.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section id="demonstracao" className="final-cta-section">
      <div className="site-container final-cta">
        <div className="final-cta__signal" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <p className="section-label">Veja sua pesquisa funcionando</p>
        <h2>Menos improviso na operação.<br />Mais confiança para decidir.</h2>
        <p>Conheça o fluxo completo e veja como o Perfil Survey pode se adaptar ao seu próximo estudo.</p>
        <div className="final-cta__actions">
          <a
            href={loginUrl}
            className={cn(buttonVariants({ size: "lg" }), "rounded-full bg-white px-6 text-primary hover:bg-white/90")}
          >
            Entrar na aplicação
            <ArrowRight data-icon="inline-end" />
          </a>
          {contactUrl ? (
            <a href={contactUrl} className="final-cta__contact-link">
              Agendar demonstração
            </a>
          ) : (
            <span>Acesse a plataforma e veja o fluxo completo.</span>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__top">
          <Logo inverse />
          <p>Pesquisa bem planejada, coleta controlada e resultados prontos para decisão.</p>
          <nav aria-label="Navegação do rodapé">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
        </div>
        <Separator />
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Perfil Survey.</span>
          <span>Feito para quem transforma respostas em decisões.</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlatformSection />
        <ProcessSection />
        <ElectoralSection />
        <GovernanceSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
