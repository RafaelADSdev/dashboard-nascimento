import { Card } from "@/components/ui/Card";

const FUNNELS = [
  {
    title: "Comercial Geral",
    summary:
      "Funil comercial geral: 990 entradas, 511 perdas, 7 ganhos. Taxa de conversão 0,71%. 4.736 prazos perdidos.",
    steps: [
      { label: "Entrada: 990", className: "funnel-step--entrada" },
      { label: "Perdas: 511", className: "funnel-step--perdas" },
      { label: "Ganhos: 7", className: "funnel-step--ganhos" },
    ],
    statLabel: "Taxa conversão",
    statValue: "0,71%",
    statClass: "text-danger",
    footer: <div className="alert-box">4.736 prazos perdidos</div>,
  },
  {
    title: "Comercial Econômico",
    summary:
      "Funil comercial econômico: 640 entradas, 382 perdas, 0 ganhos. Taxa de conversão 0,00%. Ponto crítico: zero conversões.",
    steps: [
      { label: "Entrada: 640", className: "funnel-step--entrada" },
      { label: "Perdas: 382", className: "funnel-step--perdas" },
      { label: "Ganhos: 0", className: "funnel-step--empty" },
    ],
    statLabel: "Taxa conversão",
    statValue: "0,00%",
    statClass: "text-danger",
    footer: <div className="alert-box">Ponto crítico: zero conversões</div>,
  },
  {
    title: "Caixa Aqui",
    summary:
      "Funil Caixa Aqui: 131 negócios, 39 cartas aprovadas. Aproveitamento de 29,70%. Excelente desempenho.",
    steps: [
      { label: "Negócios: 131", className: "funnel-step--neutro" },
      { label: "Cartas: 39", className: "funnel-step--ganhos" },
    ],
    statLabel: "Aproveitamento",
    statValue: "29,70%",
    statClass: "text-success",
    footer: <div className="summary-text summary-text--compact">Excelente desempenho</div>,
  },
] as const;

export function SlideLeadsFunil() {
  return (
    <>
      <div className="content-grid grid-1-3">
        {FUNNELS.map((funnel) => (
          <Card key={funnel.title} title={funnel.title}>
            <figure className="chart-accessible">
              <div
                className="funnel-container"
                role="img"
                aria-label={funnel.summary}
              >
                {funnel.steps.map((step) => (
                  <div key={step.label} className={`funnel-step ${step.className}`} aria-hidden>
                    {step.label}
                  </div>
                ))}
              </div>
              <figcaption className="sr-only">{funnel.summary}</figcaption>
            </figure>
            <div className="funnel-footer">
              <div className="funnel-stat">
                <small>{funnel.statLabel}</small>
                <strong className={funnel.statClass}>{funnel.statValue}</strong>
              </div>
              {funnel.footer}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
