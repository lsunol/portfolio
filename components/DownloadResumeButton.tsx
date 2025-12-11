interface LangLink {
  label: string;
  href: string;
}

const langLinks: LangLink[] = [
  { label: "EN", href: "/resume/lluis-sunol-resume-en.pdf" },
  { label: "ES", href: "/resume/lluis-sunol-resume-es.pdf" },
  { label: "CA", href: "/resume/lluis-sunol-resume-ca.pdf" },
];

export function DownloadResumeButton() {
  return (
    <div className="group relative block w-full pt-0 pb-6">
      <div className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-focus-within:-translate-y-1 group-focus-within:shadow-xl">
        <span className="rounded-lg bg-white/10 p-2 text-white">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </span>
        <span>DOWNLOAD RESUME (PDF)</span>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-full flex w-[280px] -translate-x-1/2 -translate-y-3 mt-1 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:-translate-y-10 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:-translate-y-10 group-focus-within:opacity-100">
        <div className="flex w-full gap-2 rounded-2xl bg-white/90 p-2.5 shadow-xl ring-1 ring-white/60 backdrop-blur">
          {langLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
