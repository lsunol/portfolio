"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
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
    title: "Casalimpia - Inpaint Stable Diffusion + LoRA",
    description: "AI pipeline for removing objects from indoor real-estate images using Stable Diffusion, LoRA fine-tuning and background/foreground segmentation. Includes evaluation with PSNR, SSIM, LPIPS and FID.",
    tags: ["Stable Diffusion", "LoRA", "Computer Vision", "Model Evaluation"],
    image: "/images/casalimpia-preview.jpg",
    githubUrl: "https://github.com/lsunol/casalimpia/",
  },
  {
    title: "AI Background Remover - Hugging Face",
    description: "Lightweight background-removal tool powered by Hugging Face models and deployed as a simple web application. Designed for speed, simplicity and self-hosting.",
    tags: ["Hugging Face", "Segmentation", "Web Deployment", "Inference"],
    image: "/images/aibgremover-preview.png",
    githubUrl: "https://github.com/lsunol/background-remover-ai",
    demoUrl: "https://aibgremover.lluissunol.duckdns.org/",
  },
  {
    title: "ATLAS - AI for Transport & Logistics",
    description: "Machine learning system to predict load feasibility, weight and profitability for transport operators using XGBoost models and optimization heuristics. Includes full pipeline and a working demo.",
    tags: ["Machine Learning", "XGBoost", "Optimization", "FastAPI"],
    image: "/images/atlas-preview-3.png",
    githubUrl: "https://github.com/lsunol/atlas",
    demoUrl: "https://atlasproject.duckdns.org/",
  },
  {
    title: "LLM Assistant — RAG-based Chatbot (Self-Hosted)",
    description: "Self-hosted LLM assistant built with Flowise, combining prompt orchestration, vector search and retrieval-augmented generation (RAG). Designed to experiment with knowledge grounding, context injection and conversational workflows.",
    tags: ["LLMs", "RAG", "Embeddings"],
    image: "/images/llmrag-preview.png",
  },
  {
    title: "Transmitting a Qubit - Quantum Engineering",
    description: "Hands-on implementation of qubit state preparation, transmission and measurement using Qiskit. Explores Bloch sphere representation, quantum circuits and noise impact on fidelity.",
    tags: ["Qiskit", "Quantum Circuits", "Noise Simulation", "Measurement"],
    githubUrl: "https://github.com/lsunol/transmitingaqubit",
  },
];

const hasOddProjectCount = projects.length % 2 === 1;

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

  useLayoutEffect(() => {
    const measure = () => {
      const headerEl = document.querySelector("header");
      const measuredHeader = headerEl ? headerEl.getBoundingClientRect().height : 0;
      setHeaderHeight(measuredHeader);
      setShouldCenterHero(true);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden pb-24">
      {backgroundMode === "particles" ? <NeuralNetwork /> : null}
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-4 sm:px-6 lg:px-0">
        <motion.section
          id="hero"
          ref={heroRef}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col lg:flex-row gap-8 items-center justify-center"
          style={{ minHeight: "100svh", paddingTop: headerHeight + 16 }}
        >
          <div className="flex flex-col gap-10 w-full lg:w-auto" style={{ maxWidth: '690px' }}>
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
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: "20+ YEARS", subtitle: "BUILDING SOFTWARE" },
                { title: "END-TO-END", subtitle: "PRODUCT MINDSET" },
              ].map((item) => (
                <div key={item.subtitle} className="neumorphic-surface rounded-2xl p-6 text-center">
                  <p className="text-3xl font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-500">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden flex-1 w-full items-stretch justify-center h-[400px] lg:flex lg:w-auto lg:h-[590px]">
            <div className="relative w-full h-full">
              <Image
                src="/images/avatar-02-transparent.png"
                alt="Lluís Suñol"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="relative w-full lg:hidden">
            <div className="relative h-[460px] w-full sm:h-[560px]">
              <Image
                src="/images/avatar-08-transparent.png"
                alt="Lluís Suñol"
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
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
          className="relative isolate space-y-10 scroll-mt-28 sm:scroll-mt-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-37 hidden -z-10 min-[1600px]:block -translate-x-[calc(512px+300px+48px)]"
          >
            <div className="relative opacity-90 h-[clamp(420px,32vw,620px)] w-[clamp(260px,20vw,420px)]">
              <Image
                src="/images/avatar-03-transparent.png"
                alt=""
                fill
                className="object-contain"
                sizes="(min-width: 1600px) 20vw, 0px"
              />
            </div>
          </div>
          <SectionTitle
            eyebrow="Skills & Resume"
            title="A blend of 20+ years of software engineering and hands-on AI experimentation"
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
            title="Selected Projects"
            description="A collection of recent AI-driven projects exploring Deep Learning, Generative Models and applied engineering."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
            {hasOddProjectCount && (
              <div className="relative hidden overflow-hidden rounded-3xl md:flex md:items-center md:justify-center">
                <Image
                  src="/images/avatar-09-transparent.png"
                  alt="Decorative avatar"
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 35vw, 100vw"
                />
              </div>
            )}
          </div>
        </motion.section>

        <motion.section
          id="ask-me"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative isolate space-y-8 scroll-mt-28 sm:scroll-mt-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-56 hidden -z-10 min-[1600px]:block left-[calc(50%+512px+32px)]"
          >
            <div className="relative opacity-90 h-[clamp(420px,32vw,620px)] w-[clamp(260px,20vw,420px)] [transform:scaleX(-1)]">
              <Image
                src="/images/avatar-04-transparent.png"
                alt=""
                fill
                className="object-contain"
                sizes="(min-width: 1600px) 20vw, 0px"
              />
            </div>
          </div>
          <SectionTitle
            eyebrow="Ask Me"
            title="Instant answers about my work"
            description=""
          />
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5 text-slate-600">
              <p>
                This assistant is designed to answer quick questions about my background, projects and technical
                experience, without needing to browse the full portfolio.
              </p>
              <p>
                It is a self-hosted LLM system, grounded on my CV and project documentation, and built using
                retrieval-augmented generation (RAG) and prompt orchestration.
              </p>
              <p>
                It runs entirely on my own hardware, reflecting my interest in understanding and building AI
                systems end to end, beyond managed cloud services.
              </p>
              <p>
                Feel free to ask about any project, technology or idea shown on this site.
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
            title="Let's get in touch"
            description="Feel free to reach out via email or connect with me on LinkedIn. I'm always open to discussing new projects, ideas, or opportunities."
          />
          <div className="flex justify-center">
            <div className="neumorphic-surface rounded-3xl p-8 max-w-[980px]">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                {/* Avatar slot - Left column (desktop) / Top (mobile) */}
                <div className="flex justify-center md:justify-start">
                  <div className="neumorphic-surface rounded-2xl w-40 h-40 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/avatar-01.png" 
                      alt="Lluís Suñol"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image doesn't exist yet
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-xs uppercase tracking-wider text-slate-400 font-semibold">Avatar</span>';
                      }}
                    />
                  </div>
                </div>

                {/* Contact links - Right column (desktop) / Bottom (mobile) */}
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="flex-shrink-0 w-5 h-5 text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Barcelona, Spain</span>
                  </div>

                  {/* Email */}
                  <a 
                    href="mailto:lluisunyol@gmail.com"
                    className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:underline">lluisunyol@gmail.com</span>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/lluissunol/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:underline">linkedin.com/in/lluissunol</span>
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/lsunol/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:underline">github.com/lsunol</span>
                  </a>

                  {/* Classic CV */}
                  <a 
                    href="https://cv.lluissunol.duckdns.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:underline">Classic CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <FloatingChat />
    </div>
  );
}
