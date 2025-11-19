type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
