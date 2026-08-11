# Perfil Survey — Product-Led Website

Site institucional e comercial do Perfil Survey, construído como um repositório independente da aplicação principal.

O conteúdo apresenta a plataforma por meio do próprio produto: workspace interativo, controle de cotas, cobertura geográfica, lógica de questionário, pesquisa eleitoral e gestão de acessos.

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui com Base UI
- Lucide Icons

## Executar localmente

Requisitos: Node.js 22 ou superior e npm.

```bash
npm install
npm run dev
```

O Vite mostrará o endereço local, normalmente `http://localhost:5173`.

### Configuração dos links

Copie `.env.example` para `.env.local` quando precisar apontar o site para outro domínio:

```env
VITE_SITE_URL=https://perfilsurvey.com.br
VITE_APP_URL=https://app.perfilsurvey.com.br
VITE_CONTACT_URL=
```

O CTA principal usa `VITE_APP_URL/login` e já inclui parâmetros UTM para medir os acessos vindos da landing. `VITE_CONTACT_URL` deve permanecer vazio até existir um canal comercial oficial; nesse caso, a página não exibe um link de demonstração fictício.

## Validar para produção

```bash
npm run lint
npm run build
npm run preview
```

O resultado de produção é gerado em `dist/`.

## Publicação

O projeto contém configuração para deploy estático na Vercel. Também pode ser publicado em qualquer serviço capaz de servir a pasta `dist/`.

Depois do deploy, valide:

1. `https://perfilsurvey.com.br/robots.txt`
2. `https://perfilsurvey.com.br/sitemap.xml`
3. canonical, Open Graph e JSON-LD no HTML da landing.

No Google Search Console, crie uma propriedade de prefixo de URL, envie o sitemap e solicite a inspeção da página inicial. A indexação não é imediata nem garantida.

## Marketing orgânico inicial

- Publique dois conteúdos curtos por semana sobre questionários, amostragem, cotas, coleta e análise.
- Publique um guia mensal e direcione todos os links para a landing.
- Faça cinco contatos direcionados por semana com institutos, consultorias, universidades e equipes que executam pesquisas.
- Realize uma demonstração mensal e acompanhe cliques no login, cadastros, ativações e contatos qualificados.
- Evite mídia paga até existir uma oferta comercial, canal de contato e medição de conversão funcionando.

## Direção visual

A identidade foi inspirada no projeto Stitch `Sistema Coleta PerfilSurvey` e no design system da aplicação principal. A página preserva a linguagem sóbria e operacional do produto, com azul como ação principal, roxo em momentos analíticos e laranja para sinalizar movimento e atenção.

A assinatura visual é a “linha de evidência”: pontos, conexões e gráficos mostram a continuidade entre planejamento, coleta, auditoria e decisão.

## Estrutura principal

- `src/App.tsx`: conteúdo, seções e demonstrações interativas.
- `src/style.css`: tokens, direção visual e responsividade.
- `src/components/ui/`: componentes shadcn/ui.
- `public/perfil-survey-logo.svg`: marca reutilizada da aplicação.
- `.github/workflows/ci.yml`: lint e build em push/PR.
