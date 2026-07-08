"use client";

import { useId, useMemo } from "react";
import type { ScriptableContext, ChartData } from "chart.js";
import { Chart } from "react-chartjs-2";
import { cartasCredito } from "@/data/dashboard-data";
import {
  CHART,
  createVerticalBarOptions,
  metaLineStyle,
  metaThresholdColor,
  verticalBarGradient,
} from "@/lib/chart-theme";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SlideCartasCredito() {  const baseId = useId();

  const chartData = useMemo(
    () => ({
      labels: ["Albuquerque", "Moura", "Nascimento", "Ribeiro"],
      datasets: [
        {
          label: "% Real",
          data: cartasCredito.aproveitamento,
          backgroundColor: (ctx: ScriptableContext<"bar">) => {
            const val = ctx.raw as number;
            if (metaThresholdColor(val, cartasCredito.meta) === CHART.success) {
              return verticalBarGradient(ctx, CHART.successLight, CHART.success);
            }
            return verticalBarGradient(ctx, CHART.dangerLight, CHART.danger);
          },
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 48,
          datalabels: {
            anchor: "end" as const,
            align: "top" as const,
            offset: 4,
            formatter: (v: number) => `${v.toFixed(1).replace(".", ",")}%`,
          },
        },
        {
          label: `Meta (${cartasCredito.meta.toFixed(2).replace(".", ",")}%)`,
          data: [cartasCredito.meta, cartasCredito.meta, cartasCredito.meta, cartasCredito.meta],
          ...metaLineStyle,
        },
      ],
    }),
    [],
  );

  const chartOptions = useMemo(
    () =>
      createVerticalBarOptions({
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
            border: { display: false },
            grid: { color: CHART.grid, drawTicks: false },
            ticks: {
              display: true,
              color: CHART.muted,
              font: { size: 10 },
              callback: (v) => `${v}%`,
              stepSize: 10,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.datasetIndex !== 0) return "";
                const val = ctx.parsed.y;
                if (val == null) return "";
                const status = val >= cartasCredito.meta ? "acima da meta" : "abaixo da meta";
                return `${val}% — ${status}`;
              },
            },
          },
        },
      }),
    [],
  );

  const chartSummary = cartasCredito.tabela.map(
    (row) =>
      `${row.diretoria}: ${row.perc.toFixed(1).replace(".", ",")}% (${row.aprov} aprovadas de ${row.docs} documentos)`,
  );

  return (
    <>
      <div className="header">
        <StatusBadge status="success">Meta Global Superada (29,7%)</StatusBadge>
      </div>
      <div className="content-grid grid-3-1">
        <Card
          title="% de aproveitamento vs meta (16,67%)"
          titleId={`${baseId}-chart`}
          className="chart-card"
        >
          <ChartAccessible
            label="Percentual de aproveitamento de cartas de crédito por diretoria"
            summary={
              <ul>
                {chartSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            }
          >
            <div className="chart-wrapper chart-wrapper--padded">
              <Chart
                type="bar"
                data={chartData as ChartData<"bar", number[], string>}
                options={chartOptions}
                aria-hidden
              />
            </div>
          </ChartAccessible>
        </Card>
        <Card title="Números absolutos" titleId={`${baseId}-table`}>
          <table>
            <caption className="sr-only">Cartas de crédito pré-aprovadas por diretoria</caption>
            <thead>
              <tr>
                <th scope="col">Diretoria</th>
                <th scope="col">Docs</th>
                <th scope="col">Aprov</th>
                <th scope="col">% Real</th>
              </tr>
            </thead>
            <tbody>
              {cartasCredito.tabela.map((row) => (
                <tr key={row.diretoria}>
                  <th scope="row">{row.diretoria}</th>
                  <td>{row.docs}</td>
                  <td>{row.aprov}</td>
                  <td className={row.status === "success" ? "text-success" : "text-danger"}>
                    {row.perc.toFixed(1).replace(".", ",")}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-text summary-text--compact">
            Global: 39 cartas em 131 negócios
          </div>
        </Card>
      </div>
    </>
  );
}
