import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDraggable } from 'react-use-draggable-scroll'
import Magnet from '@/components/lib/magnet'
import { useIsMobile } from '@/hooks/use-is-mobile'

export const Route = createFileRoute('/')({ component: RouteComponent })

/* --- data --- */
const services = [
  { n: '01', title: 'Web & Apps', accent: '#FF3E1F', icon: '/icons/computer.png', desc: 'Interfaces propres, perf et accessibilité d’abord.', items: ['React / Next.js - DDD & clean code', 'APIs Node / Rust - rapide, sécurisée', 'Refonte - SEO, a11y, vitesse'] },
  { n: '02', title: 'Mobile', accent: '#0C2E3D', icon: '/icons/smartphones.png', desc: 'Natif ou cross - une finition qui tient en main.', items: ['Android natif', 'React Native - 1 code, 2 OS', 'Stores & stabilité'] },
  { n: '03', title: 'DevOps', accent: '#2E7D5A', icon: '/icons/continous.png', desc: 'De la CI au run - tout est observable.', items: ['CI/CD - tests & rollback', 'Docker / K8s - scale', 'Grafana / logs / métriques'] },
  { n: '04', title: 'IoT', accent: '#C08A1A', icon: '/icons/iot.png', desc: 'Du capteur au dashboard.', items: ['Arduino, Pi, ESP32', 'WiFi / BT / Zigbee', 'Collecte & visu temps réel'] },
  { n: '05', title: 'Salesforce', accent: '#0176D3', icon: '/salesforce.png', desc: 'L’outil s’adapte au métier, pas l’inverse.', items: ['Apps sur-mesure', 'Flows & automatisation', 'ERP/CRM via API'] },
]
const timeline = [
  {
    year: '2022',
    endYear: '—',
    date: 'Avr. 2022 → Aujourd’hui',
    duration: '3 ans +',
    title: 'Consultant Salesforce',
    company: 'Capgemini · Nantes',
    type: 'CDI · Apps métiers critiques',
    accent: '#0176D3',
    bg: '#EFF6FF',
    desc: 'Conception, évolution et maintenance d’apps critiques — automatisation & intégrations inter-systèmes lourds.',
    mastered: [
      { k: 'Apex / LWC', d: 'Composants & logique métier Salesforce, Visualforce & Flow' },
      { k: 'Intégrations', d: 'REST / SOAP, API externes & services tiers robustes' },
      { k: 'Qualité & delivery', d: 'CI/CD, code review, TU à forte couverture, tests en pré-prod' },
    ],
    tech: ['Salesforce Apex', 'LWC', 'Flow', 'REST / SOAP', 'CI/CD', 'Agile'],
  },
  {
    year: '2021',
    endYear: '2025',
    date: 'Sep. 2021 → Juin 2025',
    duration: '4 ans',
    title: 'Fullstack & DevOps',
    company: 'Freelance · Remote',
    type: 'Indépendant · 350k users en prod',
    accent: '#FF3E1F',
    bg: '#FFF1EB',
    desc: 'De l’idée à la prod — DDD, sécurité, monitoring. Architecture, dev fullstack & bonnes pratiques de bout en bout.',
    mastered: [
      { k: 'Architecture', d: 'DDD / SOLID, design system, APIs REST documentées (OpenAPI)' },
      { k: 'Fullstack', d: 'React / Next.js / NestJS / ElysiaJS · TypeScript · Bun/Node' },
      { k: 'Infra & observabilité', d: 'Docker · K8s · Terraform · GH Actions · Grafana / Loki / Tempo' },
    ],
    tech: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'K8s', 'Terraform', 'Stripe'],
  },
  {
    year: '2020',
    endYear: '2021',
    date: 'Août 2020 → Jan. 2021',
    duration: '6 mois',
    title: 'Admin. Réseau & Systèmes',
    company: 'St-Aubin La Salle · Angers',
    type: 'Campus scolaire · support & infra',
    accent: '#C08A1A',
    bg: '#FFFBEB',
    desc: 'Gestion & maintenance infra campus — support utilisateurs, réseau, sécurité du parc & comptes.',
    mastered: [
      { k: 'Systèmes', d: 'Active Directory, Windows Server, Linux — gestion parc & comptes' },
      { k: 'Réseau', d: 'Cisco, brassage, diagnostic incidents & sécurisation' },
      { k: 'Virtualisation', d: 'Proxmox / VMware — provision & maintien en conditions opérationnelles' },
    ],
    tech: ['Active Directory', 'Windows Server', 'Linux', 'Cisco', 'Proxmox', 'VMware'],
  },
  {
    year: '2019',
    endYear: '2024',
    date: 'Sep. 2019 → Juil. 2024',
    duration: '5 ans',
    title: 'Epitech Nantes',
    company: 'RNCP 35075 · Expert en Tech. de l’Info',
    type: 'Formation par projets · autonomie & agilité',
    accent: '#0C2E3D',
    bg: '#F0FDFA',
    desc: 'Du C au cloud par projets — Linux, Git, Docker/K8s, React/Next. Méthodes agiles & autonomie radicale.',
    mastered: [
      { k: 'Fondamentaux', d: 'C / C++ système, structures, perf & rigueur' },
      { k: 'Web & outillage', d: 'JS/TS, React, PlatformIO, Docker — culture ship' },
      { k: 'Méthodes', d: 'Projets en équipe, code review, agilité & auto-apprentissage' },
    ],
    tech: ['C', 'C++', 'TS', 'Docker', 'K8s', 'React', 'Linux', 'Git'],
  },
  {
    year: '2018',
    endYear: '2018',
    date: 'Avr. 2018 → Mai 2018',
    duration: '2 mois',
    title: 'Technicien Informatique',
    company: 'Camara Education · Dublin',
    type: 'ONG · reconditionnement & déploiement',
    accent: '#2E7D5A',
    bg: '#F0FDF4',
    desc: 'Reconditionnement & distribution d’équipements vers écoles en pays en développement — remise en état & config.',
    mastered: [
      { k: 'Hardware', d: 'Montage PC, diagnostic matériel & remise en état complète' },
      { k: 'Systèmes & réseau', d: 'Installation OS, config réseau & préparation au déploiement' },
      { k: 'Sens terrain', d: 'Chaîne logistique matérielle, exigences écoles partenaires' },
    ],
    tech: ['Montage PC', 'Installation OS', 'Config Réseau', 'Diagnostic'],
  },
]
const works = timeline
const projects = [
  { title: 'Everyloc', desc: 'Plateforme de location événementielle - Angers & alentours. Next.js + Docker.', img: '/projects/everyloc.png', href: 'https://www.angers-location.fr', stack: ['Next.js', 'Docker'] },
  { title: 'Trip Planner', desc: 'Planification de voyages - UX dense, perf soignée.', img: '/projects/trip_planner.png', stack: ['React', 'NestJS'] },
  { title: 'FBX CLI', desc: 'CLI Freebox en Rust - automatisation box, DX radicale.', img: '/projects/fbx-cli.png', stack: ['Rust', 'CLI'] },
  { title: 'PLD Lab', desc: 'Laboratoire design & perfs - expe Motion & OGL.', img: '/projects/pld_1.png', stack: ['Motion', 'OGL'] },
]
const feedbacks = [
  { user: 'Theo F', role: 'Fullstack Developer', profile_picture: '/users/tf.jpeg', description: 'Travailleur, polyvalent - Nicolas ne vous décevra pas. Excellent élément.' },
  { user: 'Pierre D', role: 'Co-founder Everyloc', profile_picture: '/users/pd.jpeg', description: 'Irréprochable, soigné, orienté utilisateur. Notre site est plus clair et plus attractif depuis son passage.' },
  { user: 'Victor S', role: 'Fullstack Developer', profile_picture: '/users/vs.jpeg', description: 'Rigoureux et très talentueux. Un plaisir de travailler avec lui.' },
  { user: 'Antoine H', role: 'Co-founder Everyloc', profile_picture: '/users/ah.jpeg', description: 'Attentif, flexible - même en last minute. Qualité reflète son sérieux.' },
  { user: 'Denis S', role: 'Designer', profile_picture: '/users/ds.jpg', description: 'Sens du besoin client, technique maîtrisée - livrables robustes et sans accros.' },
]
const skillsData = {
  typescript: { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: 'blue' as const },
  react: { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', color: 'blue' as const },
  rust: { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg', color: 'blue' as const },
  docker: { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', color: 'blue' as const },
  postgresql: { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', color: 'blue' as const },
  elysiajs: { name: 'ElysiaJS', icon: 'https://avatars.githubusercontent.com/u/119793569?s=200&v=4', color: 'blue' as const },
  nestjs: { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg', color: 'red' as const },
  tailwind: { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', color: 'blue' as const },
  kubernetes: { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', color: 'blue' as const },
  terraform: { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg', color: 'blue' as const },
  redis: { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', color: 'red' as const },
  nextjs: { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', color: 'black' as const },
  bun: { name: 'Bun', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg', color: 'yellow' as const },
  prisma: { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', color: 'blue' as const },
  nodejs: { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: 'green' as const },
  grafana: { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg', color: 'orange' as const },
} as const
function GridPaper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, active: false })
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const setSize = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(container)
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect()
      mouse.current.tx = e.clientX - r.left
      mouse.current.ty = e.clientY - r.top
      mouse.current.active = true
    }
    const onLeave = () => { mouse.current.active = false }
    const onTouchMove = (e: TouchEvent) => {
      const r = container.getBoundingClientRect()
      const t = e.touches[0]
      if (!t) return
      mouse.current.tx = t.clientX - r.left
      mouse.current.ty = t.clientY - r.top
      mouse.current.active = true
    }
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('touchend', onLeave)
    const draw = () => {
      const { width, height } = container.getBoundingClientRect()
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.14
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.14
      if (!mouse.current.active) {
        mouse.current.x += (-1000 - mouse.current.x) * 0.04
        mouse.current.y += (-1000 - mouse.current.y) * 0.04
      }
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(12,46,61,0.07)'
      ctx.lineWidth = 1
      const grid = 32
      const radius = 190
      const strength = 18
      for (let x = 0; x <= width; x += grid) {
        ctx.beginPath()
        for (let y = 0; y <= height; y += 5) {
          let ox = 0
          const dx = mouse.current.x - x
          const dy = mouse.current.y - y
          const dist = Math.hypot(dx, dy)
          if (dist < radius) {
            const f = Math.pow(1 - dist / radius, 1.8)
            ox = -(dx / (dist || 1)) * strength * f * Math.cos(dist * 0.025)
          }
          const nx = x + ox
          if (y === 0) ctx.moveTo(nx, y)
          else ctx.lineTo(nx, y)
        }
        ctx.stroke()
      }
      for (let y = 0; y <= height; y += grid) {
        ctx.beginPath()
        for (let x = 0; x <= width; x += 5) {
          let oy = 0
          const dx = mouse.current.x - x
          const dy = mouse.current.y - y
          const dist = Math.hypot(dx, dy)
          if (dist < radius) {
            const f = Math.pow(1 - dist / radius, 1.8)
            oy = -(dy / (dist || 1)) * strength * f * Math.cos(dist * 0.025)
          }
          const ny = y + oy
          if (x === 0) ctx.moveTo(x, ny)
          else ctx.lineTo(x, ny)
        }
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onLeave)
    }
  }, [])
  return (
    <div ref={containerRef} className="relative overflow-hidden border-b border-[#E7E2D9]/60 bg-[#FCFCF9]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* --- page --- */
function RouteComponent() {
  return (
    <div className="bg-[#FCFCF9] text-[#0C2E3D] selection:bg-[#FF3E1F] selection:text-white antialiased">
      <GridPaper>
        <Nav />
        <Hero />
      </GridPaper>
      <Services />
      <StackMagnetic />
      <Work />
      <Projects />
      <FeedbackInfinite />
      <Contact />
      <footer className="border-t border-[#E7E2D9]/60 py-8">
        <div className="max-w-[1160px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-3 font-display text-[11px] tracking-widest uppercase opacity-40">
          <span className="flex items-center gap-2"><img src="/android-chrome-192x192.png" alt="" width={18} height={18} className="rounded-full" />© 2025 Nicolas Sans - Nantes • Remote</span>
          <span>Éditorial doux - clarté & arrondi</span>
        </div>
      </footer>
    </div>
  )
}

/* --- nav - îlot flottant --- */
function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { l: 'Services', h: '#services' },
    { l: 'Stack', h: '#stack' },
    { l: 'Parcours', h: '#work' },
    { l: 'Projets', h: '#projects' },
    { l: 'Avis', h: '#feedback' },
  ]
  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <header className="max-w-[1160px] mx-auto bg-white/80 backdrop-blur-xl rounded-full border border-[#E7E2D9] shadow-[0_10px_30px_rgba(12,46,61,0.08)] px-2 py-2 flex items-center justify-between">
        <a href="#top" id="top" className="flex items-center gap-2.5 pl-1.5" aria-label="Haut de page">
          <div className="w-8 h-8 rounded-full bg-[#0C2E3D] text-white grid place-items-center font-display text-[11px] font-bold">NS</div>
          <span className="hidden sm:block font-display font-semibold text-sm tracking-tight">Nicolas Sans</span>
          <span className="hidden lg:inline-flex ml-1 bg-[#FFF1EB] text-[#FF3E1F] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase border border-[#FFD8CC]">Dispo • freelance</span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(a => ( <a key={a.h} href={a.h} className="px-3.5 py-2 rounded-full font-display text-[11px] tracking-widest uppercase opacity-55 hover:opacity-100 hover:bg-[#F8F7F1] transition">{a.l}</a> ))}
          <a href="#contact" className="ml-2 bg-[#0C2E3D] text-white rounded-full px-5 py-2.5 font-display text-[11px] tracking-widest uppercase hover:bg-black transition">Me contacter</a>
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 rounded-full border border-[#E7E2D9] grid place-items-center bg-white"><span className="text-sm">{open ? '✕' : '☰'}</span></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-[1160px] mx-auto mt-2 bg-white rounded-3xl border border-[#E7E2D9] shadow-xl overflow-hidden lg:hidden">
            <div className="p-2 flex flex-col">
              {links.map(a => ( <a key={a.h} href={a.h} onClick={() => setOpen(false)} className="px-4 py-3 rounded-2xl font-display text-sm tracking-widest uppercase hover:bg-[#F8F7F1]">{a.l}</a> ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-1 bg-[#FF3E1F] text-white rounded-2xl text-center py-3 font-display text-sm tracking-widest uppercase">Discuter du projet</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* --- hero --- */
function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute -top-28 -left-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-25" />
      <div className="pointer-events-none absolute top-12 -right-32 w-[580px] h-[580px] bg-[#DDE7FF] rounded-full blur-[90px] opacity-20" />
      <div className="max-w-[1160px] mx-auto px-6 pt-10 lg:pt-14 relative">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-end">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6 lg:pr-4 pb-10 lg:pb-12">
            <div>
              <p className="font-display text-[12px] tracking-[0.14em] uppercase opacity-50">Nicolas Sans - Nantes • Remote</p>
              <h1 className="mt-2 font-display tracking-[-0.045em] leading-[0.88] text-[38px] sm:text-[52px] lg:text-[62px]">
                Développeur<br />
                <span className="font-extrabold text-accent">Fullstack</span>
              </h1>
              <div className={'flex flex-col gap-0 mt-3'}>
                <p className={'font-display text-[13px] opacity-60'}>React • Rust • K8s • Salesforce</p>
              </div>
            </div>
            <p className="max-w-[54ch] text-[16px] leading-[1.7] opacity-70">
              J’accompagne startups et équipes produit - interfaces soignées, APIs robustes, infra qui tient la charge.<br />
              <span className="text-[#0C2E3D] font-medium">Propre, rapide, documenté. On cadre, on chiffre, on livre.</span>
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contact" className="bg-[#0C2E3D] text-white rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-black transition shadow-[0_10px_24px_rgba(12,46,61,0.16)]">Démarrer un projet →</a>
              <a href="#projects" className="bg-white border border-[#0C2E3D]/15 rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-white transition shadow-sm">Voir les projets</a>
            </div>
            <div className="mt-1 bg-white rounded-full border border-[#E7E2D9] p-1 flex items-center gap-1 shadow-sm">
              <div className="flex-1 grid grid-cols-2 gap-1">
                <div className="rounded-full bg-[#FCFCF9] border border-[#E7E2D9]/50 px-2.5 py-1.5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0C2E3D] text-white grid place-items-center font-display text-[11px] font-bold shrink-0">5+</span>
                  <span className="font-display text-[11px] font-medium leading-none">ans d’exp.</span>
                  <span className="hidden sm:inline font-display text-[9px] tracking-widest uppercase opacity-40">• freelance</span>
                </div>
                <div className="rounded-full bg-white border border-[#E7E2D9] px-3 py-1.5 flex items-center justify-center gap-1.5 shadow-sm">
                  <span className="font-display text-[11px] font-bold tracking-[0.08em] leading-none">RNCP 35075</span>
                  <span className="hidden sm:inline font-display text-[9px] tracking-widest uppercase opacity-40">certifié</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-[#0C2E3D] text-white rounded-full pl-1 pr-2.5 py-1 shrink-0">
                <img src="/pd1.png" alt="" className="w-5 h-5 rounded-full bg-white p-0.5 object-contain" />
                <span className="font-display text-[9px] tracking-widest uppercase leading-none">Platform Dev I</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }} className="relative self-end flex flex-col w-full">
            <div className="bg-white rounded-t-[2.2rem] rounded-b-none border border-b-0 border-line shadow-[0_24px_64px_rgba(12,46,61,0.10)] overflow-hidden flex flex-col z-10">
              <div className="relative bg-[#EDE9E2] aspect-[4/4.85] overflow-hidden rounded-t-[2.2rem]">
                <img src="/pp.jpg" alt="Nicolas Sans" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-5 left-5 flex">
                  <span className="bg-white/90 backdrop-blur rounded-full px-3 py-1.5 font-display text-[10px] tracking-widest border border-white shadow">Disponible</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ k, title, serif, desc }: { k: string; title: string; serif: string; desc: string }) {
  return (
    <div className="max-w-[720px] mx-auto text-center">
      <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm">{k}</span>
      <h2 className="mt-4 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[44px] leading-none">{title} <span className="font-serif italic font-normal text-[#FF3E1F]">{serif}</span></h2>
      <p className="mt-3 text-[15px] leading-relaxed opacity-60 max-w-[60ch] mx-auto">{desc}</p>
    </div>
  )
}

/* --- services — liste éditoriale, pas grille de cards --- */
function Services() {
  const [open, setOpen] = useState('01')
  return (
    <section id="services" className="max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
      <SectionLabel k="Services" title="Ce que je livre" serif="vraiment" desc="Une liste claire. 5 pôles, livrables concrets — pas de jargon, juste ce qui part en prod." />
      <div className="mt-10 bg-white rounded-[2rem] border border-[#E7E2D9] overflow-hidden shadow-[0_16px_40px_rgba(12,46,61,0.06)]">
        {services.map(s => {
          const isOpen = open === s.n
          return (
            <div key={s.n} className="border-b last:border-0 border-[#E7E2D9]/60">
              <button type="button" onClick={() => setOpen(isOpen ? '' : s.n)} className="w-full flex items-center gap-4 lg:gap-5 p-5 lg:p-7 text-left hover:bg-[#FCFCF9]/60 transition">
                <span className="hidden sm:grid w-10 h-10 rounded-full place-items-center font-display text-xs font-bold text-white shadow-sm shrink-0" style={{ background: s.accent }}>{s.n}</span>
                <span className="w-11 h-11 rounded-2xl bg-[#FCFCF9] border border-[#E7E2D9] grid place-items-center shrink-0">
                  <img src={s.icon} alt="" width={22} height={22} className="object-contain" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-[17px] leading-tight">{s.title}</h3>
                  <p className="font-display text-sm leading-relaxed opacity-60 mt-1 max-w-[52ch]">{s.desc}</p>
                </div>
                <span className="hidden lg:block font-display text-[11px] tracking-widest uppercase opacity-40 mr-2">{s.items.length} livrables</span>
                <span className={`w-9 h-9 rounded-full grid place-items-center border text-sm shrink-0 transition ${isOpen ? 'bg-[#0C2E3D] text-white border-[#0C2E3D] rotate-45' : 'bg-white border-[#E7E2D9] text-[#0C2E3D]'}`}>{isOpen ? '×' : '+'}</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden">
                    <div className="px-5 lg:px-7 pb-6">
                      <div className="lg:ml-[104px] pt-4 border-t border-dashed border-[#E7E2D9]/60 grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {s.items.map(it => {
                          const [label, rest] = it.includes('—') ? it.split(' — ') : [it, '']
                          return (
                            <div key={it} className="flex items-center gap-3 bg-[#FCFCF9] rounded-2xl border border-[#E7E2D9]/50 px-3 py-3">
                              <span className="w-7 h-7 rounded-full bg-white border border-[#E7E2D9] grid place-items-center text-[11px] font-bold shrink-0" style={{ color: s.accent }}>›</span>
                              <div className="min-w-0">
                                <div className="font-display text-[13px] font-medium leading-none">{label}</div>
                                {rest && <div className="font-display text-[11px] opacity-60 leading-tight mt-1">{rest}</div>}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      <p className="text-center font-display text-[11px] tracking-widest uppercase opacity-30 mt-4">Clique sur un pôle pour voir les livrables • tout est inclus, pas de surprise</p>
    </section>
  )
}

/* --- stack magnétique - ancrée, plus perdue --- */
function StackMagnetic() {
  return (
    <section id="stack" className="max-w-290 mx-auto px-6 pb-12">
      <div className="rounded-[2rem] bg-white border border-[#E7E2D9] shadow-[0_16px_40px_rgba(12,46,61,0.06)] p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex bg-[#0C2E3D] text-white rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase">Stack</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.03em] text-[26px] lg:text-[34px] leading-none">Technos qui <span className="font-serif italic font-normal text-[#FF3E1F]">réagissent</span></h2>
            <p className="mt-2 font-display text-sm opacity-60">Grande grille d’origine - chaque carte suit doucement la souris. Pas de marquee, juste l’interaction.</p>
          </div>
          <span className="self-start lg:self-auto bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-3 py-1.5 font-display text-[11px] tracking-widest uppercase opacity-60">16 techs • favoris ★ - survole</span>
        </div>
        <div className="mt-6 grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 lg:gap-4">
          <SkillCard skill={skillsData.typescript} size="xl" favorite className="col-span-2 row-span-2" />
          <SkillCard skill={skillsData.react} size="lg" favorite className="col-span-2" />
          <SkillCard skill={skillsData.elysiajs} size="md" className="col-span-2" />
          <SkillCard skill={skillsData.docker} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.kubernetes} size="lg" className="col-span-2" />
          <SkillCard skill={skillsData.nextjs} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.tailwind} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.bun} size="xl" favorite className="col-span-2 row-span-2" />
          <SkillCard skill={skillsData.rust} size="sm" favorite className="col-span-1" />
          <SkillCard skill={skillsData.postgresql} size="sm" favorite className="col-span-1" />
          <SkillCard skill={skillsData.terraform} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.redis} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.nodejs} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.prisma} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.nestjs} size="sm" className="col-span-1" />
          <SkillCard skill={skillsData.grafana} size="sm" className="col-span-1" />
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, className, size, favorite }: { skill: { name: string; icon: string; color: 'blue' | 'red' | 'green' | 'black' | 'purple' | 'pink' | 'orange' | 'yellow' }; className?: string; size: 'sm' | 'md' | 'lg' | 'xl'; favorite?: boolean }) {
  const bg: Record<string, string> = { blue: 'bg-blue-50', red: 'bg-red-50', green: 'bg-green-50', black: 'bg-zinc-100', purple: 'bg-purple-50', pink: 'bg-pink-50', orange: 'bg-orange-50', yellow: 'bg-yellow-50' }
  return (
    <div className={`bg-[#FCFCF9] border border-[#E7E2D9] rounded-[1.6rem] relative overflow-hidden hover:bg-white hover:shadow-[0_8px_24px_rgba(12,46,61,0.08)] transition ${className ?? ''}`}>
      {favorite && <img alt="fav" src="/star.png" className="absolute top-2 right-2 w-4 h-4 pointer-events-none" />}
      <Magnet padding={24} magnetStrength={5} wrapperClassName="flex items-center w-full h-full p-3" innerClassName="w-full h-full">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 py-2">
          <div className={`${bg[skill.color] ?? 'bg-white'} rounded-2xl p-2 border border-black/5`}>
            <img src={skill.icon} alt={skill.name} className={`${size === 'xl' ? 'w-14 h-14 lg:w-16 lg:h-16' : ''} ${size === 'lg' ? 'w-12 h-12' : ''} ${size === 'md' ? 'w-10 h-10' : ''} ${size === 'sm' ? 'w-8 h-8' : ''} object-contain`} />
          </div>
          <span className={`${size === 'xl' ? 'text-[15px] font-bold' : size === 'lg' ? 'text-sm font-bold' : 'text-xs font-semibold'} font-display text-center leading-tight`}>{skill.name}</span>
        </div>
      </Magnet>
    </div>
  )
}

/* --- parcours — timeline éditoriale --- */
function Work() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const h = rect.height - window.innerHeight * 0.35
      const p = Math.min(1, Math.max(0, (-rect.top + 160) / (h || 1)))
      setProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return (
    <section id="work" ref={sectionRef} className="relative bg-[#F8F7F1] border-y border-[#E7E2D9]/60 overflow-hidden">
      {/* fond subtil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute -top-28 -right-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-[0.14]" />
        <div className="absolute top-[42%] -left-28 w-[460px] h-[460px] bg-[#DDE7FF] rounded-full blur-[90px] opacity-[0.10]" />
      </div>
      <div className="relative max-w-[1160px] mx-auto px-6 py-16 lg:py-22">
        {/* header */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-end">
          <div>
            <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm">Parcours</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.04em] text-[32px] lg:text-[44px] leading-[0.92]">Timeline <span className="font-serif italic font-normal text-[#FF3E1F]">2018 → aujourd’hui</span></h2>
            <p className="mt-3 text-[14.5px] leading-relaxed opacity-60 max-w-[52ch]">Chaque étape = rôle + terrain conquis. Clique une carte pour voir ce qui a été <em className="not-italic font-medium text-[#0C2E3D]">maîtrisé</em> sur la période.</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end self-start lg:self-end">
            <span className="inline-flex items-center gap-2 bg-white border border-[#E7E2D9] rounded-full px-3 py-2 font-display text-[11px] tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF3E1F] animate-pulse" /> 5 étapes
            </span>
            <span className="inline-flex bg-[#0C2E3D] text-white rounded-full px-3 py-2 font-display text-[11px] tracking-widest uppercase">Freelance & CDI — Nantes · Remote</span>
          </div>
        </div>

        {/* timeline */}
        <div className="relative mt-10 lg:mt-14">
          {/* spine — desktop center, mobile left */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-[#E7E2D9]" aria-hidden="true" />
          <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-[#FF3E1F] via-[#0C2E3D] to-transparent transition-[height] duration-150" style={{ height: `${progress * 100}%` }} aria-hidden="true" />
          <div className="lg:hidden absolute left-[11px] sm:left-4 top-0 bottom-0 w-px bg-[#E7E2D9]" aria-hidden="true" />
          <div className="lg:hidden absolute left-[11px] sm:left-4 top-0 w-px bg-gradient-to-b from-[#FF3E1F] to-[#0C2E3D] transition-[height] duration-150" style={{ height: `${progress * 100}%` }} aria-hidden="true" />

          <div className="grid gap-6 lg:gap-3">
            {timeline.map((t, idx) => {
              const isLeft = idx % 2 === 0
              const isOpen = expanded === idx
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  className={`relative grid lg:grid-cols-[1fr_64px_1fr] gap-3 lg:gap-0 items-start ${isLeft ? '' : 'lg:[&>div:first-child]:order-3 lg:[&>div:last-child]:order-1'}`}
                >
                  {/* card */}
                  <div className={`${isLeft ? 'lg:pr-8' : 'lg:pl-8'} lg:contents`}>
                    <div className={`relative lg:col-start-${isLeft ? '1' : '3'} bg-white rounded-[1.8rem] border ${isOpen ? 'border-[#0C2E3D]/15 shadow-[0_18px_40px_rgba(12,46,61,0.12)]' : 'border-[#E7E2D9] shadow-[0_8px_24px_rgba(12,46,61,0.06)]'} overflow-hidden transition-shadow`}>
                      {/* accent bar */}
                      <div className="absolute top-0 inset-x-0 h-1" style={{ background: t.accent }} />
                      {/* year watermark */}
                      <span className="pointer-events-none absolute -top-1 -right-2 font-display font-bold text-[56px] lg:text-[64px] leading-none tracking-[-0.06em] opacity-[0.045] select-none" aria-hidden="true">{t.year}</span>
                      <div className="p-5 lg:p-6">
                        <div className="flex items-start gap-3">
                          <div className="hidden sm:grid w-11 h-11 rounded-2xl place-items-center text-white font-display text-xs font-bold shrink-0 shadow-sm" style={{ background: t.accent }}>{t.year.slice(-2)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex bg-[#F8F7F1] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wide">{t.date}</span>
                              <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase opacity-60">{t.duration}</span>
                              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-display opacity-40"><span className="w-1 h-1 rounded-full" style={{ background: t.accent }} />{t.type}</span>
                            </div>
                            <h3 className="mt-2.5 font-display font-bold tracking-[-0.02em] text-[18px] lg:text-[19px] leading-tight">{t.title}</h3>
                            <p className="font-display text-[12px] tracking-widest uppercase opacity-50 mt-1">{t.company}</p>
                            <p className="sm:hidden font-display text-[11px] opacity-50 mt-1">{t.type}</p>
                          </div>
                          <button type="button" onClick={() => setExpanded(isOpen ? null : idx)} aria-expanded={isOpen} aria-label={isOpen ? 'Réduire' : 'Voir le détail maîtrisé'} className={`shrink-0 w-9 h-9 rounded-full grid place-items-center border text-[16px] leading-none transition ${isOpen ? 'bg-[#0C2E3D] text-white border-[#0C2E3D]' : 'bg-white border-[#E7E2D9] hover:border-[#0C2E3D]/20'}`}>{isOpen ? '−' : '+'}</button>
                        </div>
                        <p className="mt-4 text-[14px] leading-relaxed opacity-70 bg-[#FCFCF9] rounded-2xl border border-[#E7E2D9]/50 p-3.5">{t.desc}</p>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32 }} className="overflow-hidden">
                              <div className="mt-4 grid gap-2.5">
                                <div className="flex items-center gap-2 font-display text-[11px] tracking-widest uppercase opacity-40"><span className="w-6 h-px bg-[#E7E2D9]" /> Maîtrisé pendant cette période</div>
                                {t.mastered.map(m => (
                                  <div key={m.k} className="flex gap-3 bg-white border border-[#E7E2D9]/70 rounded-2xl p-3">
                                    <span className="mt-1 w-6 h-6 rounded-full grid place-items-center shrink-0 text-white text-[11px]" style={{ background: t.accent }}>✓</span>
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
                          {t.tech.map(x => (
                            <span key={x} className="bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm">{x}</span>
                          ))}
                        </div>
                        {!isOpen && (
                          <button type="button" onClick={() => setExpanded(idx)} className="mt-3 font-display text-[11px] tracking-widest uppercase underline decoration-[#E7E2D9] underline-offset-4 hover:decoration-[#0C2E3D]/30">Voir ce qui a été maîtrisé →</button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* center node */}
                  <div className="hidden lg:flex justify-center pt-7">
                    <div className="relative">
                      <div className={`w-[22px] h-[22px] rounded-full border-[3px] bg-white grid place-items-center shadow-sm transition ${isOpen ? 'border-[#0C2E3D] scale-110' : 'border-[#E7E2D9]'}`}>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: isOpen ? '#0C2E3D' : t.accent }} />
                      </div>
                      {idx === 0 && <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FF3E1F] text-white rounded-full px-2 py-1 font-display text-[9px] tracking-widest uppercase whitespace-nowrap shadow">Aujourd’hui</span>}
                    </div>
                  </div>
                  {/* mobile node line connector — dot */}
                  <div className="lg:hidden absolute left-[3px] sm:left-[8px] top-7 w-[18px] h-[18px] rounded-full border-2 bg-white grid place-items-center shadow-sm" style={{ borderColor: isOpen ? '#0C2E3D' : '#E7E2D9' }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: isOpen ? '#0C2E3D' : t.accent }} />
                  </div>

                  {/* opposite side — year block desktop */}
                  <div className={`hidden lg:flex ${isLeft ? 'justify-start pl-8' : 'justify-end pr-8'} pt-6`}>
                    <div className={`rounded-[1.4rem] border px-5 py-4 text-right ${isLeft ? 'text-left' : 'text-right'} ${isOpen ? 'bg-[#0C2E3D] text-white border-[#0C2E3D] shadow-[0_10px_24px_rgba(12,46,61,0.16)]' : 'bg-white border-[#E7E2D9] shadow-sm'}`}>
                      <div className={`font-display font-bold tracking-[-0.04em] leading-none ${isOpen ? 'text-white' : 'text-[#0C2E3D]'} text-[28px]`}>{t.year}<span className={`font-serif italic font-normal ${isOpen ? 'text-white/70' : 'text-[#FF3E1F]'}`}>{t.endYear !== '—' && t.endYear !== t.year ? ` → ${t.endYear}` : ''}</span></div>
                      <div className={`mt-1 font-mono text-[11px] tracking-wide ${isOpen ? 'text-white/60' : 'opacity-50'}`}>{t.duration} · {t.company.split('·')[0]?.trim()}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <p className="mt-10 text-center font-display text-[11px] tracking-widest uppercase opacity-35">Scroll — la ligne s’anime · clique une carte pour déplier les maîtrises</p>
      </div>
    </section>
  )
}

/* --- projets - bullets plus graphiques --- */
function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { events } = useDraggable(ref as unknown as React.RefObject<HTMLElement>)
  return (
    <section id="projects" className="bg-[#F8F7F1] border-y border-[#E7E2D9]/60">
      <div className="max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm">Projets</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[40px] leading-none">Sélection <span className="font-serif italic font-normal">- 4 réalisations</span></h2>
          </div>
          <span className="self-start lg:self-auto bg-white border border-[#E7E2D9] rounded-full px-3 py-1.5 font-display text-[11px] tracking-widest uppercase opacity-60 shadow-sm">drag → ou swipe sur mobile</span>
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-5 mt-8">
          {projects.map(p => (
            <a key={p.title} href={p.href} target={p.href ? '_blank' : undefined} rel={p.href ? 'noreferrer' : undefined} className="group bg-white rounded-[1.8rem] border border-[#E7E2D9] overflow-hidden shadow-[0_8px_24px_rgba(12,46,61,0.06)] hover:shadow-[0_16px_32px_rgba(12,46,61,0.10)] transition p-2">
              <div className="rounded-[1.3rem] overflow-hidden aspect-[16/10] bg-[#FCFCF9] border border-[#E7E2D9]/40"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" /></div>
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold">{p.title}</h3>
                  <span className="inline-flex items-center gap-1.5 bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C2E3D] opacity-60" />{p.stack.join(' • ')}
                  </span>
                </div>
                <p className="text-sm opacity-60 mt-2 leading-relaxed">{p.desc}</p>
                <div className="mt-3 flex gap-2">
                  {p.stack.map(s => (
                    <span key={s} className="bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm">{s}</span>
                  ))}
                  {p.href && <span className="ml-auto bg-[#0C2E3D] text-white rounded-full px-4 py-1.5 font-display text-[11px] tracking-widest uppercase">Ouvrir →</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div ref={ref} {...events} className="md:hidden flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none mt-6 -mx-6 px-6 pb-2">
          {projects.map(p => (
            <a key={p.title} href={p.href} target={p.href ? '_blank' : undefined} rel={p.href ? 'noreferrer' : undefined} className="shrink-0 snap-start w-[300px] bg-white rounded-[1.8rem] border border-[#E7E2D9] overflow-hidden p-2 shadow-sm">
              <div className="rounded-[1.3rem] overflow-hidden aspect-[16/10] bg-[#FCFCF9]"><img src={p.img} alt={p.title} className="w-full h-full object-cover" /></div>
              <div className="px-3 pt-3 pb-2"><h3 className="font-display font-semibold text-sm">{p.title}</h3><p className="text-xs opacity-60 mt-1 line-clamp-2">{p.desc}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- feedback - système d’origine, ralenti & embelli --- */
function FeedbackInfinite() {
  const VISIBLE_COUNT = 3
  const extended = [...feedbacks.slice(-VISIBLE_COUNT), ...feedbacks, ...feedbacks.slice(0, VISIBLE_COUNT)]
  const [idx, setIdx] = useState(VISIBLE_COUNT)
  const [anim, setAnim] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  useEffect(() => setMounted(true), [])
  const displayIsMobile = mounted ? isMobile : false
  const next = () => { setAnim(true); setIdx(v => v + 1) }
  const prev = () => { setAnim(true); setIdx(v => v - 1) }
  useEffect(() => { if (!anim) { const t = setTimeout(() => setAnim(true), 20); return () => clearTimeout(t) } }, [anim])
  const onEnd = () => {
    if (idx >= feedbacks.length + VISIBLE_COUNT) { setAnim(false); setIdx(VISIBLE_COUNT) }
    else if (idx < VISIBLE_COUNT) { setAnim(false); setIdx(feedbacks.length + VISIBLE_COUNT - 1) }
  }
  const tx = `-${(idx * (100 / (displayIsMobile ? 1 : VISIBLE_COUNT)))}%`
  return (
    <section id="feedback" className="bg-[#FCFCF9] py-16 lg:py-20">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm">Recommandations</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[40px] leading-none">Ils m’ont fait <span className="font-serif italic font-normal text-[#FF3E1F]">confiance</span></h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label="Précédent" className="w-10 h-10 rounded-full bg-white border border-[#E7E2D9] grid place-items-center hover:bg-[#0C2E3D] hover:text-white hover:border-[#0C2E3D] transition">‹</button>
            <button type="button" onClick={next} aria-label="Suivant" className="w-10 h-10 rounded-full bg-[#0C2E3D] text-white grid place-items-center hover:bg-black transition">›</button>
          </div>
        </div>
        <p className="mt-3 font-display text-sm opacity-60 max-w-[60ch]">Carrousel infini d’origine - 3 par 3 (1 sur mobile) - ralenti et adouci.</p>
      </div>
      <div className="mt-8 overflow-hidden">
        <div onTransitionEnd={onEnd} className={`flex ${anim ? 'transition-transform duration-[560ms] ease-[cubic-bezier(0.32,0.72,0,1)]' : ''}`} style={{ transform: `translateX(${tx})` }}>
          {extended.map((f, i) => (
            <div key={`${f.user}-${i}`} className="shrink-0 w-full md:w-1/3 px-3 box-border">
              <div className="bg-white rounded-[1.6rem] border border-[#E7E2D9] p-6 shadow-[0_8px_24px_rgba(12,46,61,0.06)] h-full flex flex-col">
                <span className="w-8 h-8 rounded-full bg-[#FFF1EB] border border-[#FFD8CC] grid place-items-center font-serif text-lg text-[#FF3E1F]">“</span>
                <p className="mt-3 text-[15px] leading-relaxed flex-1">“{f.description}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={f.profile_picture} alt={f.user} width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-[#E7E2D9]" />
                  <div><div className="font-display font-semibold text-sm leading-none">{f.user}</div><div className="font-display text-[11px] tracking-widest uppercase opacity-50">{f.role}</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- contact - refonte complète, clair & centré --- */
function Contact() {
  return (
    <section id="contact" className="max-w-[1160px] mx-auto px-6 pb-10 pt-6">
      <div className="bg-white rounded-[2rem] border border-[#E7E2D9] shadow-[0_16px_40px_rgba(12,46,61,0.08)] overflow-hidden">
        <div className="p-7 lg:p-10 text-center max-w-[820px] mx-auto">
          <span className="inline-flex bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase">Contact - réponse sous 24h</span>
          <h2 className="mt-4 font-display font-bold tracking-[-0.04em] text-[30px] lg:text-[46px] leading-[0.95]">Un projet en tête ?<br /><span className="font-serif italic font-normal text-[#FF3E1F]">Écrivons la suite.</span></h2>
          <p className="mt-3 text-sm lg:text-[15px] leading-relaxed opacity-60 mx-auto max-w-[56ch]">Nantes & remote - on cadre le besoin, on chiffre au plus juste, on livre propre avec un suivi clair.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="mailto:nicolas.sansd@gmail.com" className="bg-[#0C2E3D] text-white rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-black transition shadow-[0_10px_24px_rgba(12,46,61,0.16)]">nicolas.sansd@gmail.com</a>
            <a href="tel:+33629423783" className="bg-white border border-[#E7E2D9] rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:border-[#0C2E3D]/20 transition shadow-sm">06 29 42 37 83</a>
          </div>
        </div>
        <div className="mx-3 mb-3 bg-[#FCFCF9] rounded-[1.6rem] border border-[#E7E2D9] p-4 lg:p-5">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl border border-[#E7E2D9] p-4 text-center">
              <div className="font-display text-[11px] tracking-widest uppercase opacity-40">Localisation</div>
              <div className="font-display text-sm font-medium mt-1">Nantes & alentours - remote OK</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E7E2D9] p-4 text-center">
              <div className="font-display text-[11px] tracking-widest uppercase opacity-40">Email</div>
              <div className="font-display text-sm font-medium mt-1 break-all">nicolas.sansd@gmail.com</div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E7E2D9] p-4 text-center">
              <div className="font-display text-[11px] tracking-widest uppercase opacity-40">Téléphone</div>
              <div className="font-display text-sm font-medium mt-1">+33 6 29 42 37 83</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <a href="https://linkedin.com/in/nicosans/" target="_blank" rel="noreferrer" className="bg-white border border-[#E7E2D9] rounded-full px-4 py-2.5 flex items-center gap-2 font-display text-xs tracking-widest uppercase hover:border-[#0C2E3D]/20 transition shadow-sm"><img src="/icons/linkedin.png" alt="" width={16} height={16} />LinkedIn</a>
            <a href="https://github.com/frnikho" target="_blank" rel="noreferrer" className="bg-white border border-[#E7E2D9] rounded-full px-4 py-2.5 flex items-center gap-2 font-display text-xs tracking-widest uppercase hover:border-[#0C2E3D]/20 transition shadow-sm"><img src="/github.png" alt="" width={16} height={16} />GitHub</a>
            <a href="https://malt.fr/profile/nicolassans" target="_blank" rel="noreferrer" className="bg-white border border-[#E7E2D9] rounded-full px-4 py-2.5 flex items-center gap-2 font-display text-xs tracking-widest uppercase hover:border-[#0C2E3D]/20 transition shadow-sm"><img src="/malt.png" alt="" width={16} height={16} />Malt</a>
            <span className="hidden sm:inline-flex items-center bg-[#FFF1EB] border border-[#FFD8CC] rounded-full px-4 py-2.5 font-display text-xs tracking-widest uppercase text-[#FF3E1F]">→ chiffrage en 5 lignes • planning + fourchette sous 24h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
