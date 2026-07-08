export type BadgeStatus = "success" | "danger" | "warning" | "dim";

export interface EquipeRow {
  name: string;
  vgv: string;
  status: BadgeStatus;
  obs: string;
}

export interface DiretoriaData {
  name: string;
  status: BadgeStatus;
  statusText: string;
  equipes: string[];
  vgv: number[];
  metas: number[];
  segmentos: number[];
  table: EquipeRow[];
}

export const diretoriaData: Record<string, DiretoriaData> = {
  albuquerque: {
    name: "Albuquerque",
    status: "success",
    statusText: "Meta Mínima Batida",
    equipes: ["Dubai Brokers", "Gade", "Seals", "Titan"],
    vgv: [3200000, 335000, 1000000, 0],
    metas: [1000000, 1000000, 1000000, 1000000],
    segmentos: [1, 3, 1, 0],
    table: [
      { name: "Dubai Brokers", vgv: "R$ 3.200.000", status: "success", obs: "Superou Lucro (+R$ 1.2M)" },
      { name: "Seals", vgv: "R$ 1.000.000", status: "success", obs: "Meta Batida Exatamente" },
      { name: "Gade", vgv: "R$ 335.000", status: "danger", obs: "Faltam R$ 665.000" },
      { name: "Titan", vgv: "-", status: "dim", obs: "Inativa em Junho" },
    ],
  },
  moura: {
    name: "Moura",
    status: "danger",
    statusText: "Abaixo da Meta",
    equipes: ["Winners", "Domus", "Arretados"],
    vgv: [965400, 0, 775060],
    metas: [1000000, 1000000, 1000000],
    segmentos: [1, 3, 0, 2],
    table: [
      { name: "Winners", vgv: "R$ 965.400", status: "warning", obs: "Faltam R$ 34.600" },
      { name: "Arretados", vgv: "R$ 775.060", status: "danger", obs: "Faltam R$ 224.940" },
      { name: "Domus", vgv: "R$ 0", status: "danger", obs: "Faltam R$ 1.000.000" },
    ],
  },
  nascimento: {
    name: "Nascimento",
    status: "danger",
    statusText: "Abaixo da Meta",
    equipes: ["Garra", "Alpha Team", "Elite", "Reino", "Tornado"],
    vgv: [1620486, 670980, 412000, 0, 0],
    metas: [1000000, 1000000, 1000000, 1000000, 1000000],
    segmentos: [1, 1, 1, 7],
    table: [
      { name: "Garra", vgv: "R$ 1.620.486", status: "success", obs: "Meta Mínima Batida" },
      { name: "Alpha Team", vgv: "R$ 670.980", status: "danger", obs: "Faltam R$ 329.020" },
      { name: "Elite", vgv: "R$ 412.000", status: "danger", obs: "Faltam R$ 588.000" },
      { name: "Reino", vgv: "R$ 0", status: "danger", obs: "Faltam R$ 1.000.000" },
      { name: "Tornado", vgv: "R$ 0", status: "danger", obs: "Faltam R$ 1.000.000" },
    ],
  },
  ribeiro: {
    name: "Ribeiro",
    status: "success",
    statusText: "Meta de Lucro Superada",
    equipes: ["Bravo", "Champions", "Golden Team", "Prime"],
    vgv: [5242305, 1916000, 725794, 225000],
    metas: [1000000, 1000000, 1000000, 1000000],
    segmentos: [0, 6, 6, 9],
    table: [
      { name: "Bravo", vgv: "R$ 5.242.305", status: "success", obs: "Superou Lucro (+R$ 3.2M)" },
      { name: "Champions", vgv: "R$ 1.916.000", status: "success", obs: "Meta Mínima Batida" },
      { name: "Golden Team", vgv: "R$ 725.794", status: "danger", obs: "Faltam R$ 274.206" },
      { name: "Prime", vgv: "R$ 225.000", status: "danger", obs: "Faltam R$ 775.000" },
    ],
  },
};

export const diretoriaKeys = ["albuquerque", "moura", "nascimento", "ribeiro"] as const;
export type DiretoriaKey = (typeof diretoriaKeys)[number];

export const vgvDiretorias = {
  labels: ["Albuquerque", "Moura", "Nascimento", "Ribeiro"],
  saldo: [4535000, 1740460, 2704166, 8109099],
  metas: [3000000, 3000000, 5000000, 4000000],
};

export const diretoriaResumo = [
  { name: "Albuquerque", badge: "success" as const, badgeText: "OK", note: "Faltam R$ 1,46M p/ Lucro", noteColor: "warning" as const },
  { name: "Moura", badge: "danger" as const, badgeText: "58%", note: "Faltam R$ 1,25M p/ Mínima", noteColor: "danger" as const },
  { name: "Nascimento", badge: "danger" as const, badgeText: "54%", note: "Faltam R$ 2,29M p/ Mínima", noteColor: "danger" as const },
  { name: "Ribeiro", badge: "success" as const, badgeText: "TOP", note: "Superou Meta de Lucro", noteColor: "success" as const },
];

export const segmentosConsolidados = {
  labels: ["PPM", "Litoral", "Médio/Alto", "Econômico"],
  data: [4, 14, 8, 18],
  colors: ["#ef4444", "#10b981", "#f59e0b", "#1d3557"],
  bars: [
    { label: "Econômico", val: 18, color: "#1d3557", perc: 41 },
    { label: "Litoral", val: 14, color: "#10b981", perc: 32 },
    { label: "Médio/Alto", val: 8, color: "#f59e0b", perc: 18 },
    { label: "PPM", val: 4, color: "#ef4444", perc: 9 },
  ],
};

export const cartasCredito = {
  aproveitamento: [21.4, 7.1, 33.6, 23.0],
  meta: 16.67,
  tabela: [
    { diretoria: "Albuquerque", docs: 14, aprov: 3, perc: 21.4, status: "success" as const },
    { diretoria: "Moura", docs: 14, aprov: 1, perc: 7.1, status: "danger" as const },
    { diretoria: "Nascimento", docs: 77, aprov: 29, perc: 33.6, status: "success" as const },
    { diretoria: "Ribeiro", docs: 26, aprov: 6, perc: 23.0, status: "success" as const },
  ],
};

export const visaoGeral = {
  atingimento: 42.7,
  realizado: 17088725,
  metaMinima: 40000000,
  faltante: 22911275,
};

export const SEGMENTO_LABELS = ["PPM", "Litoral", "Médio/Alto", "Econômico"];
export const SEGMENTO_COLORS = ["#ef4444", "#10b981", "#f59e0b", "#3b82f6"];
