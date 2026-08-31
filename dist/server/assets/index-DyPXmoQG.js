import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDraggable } from "react-use-draggable-scroll";
const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);
  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }
    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);
      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);
  const transitionStyle = isActive ? activeTransition : inactiveTransition;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: magnetRef,
      className: wrapperClassName,
      style: { position: "relative", display: "inline-block" },
      ...props,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: innerClassName,
          style: {
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: transitionStyle,
            willChange: "transform"
          },
          children
        }
      )
    }
  );
};
function useIsMobile(breakpoint = "(max-width: 1024px)") {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);
  return isMobile;
}
const services = [{
  n: "01",
  title: "Web & Apps",
  accent: "#FF3E1F",
  icon: "/icons/computer.png",
  desc: "Interfaces propres, perf et accessibilité d’abord.",
  items: [{
    t: "Applications",
    d: "Interfaces React / Next.js / Tailwind. Architectures modulaires, scalables, orientées clean code et DDD."
  }, {
    t: "APIs performantes & sécurisées",
    d: "APIs Node.js ou Rust pensées pour scalabilité, sécurité et intégration multi-systèmes."
  }, {
    t: "Refonte & optimisation",
    d: "Performance, SEO, accessibilité et UX sur sites existants."
  }, {
    t: "Fonctionnalités métiers",
    d: "Modules spécifiques : tâches, abonnements, budgets, multi-comptes."
  }]
}, {
  n: "02",
  title: "Mobile",
  accent: "#0C2E3D",
  icon: "/icons/smartphones.png",
  desc: "Natif ou cross - une finition qui tient en main.",
  items: [{
    t: "Android natif",
    d: "Apps optimisées avec intégration complète aux spécificités Android."
  }, {
    t: "Cross-platform",
    d: "React Native — une base, iOS + Android, expérience fluide."
  }, {
    t: "Publication & performance",
    d: "Déploiement stores, compatibilité et stabilité au long cours."
  }]
}, {
  n: "03",
  title: "DevOps",
  accent: "#2E7D5A",
  icon: "/icons/continous.png",
  desc: "De la CI au run - tout est observable.",
  items: [{
    t: "CI/CD & automatisation",
    d: "GitHub Actions / GitLab CI / Jenkins : build, tests, déploiements avec rollback."
  }, {
    t: "Containerisation & orchestration",
    d: "Docker & Kubernetes : packaging, orchestration multi-services, montée en charge."
  }, {
    t: "Monitoring & observabilité",
    d: "Prometheus, Grafana, ELK, cloud-monitoring : fiabilité et proactivité."
  }, {
    t: "Cloud & IaC",
    d: "AWS, Azure, GCP avec Terraform — infra cloud public/privé."
  }]
}, {
  n: "04",
  title: "IoT",
  accent: "#C08A1A",
  icon: "/icons/iot.png",
  desc: "Du capteur au dashboard.",
  items: [{
    t: "Prototypage & développement",
    d: "Systèmes embarqués Arduino, Raspberry Pi, ESP32."
  }, {
    t: "Connectivité & protocoles",
    d: "Capteurs, actionneurs, WiFi / Bluetooth / Zigbee."
  }, {
    t: "Applications IoT",
    d: "Collecte, traitement et visualisation des données temps réel."
  }, {
    t: "Sécurité & OTA",
    d: "Sécurisation des dispositifs et mises à jour à distance."
  }]
}, {
  n: "05",
  title: "Salesforce",
  accent: "#0176D3",
  icon: "/salesforce.png",
  desc: "L’outil s’adapte au métier, pas l’inverse.",
  items: [{
    t: "Développement sur mesure",
    d: "Apps internes adaptées à vos besoins spécifiques."
  }, {
    t: "Automatisation des workflows",
    d: "Flows, Apex et LWC : processus intelligents qui fiabilisent l’exécution."
  }, {
    t: "Intégrations tierces",
    d: "Connexion Salesforce à vos outils via APIs, ERP et CRM."
  }]
}];
const timeline = [{
  year: "2025",
  endYear: null,
  start_date: "Jan. 2026",
  end_date: null,
  duration: "1 an",
  title: "Développeur Fullstack",
  company: "Privio",
  type: "CDI",
  accent: "#FF3E1F",
  bg: "#FFF1EB",
  desc: "Développement d’applications web modernes avec React, Node.js et PostgreSQL.",
  mastered: [{
    k: "Frontend",
    d: "React, TypeScript, Tailwind CSS"
  }, {
    k: "Backend",
    d: "Node.js, Express, PostgreSQL"
  }, {
    k: "DevOps",
    d: "Docker, CI/CD, déploiement automatisé"
  }],
  tech: ["React", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"]
}, {
  year: "2022",
  endYear: "2025",
  start_date: "Avr. 2022",
  end_date: "Nov. 2025",
  duration: "3 ans",
  title: "Consultant Salesforce",
  company: "Capgemini",
  type: "CDI",
  accent: "#0176D3",
  bg: "#EFF6FF",
  desc: "Conception, évolution et maintenance d’apps critiques - automatisation & intégrations inter-systèmes lourds.",
  mastered: [{
    k: "Apex / LWC",
    d: "Composants & logique métier Salesforce, Visualforce & Flow"
  }, {
    k: "Intégrations",
    d: "REST / SOAP, API externes & services tiers robustes"
  }, {
    k: "Qualité & delivery",
    d: "CI/CD, code review, TU à forte couverture, tests en pré-prod"
  }],
  tech: ["Salesforce Apex", "LWC", "Flow", "REST / SOAP", "CI/CD", "Agile"]
}, {
  year: "2021",
  endYear: "2025",
  start_date: "Sep. 2021",
  end_date: "Juin 2025",
  duration: "4 ans",
  title: "Fullstack & DevOps",
  company: "Freelance · Remote",
  type: null,
  accent: "#FF3E1F",
  bg: "#FFF1EB",
  desc: "De l’idée à la prod - DDD, sécurité, monitoring. Architecture, dev fullstack & bonnes pratiques de bout en bout.",
  mastered: [{
    k: "Architecture",
    d: "DDD / SOLID, design system, APIs REST documentées (OpenAPI)"
  }, {
    k: "Fullstack",
    d: "React / Next.js / NestJS / ElysiaJS · TypeScript · Bun/Node"
  }, {
    k: "Infra & observabilité",
    d: "Docker · K8s · Terraform · GH Actions · Grafana / Loki / Tempo"
  }],
  tech: ["React", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker", "K8s", "Terraform", "Stripe"]
}, {
  year: "2020",
  endYear: "2021",
  start_date: "Août 2020",
  end_date: "Jan. 2021",
  duration: "6 mois",
  title: "Admin. Réseau & Systèmes",
  company: "St-Aubin La Salle · Angers",
  type: "Campus scolaire · support & infra",
  accent: "#C08A1A",
  bg: "#FFFBEB",
  desc: "Gestion & maintenance infra campus - support utilisateurs, réseau, sécurité du parc & comptes.",
  mastered: [{
    k: "Systèmes",
    d: "Active Directory, Windows Server, Linux - gestion parc & comptes"
  }, {
    k: "Réseau",
    d: "Cisco, brassage, diagnostic incidents & sécurisation"
  }, {
    k: "Virtualisation",
    d: "Proxmox / VMware - provision & maintien en conditions opérationnelles"
  }],
  tech: ["Active Directory", "Windows Server", "Linux", "Cisco", "Proxmox", "VMware"]
}, {
  year: "2019",
  endYear: "2024",
  start_date: "Sep. 2019",
  end_date: "Juil. 2024",
  duration: "5 ans",
  title: "Epitech Nantes",
  company: "RNCP 35075 · Expert en Tech. de l’Info",
  type: "Formation par projets · autonomie & agilité",
  accent: "#0C2E3D",
  bg: "#F0FDFA",
  desc: "Du C au cloud par projets - Linux, Git, Docker/K8s, React/Next. Méthodes agiles & autonomie radicale.",
  mastered: [{
    k: "Fondamentaux",
    d: "C / C++ système, structures, perf & rigueur"
  }, {
    k: "Web & outillage",
    d: "JS/TS, React, PlatformIO, Docker - culture ship"
  }, {
    k: "Méthodes",
    d: "Projets en équipe, code review, agilité & auto-apprentissage"
  }],
  tech: ["C", "C++", "TS", "Docker", "K8s", "React", "Linux", "Git"]
}, {
  year: "2018",
  endYear: "2018",
  start_date: "Avr. 2018",
  end_date: "Mai 2018",
  duration: "2 mois",
  title: "Technicien Informatique",
  company: "Camara Education · Dublin",
  type: "ONG · reconditionnement & déploiement",
  accent: "#2E7D5A",
  bg: "#F0FDF4",
  desc: "Reconditionnement & distribution d’équipements vers écoles en pays en développement - remise en état & config.",
  mastered: [{
    k: "Hardware",
    d: "Montage PC, diagnostic matériel & remise en état complète"
  }, {
    k: "Systèmes & réseau",
    d: "Installation OS, config réseau & préparation au déploiement"
  }, {
    k: "Sens terrain",
    d: "Chaîne logistique matérielle, exigences écoles partenaires"
  }],
  tech: ["Montage PC", "Installation OS", "Config Réseau", "Diagnostic"]
}];
const projects = [{
  title: "Everyloc",
  desc: "Plateforme de location événementielle - Angers & alentours. Next.js + Docker.",
  img: "/projects/everyloc.png",
  href: "https://www.angers-location.fr",
  stack: ["Next.js", "Docker"]
}, {
  title: "Trip Planner",
  desc: "Planification de voyages - UX dense, perf soignée.",
  img: "/projects/trip_planner.png",
  stack: ["React", "NestJS"]
}, {
  title: "FBX CLI",
  desc: "CLI Freebox en Rust - automatisation box, DX radicale.",
  img: "/projects/fbx-cli.png",
  stack: ["Rust", "CLI"]
}, {
  title: "PLD Lab",
  desc: "Laboratoire design & perfs - expe Motion & OGL.",
  img: "/projects/pld_1.png",
  stack: ["Motion", "OGL"]
}];
const feedbacks = [{
  user: "Theo F",
  role: "Fullstack Developer",
  profile_picture: "/users/tf.jpeg",
  description: "Travailleur, polyvalent - Nicolas ne vous décevra pas. Excellent élément."
}, {
  user: "Pierre D",
  role: "Co-founder Everyloc",
  profile_picture: "/users/pd.jpeg",
  description: "Irréprochable, soigné, orienté utilisateur. Notre site est plus clair et plus attractif depuis son passage."
}, {
  user: "Victor S",
  role: "Fullstack Developer",
  profile_picture: "/users/vs.jpeg",
  description: "Rigoureux et très talentueux. Un plaisir de travailler avec lui."
}, {
  user: "Antoine H",
  role: "Co-founder Everyloc",
  profile_picture: "/users/ah.jpeg",
  description: "Attentif, flexible - même en last minute. Qualité reflète son sérieux."
}, {
  user: "Denis S",
  role: "Designer",
  profile_picture: "/users/ds.jpg",
  description: "Sens du besoin client, technique maîtrisée - livrables robustes et sans accros."
}];
const skillsData = {
  typescript: {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    color: "blue"
  },
  react: {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "blue"
  },
  rust: {
    name: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
    color: "blue"
  },
  docker: {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    color: "blue"
  },
  postgresql: {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "blue"
  },
  elysiajs: {
    name: "ElysiaJS",
    icon: "https://avatars.githubusercontent.com/u/119793569?s=200&v=4",
    color: "blue"
  },
  nestjs: {
    name: "NestJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    color: "red"
  },
  tailwind: {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "blue"
  },
  kubernetes: {
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    color: "blue"
  },
  terraform: {
    name: "Terraform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
    color: "blue"
  },
  redis: {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    color: "red"
  },
  nextjs: {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "black"
  },
  bun: {
    name: "Bun",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg",
    color: "yellow"
  },
  prisma: {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    color: "blue"
  },
  nodejs: {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    color: "green"
  },
  grafana: {
    name: "Grafana",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
    color: "orange"
  }
};
function GridPaper({
  children
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({
    x: -1e3,
    y: -1e3,
    tx: -1e3,
    ty: -1e3,
    active: false
  });
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: true
    });
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setSize = () => {
      const {
        width,
        height
      } = container.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      mouse.current.tx = e.clientX - r.left;
      mouse.current.ty = e.clientY - r.top;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    const onTouchMove = (e) => {
      const r = container.getBoundingClientRect();
      const t = e.touches[0];
      if (!t) return;
      mouse.current.tx = t.clientX - r.left;
      mouse.current.ty = t.clientY - r.top;
      mouse.current.active = true;
    };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchmove", onTouchMove, {
      passive: true
    });
    container.addEventListener("touchend", onLeave);
    const draw = () => {
      const {
        width,
        height
      } = container.getBoundingClientRect();
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.14;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.14;
      if (!mouse.current.active) {
        mouse.current.x += (-1e3 - mouse.current.x) * 0.04;
        mouse.current.y += (-1e3 - mouse.current.y) * 0.04;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(12,46,61,0.07)";
      ctx.lineWidth = 1;
      const grid = 32;
      const radius = 190;
      const strength = 18;
      for (let x = 0; x <= width; x += grid) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 5) {
          let ox = 0;
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const f = Math.pow(1 - dist / radius, 1.8);
            ox = -(dx / (dist || 1)) * strength * f * Math.cos(dist * 0.025);
          }
          const nx = x + ox;
          if (y === 0) ctx.moveTo(nx, y);
          else ctx.lineTo(nx, y);
        }
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += grid) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          let oy = 0;
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const f = Math.pow(1 - dist / radius, 1.8);
            oy = -(dy / (dist || 1)) * strength * f * Math.cos(dist * 0.025);
          }
          const ny = y + oy;
          if (x === 0) ctx.moveTo(x, ny);
          else ctx.lineTo(x, ny);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onLeave);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative overflow-hidden border-b border-[#E7E2D9]/60 bg-[#FCFCF9]", children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "absolute inset-0 pointer-events-none", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#FCFCF9] text-[#0C2E3D] selection:bg-[#FF3E1F] selection:text-white antialiased", children: [
    /* @__PURE__ */ jsxs(GridPaper, { children: [
      /* @__PURE__ */ jsx(Nav, {}),
      /* @__PURE__ */ jsx(Hero, {})
    ] }),
    /* @__PURE__ */ jsx(Services, {}),
    /* @__PURE__ */ jsx(StackMagnetic, {}),
    /* @__PURE__ */ jsx(Work, {}),
    /* @__PURE__ */ jsx(Projects, {}),
    /* @__PURE__ */ jsx(FeedbackInfinite, {}),
    /* @__PURE__ */ jsx(Contact, {}),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-[#E7E2D9]/60 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1160px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-3 font-display text-[11px] tracking-widest uppercase opacity-40", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: "/android-chrome-192x192.png", alt: "", width: 18, height: 18, className: "rounded-full" }),
        "© 2025 Nicolas Sans - Nantes - Remote"
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Éditorial doux - clarté & arrondi" })
    ] }) })
  ] });
}
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [{
    l: "Services",
    h: "#services"
  }, {
    l: "Stack",
    h: "#stack"
  }, {
    l: "Parcours",
    h: "#work"
  }, {
    l: "Projets",
    h: "#projects"
  }, {
    l: "Avis",
    h: "#feedback"
  }];
  const scrollTo = (hash) => {
    if (hash === "#top") {
      const prefersReduced2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced2) window.scrollTo({
        top: 0
      });
      else window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      history.pushState(null, "", window.location.pathname);
      return;
    }
    const el = document.querySelector(hash);
    if (!el) return;
    const offset = 84;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo({
        top: y
      });
      history.pushState(null, "", hash);
      return;
    }
    const startY = window.scrollY;
    const diff = y - startY;
    const duration = Math.min(950, Math.max(550, Math.abs(diff) * 0.52));
    let start = null;
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const onFrame = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      window.scrollTo(0, startY + diff * ease(p));
      if (p < 1) requestAnimationFrame(onFrame);
      else {
        history.pushState(null, "", hash);
        el.animate([{
          boxShadow: "0 0 0 0 rgba(12,46,61,0)"
        }, {
          boxShadow: "0 0 0 8px rgba(12,46,61,0.04)"
        }, {
          boxShadow: "0 0 0 0 rgba(12,46,61,0)"
        }], {
          duration: 700,
          easing: "ease-out"
        });
      }
    };
    requestAnimationFrame(onFrame);
  };
  const handleNav = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(hash);
  };
  return /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-50 px-6 pt-4 sm:pt-5 pointer-events-none", children: [
    /* @__PURE__ */ jsxs("header", { className: "pointer-events-auto max-w-[1160px] mx-auto bg-white/70 backdrop-blur-xl border border-[#0C2E3D]/[0.06] rounded-full shadow-[0_2px_24px_rgba(12,46,61,0.06),0_1px_0_rgba(12,46,61,0.04)] px-1.5 py-1.5 sm:px-2 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("a", { href: "#top", onClick: (e) => handleNav(e, "#top"), id: "top", className: "flex items-center gap-3 pl-2 sm:pl-3 group shrink-0", "aria-label": "Haut de page", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full border border-[#0C2E3D]/12 grid place-items-center font-display text-[10px] font-bold tracking-widest text-[#0C2E3D] group-hover:border-[#0C2E3D]/25 transition-colors", children: "NS" }),
        /* @__PURE__ */ jsx("span", { className: "font-display font-semibold text-[13px] tracking-[-0.02em] text-[#0C2E3D]", children: "Nicolas Sans" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-5 xl:gap-6", "aria-label": "Navigation principale", children: links.map((a) => /* @__PURE__ */ jsxs("a", { href: a.h, onClick: (e) => handleNav(e, a.h), className: "group relative py-2 font-mono text-[10.5px] tracking-[0.16em] uppercase font-medium opacity-40 hover:opacity-100 transition-opacity", children: [
        a.l,
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0C2E3D] transition-transform duration-300 group-hover:scale-x-100" })
      ] }, a.h)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxs("a", { href: "#contact", onClick: (e) => handleNav(e, "#contact"), className: "hidden lg:inline-flex group items-center gap-2.5 pl-4 pr-1 py-1 rounded-full border border-[#0C2E3D]/10 bg-white/60 hover:bg-white hover:border-[#0C2E3D]/15 transition-colors", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10.5px] tracking-[0.16em] uppercase font-medium text-[#0C2E3D]", children: "Me contacter" }),
          /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-full bg-[#0C2E3D] text-white grid place-items-center text-[12px] leading-none group-hover:bg-black transition-colors", children: "→" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setOpen(!open), "aria-expanded": open, "aria-label": open ? "Fermer le menu" : "Ouvrir le menu", className: "lg:hidden w-8 h-8 rounded-full border border-[#0C2E3D]/10 bg-white/60 grid place-items-center text-[#0C2E3D] hover:bg-white hover:border-[#0C2E3D]/15 transition-colors", children: /* @__PURE__ */ jsxs("span", { className: "relative block w-3.5 h-3", children: [
          /* @__PURE__ */ jsx("span", { className: `absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? "top-[6px] rotate-45" : "top-0"}` }),
          /* @__PURE__ */ jsx("span", { className: `absolute left-0 right-0 top-[6px] h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}` }),
          /* @__PURE__ */ jsx("span", { className: `absolute left-0 right-0 h-px bg-current transition-all duration-300 ${open ? "top-[6px] -rotate-45" : "top-[12px]"}` })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0,
      y: -8,
      scale: 0.98
    }, animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }, exit: {
      opacity: 0,
      y: -8,
      scale: 0.98
    }, transition: {
      duration: 0.2
    }, className: "pointer-events-auto lg:hidden max-w-[1160px] mx-auto mt-2 bg-white/90 backdrop-blur-xl border border-[#0C2E3D]/[0.06] rounded-2xl shadow-[0_12px_32px_rgba(12,46,61,0.10)] overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "px-2 py-2 flex flex-col", children: [
      links.map((a) => /* @__PURE__ */ jsx("a", { href: a.h, onClick: (e) => handleNav(e, a.h), className: "px-4 py-3.5 rounded-xl font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:bg-[#F8F7F1] transition-colors", children: a.l }, a.h)),
      /* @__PURE__ */ jsx("a", { href: "#contact", onClick: (e) => handleNav(e, "#contact"), className: "mt-1 bg-[#0C2E3D] text-white rounded-xl text-center py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors", children: "Me contacter →" })
    ] }) }) })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxs("section", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-28 -left-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-25" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-12 -right-32 w-[580px] h-[580px] bg-[#DDE7FF] rounded-full blur-[90px] opacity-20" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1160px] mx-auto px-6 pt-10 lg:pt-14 relative", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-end", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, className: "flex flex-col gap-6 lg:pr-4 pb-10 lg:pb-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-[12px] tracking-[0.14em] uppercase opacity-50", children: "Nicolas Sans - Nantes - Remote" }),
          /* @__PURE__ */ jsxs("h1", { className: "mt-2 font-display tracking-[-0.045em] leading-[0.88] text-[38px] sm:text-[52px] lg:text-[62px]", children: [
            "Développeur",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "font-extrabold text-accent", children: "Fullstack" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0 mt-3", children: /* @__PURE__ */ jsx("p", { className: "font-display text-[13px] opacity-60", children: "React - Rust - K8s - Salesforce" }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "max-w-[54ch] text-[16px] leading-[1.7] opacity-70", children: [
          "J’accompagne startups et équipes produit - interfaces soignées, APIs robustes, infra qui tient la charge.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#0C2E3D] font-medium", children: "Propre, rapide, documenté. On cadre, on chiffre, on livre." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 pt-1", children: [
          /* @__PURE__ */ jsx("a", { href: "#contact", className: "bg-[#0C2E3D] text-white rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-black transition shadow-[0_10px_24px_rgba(12,46,61,0.16)]", children: "Démarrer un projet →" }),
          /* @__PURE__ */ jsx("a", { href: "#projects", className: "bg-white border border-[#0C2E3D]/15 rounded-full px-7 py-3.5 font-display text-xs tracking-widest uppercase hover:bg-white transition shadow-sm", children: "Voir les projets" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 bg-white rounded-full border border-[#E7E2D9] p-1 flex items-center gap-1 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-2 gap-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-full bg-[#FCFCF9] border border-[#E7E2D9]/50 px-2.5 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-[#0C2E3D] text-white grid place-items-center font-display text-[11px] font-bold shrink-0", children: "5+" }),
              /* @__PURE__ */ jsx("span", { className: "font-display text-[11px] font-medium leading-none", children: "ans d’exp." }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline font-display text-[9px] tracking-widest uppercase opacity-40", children: "- freelance" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-full bg-white border border-[#E7E2D9] px-3 py-1.5 flex items-center justify-center gap-1.5 shadow-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-display text-[11px] font-bold tracking-[0.08em] leading-none", children: "RNCP 35075" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline font-display text-[9px] tracking-widest uppercase opacity-40", children: "certifié" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-1.5 bg-[#0C2E3D] text-white rounded-full pl-1 pr-2.5 py-1 shrink-0", children: [
            /* @__PURE__ */ jsx("img", { src: "/pd1.png", alt: "", className: "w-5 h-5 rounded-full bg-white p-0.5 object-contain" }),
            /* @__PURE__ */ jsx("span", { className: "font-display text-[9px] tracking-widest uppercase leading-none", children: "Platform Dev I" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6,
        delay: 0.08
      }, className: "relative self-end flex flex-col w-full", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-t-[2.2rem] rounded-b-none border border-b-0 border-line shadow-[0_24px_64px_rgba(12,46,61,0.10)] overflow-hidden flex flex-col z-10", children: /* @__PURE__ */ jsxs("div", { className: "relative bg-[#EDE9E2] aspect-[4/4.85] overflow-hidden rounded-t-[2.2rem]", children: [
        /* @__PURE__ */ jsx("img", { src: "/pp.jpg", alt: "Nicolas Sans", className: "absolute inset-0 w-full h-full object-cover object-top z-20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.04]", style: {
          backgroundImage: "linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        } }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-5 left-5 flex", children: /* @__PURE__ */ jsx("span", { className: "bg-white/90 backdrop-blur rounded-full px-3 py-1.5 font-display text-[10px] tracking-widest border border-white shadow z-20", children: "Disponible" }) })
      ] }) }) })
    ] }) })
  ] });
}
function SectionLabel({
  k,
  title,
  serif,
  desc
}) {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-[720px] mx-auto text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm", children: k }),
    /* @__PURE__ */ jsxs("h2", { className: "mt-4 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[44px] leading-none", children: [
      title,
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-[#FF3E1F]", children: serif })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed opacity-60 max-w-[60ch] mx-auto", children: desc })
  ] });
}
function Services() {
  const [open, setOpen] = useState("01");
  return /* @__PURE__ */ jsxs("section", { id: "services", className: "max-w-[1160px] mx-auto px-6 py-16 lg:py-20", children: [
    /* @__PURE__ */ jsx(SectionLabel, { k: "Services", title: "Ce que je livre", serif: "vraiment", desc: "Une liste claire. 5 pôles, livrables concrets - pas de jargon, juste ce qui part en prod." }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 bg-white rounded-[2rem] border border-[#E7E2D9] overflow-hidden shadow-[0_16px_40px_rgba(12,46,61,0.06)]", children: services.map((s) => {
      const isOpen = open === s.n;
      return /* @__PURE__ */ jsxs("div", { className: "border-b last:border-0 border-[#E7E2D9]/60", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setOpen(isOpen ? "" : s.n), className: "w-full flex items-center gap-4 lg:gap-5 p-5 lg:p-7 text-left hover:bg-[#FCFCF9]/60 transition group", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative w-14 h-14 rounded-2xl bg-[#FCFCF9] border border-[#E7E2D9] grid place-items-center shrink-0", children: [
            /* @__PURE__ */ jsx("img", { src: s.icon, alt: "", width: 26, height: 26, className: "object-contain" }),
            /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -left-2 w-6 h-6 rounded-full grid place-items-center font-mono text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-2 border-white", style: {
              background: s.accent
            }, children: s.n })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-[17px] leading-tight", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "font-display text-sm leading-relaxed opacity-60 mt-1 max-w-[52ch]", children: s.desc })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "hidden lg:block font-mono text-[11px] tracking-[0.12em] uppercase opacity-40 mr-1", children: [
            s.items.length,
            " livrables"
          ] }),
          /* @__PURE__ */ jsx("span", { className: `w-9 h-9 rounded-full grid place-items-center border text-sm shrink-0 transition ${isOpen ? "bg-[#0C2E3D] text-white border-[#0C2E3D]" : "bg-white border-[#E7E2D9] text-[#0C2E3D] group-hover:border-[#0C2E3D]/15"}`, children: /* @__PURE__ */ jsx("span", { className: `transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`, children: isOpen ? "×" : "+" }) })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsx(motion.div, { initial: {
          height: 0,
          opacity: 0
        }, animate: {
          height: "auto",
          opacity: 1
        }, exit: {
          height: 0,
          opacity: 0
        }, transition: {
          duration: 0.38,
          ease: [0.32, 0.72, 0, 1]
        }, className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "px-5 lg:px-7 pb-7", children: /* @__PURE__ */ jsxs("div", { className: "pt-5 border-t border-dashed border-[#E7E2D9]/70", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: {
              background: s.accent
            } }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] tracking-[0.16em] uppercase opacity-40", children: [
              "Détail — ",
              s.title
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "ml-auto hidden sm:inline font-mono text-[10px] tracking-[0.12em] uppercase opacity-30", children: [
              s.n,
              " / 05"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: s.items.map((it) => /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl bg-[#FCFCF9] border border-[#E7E2D9]/55 p-4 flex flex-col gap-2 hover:bg-white hover:border-[#E7E2D9] hover:shadow-[0_4px_16px_rgba(12,46,61,0.06)] transition", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-display text-[13.5px] font-semibold leading-tight pr-2", children: it.t }),
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full mt-2 shrink-0", style: {
                background: s.accent
              } })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-display text-[12.5px] leading-relaxed opacity-60", children: it.d })
          ] }, it.t)) })
        ] }) }) }) })
      ] }, s.n);
    }) })
  ] });
}
function StackMagnetic() {
  return /* @__PURE__ */ jsx("section", { id: "stack", className: "max-w-290 mx-auto px-6 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] bg-white border border-[#E7E2D9] shadow-[0_16px_40px_rgba(12,46,61,0.06)] p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex bg-[#0C2E3D] text-white rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase", children: "Stack" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display font-bold tracking-[-0.03em] text-[26px] lg:text-[34px] leading-none", children: [
          "Technos qui ",
          /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-[#FF3E1F]", children: "réagissent" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-display text-sm opacity-60", children: "Grande grille d’origine - chaque carte suit doucement la souris. Pas de marquee, juste l’interaction." })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "self-start lg:self-auto bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-3 py-1.5 font-display text-[11px] tracking-widest uppercase opacity-60", children: "16 techs - favoris ★ - survole" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 lg:gap-4", children: [
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.typescript, size: "xl", favorite: true, className: "col-span-2 row-span-2" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.react, size: "lg", favorite: true, className: "col-span-2" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.elysiajs, size: "md", className: "col-span-2" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.docker, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.kubernetes, size: "lg", className: "col-span-2" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.nextjs, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.tailwind, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.bun, size: "xl", favorite: true, className: "col-span-2 row-span-2" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.rust, size: "sm", favorite: true, className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.postgresql, size: "sm", favorite: true, className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.terraform, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.redis, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.nodejs, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.prisma, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.nestjs, size: "sm", className: "col-span-1" }),
      /* @__PURE__ */ jsx(SkillCard, { skill: skillsData.grafana, size: "sm", className: "col-span-1" })
    ] })
  ] }) });
}
function SkillCard({
  skill,
  className,
  size,
  favorite
}) {
  const bg = {
    blue: "bg-blue-50",
    red: "bg-red-50",
    green: "bg-green-50",
    black: "bg-zinc-100",
    purple: "bg-purple-50",
    pink: "bg-pink-50",
    orange: "bg-orange-50",
    yellow: "bg-yellow-50"
  };
  return /* @__PURE__ */ jsxs("div", { className: `bg-[#FCFCF9] border border-[#E7E2D9] rounded-[1.6rem] relative overflow-hidden hover:bg-white hover:shadow-[0_8px_24px_rgba(12,46,61,0.08)] transition ${className ?? ""}`, children: [
    favorite && /* @__PURE__ */ jsx("img", { alt: "fav", src: "/star.png", className: "absolute top-2 right-2 w-4 h-4 pointer-events-none" }),
    /* @__PURE__ */ jsx(Magnet, { padding: 24, magnetStrength: 5, wrapperClassName: "flex items-center w-full h-full p-3", innerClassName: "w-full h-full", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2 py-2", children: [
      /* @__PURE__ */ jsx("div", { className: `${bg[skill.color] ?? "bg-white"} rounded-2xl p-2 border border-black/5`, children: /* @__PURE__ */ jsx("img", { src: skill.icon, alt: skill.name, className: `${size === "xl" ? "w-14 h-14 lg:w-16 lg:h-16" : ""} ${size === "lg" ? "w-12 h-12" : ""} ${size === "md" ? "w-10 h-10" : ""} ${size === "sm" ? "w-8 h-8" : ""} object-contain` }) }),
      /* @__PURE__ */ jsx("span", { className: `${size === "xl" ? "text-[15px] font-bold" : size === "lg" ? "text-sm font-bold" : "text-xs font-semibold"} font-display text-center leading-tight`, children: skill.name })
    ] }) })
  ] });
}
function Work() {
  return /* @__PURE__ */ jsxs("section", { id: "work", className: "relative bg-[#F8F7F1] border-y border-[#E7E2D9]/60 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.035]", style: {
      backgroundImage: "linear-gradient(#0C2E3D 1px, transparent 1px), linear-gradient(90deg, #0C2E3D 1px, transparent 1px)",
      backgroundSize: "36px 36px"
    } }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-28 -right-24 w-[520px] h-[520px] bg-[#FFD8CC] rounded-full blur-[90px] opacity-[0.10]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-[1160px] mx-auto px-6 py-16 lg:py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[620px]", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#FF3E1F]" }),
          " Parcours - 2018 → aujourd’hui"
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display font-bold tracking-[-0.04em] text-[34px] lg:text-[46px] leading-[0.9]", children: [
          "Timeline ",
          /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-[#FF3E1F]", children: "vivante" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed opacity-60", children: "abcdef" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative mt-10 lg:mt-12 max-w-[980px]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[7px] lg:left-[164px] top-3 bottom-3 w-px bg-[#E7E2D9]", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-7 lg:gap-6", children: timeline.map((t, idx) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true,
          amount: 0.2
        }, transition: {
          duration: 0.4,
          delay: idx * 0.04
        }, className: "relative grid lg:grid-cols-[148px_32px_1fr] items-start gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:block text-right pr-6 pt-2", children: [
            /* @__PURE__ */ jsx("div", { className: "font-extrabold text-accent text-[38px]", style: {
              color: t.accent
            }, children: t.year }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight", children: t.end_date }),
            /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] tracking-wide opacity-60 mt-1 leading-tight", children: t.start_date }),
            t.duration && /* @__PURE__ */ jsx("span", { className: "inline-flex mt-2 bg-white border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm", children: t.duration })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden lg:flex justify-center pt-7", children: /* @__PURE__ */ jsx("span", { className: "w-[18px] h-[18px] rounded-full bg-white border-2 grid place-items-center shadow-sm", style: {
            borderColor: t.accent
          }, children: /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full", style: {
            background: t.accent
          } }) }) }),
          /* @__PURE__ */ jsx("span", { className: "lg:hidden absolute left-0 top-7 w-[15px] h-[15px] rounded-full bg-white border-2 grid place-items-center shadow-sm", style: {
            borderColor: t.accent
          }, "aria-hidden": "true", children: /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full", style: {
            background: t.accent
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "pl-8 lg:pl-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex flex-wrap items-baseline gap-2 mb-2.5", children: [
              /* @__PURE__ */ jsx("span", { className: "italic text-[22px]", style: {
                color: t.accent
              }, children: t.year }),
              /* @__PURE__ */ jsxs("span", { className: "font-mono text-[11px] tracking-wide opacity-60", children: [
                t.start_date,
                " · ",
                t.end_date
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "group relative bg-white rounded-[1.7rem] border border-[#E7E2D9] overflow-hidden hover:shadow-[0_12px_32px_rgba(12,46,61,0.08)] hover:border-[#0C2E3D]/10 transition", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-display font-bold text-[18px] lg:text-[19px] leading-tight", children: t.title }),
                  /* @__PURE__ */ jsxs("p", { className: "font-display text-[12px] tracking-widest uppercase opacity-40 mt-1", children: [
                    t.company,
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "opacity-30", children: "-" }),
                    " ",
                    t.type
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "hidden sm:inline-flex shrink-0 bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-mono text-[11px] opacity-60", children: [
                  t.year,
                  t.endYear && t.endYear !== "-" && t.endYear !== t.year ? ` → ${t.endYear}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-[14.5px] leading-relaxed opacity-65", children: t.desc }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-display text-[10px] tracking-[0.14em] uppercase opacity-35", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-5 h-px bg-[#E7E2D9]" }),
                  " Maîtrisé pendant cette période"
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-2.5", children: t.mastered.map((m) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 bg-[#FCFCF9] border border-[#E7E2D9]/60 rounded-2xl px-3.5 py-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "mt-1 w-1.5 h-1.5 rounded-full shrink-0", style: {
                    background: t.accent
                  }, "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[13.5px] leading-relaxed", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-display font-semibold", children: m.k }),
                    /* @__PURE__ */ jsxs("span", { className: "opacity-60", children: [
                      " - ",
                      m.d
                    ] })
                  ] })
                ] }, m.k)) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: t.tech.map((x) => /* @__PURE__ */ jsx("span", { className: "bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm", children: x }, x)) })
            ] }) })
          ] })
        ] }, t.title)) })
      ] })
    ] })
  ] });
}
function Projects() {
  const ref = useRef(null);
  const {
    events
  } = useDraggable(ref);
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "bg-[#F8F7F1] border-y border-[#E7E2D9]/60", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1160px] mx-auto px-6 py-16 lg:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase font-medium shadow-sm", children: "Projets" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[40px] leading-none", children: [
          "Sélection ",
          /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal", children: "- 4 réalisations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "https://github.com/frnikho", target: "_blank", rel: "noreferrer", className: "self-start lg:self-auto group inline-flex items-center gap-2 bg-white border border-line rounded-full pl-3 pr-1 py-1 shadow-sm transition-colors", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 group-hover:opacity-100 transition-opacity", children: "Voir tout sur GitHub" }),
        /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-full bg-[#0C2E3D] grid place-items-center group-hover:bg-black transition-colors", children: /* @__PURE__ */ jsx("img", { src: "/github-mark-white.svg", alt: "", width: 14, height: 14 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 gap-5 mt-8", children: projects.map((p) => /* @__PURE__ */ jsxs("a", { href: p.href, target: p.href ? "_blank" : void 0, rel: p.href ? "noreferrer" : void 0, className: "group bg-white rounded-[1.8rem] border border-[#E7E2D9] overflow-hidden shadow-[0_8px_24px_rgba(12,46,61,0.06)] hover:shadow-[0_16px_32px_rgba(12,46,61,0.10)] transition p-2", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-[1.3rem] overflow-hidden aspect-16/10 bg-[#FCFCF9] border border-[#E7E2D9]/40", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.title, className: "w-full h-full object-cover group-hover:scale-[1.02] transition duration-500" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-4 pt-4 pb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold", children: p.title }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-[#FCFCF9] border border-[#E7E2D9] rounded-full px-2.5 py-1 font-display text-[10px] tracking-widest uppercase", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#0C2E3D] opacity-60" }),
            p.stack.join(" - ")
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-60 mt-2 leading-relaxed", children: p.desc }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
          p.stack.map((s) => /* @__PURE__ */ jsx("span", { className: "bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[11px] shadow-sm", children: s }, s)),
          p.href && /* @__PURE__ */ jsx("span", { className: "ml-auto bg-[#0C2E3D] text-white rounded-full px-4 py-1.5 font-display text-[11px] tracking-widest uppercase", children: "Ouvrir →" })
        ] })
      ] })
    ] }, p.title)) }),
    /* @__PURE__ */ jsx("div", { ref, ...events, className: "md:hidden flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none mt-6 -mx-6 px-6 pb-2", children: projects.map((p) => /* @__PURE__ */ jsxs("a", { href: p.href, target: p.href ? "_blank" : void 0, rel: p.href ? "noreferrer" : void 0, className: "shrink-0 snap-start w-[300px] bg-white rounded-[1.8rem] border border-[#E7E2D9] overflow-hidden p-2 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-[1.3rem] overflow-hidden aspect-16/10 bg-[#FCFCF9]", children: /* @__PURE__ */ jsx("img", { src: p.img, alt: p.title, className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-3 pt-3 pb-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold text-sm", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-60 mt-1 line-clamp-2", children: p.desc })
      ] })
    ] }, p.title)) })
  ] }) });
}
function FeedbackInfinite() {
  const VISIBLE_COUNT = 3;
  const extended = [...feedbacks.slice(-VISIBLE_COUNT), ...feedbacks, ...feedbacks.slice(0, VISIBLE_COUNT)];
  const [idx, setIdx] = useState(VISIBLE_COUNT);
  const [anim, setAnim] = useState(true);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => setMounted(true), []);
  const displayIsMobile = mounted ? isMobile : false;
  const next = () => {
    setAnim(true);
    setIdx((v) => v + 1);
  };
  const prev = () => {
    setAnim(true);
    setIdx((v) => v - 1);
  };
  useEffect(() => {
    if (!anim) {
      const t = setTimeout(() => setAnim(true), 20);
      return () => clearTimeout(t);
    }
  }, [anim]);
  const onEnd = () => {
    if (idx >= feedbacks.length + VISIBLE_COUNT) {
      setAnim(false);
      setIdx(VISIBLE_COUNT);
    } else if (idx < VISIBLE_COUNT) {
      setAnim(false);
      setIdx(feedbacks.length + VISIBLE_COUNT - 1);
    }
  };
  const tx = `-${idx * (100 / (displayIsMobile ? 1 : VISIBLE_COUNT))}%`;
  return /* @__PURE__ */ jsxs("section", { id: "feedback", className: "bg-[#FCFCF9] py-16 lg:py-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1160px] mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-widest uppercase shadow-sm", children: "Recommandations" }),
          /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display font-bold tracking-[-0.03em] text-[30px] lg:text-[40px] leading-none", children: [
            "Ils m’ont fait ",
            /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-[#FF3E1F]", children: "confiance" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: prev, "aria-label": "Précédent", className: "w-10 h-10 rounded-full bg-white border border-[#E7E2D9] grid place-items-center hover:bg-[#0C2E3D] hover:text-white hover:border-[#0C2E3D] transition", children: "‹" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: next, "aria-label": "Suivant", className: "w-10 h-10 rounded-full bg-[#0C2E3D] text-white grid place-items-center hover:bg-black transition", children: "›" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-sm opacity-60 max-w-[60ch]", children: "Découvrez ce que les clients disent de mon travail." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 overflow-hidden", children: /* @__PURE__ */ jsx("div", { onTransitionEnd: onEnd, className: `flex ${anim ? "transition-transform duration-[560ms] ease-[cubic-bezier(0.32,0.72,0,1)]" : ""}`, style: {
      transform: `translateX(${tx})`
    }, children: extended.map((f, i) => /* @__PURE__ */ jsx("div", { className: "shrink-0 w-full md:w-1/3 px-3 box-border", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[1.6rem] border border-[#E7E2D9] p-6 shadow-[0_8px_24px_rgba(12,46,61,0.06)] h-full flex flex-col", children: [
      /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-[#FFF1EB] border border-[#FFD8CC] grid place-items-center font-serif text-lg text-[#FF3E1F]", children: "“" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-[15px] leading-relaxed flex-1", children: [
        "“",
        f.description,
        "”"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: f.profile_picture, alt: f.user, width: 40, height: 40, className: "w-10 h-10 rounded-full object-cover border border-[#E7E2D9]" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display font-semibold text-sm leading-none", children: f.user }),
          /* @__PURE__ */ jsx("div", { className: "font-display text-[11px] tracking-widest uppercase opacity-50", children: f.role })
        ] })
      ] })
    ] }) }, `${f.user}-${i}`)) }) })
  ] });
}
function Contact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      at: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("[contact]", payload);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setForm({
        name: "",
        email: "",
        message: ""
      });
    }, 1400);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { id: "contact", className: "max-w-[1160px] mx-auto px-6 py-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[720px] mx-auto text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase font-medium shadow-sm", children: "Contact" }),
      /* @__PURE__ */ jsxs("h2", { className: "mt-4 font-display font-bold tracking-[-0.04em] text-[32px] lg:text-[48px] leading-[0.92]", children: [
        "Un projet en tête ?",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "font-serif italic font-normal text-[#FF3E1F]", children: "Écrivons la suite." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[15px] leading-relaxed opacity-60", children: "Nantes & remote, réponse sous 24h" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setOpen(true), className: "group inline-flex items-center gap-2 bg-[#0C2E3D] text-white rounded-full pl-6 pr-1.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-black transition-colors shadow-[0_8px_24px_rgba(12,46,61,0.16)]", children: [
          /* @__PURE__ */ jsx("span", { children: "Échanger sur votre projet" }),
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-white text-[#0C2E3D] grid place-items-center group-hover:bg-[#F8F7F1] transition-colors", children: "→" })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "mailto:nicolas.sansd@gmail.com", className: "font-mono text-[11px] tracking-[0.08em] opacity-40 hover:opacity-100 transition-opacity", children: "ou nicolas.sansd@gmail.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-2", children: [
        /* @__PURE__ */ jsxs("a", { href: "https://linkedin.com/in/nicosans/", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 bg-white border border-[#E7E2D9] rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-[#0C2E3D]/15 transition shadow-sm", children: [
          /* @__PURE__ */ jsx("img", { src: "/icons/linkedin.png", alt: "", width: 14, height: 14 }),
          "LinkedIn"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "https://github.com/frnikho", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 bg-white border border-[#E7E2D9] rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase font-medium opacity-60 hover:opacity-100 hover:border-[#0C2E3D]/15 transition shadow-sm", children: [
          /* @__PURE__ */ jsx("img", { src: "/github.png", alt: "", width: 14, height: 14 }),
          "GitHub"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, transition: {
        duration: 0.2
      }, onClick: () => setOpen(false), className: "fixed inset-0 z-[80] bg-[#0C2E3D]/40 backdrop-blur-sm", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 10,
        scale: 0.98
      }, animate: {
        opacity: 1,
        y: 0,
        scale: 1
      }, exit: {
        opacity: 0,
        y: 10,
        scale: 0.98
      }, transition: {
        duration: 0.28,
        ease: [0.32, 0.72, 0, 1]
      }, className: "fixed inset-0 z-[81] grid place-items-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto w-full max-w-[520px] bg-white rounded-[1.8rem] border border-[#E7E2D9] shadow-[0_24px_64px_rgba(12,46,61,0.18)] overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 sm:px-8 pt-7 pb-4 flex items-start justify-between gap-4 border-b border-[#E7E2D9]/60", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono text-[10px] tracking-[0.16em] uppercase font-medium opacity-40", children: "Contact" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-1 font-display font-bold tracking-[-0.02em] text-[20px] leading-none", children: "Parlons de votre projet" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 font-display text-sm opacity-60", children: "Réponse sous 24h - ou écrivez direct à nicolas.sansd@gmail.com" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setOpen(false), "aria-label": "Fermer", className: "w-8 h-8 rounded-full border border-[#E7E2D9] grid place-items-center hover:bg-[#F8F7F1] transition", children: "✕" })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "px-6 sm:px-8 py-6 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50", children: "Nom" }),
            /* @__PURE__ */ jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), placeholder: "Votre nom", className: "w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50", children: "Email" }),
            /* @__PURE__ */ jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), placeholder: "vous@exemple.com", className: "w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] tracking-[0.14em] uppercase font-medium opacity-50", children: "Message" }),
            /* @__PURE__ */ jsx("textarea", { required: true, rows: 4, value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }), placeholder: "Contexte, objectifs, budget / timing...", className: "w-full bg-[#FCFCF9] border border-[#E7E2D9] rounded-xl px-3.5 py-3 font-display text-sm outline-none focus:border-[#0C2E3D]/25 focus:bg-white transition placeholder:opacity-40 resize-none" })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: sent, className: `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-mono text-[11px] tracking-[0.14em] uppercase font-medium transition-colors ${sent ? "bg-[#2E7D5A] text-white" : "bg-[#0C2E3D] text-white hover:bg-black"}`, children: sent ? "✓ Envoyé - check console" : "Envoyer →" }),
          /* @__PURE__ */ jsx("p", { className: "text-center font-mono text-[10px] tracking-[0.06em] opacity-35", children: "Envoi loggé en console - branchez votre API plus tard" })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  RouteComponent as component
};
