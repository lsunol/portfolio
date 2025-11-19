type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
};

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article className="neumorphic-surface flex flex-col gap-5 rounded-3xl p-6 shadow-lg">
      <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-50 text-sm font-semibold uppercase tracking-wider text-slate-500">
        Image
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
