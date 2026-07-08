interface SlideHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
}

export function SlideHeader({ title, subtitle, badge }: SlideHeaderProps) {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {badge}
    </div>
  );
}
