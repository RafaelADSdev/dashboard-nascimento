"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
  type SVGProps,
} from "react";
import { SlideCartasCredito } from "@/components/slides/SlideCartasCredito";
import { SlideDiretoriaDetalhe } from "@/components/slides/SlideDiretoriaDetalhe";
import { SlideLeadsFunil } from "@/components/slides/SlideLeadsFunil";
import { SlideSegmentos } from "@/components/slides/SlideSegmentos";
import { SlideVGVDiretoria } from "@/components/slides/SlideVGVDiretoria";
import { SlideVisaoGeral } from "@/components/slides/SlideVisaoGeral";

export type DashboardView =
  | "detalhamento"
  | "visao-geral"
  | "vgv"
  | "segmentos"
  | "cartas"
  | "leads";

const DATA_REFERENCE_PERIOD = "Junho/2026";

type ViewMeta = {
  id: DashboardView;
  label: string;
  title: string;
  subtitle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function IconLayout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 17V11" />
      <path d="M12 17V7" />
      <path d="M16 17v-4" />
    </svg>
  );
}

function IconBuilding(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h5v17" />
      <path d="M10 21V9h10v12" />
      <path d="M7 9h.01M7 13h.01M7 17h.01M14 13h.01M14 17h.01M17 13h.01M17 17h.01" />
    </svg>
  );
}

function IconPie(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M12 2v10l8.66 5A10 10 0 1 1 12 2z" />
    </svg>
  );
}

function IconCreditCard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconFunnel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
    </svg>
  );
}

function IconMoon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5z" />
    </svg>
  );
}

function IconSun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconDownload(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  );
}

function IconRefresh(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12l5 5L19 7" />
    </svg>
  );
}

function IconArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

const VIEW_OPTIONS: ViewMeta[] = [
  {
    id: "detalhamento",
    label: "Detalhamento por diretoria",
    title: "Detalhamento por diretoria",
    subtitle: "VGV, segmentos e desempenho por equipe — Junho",
    icon: IconBuilding,
  },
  {
    id: "visao-geral",
    label: "Visão geral comercial",
    title: "Visão geral comercial",
    subtitle: "Resultados consolidados da Superintendência — Junho",
    icon: IconLayout,
  },
  {
    id: "vgv",
    label: "VGV por diretoria",
    title: "VGV por diretoria",
    subtitle: "Comparativo de desempenho mensal",
    icon: IconChart,
  },
  {
    id: "segmentos",
    label: "Segmentos consolidados",
    title: "Segmentos consolidados",
    subtitle: "Distribuição de vendas na superintendência",
    icon: IconPie,
  },
  {
    id: "cartas",
    label: "Cartas de crédito",
    title: "Cartas de crédito pré-aprovadas",
    subtitle: "Aproveitamento por diretoria",
    icon: IconCreditCard,
  },
  {
    id: "leads",
    label: "Leads e funil",
    title: "Leads e funil comercial",
    subtitle: "Desempenho de conversão — Bitrix24",
    icon: IconFunnel,
  },
];

const VIEW_COMPONENTS: Record<DashboardView, ComponentType> = {
  detalhamento: SlideDiretoriaDetalhe,
  "visao-geral": SlideVisaoGeral,
  vgv: SlideVGVDiretoria,
  segmentos: SlideSegmentos,
  cartas: SlideCartasCredito,
  leads: SlideLeadsFunil,
};

function formatViewedAt(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

export function Dashboard() {
  const [activeView, setActiveView] = useState<DashboardView>("detalhamento");
  const [fading, setFading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewsOpen, setViewsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastViewedAt, setLastViewedAt] = useState<Date | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [menuFocusIndex, setMenuFocusIndex] = useState(0);

  const viewsRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewsTriggerRef = useRef<HTMLButtonElement>(null);

  const activeMeta = VIEW_OPTIONS.find((v) => v.id === activeView)!;
  const viewedAtLabel = useMemo(
    () => (lastViewedAt ? formatViewedAt(lastViewedAt) : null),
    [lastViewedAt],
  );

  useEffect(() => {
    setLastViewedAt(new Date());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!viewsOpen) return;

    const activeIndex = VIEW_OPTIONS.findIndex((v) => v.id === activeView);
    setMenuFocusIndex(activeIndex >= 0 ? activeIndex : 0);

    function handleClickOutside(event: MouseEvent) {
      if (viewsRef.current && !viewsRef.current.contains(event.target as Node)) {
        setViewsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [viewsOpen, activeView]);

  useEffect(() => {
    if (!viewsOpen) return;
    menuItemRefs.current[menuFocusIndex]?.focus();
  }, [viewsOpen, menuFocusIndex]);

  const switchView = useCallback(
    (view: DashboardView) => {
      if (view === activeView) {
        setViewsOpen(false);
        viewsTriggerRef.current?.focus();
        return;
      }
      setFading(true);
      setViewsOpen(false);
      setTimeout(() => {
        setActiveView(view);
        setFading(false);
        setLastViewedAt(new Date());
        viewsTriggerRef.current?.focus();
      }, 180);
    },
    [activeView],
  );

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = VIEW_OPTIONS.length - 1;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setMenuFocusIndex((i) => Math.min(i + 1, lastIndex));
        break;
      case "ArrowUp":
        event.preventDefault();
        setMenuFocusIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setMenuFocusIndex(0);
        break;
      case "End":
        event.preventDefault();
        setMenuFocusIndex(lastIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        switchView(VIEW_OPTIONS[menuFocusIndex].id);
        break;
      case "Escape":
        event.preventDefault();
        setViewsOpen(false);
        viewsTriggerRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setFading(true);
    setTimeout(() => {
      const now = new Date();
      setLastViewedAt(now);
      setFading(false);
      setRefreshing(false);
      setStatusMessage(
        `Dados reexibidos. Período de referência: ${DATA_REFERENCE_PERIOD}.`,
      );
    }, 400);
  };

  const ActiveComponent = VIEW_COMPONENTS[activeView];

  return (
    <div className="dashboard-shell">
      <div className="dashboard-content">
        <header className="dashboard-toolbar">
          <div className="toolbar-heading">
            <div className="toolbar-brand">
              <span className="toolbar-brand-label">Superintendência</span>
              <span className="toolbar-brand-name">Nascimento</span>
            </div>
            <h2>{activeMeta.title}</h2>
            <p>{activeMeta.subtitle}</p>
            <p className="data-timestamp" suppressHydrationWarning>
              Período de referência: {DATA_REFERENCE_PERIOD}
              {viewedAtLabel ? ` · Visualizado em ${viewedAtLabel}` : ""}
            </p>
          </div>
          <div className="toolbar-actions">
            {activeView !== "detalhamento" && (
              <button
                type="button"
                className="toolbar-btn toolbar-btn--back"
                onClick={() => switchView("detalhamento")}
              >
                <IconArrowLeft />
                Voltar ao detalhamento
              </button>
            )}

            <button
              type="button"
              className="toolbar-btn toolbar-btn--icon"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {darkMode ? <IconSun /> : <IconMoon />}
            </button>

            <div className="views-menu" ref={viewsRef}>
              <button
                ref={viewsTriggerRef}
                type="button"
                className={`toolbar-btn ${activeView !== "detalhamento" ? "toolbar-btn--highlight" : ""} ${viewsOpen ? "toolbar-btn--open" : ""}`}
                onClick={() => setViewsOpen((open) => !open)}
                aria-expanded={viewsOpen}
                aria-haspopup="menu"
                aria-controls="views-menu-panel"
              >
                <IconLayout />
                Visualizações
                {activeView !== "detalhamento" && <span className="views-badge" aria-hidden />}
              </button>

              {viewsOpen && (
                <div
                  id="views-menu-panel"
                  className="views-panel"
                  role="menu"
                  aria-label="Selecionar visualização"
                  onKeyDown={handleMenuKeyDown}
                >
                  <p className="views-panel-heading" id="views-menu-label">
                    Relatórios disponíveis
                  </p>
                  <ul className="views-panel-list" aria-labelledby="views-menu-label">
                    {VIEW_OPTIONS.map((view, index) => {
                      const Icon = view.icon;
                      const isActive = activeView === view.id;
                      return (
                        <li key={view.id} role="none">
                          <button
                            ref={(el) => {
                              menuItemRefs.current[index] = el;
                            }}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isActive}
                            tabIndex={index === menuFocusIndex ? 0 : -1}
                            className={`views-panel-item ${isActive ? "active" : ""}`}
                            onClick={() => switchView(view.id)}
                          >
                            <Icon className="views-panel-icon" aria-hidden />
                            <span className="views-panel-label">{view.label}</span>
                            {isActive && <IconCheck className="views-panel-check" aria-hidden />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <button type="button" className="toolbar-btn" disabled title="Em breve" aria-label="Exportar (em breve)">
              <IconDownload />
              Exportar
            </button>
            <button
              type="button"
              className={`toolbar-btn toolbar-btn--primary ${refreshing ? "toolbar-btn--loading" : ""}`}
              onClick={handleRefresh}
              disabled={refreshing}
              aria-busy={refreshing}
              aria-label={
                refreshing
                  ? "Reexibindo dados"
                  : `Reexibir dados do período ${DATA_REFERENCE_PERIOD}`
              }
            >
              <IconRefresh />
              {refreshing ? "Reexibindo…" : "Reexibir"}
            </button>
          </div>
        </header>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {statusMessage}
        </div>

        <main className={`dashboard-main ${fading ? "fade-out" : ""}`}>
          <div className="dashboard-view">
            <ActiveComponent key={activeView} />
          </div>
        </main>
      </div>
    </div>
  );
}
