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
    period: "2023 — HOY",
    title: "Lead Frontend",
    subtitle: "Studio Lorem",
    description: "Dirijo la experiencia web end-to-end para productos SaaS con usuarios globales.",
  },
  {
    period: "2021 — 2023",
    title: "Senior Product Engineer",
    subtitle: "Acme Labs",
    description: "Construí sistemas de diseño y microfrontends orquestados con App Router.",
  },
  {
    period: "2019 — 2021",
    title: "Frontend Specialist",
    subtitle: "Freelance",
    description: "Consultorías para startups enfocadas en growth, rendimiento y accesibilidad.",
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
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="neumorphic-surface rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-4">SOFTWARE ENGINEERING</p>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Java / Spring Boot / Hibernate</li>
                    <li>Python</li>
                    <li>JavaScript / Node.js</li>
                    <li>SQL / NoSQL</li>
                    <li>Spring</li>
                  </ul>
                </div>
                <div className="neumorphic-surface rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-4">DEVOPS & INFRA</p>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Docker & containerization</li>
                    <li>Kubernetes</li>
                    <li>Linux & servers</li>
                    <li>automation scripts</li>
                    <li>Performance & scaling</li>
                  </ul>
                </div>
                <div className="neumorphic-surface rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-4">ARTIFICIAL INTELLIGENCE</p>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Deep Learning (PyTorch)</li>
                    <li>Stable Diffusion & LoRA</li>
                    <li>Computer Vision</li>
                    <li>LLMs & RAG</li>
                    <li>Model evaluation</li>
                  </ul>
                </div>
                <div className="neumorphic-surface rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 mb-4">TOOLS & OTHER SKILLS</p>
                  <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Git</li>
                    <li>FastAPI</li>
                    <li>Quantum basics</li>
                    <li>Agile / Scrum</li>
                    <li>Financial knowledge</li>
                  </ul>
                </div>
              </div>
              <div className="neumorphic-surface rounded-3xl p-6">
                <div className="space-y-8 border-l border-white/70 pl-6 relative">
                  <TimelineItem
                    period="2018 — 2024"
                    title="Senior Software Engineer"
                    subtitle="Sabadell Consumer Finance / Instant Credit"
                    description={<ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                      <li>Core developer of the main loan origination platform.</li>
                      <li>Backend, sharding, performance, AngularJS back-office.</li>
                      <li>Led Docker containerization for frontend and back-office systems.</li>
                    </ul>}
                  />
                  <TimelineItem
                    period="2013 — 2018"
                    title="Software Engineer"
                    subtitle="Agile Content"
                    description={<ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                      <li>Built Agile CMS and Agile Media Player (ads, analytics, customizable skins).</li>
                      <li>Spring Boot microservices (translator, redirect).</li>
                      <li>DB performance (Oracle/MySQL).</li>
                    </ul>}
                  />
                  <TimelineItem
                    period="2010 — 2013"
                    title="Software Engineer"
                    subtitle="VASS"
                    description={<ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                      <li>Developed platforms for La Caixa, Generalitat, Ajuntament de Barcelona.</li>
                      <li>CMS (OpenCMS), Java stack, front-end integrations.</li>
                    </ul>}
                  />
                  <TimelineItem
                    period="2008 — 2010"
                    title="Embedded/Systems Engineer"
                    subtitle="HP"
                    description={<ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                      <li>Fleet Control Tool (C++, SNMP, Telnet/SSH).</li>
                      <li>Java solutions embedded in printers.</li>
                    </ul>}
                  />
                  <TimelineItem
                    period="2006 — 2008"
                    title="Software Developer"
                    subtitle="LCFIB"
                    description={<ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
                      <li>Projects for Generalitat: SAGA, e-Catalunya wiki engine.</li>
                      <li>Java, Hibernate, SQL, Velocity.</li>
                    </ul>}
                  />
                </div>
                <button
                  type="button"
                  className="mt-8 w-full rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                  onClick={() => window.open('/resume/lluis-sunol-resume.pdf', '_blank')}
                >
                  Download Resume (PDF)
                </button>
              </div>
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
            title="Stack moderno de punta a punta"
            description="Lorem ipsum dolor sit amet consectetur adipiscing elit penatibus lectus ornare id."
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="neumorphic-surface rounded-3xl p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="neumorphic-surface rounded-3xl p-6">
              <div className="space-y-8 border-l border-white/70 pl-6">
                {experiences.map((item) => (
                  <TimelineItem key={item.period} {...item} />
                ))}
              </div>
              <button
                type="button"
                className="mt-8 w-full rounded-full border border-transparent bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                Download Resume (PDF)
              </button>
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
