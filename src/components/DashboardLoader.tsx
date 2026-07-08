"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/components/Dashboard").then((mod) => mod.Dashboard),
  {
    ssr: false,
    loading: () => (
      <div className="dashboard-shell">
        <div className="dashboard-content">
          <header className="dashboard-toolbar">
            <div className="toolbar-heading">
              <div className="toolbar-brand">
                <span className="toolbar-brand-label">Superintendência</span>
                <span className="toolbar-brand-name">Nascimento</span>
              </div>
              <h2>Carregando dashboard…</h2>
              <p className="data-timestamp">Preparando visualizações</p>
            </div>
          </header>
        </div>
      </div>
    ),
  },
);

export function DashboardLoader() {
  return <Dashboard />;
}
