---
name: Dashboard Nascimento
description: Dashboard executivo de resultados comerciais da Superintendência Nascimento
colors:
  navy-authority: "#1d3557"
  cool-canvas: "#f8f9fb"
  surface-white: "#ffffff"
  ink-primary: "#2b3440"
  ink-secondary: "#5a6573"
  ink-muted: "#7a8490"
  border-default: "#e4e7ec"
  success: "#10b981"
  danger: "#ef4444"
  warning: "#f59e0b"
  kpi-orange: "#d97706"
  kpi-purple: "#7c3aed"
  kpi-mint: "#2a9d8f"
typography:
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.4
  metric:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
rounded:
  sm: "8px"
  md: "10px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.navy-authority}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# Design System: Dashboard Nascimento

## 1. Overview

**Creative North Star: "A Sala de Comando"**

Um dashboard de briefing executivo para liderança comercial imobiliária. A interface é clara, fria e confiante — pensada para salas de reunião com luz ambiente e leitura rápida de KPIs. O detalhamento por diretoria é a âncora; filtros abrem recortes sem transformar a ferramenta em site de marketing.

Rejeita explicitamente o visual "AI slop" de PRODUCT.md: sem gradientes decorativos, glassmorphism, grids de cards idênticos ou sombras largas combinadas com bordas fantasma.

**Key Characteristics:**
- Tema claro por padrão, fundo cool-neutral e cards brancos
- Azul marinho como único acento forte (ações primárias, barras principais)
- Inter em pesos 400–700, escala fixa em rem
- Profundidade por borda tonal, não por sombra pesada
- Gráficos com paleta semântica (sucesso, alerta, perigo) + navy para dados estruturais

## 2. Colors

Paleta fria e profissional: neutros azulados, navy como autoridade, cores semânticas apenas para estado e dados.

### Primary
- **Navy Authority** (#1d3557 / oklch(0.35 0.075 250)): botão Atualizar, barras de gráfico principal, links de destaque, item ativo em filtros

### Neutral
- **Cool Canvas** (#f8f9fb / oklch(0.98 0.004 250)): fundo da área principal
- **Surface White** (#ffffff): cards, toolbar buttons, painel de filtros
- **Ink Primary** (#2b3440 / oklch(0.28 0.03 250)): títulos e métricas
- **Ink Secondary** (#5a6573): corpo de tabela, labels de gráfico
- **Ink Muted** (#7a8490): subtítulos, cabeçalhos de coluna
- **Border Default** (#e4e7ec): bordas de card, inputs, separadores

### Semantic
- **Success** (#10b981): meta atingida, badges positivos
- **Danger** (#ef4444): abaixo da meta, alertas críticos
- **Warning** (#f59e0b): atenção, performance intermediária

### KPI Accents (data viz only)
- **KPI Orange**, **KPI Purple**, **KPI Mint**: cards e funis de recorte comercial — nunca como decoração de UI genérica

**The One Accent Rule.** Navy carrega ações primárias e dados estruturais. Cores saturadas aparecem só em dados com significado (segmento, funil, status).

## 3. Typography

**Body Font:** Inter (system-ui fallback)

**Character:** Sans única, escala fixa, hierarquia por peso e tamanho — nunca display font em labels ou botões.

### Hierarchy
- **Title** (700, 1.35rem, -0.02em letter-spacing): título da visualização na toolbar
- **Metric** (700, 2rem, -0.02em): números de KPI e gauge
- **Body** (400–500, 0.875rem): texto geral, células de tabela
- **Label** (600, 0.8rem): títulos de card, cabeçalhos de coluna, tabs

**The Fixed Scale Rule.** Sem clamp em headings de produto. Tamanhos consistentes entre breakpoints; responsividade é estrutural (grid colapsa), não tipográfica fluida.

## 4. Elevation

Sistema predominantemente plano. Profundidade vem de contraste tonal (fundo cool vs card branco) e borda de 1px, não de sombra larga.

### Shadow Vocabulary
- **Filter panel** (`0 4px 16px rgba(43, 52, 64, 0.1)`): único uso de sombra — dropdown de filtros acima do conteúdo

**The Flat Card Rule.** Cards usam borda sólida OU sombra leve, nunca os dois como decoração. Proibido ghost-card (border + blur ≥16px).

## 5. Components

### Buttons
- **Shape:** 8px radius
- **Primary:** navy authority, texto branco, peso 600
- **Secondary:** fundo branco, borda default, texto secondary
- **Hover:** leve mudança de fundo (border-subtle), 200ms ease

### Cards / Containers
- **Corner Style:** 10px
- **Background:** surface white
- **Border:** 1px border default
- **Internal Padding:** 20px (1.25rem)
- Cards aninhados: proibidos como padrão; resumo-cards usam fundo canvas com borda sutil

### Navigation (Filtros)
- Painel fixo, lista vertical de visualizações
- Item ativo: fundo primary-subtle, texto navy, ícone + check
- Badge no botão Filtros quando view ≠ detalhamento

### Tabs (diretorias)
- Pills com borda; ativo = primary-subtle + navy
- Wrap em telas menores

### Status Badges
- Pill (border-radius 20px), fundo semântico suave, texto na cor semântica
- Sem uppercase tracking largo

### Charts
- Barras de diretoria: navy uniforme
- Performance vs meta: verde / amarelo / vermelho por ratio
- Tooltips: fundo branco, borda sutil, texto ink

## 6. Do's and Don'ts

### Do:
- **Do** manter contraste ≥4.5:1 em texto de corpo sobre fundos claros
- **Do** usar navy para a ação primária (Atualizar) e dados estruturais
- **Do** respeitar `prefers-reduced-motion` em transições e animações de chart
- **Do** posicionar dropdowns de filtro com `position: fixed` para evitar clipping

### Don't:
- **Don't** usar visual "AI slop": gradientes decorativos, glassmorphism, cards idênticos em grid repetitivo
- **Don't** combinar `border: 1px solid` com `box-shadow` de blur ≥16px no mesmo card
- **Don't** usar border-left colorido >1px em alertas (side-stripe)
- **Don't** aplicar font display ou letter-spacing apertado demais (< -0.04em) em métricas
- **Don't** transformar o dashboard em landing page com hero promocional
