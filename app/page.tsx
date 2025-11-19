"use client";

import { motion } from "framer-motion";
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

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden pb-24">
      <Header />
      <div className="flex flex-1 flex-col">
        <NeuralNetwork />
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-4 sm:px-6 lg:px-0">
        <motion.section
          id="hero"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col justify-center gap-10"
        >
          <div className="neumorphic-surface rounded-[2.5rem] p-8 shadow-[20px_20px_45px_rgba(163,177,198,0.45),-20px_-20px_45px_rgba(255,255,255,0.9)]">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-500">Product Engineer</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Lluís Suñol
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum dui
              feugiat, Duis aute irure dolor in reprehenderit velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                "View Projects",
                "Download Resume",
                "Ask Me",
              ].map((label) => (
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
            {[
              { title: "12+", subtitle: "Años construyendo" },
              { title: "40", subtitle: "Productos lanzados" },
              { title: "∞", subtitle: "Ideas en backlog" },
            ].map((item) => (
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
          className="space-y-8"
        >
          <SectionTitle
            eyebrow="About"
            title="Creo productos digitales con intención"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet, enim sed ultricies scelerisque, lorem neque mollis urna, et dapibus elit justo sed mauris."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-base text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum dui feugiat purus
              sagittis, non gravida urna dictum. Cras fringilla feugiat tellus, quis facilisis nulla egestas id.
            </p>
            <div className="neumorphic-surface rounded-3xl p-6 text-slate-600">
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed
                sed augue a sapien facilisis egestas in egestas erat.
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
          className="space-y-10"
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
          className="space-y-10"
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
          className="space-y-8"
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
          className="space-y-8"
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
      </div>
      <FloatingChat />
    </div>
  );
}
