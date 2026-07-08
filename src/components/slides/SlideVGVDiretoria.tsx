"use client";

import { useId, useMemo } from "react";
import type { ScriptableContext, ChartData } from "chart.js";
import { Chart } from "react-chartjs-2";
import { diretoriaResumo, vgvDiretorias } from "@/data/dashboard-data";
import { registerCharts } from "@/lib/chart-config";
import {
  createVerticalBarOptions,
  directoriaBarGradient,
  metaPointStyle,
} from "@/lib/chart-theme";
import { currencyFormatter } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SlideVGVDiretoria() {
  registerCharts();
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
        {
          label: "Meta Mínima",
          data: vgvDiretorias.metas,
          ...metaPointStyle,
        },
      ],
    }),
    [],
  );

  const chartOptions = useMemo(
    () =>
      createVerticalBarOptions({
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.y;
                if (val == null) return "";
                const label = ctx.dataset.label ?? "";
                const meta = vgvDiretorias.metas[ctx.dataIndex];
                const perc = meta ? ((val / meta) * 100).toFixed(1) : "0";
                return `${label}: ${currencyFormatter.format(val)} (${perc}% da meta)`;
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
