"use client";

import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartComponent,
  Doughnut as DoughnutComponent,
  Pie as PieComponent,
} from "react-chartjs-2";
import { CHART, chartGlowPlugin, datalabelDefaults, metaHorizontalLinesPlugin, metaVerticalLinePlugin } from "./chart-theme";

let registered = false;

function registerCharts() {
  if (registered) return;
  ChartJS.register(
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    DoughnutController,
    LinearScale,
    LineController,
    LineElement,
    PieController,
    PointElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    chartGlowPlugin,
    metaVerticalLinePlugin,
    metaHorizontalLinesPlugin,
  );
  ChartJS.defaults.color = CHART.muted;
  ChartJS.defaults.font.family = "var(--font-inter), Inter, sans-serif";
  ChartJS.defaults.plugins.datalabels = datalabelDefaults;
  ChartJS.defaults.plugins.legend.labels.boxWidth = 10;
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  registered = true;
}

registerCharts();

export const Chart = ChartComponent;
export const Doughnut = DoughnutComponent;
export const Pie = PieComponent;
