/**
 * Site-wide animated backdrop. Fixed behind every page: drifting brand-colour
 * blobs, a slowly moving dot grid, a faint diagonal light sweep and a handful
 * of floating particles. Pure CSS animation, transform-only, so it stays cheap.
 */
const PARTICLES = [
  { x: 8, y: 22, s: 6, d: 0 },
  { x: 18, y: 68, s: 4, d: 3 },
  { x: 31, y: 38, s: 5, d: 6 },
  { x: 47, y: 80, s: 4, d: 1.5 },
  { x: 58, y: 18, s: 7, d: 4.5 },
  { x: 71, y: 55, s: 4, d: 7.5 },
  { x: 84, y: 30, s: 5, d: 2 },
  { x: 92, y: 74, s: 6, d: 5 },
]

export default function PageBackdrop() {
  return (
    <div className="page-bg" aria-hidden="true">
      <span className="page-bg__blob page-bg__blob--1" />
      <span className="page-bg__blob page-bg__blob--2" />
      <span className="page-bg__blob page-bg__blob--3" />
      <span className="page-bg__grid" />
      <span className="page-bg__sweep" />
      {PARTICLES.map((p, i) => (
        <span
          className="page-bg__dot"
          key={i}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
        />
      ))}
    </div>
  )
}
