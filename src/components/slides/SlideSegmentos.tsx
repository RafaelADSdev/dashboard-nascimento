"use client";

import { useId, useMemo } from "react";
import { Pie } from "@/lib/charts";
import { segmentosConsolidados } from "@/data/dashboard-data";
import { createPieOptions, segmentoDataset } from "@/lib/chart-theme";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";

export function SlideSegmentos() {  const baseId = useId();

  const chartData = useMemo(
    () => ({
      labels: segmentosConsolidados.labels,
      datasets: [segmentoDataset(segmentosConsolidados.data)],
    }),
    [],
  );

  const chartOptions = useMemo(
    () =>
      createPieOptions({
        plugins: {
          datalabels: {
            formatter: (val: number) => {
              if (val <= 0) return "";
              const total = segmentosConsolidados.data.reduce((a, b) => a + b, 0);
              const pct = Math.round((val / total) * 100);
              return `${val}\n${pct}%`;
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed;
                const total = segmentosConsolidados.data.reduce((a, b) => a + b, 0);
                const pct = ((val / total) * 100).toFixed(1);
                return `${ctx.label}: ${val} vendas (${pct}%)`;
              },
            },
          },
        },
      }),
    [],
  );

  const total = segmentosConsolidados.data.reduce((a, b) => a + b, 0);
  const chartSummary = segmentosConsolidados.labels.map((label, i) => {
    const val = segmentosConsolidados.data[i];
    const pct = ((val / total) * 100).toFixed(1);
    return `${label}: ${val} vendas (${pct}%)`;
  });

  return (
    <>
      <div className="content-grid grid-3-1">
        <Card className="chart-card" style={{ alignItems: "center", justifyContent: "center" }}>
          <ChartAccessible
            label="Distribuição de vendas por segmento na superintendência"
            summary={
              <ul>
                {chartSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            }
          >
            <div className="chart-wrapper-center chart-wrapper--pie">
              <Pie data={chartData} options={chartOptions} aria-hidden />
            </div>
          </ChartAccessible>
        </Card>
        <Card title="Volume por segmento" titleId={`${baseId}-volume`} style={{ justifyContent: "center", gap: 15 }}>
          <div className="metric-center" style={{ marginBottom: 10 }}>
            <div className="metric-value text-accent">44</div>
            <div className="metric-label">Vendas totais</div>
          </div>
          {segmentosConsolidados.bars.map((s) => (
            <div key={s.label} className="segment-bar-row">
              <div className="segment-bar-header">
                <span className="segment-bar-dot" style={{ background: s.color }} />
                <span>{s.label}</span>
                <span>{s.val} vendas</span>
              </div>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ transform: `scaleX(${s.perc / 100})`, background: s.color }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
