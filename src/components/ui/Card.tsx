interface CardProps {
  title?: string;
  titleId?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ title, titleId, children, className = "", style }: CardProps) {
  return (
    <section className={`card ${className}`.trim()} style={style} aria-labelledby={title && titleId ? titleId : undefined}>
      {title && (
        <h3 className="card-title" id={titleId}>
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
