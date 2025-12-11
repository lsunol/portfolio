"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChatMock } from "@/components/ChatMock";
import { FloatingChat } from "@/components/FloatingChat";
import { Header } from "@/components/Header";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { TimelineItem } from "@/components/TimelineItem";
import { DownloadResumeButton } from "@/components/DownloadResumeButton";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const projects = [
  {
    title: "Lumen Insights",
    description: "Aplicación analítica lorem ipsum dolor sit amet consectetur adipiscing elit.",
    tags: ["Next.js", "Tailwind", "Supabase"],
  },
  {
    title: "Northwind Ops",
    description: "Panel administrativo lorem ipsum fermentum gravida porta fermentum pellentesque.",
    tags: ["React", "TypeScript", "Framer Motion"],
  },
  {
    title: "Atlas Studio",
    description: "Herramienta creativa lorem ipsum ultricies habitasse platea dictumst.",
    tags: ["Design Systems", "Storybook", "REST"],
  },
  {
    title: "Pulse Mobile",
    description: "Experiencia móvil lorem ipsum feugiat mi eget mauris pharetra et ultrices.",
    tags: ["React Native", "Expo", "CI/CD"],
  },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "App Router", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Edge Functions", "GraphQL", "REST", "Auth"],
  },
  {
    title: "Machine Learning",
    items: ["Vision", "Chatbots", "RAG", "Prompt Ops"],
  },
  {
    title: "DevOps",
    items: ["Vercel", "Docker", "CI/CD", "Observability"],
  },
];

const experiences = [
  {
    period: "2018 — 2024",
    title: "Sabadell Consumer Finance / Instant Credit",
    subtitle: "Software Engineer",
    description: (
      <ul className="mt-2 space-y-2 text-sm text-slate-600 list-none">
        <li>Core contributor to the loan origination platform.</li>
        <li>Led Docker containerization across frontend and back-office systems.</li>
        <li>Backend development, database sharding and AngularJS back-office.</li>
      </ul>
    ),
  },
  {
    period: "2013 — 2018",
    title: "Agile Content",
    subtitle: "Software Engineer",
    description: (
      <ul className="mt-2 space-y-2 text-sm text-slate-600 list-none">
        <li>Built Agile CMS and Agile Media Player (ads, analytics, customizable skins).</li>
        <li>Developed Spring Boot microservices (translator, redirect) and improved DB performance.</li>
      </ul>
    ),
  },
  {
    period: "2010 — 2013",
    title: "VASS",
    subtitle: "Software Engineer",
    description: (
      <ul className="mt-2 space-y-2 text-sm text-slate-600 list-none">
        <li>Developed platforms for La Caixa, Generalitat de Catalunya and Ajuntament de Barcelona.</li>
        <li>Worked with OpenCMS, Java stack and front-end integrations.</li>
      </ul>
    ),
  },
  {
    period: "2008 — 2010",
    title: "HP",
    subtitle: "Embedded / Systems Engineer",
    description: (
      <ul className="mt-2 space-y-2 text-sm text-slate-600 list-none">
        <li>Developed the HP Fleet Control Tool (C++, SNMP, Telnet/SSH).</li>
        <li>Built Java-based solutions embedded in printers.</li>
      </ul>
    ),
  },
  {
    period: "2006 — 2008",
    title: "LCFIB (UPC)",
    subtitle: "Software Developer",
    description: (
      <ul className="mt-2 space-y-2 text-sm text-slate-600 list-none">
        <li>Developed SAGA and e-Catalunya (wiki engine) for Generalitat de Catalunya.</li>
        <li>Java, Hibernate, SQL and Velocity.</li>
      </ul>
    ),
  },
];

const askMeMessages = [
  { sender: "User" as const, text: "¿Puedes hacer un prototipo rápido?" },
  { sender: "Assistant" as const, text: "Claro, en 48h tienes una demo navegable en Figma + Next." },
  { sender: "User" as const, text: "Perfecto, agendemos una llamada." },
];

// Background mode toggle: set to "particles" to enable the animated background, "none" to disable for perf.
const backgroundMode: "particles" | "none" = "none";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [shouldCenterHero, setShouldCenterHero] = useState(false);

  useEffect(() => {
    const measure = () => {
      const headerEl = document.querySelector("header");
      const measuredHeader = headerEl ? headerEl.getBoundingClientRect().height : 0;
      setHeaderHeight(measuredHeader);

      const heroEl = heroRef.current;
      if (!heroEl) return;

      const contentHeight = heroEl.scrollHeight;
      const available = window.innerHeight - measuredHeader - 48; // keep small breathing room
      setShouldCenterHero(contentHeight <= available);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden pb-24">
      {backgroundMode === "particles" ? <NeuralNetwork /> : null}
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-4 pt-20 sm:px-6 sm:pt-24 lg:px-0">
        <motion.section
          id="hero"
          ref={heroRef}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className={`flex flex-col gap-10 scroll-mt-28 sm:scroll-mt-32 ${shouldCenterHero ? "justify-center" : ""}`}
        >
          <div className="neumorphic-surface rounded-[2.5rem] p-8 shadow-[20px_20px_45px_rgba(163,177,198,0.45),-20px_-20px_45px_rgba(255,255,255,0.9)]">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-500">Software Engineer · AI / Machine Learning</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Lluís Suñol
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              I bring 20 years of experience building scalable software systems, now focused on applying Deep Learning, LLMs and modern ML techniques to real-world problems. I combine strong backend engineering fundamentals with hands-on work in Stable Diffusion, LoRA training, CNNs and AI-driven pipelines.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {["View Projects", "Download Resume", "Ask Me"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[{ title: "20+", subtitle: "Years building software" }, { title: "3", subtitle: "Postgraduates this year" }, { title: "2", subtitle: "AI projects Casalimpia · Atlas" }].map((item) => (
              <div key={item.subtitle} className="neumorphic-surface rounded-2xl p-6 text-center">
                <p className="text-3xl font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </motion.section>
        <motion.section
          id="about"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 scroll-mt-28 sm:scroll-mt-32"
        >
          <SectionTitle
            eyebrow="About"
            title="Turning engineering experience into applied AI"
            description={`I'm Lluís, a Senior Software Engineer who spent two decades building reliable,
scalable and purposeful products. Recently, I’ve transitioned into Artificial Intelligence,
completing three postgraduate programs at UPC School and developing hands-on
projects in deep learning, computer vision and LLM-based assistants.`}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-lg text-slate-600">
              I love understanding how things work under the hood and turning that knowledge into
              practical, well-engineered solutions. I enjoy the balance between solid engineering,
              model experimentation and the challenge of making ideas actually work.
            </p>
            <div className="neumorphic-surface rounded-3xl p-6 text-slate-600 flex items-center justify-center">
              <p className="italic font-semibold text-center leading-relaxed">
                I believe in building things that truly work. I'm motivated by learning, iterating, and bringing ideas into production.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-10 scroll-mt-28 sm:scroll-mt-32"
        >
          <SectionTitle
            eyebrow="Skills & Resume"
            title="A blend of 20+ years of software engineering and hands-on AI experimentation."
            description=""
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 grid-cols-1 items-start">
              <div className="neumorphic-surface rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-6">SOFTWARE ENGINEERING</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Java / Spring</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Python</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">JavaScript</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">SQL / NoSQL</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorphic-surface rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-6">DEVOPS & INFRA</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Docker</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Kubernetes</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Linux</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Automation</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorphic-surface rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-6">ARTIFICIAL INTELLIGENCE</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">PyTorch</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Stable Diffusion</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Computer Vision</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">LLMs & RAG</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="neumorphic-surface rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-6">TOOLS & OTHER SKILLS</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Git</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">FastAPI</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Agile / Scrum</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">Finance</div>
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="neumorphic-surface rounded-3xl p-6">
              <div className="pl-2">
                {experiences.map((item, index) => (
                  <TimelineItem key={item.period} {...item} isLast={index === experiences.length - 1} />
                ))}
              </div>
              <div>
                <DownloadResumeButton />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-10 scroll-mt-28 sm:scroll-mt-32"
        >
          <SectionTitle
            eyebrow="Projects"
            title="Selección de trabajos recientes"
            description="Todo el contenido es lorem ipsum por ahora, pero la estructura lista para conectar CMS."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="ask-me"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 scroll-mt-28 sm:scroll-mt-32"
        >
          <SectionTitle
            eyebrow="Ask Me"
            title="Un chatbot para dudas rápidas"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 text-slate-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique
                senectus. Nulla facilisi morbi tempus iaculis urna id volutpat.
              </p>
              <p>
                Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Etiam sit amet nisl purus
                in mollis nunc sed id semper risus in hendrerit gravida rutrum.
              </p>
            </div>
            <ChatMock messages={askMeMessages} />
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 scroll-mt-28 sm:scroll-mt-32"
        >
          <SectionTitle
            eyebrow="Contact"
            title="Construyamos algo juntos"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque."
          />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-slate-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique
                senectus et netus.
              </p>
              <ul className="space-y-2 text-sm font-semibold text-slate-800">
                <li>Email — hola@lluis.dev</li>
                <li>LinkedIn — /in/lluis-sunol</li>
                <li>GitHub — @lluiscodes</li>
              </ul>
            </div>
            <form className="neumorphic-surface rounded-3xl p-6 space-y-4">
              <div>
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="mt-2 h-32 w-full rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  readOnly
                />
              </div>
              <button
                type="button"
                className="w-full rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.section>
      </main>
      <FloatingChat />
    </div>
  );
}
