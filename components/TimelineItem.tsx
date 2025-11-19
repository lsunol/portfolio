type TimelineItemProps = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
};

export function TimelineItem({ period, title, subtitle, description }: TimelineItemProps) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-white/70 bg-[var(--app-surface)] shadow-[2px_2px_6px_rgba(163,177,198,0.5),-2px_-2px_6px_rgba(255,255,255,0.8)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{period}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm font-medium text-slate-600">{subtitle}</p>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
    </div>
  );
}
