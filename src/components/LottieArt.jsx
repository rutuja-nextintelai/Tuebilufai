import { useEffect, useRef, useState } from 'react'

/**
 * Plays a Lottie JSON from `src` (a file under /public). If the file is
 * missing or fails to load, renders `fallback` instead, so a page never
 * shows an empty box while an animation is still being sourced.
 */
export default function LottieArt({ src, fallback = null, className = '', loop = true }) {
  const ref = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | missing

  useEffect(() => {
    let anim = null
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(src, { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(res.status)
        const data = await res.json()
        if (cancelled || !data || !Array.isArray(data.layers)) throw new Error('not lottie')
        const { default: lottie } = await import('lottie-web/build/player/lottie_light')
        if (cancelled || !ref.current) return
        anim = lottie.loadAnimation({
          container: ref.current,
          renderer: 'svg',
          loop,
          autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMax meet' },
        })
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('missing')
      }
    })()
    return () => {
      cancelled = true
      if (anim) anim.destroy()
    }
  }, [src, loop])

  if (status === 'missing') return fallback
  return <div ref={ref} className={className} aria-hidden="true" />
}
