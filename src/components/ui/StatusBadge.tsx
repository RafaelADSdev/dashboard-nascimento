import type { BadgeStatus } from "@/data/dashboard-data";

interface StatusBadgeProps {
  status: BadgeStatus;
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return <span className={`status-badge badge-${status}`}>{children}</span>;
}
