import type { ChartOptions, Plugin, ScriptableContext } from "chart.js";

export const CHART = {
  accent: "#1d3557",
  accentLight: "#457b9d",
  accentDark: "#14253d",
  success: "#10b981",
  successLight: "#34d399",
  danger: "#ef4444",
  dangerLight: "#f87171",
  warning: "#f59e0b",
  warningLight: "#fbbf24",
  muted: "#64748b",
  ink: "#1e293b",
  grid: "rgba(148, 163, 184, 0.25)",
  gridFaint: "rgba(148, 163, 184, 0.15)",
  track: "rgba(148, 163, 184, 0.2)",
  surface: "rgba(255, 255, 255, 0.98)",
} as const;

export const SEGMENTO_PALETTE = [
  { fill: "#ef4444", border: "#f87171", label: "PPM" },
  { fill: "#10b981", border: "#34d399", label: "Litoral" },
  { fill: "#f59e0b", border: "#fbbf24", label: "Médio/Alto" },
  { fill: "#1d3557", border: "#457b9d", label: "Econômico" },
] as const;

export const DIRETORIA_BAR_COLORS = [
  { from: "#457b9d", to: "#1d3557" },
  { from: "#457b9d", to: "#1d3557" },
  { from: "#457b9d", to: "#1d3557" },
  { from: "#457b9d", to: "#1d3557" },
] as const;

type ChartContext = ScriptableContext<"bar"> | ScriptableContext<"doughnut"> | ScriptableContext<"pie">;

function getChartArea(ctx: ChartContext) {
  return ctx.chart.chartArea;
}

export function verticalBarGradient(ctx: ScriptableContext<"bar">, from: string, to: string) {
  const area = getChartArea(ctx);
  if (!area) return from;
  const gradient = ctx.chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, to);
  gradient.addColorStop(1, from);
  return gradient;
}

export function horizontalBarGradient(ctx: ScriptableContext<"bar">, from: string, to: string) {
  const area = getChartArea(ctx);
  if (!area) return from;
  const gradient = ctx.chart.ctx.createLinearGradient(area.left, 0, area.right, 0);
  gradient.addColorStop(0, to);
  gradient.addColorStop(1, from);
  return gradient;
}

export function performanceGradient(ctx: ScriptableContext<"bar">, value: number, meta: number) {
  if (value <= 0) return CHART.track;
  const ratio = value / meta;
  if (ratio >= 1) return horizontalBarGradient(ctx, CHART.successLight, CHART.success);
  if (ratio >= 0.8) return horizontalBarGradient(ctx, CHART.warningLight, CHART.warning);
  return horizontalBarGradient(ctx, CHART.dangerLight, CHART.danger);
}

export function directoriaBarGradient(ctx: ScriptableContext<"bar">, index: number) {
  const palette = DIRETORIA_BAR_COLORS[index % DIRETORIA_BAR_COLORS.length];
  return verticalBarGradient(ctx, palette.from, palette.to);
}

export function metaThresholdColor(value: number, meta: number) {
  return value >= meta ? CHART.success : CHART.danger;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getChartAnimation() {
  return {
    duration: prefersReducedMotion() ? 0 : 600,
    easing: "easeOutQuart" as const,
  };
}

export const datalabelDefaults = {
  color: CHART.ink,
  font: { family: "var(--font-inter), Inter, sans-serif", weight: 600 as const, size: 11 },
  padding: { top: 4, bottom: 4, left: 6, right: 6 },
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  borderRadius: 6,
  borderWidth: 1,
  borderColor: "rgba(148, 163, 184, 0.3)",
};

export function baseTooltip() {
  return {
    enabled: true,
    backgroundColor: CHART.surface,
    titleColor: CHART.ink,
    bodyColor: CHART.muted,
    borderColor: "rgba(148, 163, 184, 0.3)",
    borderWidth: 1,
    padding: 12,
    cornerRadius: 8,
    titleFont: { size: 13, weight: 600 as const },
    bodyFont: { size: 12 },
    displayColors: true,
    boxPadding: 6,
  };
}

export function baseLegend(position: "bottom" | "top" = "bottom") {
  return {
    display: true,
    position,
    labels: {
      color: CHART.muted,
      padding: 16,
      usePointStyle: true,
      pointStyleWidth: 8,
      font: { size: 11, weight: 500 as const },
    },
  };
}

export function baseScalesY(showGrid = true) {
  return {
    beginAtZero: true,
    border: { display: false },
    grid: {
      display: showGrid,
      color: CHART.grid,
      drawTicks: false,
    },
    ticks: {
      display: false,
      color: CHART.muted,
      font: { size: 10 },
      padding: 8,
    },
  };
}

export function baseScalesX() {
  return {
    border: { display: false },
    grid: { display: false, drawTicks: false },
    ticks: {
      color: CHART.muted,
      font: { size: 11, weight: 500 as const },
      padding: 8,
    },
  };
}

export function createVerticalBarOptions(
  overrides?: Partial<ChartOptions<"bar">>,
): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: getChartAnimation(),
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 24, right: 8, bottom: 4, left: 4 } },
    scales: {
      y: baseScalesY(),
      x: baseScalesX(),
    },
    plugins: {
      legend: baseLegend(),
      tooltip: baseTooltip(),
      datalabels: { ...datalabelDefaults, clip: false },
    },
    ...overrides,
  };
}

export function createHorizontalBarOptions(
  overrides?: Partial<ChartOptions<"bar">>,
): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    animation: getChartAnimation(),
    interaction: { mode: "index", intersect: false },
    layout: { padding: { top: 4, right: 48, bottom: 4, left: 4 } },
    scales: {
      x: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: CHART.gridFaint, drawTicks: false },
        ticks: { display: false },
      },
      y: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: CHART.ink,
          font: { size: 11, weight: 600 as const },
          padding: 10,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: baseTooltip(),
      datalabels: { ...datalabelDefaults, clip: false },
    },
    ...overrides,
  };
}

export function createDoughnutOptions(
  overrides?: Partial<ChartOptions<"doughnut">>,
): ChartOptions<"doughnut"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: getChartAnimation(),
    cutout: "62%",
    layout: { padding: 8 },
    plugins: {
      legend: baseLegend(),
      tooltip: baseTooltip(),
      datalabels: {
        ...datalabelDefaults,
        color: CHART.ink,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        font: { ...datalabelDefaults.font, size: 12 },
        formatter: (val: number) => (val > 0 ? String(val) : ""),
      },
    },
    ...overrides,
  };
}

export function createPieOptions(
  overrides?: Partial<ChartOptions<"pie">>,
): ChartOptions<"pie"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: getChartAnimation(),
    layout: { padding: 12 },
    plugins: {
      legend: baseLegend(),
      tooltip: baseTooltip(),
      datalabels: {
        ...datalabelDefaults,
        color: CHART.ink,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        font: { ...datalabelDefaults.font, size: 13, weight: 700 as const },
      },
    },
    ...overrides,
  };
}

export function createGaugeOptions(): ChartOptions<"doughnut"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: getChartAnimation(),
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
  };
}

export function segmentoDataset(data: number[]) {
  return {
    data,
    backgroundColor: SEGMENTO_PALETTE.map((s) => s.fill),
    borderColor: SEGMENTO_PALETTE.map((s) => s.border),
    borderWidth: 2,
    hoverBorderWidth: 3,
    hoverOffset: 6,
    spacing: 2,
  };
}

export const metaPointStyle = {
  type: "line" as const,
  borderColor: CHART.danger,
  borderWidth: 2,
  pointBackgroundColor: CHART.danger,
  pointBorderColor: "#fff",
  pointBorderWidth: 2,
  pointRadius: 7,
  pointHoverRadius: 9,
  showLine: false,
  datalabels: { display: false },
};

export const metaLineStyle = {
  type: "line" as const,
  borderColor: "rgba(100, 116, 139, 0.5)",
  borderDash: [6, 4],
  borderWidth: 2,
  pointRadius: 0,
  fill: false,
  datalabels: { display: false },
};

export const chartGlowPlugin: Plugin = {
  id: "chartGlow",
  beforeDatasetDraw() {},
  afterDatasetDraw() {},
};
