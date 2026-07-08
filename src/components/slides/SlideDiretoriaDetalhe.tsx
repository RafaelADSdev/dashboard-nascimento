"use client";

import { useCallback, useId, useMemo, useState, type KeyboardEvent } from "react";
import type { ScriptableContext, ChartData } from "chart.js";
import { Chart, Doughnut } from "@/lib/charts";
import {
  diretoriaData,
  diretoriaKeys,
  type DiretoriaKey,
} from "@/data/dashboard-data";
import {
  createDoughnutOptions,
  createHorizontalBarOptions,
  CHART,
  performanceGradient,
  segmentoDataset,
} from "@/lib/chart-theme";
import { currencyFormatter, getRowStatusLabel } from "@/lib/formatters";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function SlideDiretoriaDetalhe() {
  const baseId = useId();
  const [activeKey, setActiveKey] = useState<DiretoriaKey>("albuquerque");
  const [fading, setFading] = useState(false);
  const data = diretoriaData[activeKey];

  const switchDiretoria = useCallback(
    (key: DiretoriaKey) => {
      if (key === activeKey) return;
      setFading(true);
      setTimeout(() => {
        setActiveKey(key);
        setFading(false);
      }, 300);
    },
    [activeKey],
  );

  const equipesChartData = useMemo(
    () => ({
      labels: data.equipes,
      datasets: [
        {
          label: "Realizado",
          data: data.vgv,
          backgroundColor: (ctx: ScriptableContext<"bar">) =>
            performanceGradient(ctx, ctx.raw as number, data.metas[ctx.dataIndex]),
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 22,
          datalabels: {
            anchor: "end" as const,
            align: "right" as const,
            offset: 6,
            formatter: (val: number, ctx: { dataIndex: number }) => {
              if (val === 0) return "";
              const meta = data.metas[ctx.dataIndex];
              return `${currencyFormatter.format(val)} (${((val / meta) * 100).toFixed(0)}%)`;
            },
          },
        },
      ],
    }),
    [data],
  );

  const metaMinima = useMemo(() => data.metas[0] ?? 0, [data.metas]);

  const equipesOptions = useMemo(
    () =>
      createHorizontalBarOptions({
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 16,
              generateLabels: () => [
                {
                  text: "Realizado",
                  fillStyle: CHART.success,
                  strokeStyle: CHART.success,
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
          metaVerticalLine: { value: metaMinima },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.parsed.x;
                if (val == null) return "";
                const meta = data.metas[ctx.dataIndex];
                const perc = meta ? ((val / meta) * 100).toFixed(1) : "0";
                return `${ctx.dataset.label}: ${currencyFormatter.format(val)} (${perc}%)`;
              },
              afterBody: (items) => {
                if (!items.length) return [];
                return [`Meta mínima: ${currencyFormatter.format(metaMinima)}`];
              },
            },
          },
        },
      }),
    [data.metas, metaMinima],
  );

  const segmentosChartData = useMemo(
    () => ({
      labels: ["PPM", "Litoral", "Médio/Alto", "Econômico"],
      datasets: [segmentoDataset(data.segmentos)],
    }),
    [data.segmentos],
  );

  const segmentosOptions = useMemo(() => createDoughnutOptions(), []);

  const equipesSummary = data.equipes.map((equipe, i) => {
    const realizado = data.vgv[i];
    const meta = data.metas[i];
    const perc = meta ? ((realizado / meta) * 100).toFixed(0) : "0";
    return `${equipe}: ${currencyFormatter.format(realizado)} realizado, meta ${currencyFormatter.format(meta)} (${perc}%)`;
  });

  const segmentosSummary = ["PPM", "Litoral", "Médio/Alto", "Econômico"].map((label, i) => {
    return `${label}: ${data.segmentos[i]} vendas`;
  });

  const panelId = `${baseId}-panel`;

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = diretoriaKeys.indexOf(activeKey);
    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (currentIndex + 1) % diretoriaKeys.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex = (currentIndex - 1 + diretoriaKeys.length) % diretoriaKeys.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = diretoriaKeys.length - 1;
        break;
      default:
        return;
    }

    switchDiretoria(diretoriaKeys[nextIndex]);
    document.getElementById(`${baseId}-tab-${diretoriaKeys[nextIndex]}`)?.focus();
  };

  return (
    <>
      <div className="header">
        <StatusBadge status={data.status}>{data.statusText}</StatusBadge>
      </div>
      <div className="tabs-container" role="tablist" aria-label="Diretorias" onKeyDown={handleTabKeyDown}>
        {diretoriaKeys.map((key) => {
          const selected = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${baseId}-tab-${key}`}
              className={`tab ${selected ? "active" : ""}`}
              aria-selected={selected}
              aria-controls={panelId}
              onClick={() => switchDiretoria(key)}
            >
              {diretoriaData[key].name}
            </button>
          );
        })}
      </div>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeKey}`}
        className={`dynamic-content grid-2-2 ${fading ? "fade-out" : ""}`}
      >
        <Card title="Equipes: VGV vs Meta Mínima" titleId={`${baseId}-equipes-title`} className="chart-card">
          <ChartAccessible
            label={`VGV realizado versus meta mínima das equipes da diretoria ${data.name}`}
            summary={
              <ul>
                {equipesSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            }
          >
            <div className="chart-wrapper chart-wrapper--padded">
              <Chart
                type="bar"
                key={`equipes-${activeKey}`}
                data={equipesChartData as ChartData<"bar", number[], string>}
                options={equipesOptions}
                aria-hidden
              />
            </div>
          </ChartAccessible>
        </Card>
        <Card title="Distribuição por Segmento" titleId={`${baseId}-segmentos-title`} className="chart-card">
          <ChartAccessible
            label={`Distribuição por segmento da diretoria ${data.name}`}
            summary={
              <ul>
                {segmentosSummary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            }
          >
            <div className="chart-wrapper chart-wrapper--donut">
              <Doughnut
                key={`segmentos-${activeKey}`}
                data={segmentosChartData}
                options={segmentosOptions}
                aria-hidden
              />
            </div>
          </ChartAccessible>
        </Card>
        <Card title="Tabela de Desempenho das Equipes" titleId={`${baseId}-table-title`} className="span-2">
          <div className="table-scroll">
            <table>
              <caption className="sr-only">
                Desempenho das equipes da diretoria {data.name}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Equipe</th>
                  <th scope="col">Realizado (VGV)</th>
                  <th scope="col">Status</th>
                  <th scope="col">Observação</th>
                </tr>
              </thead>
              <tbody>
                {data.table.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.vgv}</td>
                    <td>
                      <StatusBadge status={row.status}>{getRowStatusLabel(row.status)}</StatusBadge>
                    </td>
                    <td>{row.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
