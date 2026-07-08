import type { ReactNode } from "react";

interface ChartAccessibleProps {
  label: string;
  summary: ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartAccessible({ label, summary, children, className = "" }: ChartAccessibleProps) {
  return (
    <figure className={`chart-accessible ${className}`.trim()}>
      <div className="chart-accessible-canvas" role="img" aria-label={label}>
        {children}
      </div>
      <figcaption className="sr-only">{summary}</figcaption>
    </figure>
  );
}
