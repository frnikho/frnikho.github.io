import { motion } from "motion/react"

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
    endYear: "-",
    date: "Avr. 2022 → Aujourd’hui",
    duration: "3 ans +",
    title: "Consultant Salesforce",
    company: "Capgemini · Nantes",
    type: "CDI · Apps métiers critiques",
    accent: "#0176D3",
    desc: "Conception, évolution et maintenance d’apps critiques - automatisation & intégrations inter-systèmes lourds.",
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
    desc: "De l’idée à la prod - DDD, sécurité, monitoring. Architecture, dev fullstack & bonnes pratiques de bout en bout.",
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
    desc: "Gestion & maintenance infra campus - support utilisateurs, réseau, sécurité du parc & comptes.",
    mastered: [
      { k: "Systèmes", d: "Active Directory, Windows Server, Linux - gestion parc & comptes" },
      { k: "Réseau", d: "Cisco, brassage, diagnostic incidents & sécurisation" },
      { k: "Virtualisation", d: "Proxmox / VMware - provision & maintien en conditions opérationnelles" },
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
    desc: "Du C au cloud par projets - Linux, Git, Docker/K8s, React/Next. Méthodes agiles & autonomie radicale.",
    mastered: [
      { k: "Fondamentaux", d: "C / C++ système, structures, perf & rigueur" },
      { k: "Web & outillage", d: "JS/TS, React, PlatformIO, Docker - culture ship" },
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
    desc: "Reconditionnement & distribution d’équipements vers écoles en pays en développement - remise en état & config.",
    mastered: [
      { k: "Hardware", d: "Montage PC, diagnostic matériel & remise en état complète" },
      { k: "Systèmes & réseau", d: "Installation OS, config réseau & préparation au déploiement" },
      { k: "Sens terrain", d: "Chaîne logistique matérielle, exigences écoles partenaires" },
    ],
    tech: ["Montage PC", "Installation OS", "Config Réseau", "Diagnostic"],
  },
]

export default function Work() {
  return (
    <section id="work" className="relative bg-[#F8F7F1] border-y border-[#E7E2D9]/60 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="pointer-events-none absolute -top-28 -right-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-[0.10]" />
      <div className="relative max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#FF3E1F]" /> Parcours - 2018 → aujourd’hui</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.04em] text-[34px] lg:text-[46px] leading-[0.9]">Timeline <span className="font-serif italic font-normal text-[#FF3E1F]">vivante</span></h2>
            <p className="mt-3 text-[15px] leading-relaxed opacity-60">Chaque date compte - rôle, contexte, et surtout ce qui a été <em className="not-italic font-medium text-[#0C2E3D]">maîtrisé</em> ensuite.</p>
          </div>
        </div>

        <div className="relative mt-10 lg:mt-12 max-w-[980px]">
          <div className="absolute left-[7px] lg:left-[164px] top-3 bottom-3 w-px bg-[#E7E2D9]" aria-hidden="true" />
          <div className="grid gap-7 lg:gap-6">
            {timeline.map((t, idx) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="relative grid lg:grid-cols-[148px_32px_1fr] items-start gap-0"
              >
                <div className="hidden lg:block text-right pr-6 pt-2">
                  <div className="font-serif italic leading-none tracking-[-0.04em] text-[38px]" style={{ color: t.accent }}>{t.year}</div>
                  <div className="font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight">{t.date}</div>
                  <span className="inline-flex mt-2 bg-white border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm">{t.duration}</span>
                  <div className="mt-2 font-display text-[11px] tracking-widest uppercase opacity-35">{t.company.split('·')[0]?.trim()}</div>
                </div>
                <div className="hidden lg:flex justify-center pt-7">
                  <span className="w-[18px] h-[18px] rounded-full bg-white border-2 grid place-items-center shadow-sm" style={{ borderColor: t.accent }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
                  </span>
                </div>
                <span className="lg:hidden absolute left-0 top-7 w-[15px] h-[15px] rounded-full bg-white border-2 grid place-items-center shadow-sm" style={{ borderColor: t.accent }} aria-hidden="true">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
                </span>
                <div className="pl-8 lg:pl-0">
                  <div className="lg:hidden flex flex-wrap items-baseline gap-2 mb-2.5">
                    <span className="font-serif italic text-[22px] leading-none" style={{ color: t.accent }}>{t.year}</span>
                    <span className="font-mono text-[11px] tracking-wide opacity-60">{t.date} · {t.duration}</span>
                  </div>
                  <div className="group relative bg-white rounded-[1.7rem] border border-[#E7E2D9] overflow-hidden hover:shadow-[0_12px_32px_rgba(12,46,61,0.08)] hover:border-[#0C2E3D]/10 transition">
                    <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: t.accent }} />
                    <div className="p-6 lg:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-bold text-[18px] lg:text-[19px] leading-tight">{t.title}</h3>
                          <p className="font-display text-[12px] tracking-widest uppercase opacity-40 mt-1">{t.company} <span className="opacity-30">-</span> {t.type}</p>
                        </div>
                        <span className="hidden sm:inline-flex shrink-0 bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-mono text-[11px] opacity-60">{t.year}{t.endYear && t.endYear !== '-' && t.endYear !== t.year ? ` → ${t.endYear}` : ''}</span>
                      </div>
                      <p className="mt-3 text-[14.5px] leading-relaxed opacity-65">{t.desc}</p>
                      <div className="mt-5">
                        <div className="flex items-center gap-2 font-display text-[10px] tracking-[0.14em] uppercase opacity-35"><span className="w-5 h-px bg-[#E7E2D9]" /> Maîtrisé pendant cette période</div>
                        <ul className="mt-3 grid gap-2.5">
                          {t.mastered.map(m => (
                            <li key={m.k} className="flex gap-3 bg-[#FCFCF9] border border-[#E7E2D9]/60 rounded-2xl px-3.5 py-3">
                              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.accent }} aria-hidden="true" />
                              <span className="text-[13.5px] leading-relaxed"><span className="font-display font-semibold">{m.k}</span><span className="opacity-60"> - {m.d}</span></span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {t.tech.map(x => (
                          <span key={x} className="bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm">{x}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
