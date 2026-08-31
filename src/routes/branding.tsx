import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/branding')({ component: BrandingPage })

const W = 1584
const H = 396

function BrandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // titre animé - frappe élégante (branding test uniquement)
  useEffect(() => {
    const phrases = [
      'Fullstack Developer',
      'TypeScript • React • Next.js • Node.js',
      'Remote • Disponible',
    ]
    const original = document.title
    let pi = 0
    let ti = 0
    let dir: 1 | -1 = 1
    let pause = 0
    let id: number | null = null
    const tick = () => {
      const phrase = phrases[pi]
      if (dir === 1) {
        ti++
        document.title = phrase.slice(0, ti) + (ti < phrase.length ? ' ▌' : '')
        if (ti >= phrase.length) { pause = 1400; dir = -1 as const }
      } else {
        ti--
        document.title = phrase.slice(0, ti) + ' ▌'
        if (ti <= 0) { dir = 1 as const; pi = (pi + 1) % phrases.length }
      }
      const delay = pause ? pause : dir === 1 ? 80 : 45
      pause = 0
      id = window.setTimeout(tick, delay) as unknown as number
    }
    tick()
    return () => { if (id) clearTimeout(id); document.title = original }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = 2
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = '100%'
    canvas.style.height = 'auto'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const draw = async () => {
      try { await document.fonts.ready } catch {}

      // --- bg ink very dark (like ref, but portfolio ink) ---
      ctx.fillStyle = '#060B14'
      ctx.fillRect(0, 0, W, H)

      // subtle vignette
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, 300, W * 0.5, H * 0.5, 900)
      vig.addColorStop(0, 'transparent')
      vig.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      // dotted grid (like ref on right side) - very subtle white dots
      ctx.fillStyle = 'rgba(255,255,255,0.18)'
      for (let x = 0; x < W; x += 18) {
        for (let y = 0; y < H; y += 18) {
          // only faint
          ctx.globalAlpha = 0.18
          ctx.beginPath()
          ctx.arc(x, y, 0.7, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      // fade the dots with mask
      const fade = ctx.createLinearGradient(0, 0, W * 0.55, 0)
      fade.addColorStop(0, 'transparent')
      fade.addColorStop(1, 'rgba(6,11,20,1)')
      // not needed - keep faint globally, it's okay

      // bottom-left glow - ink accent vermillon + blue (map purple ref -> vermillon)
      const glow = (cx: number, cy: number, r: number, col: string) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0, col)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
      }
      glow(-20, H + 40, 520, 'rgba(55,48,255,0.55)') // deep purple-blue like ref
      glow(-10, H + 30, 320, 'rgba(120,90,255,0.35)')
      // subtle top glow behind diagram
      glow(W * 0.75, H * 0.5, 380, 'rgba(99,85,255,0.08)')

      // helpers
      const rr = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath()
        ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r)
        ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r)
        ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
      }

      // ---------- LEFT CONTENT ----------
      const leftX = 56

      // NS monogram (angular N like ref)
      ctx.strokeStyle = '#6E5CFF'
      ctx.lineWidth = 3
      ctx.lineJoin = 'miter'
      // draw N shape - geometric
      const nx = leftX, ny = 42, ns = 26
      ctx.beginPath()
      // vertical left
      ctx.moveTo(nx, ny + ns)
      ctx.lineTo(nx, ny)
      ctx.lineTo(nx + ns * 0.55, ny)
      ctx.lineTo(nx + ns * 0.55, ny + ns * 0.62)
      ctx.lineTo(nx + ns, ny + ns * 0.62 - 2)
      // top arrow
      ctx.lineTo(nx + ns, ny + 2)
      ctx.lineTo(nx + ns, ny + ns)
      ctx.lineTo(nx + ns * 0.45, ny + ns)
      ctx.lineTo(nx + ns * 0.45, ny + ns * 0.38)
      ctx.lineTo(nx, ny + ns * 0.38 + 2)
      ctx.closePath()
      ctx.stroke()
      // also thin inner fill? keep stroke

      // FULLSTACK DEVELOPER
      ctx.textBaseline = 'alphabetic'
      const tY = 138
      ctx.font = '700 44px "Space Grotesk", sans-serif'
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText('FULLSTACK', leftX, tY)
      const fw = ctx.measureText('FULLSTACK ').width
      ctx.fillStyle = '#7B6CFF' // ref purple -> portfolio accent reinterpreted as purple for this banner to match ref content
      ctx.fillText('DEVELOPER', leftX + fw, tY)

      // thin line
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.fillRect(leftX, tY + 16, 68, 1)

      // tagline
      ctx.fillStyle = 'rgba(255,255,255,0.82)'
      ctx.font = '400 13.5px "Space Grotesk", sans-serif'
      ctx.fillText('Je conçois et développe des applications web & mobiles', leftX, tY + 52)
      // bold part second line
      const line2 = 'performantes, robustes et évolutives.'
      ctx.font = '400 13.5px "Space Grotesk", sans-serif'
      // we make bold by using 700 for keywords
      ctx.fillStyle = 'rgba(255,255,255,0.82)'
      // manual bold segments
      const p1 = 'performantes, '
      const p2 = 'robustes'
      const p3 = ' et '
      const p4 = 'évolutives.'
      let tx = leftX
      ctx.font = '700 13.5px "Space Grotesk", sans-serif'; ctx.fillStyle = '#FFFFFF'
      ctx.fillText(p1, tx, tY + 72); tx += ctx.measureText(p1).width
      ctx.fillText(p2, tx, tY + 72); tx += ctx.measureText(p2).width
      ctx.font = '400 13.5px "Space Grotesk", sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.82)'
      ctx.fillText(p3, tx, tY + 72); tx += ctx.measureText(p3).width
      ctx.font = '700 13.5px "Space Grotesk", sans-serif'; ctx.fillStyle = '#FFFFFF'
      ctx.fillText(p4, tx, tY + 72)

      // stack row
      const stackY = H - 56
      const stacks: Array<{ label: string; kind: 'ts' | 'react' | 'next' | 'node' }> = [
        { label: 'TypeScript', kind: 'ts' },
        { label: 'React', kind: 'react' },
        { label: 'Next.js', kind: 'next' },
        { label: 'Node.js', kind: 'node' },
      ]
      let sx = leftX
      const gap = 46
      for (let i = 0; i < stacks.length; i++) {
        const s = stacks[i]
        // vertical separator
        if (i > 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.14)'
          ctx.fillRect(sx - gap / 2 - 1, stackY - 18, 1, 40)
        }
        // icon box 36x36
        const ix = sx + 14
        const iy = stackY - 18
        // draw icons
        ctx.strokeStyle = 'rgba(123,108,255,0.95)'
        ctx.fillStyle = 'rgba(123,108,255,0.95)'
        ctx.lineWidth = 1.2
        if (s.kind === 'ts') {
          // rounded square 28
          rr(ix - 14, iy, 28, 28, 4); ctx.fillStyle = '#7B6CFF'; ctx.fill()
          ctx.fillStyle = '#060B14'
          ctx.font = '700 13px "Space Grotesk", sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
          ctx.fillText('TS', ix, iy + 14)
          ctx.textAlign = 'left'
        } else if (s.kind === 'react') {
          // atom
          const cx = ix, cy = iy + 14
          ctx.strokeStyle = '#7B6CFF'
          ctx.lineWidth = 1.4
          for (let a = 0; a < 3; a++) {
            ctx.beginPath()
            ctx.ellipse(cx, cy, 12, 5.5, (a * 60 * Math.PI) / 180, 0, Math.PI * 2)
            ctx.stroke()
          }
          ctx.fillStyle = '#7B6CFF'; ctx.beginPath(); ctx.arc(cx, cy, 2.2, 0, Math.PI * 2); ctx.fill()
        } else if (s.kind === 'next') {
          ctx.fillStyle = '#FFFFFF'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
          ctx.font = '300 18px "Space Grotesk", sans-serif'
          ctx.fillText('NEXT', ix, iy + 14)
          ctx.font = '500 7px "JetBrains Mono", monospace'
          ctx.fillText('.js', ix + 22, iy + 18)
          ctx.textAlign = 'left'
          // diagonal cut on T
        } else if (s.kind === 'node') {
          // hexagon
          const cx = ix, cy = iy + 14
          ctx.strokeStyle = '#7B6CFF'; ctx.lineWidth = 1.4
          ctx.beginPath()
          for (let k = 0; k < 6; k++) {
            const ang = (-30 + k * 60) * Math.PI / 180
            const px = cx + Math.cos(ang) * 13
            const py = cy + Math.sin(ang) * 13
            if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
          }
          ctx.closePath(); ctx.stroke()
          ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9px "Space Grotesk", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('JS', cx, cy + 0.5); ctx.textAlign = 'left'
        }
        // label
        ctx.fillStyle = 'rgba(255,255,255,0.70)'
        ctx.font = '400 11px "Space Grotesk", sans-serif'; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'center'
        ctx.fillText(s.label, ix, iy + 44)
        ctx.textAlign = 'left'
        sx += 86
      }

      // ---------- RIGHT DIAGRAM ----------
      const cx = 1120
      const cy = H / 2 + 8
      const R = 168

      // orbit arcs - thin
      ctx.strokeStyle = 'rgba(123,108,255,0.22)'
      ctx.lineWidth = 1
      // full circle faint
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke()
      // inner arc 0.65
      ctx.strokeStyle = 'rgba(123,108,255,0.16)'
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.68, -0.9, 2.2); ctx.stroke()
      // orbital lines crossing
      ctx.strokeStyle = 'rgba(123,108,255,0.14)'
      ctx.lineWidth = 1
      // diagonal orbit
      ctx.beginPath()
      ctx.ellipse(cx + 18, cy + 10, R * 0.95, R * 0.42, -22 * Math.PI / 180, 0, Math.PI * 2)
      ctx.stroke()

      // central N large
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(2.35, 2.35)
      ctx.strokeStyle = 'rgba(123,108,255,0.95)'
      ctx.lineWidth = 1.6
      ctx.lineJoin = 'miter'
      ctx.beginPath()
      ctx.moveTo(-18, 18)
      ctx.lineTo(-18, -18)
      ctx.lineTo(-2, -18)
      ctx.lineTo(-2, 8)
      ctx.lineTo(18, 8 - 1)
      ctx.lineTo(18, -16)
      ctx.lineTo(18, 18)
      ctx.lineTo(2, 18)
      ctx.lineTo(2, -6)
      ctx.lineTo(-18, -6 + 1)
      ctx.closePath()
      ctx.stroke()
      // inner thin highlight
      ctx.globalAlpha = 0.35
      ctx.stroke()
      ctx.globalAlpha = 1
      ctx.restore()

      // nodes
      const nodes: Array<{ x: number; y: number; label: string; icon: 'frontend' | 'cloud' | 'api' | 'db' }> = [
        { x: cx - 152, y: cy - 108, label: 'FRONTEND', icon: 'frontend' },
        { x: cx + 210, y: cy - 58, label: 'CLOUD', icon: 'cloud' },
        { x: cx + 122, y: cy + 46, label: 'API', icon: 'api' },
        { x: cx + 38, y: cy + 128, label: 'DATABASE', icon: 'db' },
      ]

      // connection lines with dot at end (like ref)
      ctx.strokeStyle = 'rgba(123,108,255,0.45)'
      ctx.lineWidth = 1
      // frontend -> orbit dot
      // we draw straight lines to orbit then small dot
      const drawLine = (x: number, y: number, tox: number, toy: number) => {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tox, toy); ctx.stroke()
        ctx.fillStyle = '#7B6CFF'; ctx.beginPath(); ctx.arc(tox, toy, 3, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = 'rgba(7,11,20,1)'; ctx.beginPath(); ctx.arc(tox, toy, 1.2, 0, Math.PI * 2); ctx.fill()
      }
      // approx orbit intersection points
      drawLine(nodes[0].x + 32, nodes[0].y + 28, cx - 78, cy - 42)
      // cloud -> down L shape
      ctx.beginPath()
      ctx.moveTo(nodes[1].x - 28, nodes[1].y + 28)
      ctx.lineTo(nodes[1].x - 28, nodes[1].y + 72)
      ctx.lineTo(nodes[3].x + 32, nodes[3].y - 10)
      ctx.stroke()
      // dots for cloud/api/db shared vertical
      const dotPlaces = [
        [nodes[1].x - 28, nodes[1].y + 72],
        [nodes[2].x - 28, nodes[2].y + 12],
        [nodes[3].x + 32, nodes[3].y - 10],
      ] as const
      for (const [dx, dy] of dotPlaces) {
        ctx.fillStyle = '#7B6CFF'; ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = 'rgba(7,11,20,1)'; ctx.beginPath(); ctx.arc(dx, dy, 1.2, 0, Math.PI * 2); ctx.fill()
      }
      // api horizontal small
      drawLine(nodes[2].x - 28, nodes[2].y + 12, cx + 62, cy + 28)
      // orbit dot near center left-bottom
      ctx.fillStyle = '#7B6CFF'; ctx.beginPath(); ctx.arc(cx - 38, cy + 62, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(7,11,20,1)'; ctx.beginPath(); ctx.arc(cx - 38, cy + 62, 1.2, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(123,108,255,0.22)'; ctx.beginPath(); ctx.moveTo(cx - 38, cy + 62); ctx.lineTo(cx - 58, cy + 42); ctx.stroke()

      for (const n of nodes) {
        // rounded square glass
        const bx = n.x - 28, by = n.y - 28, bw = 56, bh = 56
        // bg
        ctx.fillStyle = 'rgba(18,18,36,0.92)'
        ctx.strokeStyle = 'rgba(123,108,255,0.22)'
        ctx.lineWidth = 1
        rr(bx, by, bw, bh, 12); ctx.fill(); ctx.stroke()
        // inner highlight top
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        rr(bx, by, bw, 1, 12); ctx.fill()

        // icon
        ctx.strokeStyle = 'rgba(255,255,255,0.90)'; ctx.lineWidth = 1.2
        ctx.fillStyle = 'rgba(255,255,255,0.90)'
        if (n.icon === 'frontend') {
          // browser window
          const ix = bx + 14, iy = by + 16
          rr(ix, iy, 28, 18, 3); ctx.stroke()
          ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(ix, iy, 28, 5)
          ctx.fillStyle = 'rgba(18,18,36,0.9)'; ctx.beginPath(); ctx.arc(ix + 4, iy + 2.5, 1, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(ix + 8, iy + 2.5, 1, 0, Math.PI * 2); ctx.fill()
        } else if (n.icon === 'cloud') {
          ctx.beginPath()
          const cx2 = bx + 28, cy2 = by + 28
          ctx.moveTo(cx2 - 14, cy2 + 4)
          ctx.bezierCurveTo(cx2 - 14, cy2 - 6, cx2 - 4, cy2 - 10, cx2 + 2, cy2 - 6)
          ctx.bezierCurveTo(cx2 + 8, cy2 - 12, cx2 + 16, cy2 - 6, cx2 + 14, cy2 + 4)
          ctx.stroke()
        } else if (n.icon === 'api') {
          ctx.font = '300 18px "JetBrains Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('</>', bx + 28, by + 28)
          ctx.textAlign = 'left'
        } else if (n.icon === 'db') {
          const cx2 = bx + 28, cy2 = by + 26
          ctx.beginPath(); ctx.ellipse(cx2, cy2 - 7, 11, 5, 0, 0, Math.PI * 2); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(cx2 - 11, cy2 - 7); ctx.lineTo(cx2 - 11, cy2 + 4); ctx.ellipse(cx2, cy2 + 4, 11, 5, 0, 0, Math.PI); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(cx2 + 11, cy2 - 7); ctx.lineTo(cx2 + 11, cy2 + 4); ctx.stroke()
          ctx.beginPath(); ctx.ellipse(cx2, cy2 - 1, 11, 5, 0, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,0.90)'
        }
        // label
        ctx.fillStyle = 'rgba(255,255,255,0.62)'
        ctx.font = '500 8px "JetBrains Mono", monospace'; ctx.textAlign = 'center'
        ctx.fillText(n.label, bx + 28, by + bh + 14)
        ctx.textAlign = 'left'
      }
    }

    draw()
  }, [])

  const download = (scale: 1 | 2 = 2) => {
    const c = canvasRef.current
    if (!c) return
    if (scale === 2) {
      const a = document.createElement('a')
      a.download = `nicolas-sans-banner-${W}x${H}@2x.png`
      a.href = c.toDataURL('image/png')
      a.click()
      return
    }
    const tmp = document.createElement('canvas')
    tmp.width = W; tmp.height = H
    const tctx = tmp.getContext('2d')!
    tctx.drawImage(c, 0, 0, W, H)
    const a = document.createElement('a')
    a.download = `nicolas-sans-banner-${W}x${H}.png`
    a.href = tmp.toDataURL('image/png')
    a.click()
  }

  return (
    <div className="min-h-screen bg-[#FCFCF9] text-[#0C2E3D] selection:bg-[#FF3E1F] selection:text-white antialiased">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#FCFCF9]/80 border-b border-[#E7E2D9]/60">
        <div className="max-w-[1160px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full border border-[#0C2E3D]/12 grid place-items-center font-display text-[10px] font-bold tracking-widest">NS</span>
            <span className="font-display font-semibold text-[13px] tracking-[-0.02em]">Nicolas Sans</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.14em] uppercase opacity-30">/ branding</span>
          </a>
          <a href="/" className="font-mono text-[11px] tracking-[0.14em] uppercase opacity-50 hover:opacity-100 transition">← Portfolio</a>
        </div>
      </div>

      <main className="max-w-[1160px] mx-auto px-6 pt-10 lg:pt-14 pb-16">
        <div className="max-w-[720px]">
          <span className="inline-flex bg-white border border-[#E7E2D9] rounded-full px-3 py-1 font-display text-[10px] tracking-[0.16em] uppercase shadow-sm">Bannière freelance</span>
          <h1 className="mt-4 font-display font-bold tracking-[-0.045em] text-[32px] lg:text-[42px] leading-[0.95]">
            Ta bannière, <span className="font-serif italic font-normal text-[#FF3E1F]">comme ta ref.</span>
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed opacity-60">
            Contenu repris de ta référence - claim + stack TS/React/Next/Node + schéma orbit. Réinterprété en ink premium.
          </p>
        </div>

        <div className="mt-8 rounded-[24px] bg-[#060B14] border border-[#060B14] shadow-[0_16px_40px_rgba(6,11,20,0.22)] p-3 lg:p-4">
          <div className="rounded-[16px] overflow-hidden bg-[#060B14]">
            <canvas ref={canvasRef} width={W} height={H} className="block w-full h-auto" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 justify-between">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/45">1584×396 · PNG 2× · crop centre Malt/ComeUp</span>
            <div className="flex gap-2">
              <button onClick={() => download(2)} className="inline-flex items-center gap-2 bg-[#7B6CFF] text-white rounded-full px-5 py-2.5 font-display text-[11px] tracking-widest uppercase hover:bg-[#6352FF] transition shadow-[0_8px_20px_rgba(123,108,255,0.35)]">
                Télécharger PNG 2×
                <span className="w-6 h-6 rounded-full bg-white text-[#7B6CFF] grid place-items-center text-[12px] leading-none">↓</span>
              </button>
              <button onClick={() => download(1)} className="hidden sm:inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white rounded-full px-5 py-2.5 font-display text-[11px] tracking-widest uppercase hover:bg-white/15 transition">1×</button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white border border-[#E7E2D9] p-4">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40">Contenu repris</div>
            <div className="mt-2 font-display text-[13px] leading-relaxed opacity-70">FULLSTACK DEVELOPER + claim performant/robuste/évolutif + TS | React | Next.js | Node.js + schéma Frontend/Cloud/API/Database.</div>
          </div>
          <div className="rounded-2xl bg-white border border-[#E7E2D9] p-4">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-40">Style</div>
            <div className="mt-2 font-display text-[13px] leading-relaxed opacity-70">Fond noir ink + grille pointillée + glow violet bas-gauche + orbit + monogramme N - senior, pas violet criard.</div>
          </div>
          <div className="rounded-2xl bg-[#0A1F2A] text-white p-4">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase opacity-50">Usage</div>
            <p className="mt-2 font-display text-[13px] leading-relaxed opacity-90">Dépose tel quel. Lisible en miniature, le violet #7B6CFF ressort sur les fonds clairs de Malt/LinkedIn.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
