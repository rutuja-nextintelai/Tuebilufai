export default function BrowserFrame({ src, alt, caption, className = '' }) {
  return (
    <figure className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span /><span /><span />
        <div className="browser__url">jurinex.app</div>
      </div>
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
