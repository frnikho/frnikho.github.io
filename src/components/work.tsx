import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type TimelineEntry = {
  year: string
  endYear: string
  date: string
  duration: string
  title: string
  company: string
  type: string
  accent: string
  desc: string
  mastered: { k: string; d: string }[]
  tech: string[]
}

const timeline: TimelineEntry[] = [
  {
    year: "2022",
    endYear: "—",
    date: "Avr. 2022 → Aujourd’hui",
    duration: "3 ans +",
    title: "Consultant Salesforce",
    company: "Capgemini · Nantes",
    type: "CDI · Apps métiers critiques",
    accent: "#0176D3",
    desc: "Conception, évolution et maintenance d’apps critiques — automatisation & intégrations inter-systèmes lourds.",
    mastered: [
      { k: "Apex / LWC", d: "Composants & logique métier Salesforce, Visualforce & Flow" },
      { k: "Intégrations", d: "REST / SOAP, API externes & services tiers robustes" },
      { k: "Qualité & delivery", d: "CI/CD, code review, TU à forte couverture, tests en pré-prod" },
    ],
    tech: ["Salesforce Apex", "LWC", "Flow", "REST / SOAP", "CI/CD", "Agile"],
  },
  {
    year: "2021",
    endYear: "2025",
    date: "Sep. 2021 → Juin 2025",
    duration: "4 ans",
    title: "Fullstack & DevOps",
    company: "Freelance · Remote",
    type: "Indépendant · 350k users en prod",
    accent: "#FF3E1F",
    desc: "De l’idée à la prod — DDD, sécurité, monitoring. Architecture, dev fullstack & bonnes pratiques de bout en bout.",
    mastered: [
      { k: "Architecture", d: "DDD / SOLID, design system, APIs REST documentées (OpenAPI)" },
      { k: "Fullstack", d: "React / Next.js / NestJS / ElysiaJS · TypeScript · Bun/Node" },
      { k: "Infra & observabilité", d: "Docker · K8s · Terraform · GH Actions · Grafana / Loki / Tempo" },
    ],
    tech: ["React", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker", "K8s", "Terraform", "Stripe"],
  },
  {
    year: "2020",
    endYear: "2021",
    date: "Août 2020 → Jan. 2021",
    duration: "6 mois",
    title: "Admin. Réseau & Systèmes",
    company: "St-Aubin La Salle · Angers",
    type: "Campus scolaire · support & infra",
    accent: "#C08A1A",
    desc: "Gestion & maintenance infra campus — support utilisateurs, réseau, sécurité du parc & comptes.",
    mastered: [
      { k: "Systèmes", d: "Active Directory, Windows Server, Linux — gestion parc & comptes" },
      { k: "Réseau", d: "Cisco, brassage, diagnostic incidents & sécurisation" },
      { k: "Virtualisation", d: "Proxmox / VMware — provision & maintien en conditions opérationnelles" },
    ],
    tech: ["Active Directory", "Windows Server", "Linux", "Cisco", "Proxmox", "VMware"],
  },
  {
    year: "2019",
    endYear: "2024",
    date: "Sep. 2019 → Juil. 2024",
    duration: "5 ans",
    title: "Epitech Nantes",
    company: "RNCP 35075 · Expert en Tech. de l’Info",
    type: "Formation par projets · autonomie & agilité",
    accent: "#0C2E3D",
    desc: "Du C au cloud par projets — Linux, Git, Docker/K8s, React/Next. Méthodes agiles & autonomie radicale.",
    mastered: [
      { k: "Fondamentaux", d: "C / C++ système, structures, perf & rigueur" },
      { k: "Web & outillage", d: "JS/TS, React, PlatformIO, Docker — culture ship" },
      { k: "Méthodes", d: "Projets en équipe, code review, agilité & auto-apprentissage" },
    ],
    tech: ["C", "C++", "TS", "Docker", "K8s", "React", "Linux", "Git"],
  },
  {
    year: "2018",
    endYear: "2018",
    date: "Avr. 2018 → Mai 2018",
    duration: "2 mois",
    title: "Technicien Informatique",
    company: "Camara Education · Dublin",
    type: "ONG · reconditionnement & déploiement",
    accent: "#2E7D5A",
    desc: "Reconditionnement & distribution d’équipements vers écoles en pays en développement — remise en état & config.",
    mastered: [
      { k: "Hardware", d: "Montage PC, diagnostic matériel & remise en état complète" },
      { k: "Systèmes & réseau", d: "Installation OS, config réseau & préparation au déploiement" },
      { k: "Sens terrain", d: "Chaîne logistique matérielle, exigences écoles partenaires" },
    ],
    tech: ["Montage PC", "Installation OS", "Config Réseau", "Diagnostic"],
  },
]

export default function Work() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = rect.height - window.innerHeight * 0.4
      const p = Math.min(1, Math.max(0, (-rect.top + 120) / (h || 1)))
      setProgress(p)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative bg-[#F8F7F1] border-y border-[#E7E2D9]/60 overflow-hidden">
      {/* fond */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute -top-28 -right-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-[0.14]" />
        <div className="absolute top-[42%] -left-28 w-[460px] h-[460px] bg-[#DDE7FF] rounded-full blur-[90px] opacity-[0.10]" />
      </div>

      <div className="relative max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        {/* header */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-end">
          <div>
            <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm">
              Parcours
            </span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.04em] text-[32px] lg:text-[44px] leading-[0.92]">
              Timeline <span className="font-serif italic font-normal text-[#FF3E1F]">2018 → aujourd’hui</span>
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed opacity-60 max-w-[52ch]">
              Chaque étape = rôle + terrain conquis. Clique une carte pour voir ce qui a été{" "}
              <em className="not-italic font-medium text-[#0C2E3D]">maîtrisé</em> sur la période.
            </p>
          </div>
        </div>

        {/* timeline */}
        <div className="relative mt-10 lg:mt-14">
          {/* spine desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-[#E7E2D9]" aria-hidden="true" />
          <div
            className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#FF3E1F] via-[#0C2E3D] to-transparent"
            style={{ height: `${progress * 100}%` }}
            aria-hidden="true"
          />
          {/* spine mobile */}
          <div className="lg:hidden absolute left-[11px] sm:left-4 top-0 bottom-0 w-px bg-[#E7E2D9]" aria-hidden="true" />
          <div
            className="lg:hidden absolute left-[11px] sm:left-4 top-0 w-px bg-gradient-to-b from-[#FF3E1F] to-[#0C2E3D]"
            style={{ height: `${progress * 100}%` }}
            aria-hidden="true"
          />

          <div className="grid gap-6 lg:gap-4">
            {timeline.map((t, idx) => {
              const isLeft = idx % 2 === 0
              const isOpen = expanded === idx
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className="relative grid lg:grid-cols-[1fr_64px_1fr] gap-3 lg:gap-0 items-start pl-7 sm:pl-10 lg:pl-0"
                >
                  {/* card — left or right depending on parity */}
                  <div className={isLeft ? "lg:col-start-1 lg:pr-8" : "lg:col-start-3 lg:pl-8"}>
                    <div
                      className={`relative bg-white rounded-[1.8rem] border overflow-hidden transition-shadow ${isOpen ? "border-[#0C2E3D]/15 shadow-[0_18px_40px_rgba(12,46,61,0.12)]" : "border-[#E7E2D9] shadow-[0_8px_24px_rgba(12,46,61,0.06)]"}`}
                    >
                      <div className="absolute top-0 inset-x-0 h-1" style={{ background: t.accent }} />
                      <span
                        className="pointer-events-none absolute top-2 right-2 font-display font-bold text-[56px] lg:text-[64px] leading-none tracking-[-0.06em] opacity-[0.045] select-none"
                        aria-hidden="true"
                      >
                        {t.year}
                      </span>
                      <div className="p-5 lg:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="mt-2.5 font-display font-bold tracking-[-0.02em] text-[18px] lg:text-[19px] leading-tight">
                              {t.title}
                            </h3>
                            <p className="font-display text-[12px] tracking-widest uppercase opacity-50 mt-1">{t.company}</p>
                            <p className="sm:hidden font-display text-[11px] opacity-50 mt-1">{t.type}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpen ? null : idx)}
                            aria-expanded={isOpen}
                            aria-label={isOpen ? "Réduire" : "Voir le détail maîtrisé"}
                            className={`shrink-0 w-9 h-9 rounded-full grid place-items-center border text-[16px] leading-none transition ${isOpen ? "bg-[#0C2E3D] text-white border-[#0C2E3D]" : "bg-white border-[#E7E2D9] hover:border-[#0C2E3D]/20"}`}
                          >
                            {isOpen ? "−" : "+"}
                          </button>
                        </div>

                        <p className="mt-4 text-[14px] leading-relaxed opacity-70 bg-[#FCFCF9] rounded-2xl border border-[#E7E2D9]/50 p-3.5">
                          {t.desc}
                        </p>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.32 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 grid gap-2.5">
                                <div className="flex items-center gap-2 font-display text-[11px] tracking-widest uppercase opacity-40">
                                  <span className="w-6 h-px bg-[#E7E2D9]" /> Maîtrisé pendant cette période
                                </div>
                                {t.mastered.map((m) => (
                                  <div key={m.k} className="flex gap-3 bg-white border border-[#E7E2D9]/70 rounded-2xl p-3">
                                    <span
                                      className="mt-0.5 w-6 h-6 rounded-full grid place-items-center shrink-0 text-white text-[11px]"
                                      style={{ background: t.accent }}
                                    >
                                      ✓
                                    </span>
                                    <div className="min-w-0">
                                      <div className="font-display font-semibold text-sm leading-tight">{m.k}</div>
                                      <div className="font-display text-[13px] leading-relaxed opacity-60">{m.d}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {t.tech.map((x) => (
                            <span
                              key={x}
                              className="bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm"
                            >
                              {x}
                            </span>
                          ))}
                        </div>
                        {!isOpen && (
                          <button
                            type="button"
                            onClick={() => setExpanded(idx)}
                            className="mt-3 font-display text-[11px] tracking-widest uppercase underline decoration-[#E7E2D9] underline-offset-4 hover:decoration-[#0C2E3D]/30"
                          >
                            Voir ce qui a été maîtrisé →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* center node desktop */}
                  <div className="hidden lg:flex justify-center pt-7 lg:col-start-2">
                    <div className="relative">
                      <div
                        className={`w-[22px] h-[22px] rounded-full border-[3px] bg-white grid place-items-center shadow-sm transition ${isOpen ? "border-[#0C2E3D] scale-110" : "border-[#E7E2D9]"}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: isOpen ? "#0C2E3D" : t.accent }} />
                      </div>
                      {idx === 0 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FF3E1F] text-white rounded-full px-2 py-1 font-display text-[9px] tracking-widest uppercase whitespace-nowrap shadow">
                          Aujourd’hui
                        </span>
                      )}
                    </div>
                  </div>

                  {/* mobile node */}
                  <div
                    className="lg:hidden absolute left-0 sm:left-0 top-7 w-[18px] h-[18px] rounded-full border-2 bg-white grid place-items-center shadow-sm"
                    style={{ borderColor: isOpen ? "#0C2E3D" : "#E7E2D9" }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: isOpen ? "#0C2E3D" : t.accent }} />
                  </div>

                  {/* year block — desktop opposite side */}
                  <div
                    className={`hidden lg:flex pt-6 ${isLeft ? "lg:col-start-3 justify-start pl-8" : "lg:col-start-1 justify-end pr-8 lg:order-first"}`}
                  >
                    <div
                      className={`rounded-[1.4rem] border px-5 py-4 ${isOpen ? "bg-[#0C2E3D] text-white border-[#0C2E3D] shadow-[0_10px_24px_rgba(12,46,61,0.16)]" : "bg-white border-[#E7E2D9] shadow-sm"}`}
                    >
                      <div
                        className={`font-display font-bold tracking-[-0.04em] leading-none text-[28px] ${isOpen ? "text-white" : "text-[#0C2E3D]"} ${isLeft ? "text-left" : "text-right"}`}
                      >
                        {t.year}
                        <span className={`font-serif italic font-normal ${isOpen ? "text-white/70" : "text-[#FF3E1F]"}`}>
                          {t.endYear !== "—" && t.endYear !== t.year ? ` → ${t.endYear}` : ""}
                        </span>
                      </div>
                      <div
                        className={`mt-1 font-mono text-[11px] tracking-wide ${isOpen ? "text-white/60" : "opacity-50"} ${isLeft ? "text-left" : "text-right"}`}
                      >
                        {t.duration} · {t.company.split("·")[0]?.trim()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <p className="mt-10 text-center font-display text-[11px] tracking-widest uppercase opacity-35">
          Scroll — la ligne s’anime · clique une carte pour déplier les maîtrises
        </p>
      </div>
    </section>
  )
}
