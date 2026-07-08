"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { CHART, chartGlowPlugin, datalabelDefaults } from "./chart-theme";

let registered = false;

export function registerCharts() {
  if (registered) return;
  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    chartGlowPlugin,
  );
  ChartJS.defaults.color = CHART.muted;
  ChartJS.defaults.font.family = "var(--font-inter), Inter, sans-serif";
  ChartJS.defaults.plugins.datalabels = datalabelDefaults;
  ChartJS.defaults.plugins.legend.labels.boxWidth = 10;
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  registered = true;
}

if (typeof window !== "undefined") {
  registerCharts();
}
