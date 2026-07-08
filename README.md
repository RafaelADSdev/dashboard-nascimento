# Dashboard Nascimento

Dashboard comercial executivo da **Superintendência Nascimento** — consolida VGV, segmentos, cartas de crédito e funil de leads para reuniões de resultados e acompanhamento de metas.

**Produção:** [dashboard-nascimento.vercel.app](https://dashboard-nascimento.vercel.app)  
**Repositório:** [github.com/RafaelADSdev/dashboard-nascimento](https://github.com/RafaelADSdev/dashboard-nascimento)

## Visões disponíveis

| Visualização | Descrição |
|---|---|
| **Detalhamento por diretoria** | Tela principal — VGV vs meta, segmentos e tabela de equipes |
| **Visão geral comercial** | Atingimento global da superintendência |
| **VGV por diretoria** | Comparativo de saldo VGV entre diretorias |
| **Segmentos consolidados** | Distribuição de vendas por segmento |
| **Cartas de crédito** | Aproveitamento pré-aprovado por diretoria |
| **Leads e funil** | Conversão comercial (Bitrix24) |

Período de referência dos dados: **Junho/2026** (estáticos em `src/data/dashboard-data.ts`).

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- TypeScript
- CSS com tokens OKLCH (tema claro padrão, escuro opcional)

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Servir build localmente
npm run start

# Lint
npm run lint
```

## Estrutura do projeto

```
src/
├── app/              # Layout e página principal
├── components/
│   ├── Dashboard.tsx # Shell, toolbar e navegação entre visões
│   ├── slides/       # Uma tela por visualização
│   └── ui/           # Card, ChartAccessible, StatusBadge
├── data/             # Dados estáticos do dashboard
└── lib/              # Tema de gráficos, formatadores
```

## Deploy

O projeto está configurado na [Vercel](https://vercel.com) com deploy automático a cada push na branch `master`.

Deploy manual:

```bash
npx vercel --prod --yes
```

## Acessibilidade

- Gráficos com `aria-label` e resumo em texto para leitores de tela
- Tabs e menu de visualizações navegáveis por teclado
- Tabelas semânticas com `scope` e `caption`
- Suporte a `prefers-reduced-motion`
- Modo claro como padrão (melhor leitura em projetor)

## Licença

Projeto privado — uso interno da Superintendência Nascimento.
