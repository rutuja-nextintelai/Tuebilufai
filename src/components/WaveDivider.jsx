/**
 * Curved seam between two page bands. `from` is the colour of the band above
 * (painted as the divider's background), `to` the band below (painted as the
 * curve). `shape="dip"` bows the lower band downward in the middle; `hump`
 * raises it. Pass `overlap` to pull the divider up over the previous section.
 */
export default function WaveDivider({ from = 'transparent', to = 'var(--white)', shape = 'dip', overlap = false }) {
  const d = shape === 'hump'
    ? 'M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z'
    : 'M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z'
  return (
    <div className={`wave${overlap ? ' wave--overlap' : ''}`} style={{ background: from }} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d={d} style={{ fill: to }} />
      </svg>
    </div>
  )
}
