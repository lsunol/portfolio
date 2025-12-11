import { ReactNode } from "react";

type TimelineItemProps = {
  period: string;
  title: string;
  subtitle: string;
  description: ReactNode;
  isLast?: boolean;
};

export function TimelineItem({ period, title, subtitle, description, isLast = false }: TimelineItemProps) {
  return (
    <div className={`relative pl-8 pb-8 ${!isLast ? 'border-l-2 border-slate-300' : ''}`}>
      <span className="absolute left-[-9px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-400 bg-white shadow-[3px_3px_0px_rgba(186,181,248,0.4)]" />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{period}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm font-semibold text-slate-600">{subtitle}</p>
      <div className="mt-3 text-sm text-slate-600">{description}</div>
    </div>
  );
}
