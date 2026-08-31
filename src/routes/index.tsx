import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useDraggable } from 'react-use-draggable-scroll'
import Magnet from '@/components/lib/magnet'
import { useIsMobile } from '@/hooks/use-is-mobile'

export const Route = createFileRoute('/')({ component: RouteComponent })

/* --- data --- */
const services = [
  { n: '01', title: 'Web & Apps', accent: '#FF3E1F', icon: '/icons/computer.png', desc: 'Interfaces propres, perf et accessibilité d’abord.', items: [
    { t: 'Applications', d: 'Interfaces React / Next.js / Tailwind. Architectures modulaires, scalables, orientées clean code et DDD.' },
    { t: 'APIs performantes & sécurisées', d: 'APIs Node.js ou Rust pensées pour scalabilité, sécurité et intégration multi-systèmes.' },
    { t: 'Refonte & optimisation', d: 'Performance, SEO, accessibilité et UX sur sites existants.' },
    { t: 'Fonctionnalités métiers', d: 'Modules spécifiques : tâches, abonnements, budgets, multi-comptes.' },
  ]},
  { n: '02', title: 'Mobile', accent: '#0C2E3D', icon: '/icons/smartphones.png', desc: 'Natif ou cross - une finition qui tient en main.', items: [
    { t: 'Android natif', d: 'Apps optimisées avec intégration complète aux spécificités Android.' },
    { t: 'Cross-platform', d: 'React Native — une base, iOS + Android, expérience fluide.' },
    { t: 'Publication & performance', d: 'Déploiement stores, compatibilité et stabilité au long cours.' },
  ]},
  { n: '03', title: 'DevOps', accent: '#2E7D5A', icon: '/icons/continous.png', desc: 'De la CI au run - tout est observable.', items: [
    { t: 'CI/CD & automatisation', d: 'GitHub Actions / GitLab CI / Jenkins : build, tests, déploiements avec rollback.' },
    { t: 'Containerisation & orchestration', d: 'Docker & Kubernetes : packaging, orchestration multi-services, montée en charge.' },
    { t: 'Monitoring & observabilité', d: 'Prometheus, Grafana, ELK, cloud-monitoring : fiabilité et proactivité.' },
    { t: 'Cloud & IaC', d: 'AWS, Azure, GCP avec Terraform — infra cloud public/privé.' },
  ]},
  { n: '04', title: 'IoT', accent: '#C08A1A', icon: '/icons/iot.png', desc: 'Du capteur au dashboard.', items: [
    { t: 'Prototypage & développement', d: 'Systèmes embarqués Arduino, Raspberry Pi, ESP32.' },
    { t: 'Connectivité & protocoles', d: 'Capteurs, actionneurs, WiFi / Bluetooth / Zigbee.' },
    { t: 'Applications IoT', d: 'Collecte, traitement et visualisation des données temps réel.' },
    { t: 'Sécurité & OTA', d: 'Sécurisation des dispositifs et mises à jour à distance.' },
  ]},
  { n: '05', title: 'Salesforce', accent: '#0176D3', icon: '/salesforce.png', desc: 'L’outil s’adapte au métier, pas l’inverse.', items: [
    { t: 'Développement sur mesure', d: 'Apps internes adaptées à vos besoins spécifiques.' },
    { t: 'Automatisation des workflows', d: 'Flows, Apex et LWC : processus intelligents qui fiabilisent l’exécution.' },
    { t: 'Intégrations tierces', d: 'Connexion Salesforce à vos outils via APIs, ERP et CRM.' },
  ]},
]
const timeline = [
  {
    year: '2025',
    endYear: null,
    start_date: 'Jan. 2026',
    end_date: null,
    duration: '1 an',
    title: 'Développeur Fullstack',
    company: 'Privio',
    type: 'CDI',
    accent: '#FF3E1F',
    bg: '#FFF1EB',
    desc: 'Développement d’applications web modernes avec React, Node.js et PostgreSQL.',
    mastered: [
      { k: 'Frontend', d: 'React, TypeScript, Tailwind CSS' },
      { k: 'Backend', d: 'Node.js, Express, PostgreSQL' },
      { k: 'DevOps', d: 'Docker, CI/CD, déploiement automatisé' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
  },
  {
    year: '2022',
    endYear: '2025',
    start_date: 'Avr. 2022',
    end_date: 'Nov. 2025',
    duration: '3 ans',
    title: 'Consultant Salesforce',
    company: 'Capgemini',
    type: 'CDI',
    accent: '#0176D3',
    bg: '#EFF6FF',
    desc: 'Conception, évolution et maintenance d’apps critiques - automatisation & intégrations inter-systèmes lourds.',
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
    start_date: 'Sep. 2021',
    end_date: 'Juin 2025',
    duration: '4 ans',
    title: 'Fullstack & DevOps',
    company: 'Freelance · Remote',
    type: null,
    accent: '#FF3E1F',
    bg: '#FFF1EB',
    desc: 'De l’idée à la prod - DDD, sécurité, monitoring. Architecture, dev fullstack & bonnes pratiques de bout en bout.',
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
    start_date: 'Août 2020',
    end_date: 'Jan. 2021',
    duration: '6 mois',
    title: 'Admin. Réseau & Systèmes',
    company: 'St-Aubin La Salle · Angers',
    type: 'Campus scolaire · support & infra',
    accent: '#C08A1A',
    bg: '#FFFBEB',
    desc: 'Gestion & maintenance infra campus - support utilisateurs, réseau, sécurité du parc & comptes.',
    mastered: [
      { k: 'Systèmes', d: 'Active Directory, Windows Server, Linux - gestion parc & comptes' },
      { k: 'Réseau', d: 'Cisco, brassage, diagnostic incidents & sécurisation' },
      { k: 'Virtualisation', d: 'Proxmox / VMware - provision & maintien en conditions opérationnelles' },
    ],
    tech: ['Active Directory', 'Windows Server', 'Linux', 'Cisco', 'Proxmox', 'VMware'],
  },
  {
    year: '2019',
    endYear: '2024',
    start_date: 'Sep. 2019',
    end_date: 'Juil. 2024',
    duration: '5 ans',
    title: 'Epitech Nantes',
    company: 'RNCP 35075 · Expert en Tech. de l’Info',
    type: 'Formation par projets · autonomie & agilité',
    accent: '#0C2E3D',
    bg: '#F0FDFA',
    desc: 'Du C au cloud par projets - Linux, Git, Docker/K8s, React/Next. Méthodes agiles & autonomie radicale.',
    mastered: [
      { k: 'Fondamentaux', d: 'C / C++ système, structures, perf & rigueur' },
      { k: 'Web & outillage', d: 'JS/TS, React, PlatformIO, Docker - culture ship' },
      { k: 'Méthodes', d: 'Projets en équipe, code review, agilité & auto-apprentissage' },
    ],
    tech: ['C', 'C++', 'TS', 'Docker', 'K8s', 'React', 'Linux', 'Git'],
  },
  {
    year: '2018',
    endYear: '2018',
    start_date: 'Avr. 2018',
    end_date: 'Mai 2018',
    duration: '2 mois',
    title: 'Technicien Informatique',
    company: 'Camara Education · Dublin',
    type: 'ONG · reconditionnement & déploiement',
    accent: '#2E7D5A',
    bg: '#F0FDF4',
    desc: 'Reconditionnement & distribution d’équipements vers écoles en pays en développement - remise en état & config.',
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
          <span className="flex items-center gap-2"><img src="/android-chrome-192x192.png" alt="" width={18} height={18} className="rounded-full" />© 2025 Nicolas Sans - Nantes - Remote</span>
          <span>Éditorial doux - clarté & arrondi</span>
        </div>
      </footer>
    </div>
  )
}

/* --- nav - îlot flottant épuré --- */
function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { l: 'Services', h: '#services' },
    { l: 'Stack', h: '#stack' },
    { l: 'Parcours', h: '#work' },
    { l: 'Projets', h: '#projects' },
    { l: 'Avis', h: '#feedback' },
  ]
  const scrollTo = (hash: string) => {
    if (hash === '#top') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) window.scrollTo({ top: 0 })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
      history.pushState(null, '', window.location.pathname)
      return
    }
    const el = document.querySelector(hash) as HTMLElement | null
    if (!el) return
    const offset = 84
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      window.scrollTo({ top: y })
      history.pushState(null, '', hash)
      return
    }
    const startY = window.scrollY
    const diff = y - startY
    const duration = Math.min(950, Math.max(550, Math.abs(diff) * 0.52))
    let start: number | null = null
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    // subtle progress on topbar border
    const onFrame = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      window.scrollTo(0, startY + diff * ease(p))
      if (p < 1) requestAnimationFrame(onFrame)
      else {
        history.pushState(null, '', hash)
        el.animate(
          [{ boxShadow: '0 0 0 0 rgba(12,46,61,0)' }, { boxShadow: '0 0 0 8px rgba(12,46,61,0.04)' }, { boxShadow: '0 0 0 0 rgba(12,46,61,0)' }],
          { duration: 700, easing: 'ease-out' }
        )
      }
    }
    requestAnimationFrame(onFrame)
  }
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(hash)
  }
  return (
    <div className="sticky top-0 z-50 px-6 pt-4 sm:pt-5 pointer-events-none">
      <header className="pointer-events-auto max-w-[1160px] mx-auto bg-white/70 backdrop-blur-xl border border-[#0C2E3D]/[0.06] rounded-full shadow-[0_2px_24px_rgba(12,46,61,0.06),0_1px_0_rgba(12,46,61,0.04)] px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-3">
        <a href="#top" onClick={(e) => handleNav(e, '#top')} id="top" className="flex items-center gap-3 pl-2 sm:pl-3 group shrink-0" aria-label="Haut de page">
          <div className="w-7 h-7 rounded-full border border-[#0C2E3D]/12 grid place-items-center font-display text-[10px] font-bold tracking-widest text-[#0C2E3D] group-hover:border-[#0C2E3D]/25 transition-colors">NS</div>
          <span className="font-display font-semibold text-[13px] tracking-[-0.02em] text-[#0C2E3D]">Nicolas Sans</span>
        </a>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Navigation principale">
          {links.map(a => (
            <a key={a.h} href={a.h} onClick={(e) => handleNav(e, a.h)} className="group relative py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase font-medium opacity-40 hover:opacity-100 transition-opacity">
              {a.l}
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0C2E3D] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="hidden lg:inline-flex group items-center gap-2.5 pl-4 pr-1 py-1 rounded-full border border-[#0C2E3D]/10 bg-white/60 hover:bg-white hover:border-[#0C2E3D]/15 transition-colors">
            <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-medium text-[#0C2E3D]">Me contacter</span>
            <span className="w-7 h-7 rounded-full bg-[#0C2E3D] text-white grid place-items-center text-[12px] leading-none group-hover:bg-black transition-colors">→</span>
          </a>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} className="lg:hidden w-8 h-8 rounded-full border border-[#0C2E3D]/10 bg-white/60 grid place-items-center text-[#0C2E3D] hover:bg-white hover:border-[#0C2E3D]/15 transition-colors">
            <span className="relative block w-3.5 h-3">
              <span className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? 'top-[6px] rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 right-0 top-[6px] h-px bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? 'top-[6px] -rotate-45' : 'top-[12px]'}`} />
            </span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.2 }} className="pointer-events-auto lg:hidden max-w-[1160px] mx-auto mt-2 bg-white/90 backdrop-blur-xl border border-[#0C2E3D]/[0.06] rounded-2xl shadow-[0_12px_32px_rgba(12,46,61,0.10)] overflow-hidden">
            <div className="px-2 py-2 flex flex-col">
              {links.map(a => ( <a key={a.h} href={a.h} onClick={(e) => handleNav(e, a.h)} className="px-4 py-3.5 rounded-xl font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:bg-[#F8F7F1] transition-colors">{a.l}</a> ))}
              <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="mt-1 bg-[#0C2E3D] text-white rounded-xl text-center py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors">Me contacter →</a>
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
              <p className="font-display text-[12px] tracking-[0.14em] uppercase opacity-50">Nicolas Sans - Nantes - Remote</p>
              <h1 className="mt-2 font-display tracking-[-0.045em] leading-[0.88] text-[38px] sm:text-[52px] lg:text-[62px]">
                Développeur<br />
                <span className="font-extrabold text-accent">Fullstack</span>
              </h1>
              <div className={'flex flex-col gap-0 mt-3'}>
                <p className={'font-display text-[13px] opacity-60'}>React - Rust - K8s - Salesforce</p>
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
                  <span className="hidden sm:inline font-display text-[9px] tracking-widest uppercase opacity-40">- freelance</span>
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
                <img src="/pp.jpg" alt="Nicolas Sans" className="absolute inset-0 w-full h-full object-cover object-top z-20" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-5 left-5 flex">
                  <span className="bg-white/90 backdrop-blur rounded-full px-3 py-1.5 font-display text-[10px] tracking-widest border border-white shadow z-20">Disponible</span>
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

/* --- services - liste éditoriale, num absolute + panneau riche --- */
function Services() {
  const [open, setOpen] = useState('01')
  return (
    <section id="services" className="max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
      <SectionLabel k="Services" title="Ce que je livre" serif="vraiment" desc="Une liste claire. 5 pôles, livrables concrets - pas de jargon, juste ce qui part en prod." />
      <div className="mt-10 bg-white rounded-[2rem] border border-[#E7E2D9] overflow-hidden shadow-[0_16px_40px_rgba(12,46,61,0.06)]">
        {services.map(s => {
          const isOpen = open === s.n
          return (
            <div key={s.n} className="border-b last:border-0 border-[#E7E2D9]/60">
              <button type="button" onClick={() => setOpen(isOpen ? '' : s.n)} className="w-full flex items-center gap-4 lg:gap-5 p-5 lg:p-7 text-left hover:bg-[#FCFCF9]/60 transition group">
                {/* logo + numéro absolute */}
                <span className="relative w-14 h-14 rounded-2xl bg-[#FCFCF9] border border-[#E7E2D9] grid place-items-center shrink-0">
                  <img src={s.icon} alt="" width={26} height={26} className="object-contain" />
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full grid place-items-center font-mono text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-2 border-white" style={{ background: s.accent }}>{s.n}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-[17px] leading-tight">{s.title}</h3>
                  <p className="font-display text-sm leading-relaxed opacity-60 mt-1 max-w-[52ch]">{s.desc}</p>
                </div>
                <span className={`w-9 h-9 rounded-full grid place-items-center border text-sm shrink-0 transition ${isOpen ? 'bg-[#0C2E3D] text-white border-[#0C2E3D]' : 'bg-white border-[#E7E2D9] text-[#0C2E3D] group-hover:border-[#0C2E3D]/15'}`}>
                  <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>{isOpen ? '×' : '+'}</span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }} className="overflow-hidden">
                    <div className="px-5 lg:px-7 pb-7">
                      <div className="pt-5 border-t border-dashed border-[#E7E2D9]/70">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {s.items.map(it => (
                            <div key={it.t} className="relative rounded-2xl bg-[#FCFCF9] border border-[#E7E2D9]/55 p-4 flex flex-col gap-2 hover:bg-white hover:border-[#E7E2D9] hover:shadow-[0_4px_16px_rgba(12,46,61,0.06)] transition">
                              <div className="flex items-start justify-between gap-3">
                                <h4 className="font-display text-[13.5px] font-semibold leading-tight pr-2">{it.t}</h4>
                                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: s.accent }} />
                              </div>
                              <p className="font-display text-[12.5px] leading-relaxed opacity-60">{it.d}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
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
          <span className="self-start lg:self-auto bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-3 py-1.5 font-display text-[11px] tracking-widest uppercase opacity-60">16 techs - favoris ★ - survole</span>
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

/* --- parcours - timeline design (dates mises en avant) --- */
function Work() {
  return (
    <section id="work" className="relative bg-[#F8F7F1] border-y border-[#E7E2D9]/60 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      <div className="pointer-events-none absolute -top-28 -right-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-[0.10]" />
      <div className="relative max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#FF3E1F]" /> Parcours - 2018 → aujourd’hui</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.04em] text-[34px] lg:text-[46px] leading-[0.9]">Timeline <span className="font-serif italic font-normal text-[#FF3E1F]">vivante</span></h2>
            <p className="mt-3 text-[15px] leading-relaxed opacity-60">abcdef</p>
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
                {/* date colonne desktop - typographie forte */}
                <div className="hidden lg:block text-right pr-6 pt-2">
                  <div className="font-extrabold text-accent text-[38px]" style={{ color: t.accent }}>{t.year}</div>
                  <div className="font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight">{t.end_date}</div>
                  <div className="font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight">{t.start_date}</div>
                  {t.duration && (
                    <span className="inline-flex mt-2 bg-white border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm">{t.duration}</span>
                  )}
                </div>
                {/* spine dot */}
                <div className="hidden lg:flex justify-center pt-7">
                  <span className="w-[18px] h-[18px] rounded-full bg-white border-2 grid place-items-center shadow-sm" style={{ borderColor: t.accent }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: t.accent }} />
                  </span>
                </div>
                {/* mobile spine */}
                <span className="lg:hidden absolute left-0 top-7 w-[15px] h-[15px] rounded-full bg-white border-2 grid place-items-center shadow-sm" style={{ borderColor: t.accent }} aria-hidden="true">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
                </span>
                {/* carte */}
                <div className="pl-8 lg:pl-0">
                  {/* date mobile - compacte mais lisible */}
                  <div className="lg:hidden flex flex-wrap items-baseline gap-2 mb-2.5">
                    <span className="italic text-[22px]" style={{ color: t.accent }}>{t.year}</span>
                    <span className="font-mono text-[11px] tracking-wide opacity-60">{t.start_date} · {t.end_date}</span>
                  </div>
                  <div className="group relative bg-white rounded-[1.7rem] border border-[#E7E2D9] overflow-hidden hover:shadow-[0_12px_32px_rgba(12,46,61,0.08)] hover:border-[#0C2E3D]/10 transition">
                    <div className="p-6">
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

/* --- projets - bullets plus graphiques --- */
function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { events } = useDraggable(ref as unknown as React.RefObject<HTMLElement>)
  return (
    <section id="projects" className="bg-[#F8F7F1] border-y border-[#E7E2D9]/60">
      <div className="max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase font-medium shadow-sm">Projets</span>
            <h2 className="mt-3 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[40px] leading-none">Sélection <span className="font-serif italic font-normal">- 4 réalisations</span></h2>
          </div>
          <a href="https://github.com/frnikho" target="_blank" rel="noreferrer" className="self-start lg:self-auto group inline-flex items-center gap-2 bg-white border border-line rounded-full pl-3 pr-1 py-1 shadow-sm transition-colors">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity">Voir tout sur GitHub</span>
            <span className="w-7 h-7 rounded-full bg-[#0C2E3D] grid place-items-center group-hover:bg-black transition-colors">
              <img src="/github-mark-white.svg" alt="" width={14} height={14} />
            </span>
          </a>
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-5 mt-8">
          {projects.map(p => (
            <a key={p.title} href={p.href} target={p.href ? '_blank' : undefined} rel={p.href ? 'noreferrer' : undefined} className="group bg-white rounded-[1.8rem] border border-[#E7E2D9] overflow-hidden shadow-[0_8px_24px_rgba(12,46,61,0.06)] hover:shadow-[0_16px_32px_rgba(12,46,61,0.10)] transition p-2">
              <div className="rounded-[1.3rem] overflow-hidden aspect-16/10 bg-[#FCFCF9] border border-[#E7E2D9]/40"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" /></div>
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-semibold">{p.title}</h3>
                  <span className="inline-flex items-center gap-1.5 bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C2E3D] opacity-60" />{p.stack.join(' - ')}
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
              <div className="rounded-[1.3rem] overflow-hidden aspect-16/10 bg-[#FCFCF9]"><img src={p.img} alt={p.title} className="w-full h-full object-cover" /></div>
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
        <p className="mt-3 font-display text-sm opacity-60 max-w-[60ch]">Découvrez ce que les clients disent de mon travail.</p>
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

/* --- contact - essentiel + modale log --- */
function Contact() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), at: new Date().toISOString() }
    console.log('[contact]', payload)
    setSent(true)
    setTimeout(() => { setSent(false); setOpen(false); setForm({ name: '', email: '', message: '' }) }, 1400)
  }
  return (
    <>
      <section id="contact" className="max-w-[1160px] mx-auto px-6 py-16 lg:py-20">
        <div className="max-w-[720px] mx-auto text-center">
          <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase font-medium shadow-sm">Contact</span>
          <h2 className="mt-4 font-display font-bold tracking-[-0.04em] text-[32px] lg:text-[48px] leading-[0.92]">Un projet en tête ?<br /><span className="font-serif italic font-normal text-[#FF3E1F]">Écrivons la suite.</span></h2>
          <p className="mt-4 text-[15px] leading-relaxed opacity-60">Nantes & remote, réponse sous 24h</p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} className="group inline-flex items-center gap-2 bg-[#0C2E3D] text-white rounded-full pl-6 pr-1.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors shadow-[0_8px_24px_rgba(12,46,61,0.16)]">
              <span>Échanger sur votre projet</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#0C2E3D] grid place-items-center group-hover:bg-[#F8F7F1] transition-colors">→</span>
            </button>
            <a href="mailto:nicolas.sansd@gmail.com" className="font-mono text-[11px] tracking-[0.08em] opacity-40 hover:opacity-100 transition-opacity">ou nicolas.sansd@gmail.com</a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <a href="https://linkedin.com/in/nicosans/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-white border border-[#E7E2D9] rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-[#0C2E3D]/15 transition shadow-sm"><img src="/icons/linkedin.png" alt="" width={14} height={14} />LinkedIn</a>
            <a href="https://github.com/frnikho" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-white border border-[#E7E2D9] rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-[#0C2E3D]/15 transition shadow-sm"><img src="/github.png" alt="" width={14} height={14} />GitHub</a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[80] bg-[#0C2E3D]/40 backdrop-blur-sm" aria-hidden="true" />
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }} className="fixed inset-0 z-[81] grid place-items-center p-4 pointer-events-none">
              <div className="pointer-events-auto w-full max-w-[520px] bg-white rounded-[1.8rem] border border-[#E7E2D9] shadow-[0_24px_64px_rgba(12,46,61,0.18)] overflow-hidden">
                <div className="px-6 sm:px-8 pt-7 pb-4 flex items-start justify-between gap-4 border-b border-[#E7E2D9]/60">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase font-medium opacity-40">Contact</p>
                    <h3 className="mt-1 font-display font-bold tracking-[-0.02em] text-[20px] leading-none">Parlons de votre projet</h3>
                    <p className="mt-1.5 font-display text-sm opacity-60">Réponse sous 24h - ou écrivez direct à nicolas.sansd@gmail.com</p>
                  </div>
                  <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="w-8 h-8 rounded-full border border-[#E7E2D9] grid place-items-center hover:bg-[#F8F7F1] transition">✕</button>
                </div>
                <form onSubmit={onSubmit} className="px-6 sm:px-8 py-6 flex flex-col gap-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50">Nom</span>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Votre nom" className="w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50">Email</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.com" className="w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40" />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50">Message</span>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Contexte, objectifs, budget / timing..." className="w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40 resize-none" />
                  </label>
                  <button type="submit" disabled={sent} className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium transition-colors ${sent ? 'bg-[#2E7D5A] text-white' : 'bg-[#0C2E3D] text-white hover:bg-black'}`}>
                    {sent ? '✓ Envoyé - check console' : 'Envoyer →'}
                  </button>
                  <p className="text-center font-mono text-[10px] tracking-[0.06em] opacity-35">Envoi loggé en console - branchez votre API plus tard</p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
