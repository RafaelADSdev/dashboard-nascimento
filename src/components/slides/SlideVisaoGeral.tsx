"use client";

import { useId, useMemo } from "react";
import type { ScriptableContext } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { visaoGeral } from "@/data/dashboard-data";
import { CHART, createGaugeOptions } from "@/lib/chart-theme";
import { Card } from "@/components/ui/Card";
import { ChartAccessible } from "@/components/ui/ChartAccessible";
import { StatusBadge } from "@/components/ui/StatusBadge";

function gaugeArcColor(ctx: ScriptableContext<"doughnut">) {
  if (ctx.dataIndex !== 0) return CHART.track;
  return CHART.accent;
}

export function SlideVisaoGeral() {  const baseId = useId();

  const gaugeData = useMemo(
    () => ({
      datasets: [
        {
          data: [visaoGeral.realizado, visaoGeral.faltante],
          backgroundColor: gaugeArcColor,
          borderWidth: 0,
          circumference: 200,
          rotation: 250,
          cutout: "78%",
          borderRadius: 6,
        },
      ],
    }),
    [],
  );

  const gaugeOptions = createGaugeOptions();
  const atingimento = visaoGeral.atingimento.toFixed(1).replace(".", ",");

  return (
    <>
      <div className="header">
        <StatusBadge status="danger">Abaixo da Meta</StatusBadge>
      </div>
      <div className="content-grid">
        <Card
          title="Atingimento global"
          titleId={`${baseId}-gauge`}
          className="chart-card chart-card--hero"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <ChartAccessible
            label={`Atingimento global da superintendência: ${atingimento}% da meta mínima`}
            summary={
              <p>
                Realizado R$ 17.088.725, meta mínima R$ 40.000.000, faltante R$ 22.911.275.
                Atingimento de {atingimento}%.
              </p>
            }
          >
            <div className="gauge-container gauge-container--enhanced">
              <div className="gauge-canvas-wrapper">
                <Doughnut data={gaugeData} options={gaugeOptions} aria-hidden />
              </div>
              <div className="gauge-text" aria-hidden>
                <div className="metric-value gauge-value">{atingimento}%</div>
                <div className="metric-label">Atingimento global</div>
              </div>
              <div className="gauge-arc-label gauge-arc-label--min" aria-hidden>
                0%
              </div>
              <div className="gauge-arc-label gauge-arc-label--max" aria-hidden>
                100%
              </div>
            </div>
          </ChartAccessible>
          <div className="metrics-row" aria-hidden>
            <div className="metric-center">
              <div className="metric-label">Realizado</div>
              <div className="metric-sub text-accent">R$ 17.088.725</div>
            </div>
            <div className="metric-center">
              <div className="metric-label">Meta mínima</div>
              <div className="metric-sub" style={{ fontWeight: 700 }}>
                R$ 40.000.000
              </div>
            </div>
            <div className="metric-center">
              <div className="metric-label">Faltante</div>
              <div className="metric-sub text-danger">R$ 22.911.275</div>
            </div>
          </div>
          <div className="summary-text">
            Faltam R$ 22.911.275,00 para a meta mínima da Superintendência ({atingimento}% atingido).
          </div>
        </Card>
      </div>
    </>
  );
}
