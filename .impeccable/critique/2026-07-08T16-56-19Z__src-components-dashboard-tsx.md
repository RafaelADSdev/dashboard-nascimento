---
target: dashboard
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-07-08T16-56-19Z
slug: src-components-dashboard-tsx
---
# Critique: Dashboard Nascimento

Method: degraded (Assessment A: inline após falha do sub-agent · Assessment B: shell agent `2734699e`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Atualizar mostra loading, mas não recarrega dados reais |
| 2 | Match System / Real World | 4 | Linguagem comercial imobiliária adequada (VGV, diretoria, funil) |
| 3 | User Control and Freedom | 2 | Voltar ao detalhamento exige reabrir Filtros; sem atalho visível |
| 4 | Consistency and Standards | 3 | Componentes coerentes; "Filtros" rotula navegação de views |
| 5 | Error Prevention | 2 | Dados estáticos; pouca prevenção além de Exportar desabilitado |
| 6 | Recognition Rather Than Recall | 2 | 6 visualizações escondidas no menu Filtros |
| 7 | Flexibility and Efficiency | 2 | Sem atalhos de teclado ou deep links entre views |
| 8 | Aesthetic and Minimalist Design | 3 | Limpo pós-polish; tela principal ainda densa (apropriado ao briefing) |
| 9 | Error Recovery | 1 | Sem estados de erro ou recuperação documentados |
| 10 | Help and Documentation | 1 | Sem ajuda contextual; siglas sem glossário |
| **Total** | | **23/40** | **Acceptable — melhorias significativas antes de confiança plena** |

**Cognitive load:** 3 falhas — opções >4 no painel Filtros; navegação oculta (recall); `overflow: hidden` no body pode cortar conteúdo em telas menores.

## Anti-Patterns Verdict

**LLM assessment:** Não grita "AI slop" após o redesign. Identidade executiva clara, navy + superfícies planas, sem glassmorphism. Restam sinais genéricos: grid de cards, eyebrow uppercase na marca, e o padrão "dashboard com toolbar + cards" — aceitável para register product, mas sem personalidade memorável além do navy.

**Deterministic scan:** 4 advisories (`design-system-color`) em `chart-theme.ts:22–25` — bordas do `SEGMENTO_PALETTE` não espelhadas em DESIGN.md. Provável drift documental, não bug visual.

**Browser overlays:** Não disponíveis. Live-server subiu na porta 8400, mas Next.js não injeta `live.js` e não houve sessão browser para overlay. Revisão manual cobriu a11y.

## Overall Impression

Base sólida para briefing executivo: dados legíveis, hierarquia melhorou com o polish. O maior gap é de **arquitetura de informação** — tratar navegação entre views como "Filtros" força recall e confunde gestores que buscam "outra tela", não "filtrar dados".

## What's Working

1. **Detalhamento como âncora** — alinha com PRODUCT.md; tabs de diretoria + grid 2×2 comunicam bem o recorte principal.
2. **Feedback de estado na toolbar** — badge no Filtros quando fora do detalhamento, `aria-busy` no Atualizar, foco visível nos controles.
3. **Sistema visual coerente** — tokens OKLCH, cards planos, sem ghost-cards; gráficos com semântica de cor (meta vs realizado).

## Priority Issues

### [P1] "Filtros" esconde navegação entre views
- **Why:** Gestores interpretam Filtros como recorte de dados (período, diretoria), não como troca de relatório inteiro. 6 opções no dropdown aumentam carga cognitiva.
- **Fix:** Renomear para "Visualizações" ou "Relatórios"; mostrar view ativa na toolbar; adicionar link "Voltar ao detalhamento" quando em outra view.
- **Command:** `/impeccable clarify dashboard`

### [P1] Gráficos inacessíveis (canvas sem alternativa)
- **Why:** Chart.js renderiza canvas sem `aria-label` nem tabela/resumo para screen readers; falha WCAG para Sam e auditoria.
- **Fix:** `aria-label` descritivo por gráfico + `role="img"` ou tabela sr-only com dados principais.
- **Command:** `/impeccable audit dashboard`

### [P1] Listbox de Filtros sem teclado completo
- **Why:** `role="listbox"` com botões não implementa setas/Home/End; padrão ARIA incompleto.
- **Fix:** Usar `<dialog>` nativo ou menu com roving tabindex e setas.
- **Command:** `/impeccable harden filter-panel`

### [P2] Atualizar é apenas cosmético
- **Why:** Simula refresh sem buscar dados; em reunião, gestor pode achar que números foram atualizados.
- **Fix:** Integrar fetch real ou remover animação até haver API; mostrar timestamp "Dados de Junho/2026".
- **Command:** `/impeccable harden dashboard`

### [P2] `overflow: hidden` no body
- **Why:** Em viewports menores ou zoom 200%, conteúdo das grids pode ficar inacessível sem scroll da página.
- **Fix:** Permitir scroll no `main` ou `dashboard-main` em breakpoints estreitos.
- **Command:** `/impeccable adapt dashboard`

## Persona Red Flags

**Alex (Power User):** Sem atalhos de teclado para trocar view ou diretoria. Trocar de relatório = abrir Filtros + clicar. Atualizar não recarrega dados. Abandono provável em uso diário repetitivo.

**Sam (Acessibilidade):** Canvas dos gráficos sem descrição. Tabs de diretoria sem `role="tablist"` / `aria-selected`. Tabelas sem `scope` nem `caption`. Listbox sem navegação por setas.

**Gestor Nascimento (reunião executiva):** Em projeção, precisa explicar que "Filtros" leva a outro relatório — fricção desnecessária. Badge de status no detalhamento fica isolado no canto sem contexto imediato do título. Exportar visível mas desabilitado gera pergunta "por que não funciona?".

## Minor Observations

- `card-title` é `<div>`, não heading — hierarquia semântica fraca dentro dos slides.
- Eyebrow uppercase "SUPERINTENDÊNCIA" é tell leve de scaffold AI (único, tolerável).
- Cores do `SEGMENTO_PALETTE` divergem do DESIGN.md documentado.
- Modo escuro existe mas não é o default de reunião — OK por PRODUCT.md.

## Questions to Consider

- E se a navegação entre views fosse uma barra secundária visível, não um dropdown?
- O botão Atualizar deveria existir antes de haver dados dinâmicos?
- Uma linha de KPI no topo do detalhamento reduziria a necessidade de abrir "Visão geral"?
