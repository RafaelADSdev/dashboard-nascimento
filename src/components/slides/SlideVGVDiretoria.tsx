"use client";

import { useId, useMemo } from "react";
import type { ScriptableContext, ChartData } from "chart.js";
import { Chart } from "@/lib/charts";
import { diretoriaResumo, vgvDiretorias } from "@/data/dashboard-data";
import {
  CHART,
  createVerticalBarOptions,
  directoriaBarGradient,
} from "@/lib/chart-theme";
import { currencyFormatter } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SlideVGVDiretoria() {
  const baseId = useId();

  const chartData = useMemo(
    () => ({
      labels: vgvDiretorias.labels,
      datasets: [
        {
          label: "Saldo VGV",
          data: vgvDiretorias.saldo,
          backgroundColor: (ctx: ScriptableContext<"bar">) => directoriaBarGradient(ctx, ctx.dataIndex),
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 56,
          datalabels: {
            anchor: "end" as const,
            align: "top" as const,
            offset: 4,
            formatter: (val: number, ctx: { dataIndex: number }) => {
              const meta = vgvDiretorias.metas[ctx.dataIndex];
              const perc = ((val / meta) * 100).toFixed(0);
              return `${currencyFormatter.format(val)}\n(${perc}%)`;
            },
          },
        },
      ],
    }),
    [],
  );

  const chartOptions = useMemo(
    () =>
      createVerticalBarOptions({
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              generateLabels: () => [
                {
                  text: "Saldo VGV",
                  fillStyle: CHART.accent,
                  strokeStyle: CHART.accent,
                  lineWidth: 0,
                  hidden: false,
                  index: 0,
                  datasetIndex: 0,
                },
                {
                  text: "Meta Mínima",
                  fillStyle: CHART.danger,
                  strokeStyle: CHART.danger,
                  lineWidth: 2,
                  hidden: false,
                  index: 1,
                  datasetIndex: -1,
                },
              ],
            },
          },
          metaHorizontalLines: { values: vgvDiretorias.metas },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y;
                if (val == null) return "";
                const meta = vgvDiretorias.metas[ctx.dataIndex];
                const perc = meta ? ((val / meta) * 100).toFixed(1) : "0";
                return `Saldo VGV: ${currencyFormatter.format(val)} (${perc}% da meta)`;
              },
              afterBody: (items) => {
                if (!items.length) return [];
                const meta = vgvDiretorias.metas[items[0].dataIndex];
                return [`Meta mínima: ${currencyFormatter.format(meta)}`];
              },
            },
          },
        },
      }),
    [],
  );

  const chartSummary = vgvDiretorias.labels.map((label, i) => {
    const saldo = vgvDiretorias.saldo[i];
    const meta = vgvDiretorias.metas[i];
    const perc = ((saldo / meta) * 100).toFixed(1);
    return `${label}: ${currencyFormatter.format(saldo)} de meta ${currencyFormatter.format(meta)} (${perc}%)`;
  });

  const noteClass: Record<string, string> = {
    warning: "text-warning",
    danger: "text-danger",
    success: "text-success",
  };

  return (
    <>
      <div className="content-grid grid-3-1">
        <Card title="Saldo VGV vs Meta Mínima" titleId={`${baseId}-vgv-chart`} className="chart-card">
          <ChartAccessible
            label="Saldo VGV por diretoria comparado à meta mínima"
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
        <Card title="Status resumo" titleId={`${baseId}-resumo`}>
          <div className="resumo-list" role="list">
            {diretoriaResumo.map((item) => (
              <div key={item.name} className="resumo-item" role="listitem">
                <div className="resumo-row">
                  <strong>{item.name}</strong>
                  <StatusBadge status={item.badge}>{item.badgeText}</StatusBadge>
                </div>
                <small className={noteClass[item.noteColor]}>{item.note}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
