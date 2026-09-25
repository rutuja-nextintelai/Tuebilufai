import { useEffect, useRef } from 'react'

// Looping video backdrop shared by the home hero and the inner page heroes.
// The SVG masks carve the notched outline (flat top, cut-out bottom-left
// corner) and stretch to the section via mask-size: 100% 100%. Short sections
// where the notch would flatten out can opt out with masked={false}.
const DESKTOP_MASK = "url(\"data:image/svg+xml,%3Csvg width='1521' height='1011' viewBox='0 0 1521 1011' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H1520.57V1010.82H320.251L315.968 1010.86L311.671 1010.94L307.358 1010.95L303.031 1010.81L298.688 1010.43L294.331 1009.73L289.958 1008.6L285.571 1006.96L281.168 1004.72L276.751 1001.79L271.948 997.589L267.059 993.176L262.224 988.709L257.58 984.34L253.267 980.22L249.422 976.504L246.184 973.342L243.693 970.887L242.085 969.291L241.501 968.708L236.07 962.799L230.275 958.067L224.336 954.381L218.473 951.612L212.907 949.628L207.858 948.298L203.548 947.491L200.196 947.076L198.023 946.924L197.25 946.902H45.75L34.263 945.807L24.864 942.835L17.3461 938.456L11.5021 933.138L7.12505 927.351L4.00804 921.564L1.94402 916.246L0.726012 911.867L0.147004 908.895L0 907.8L0 0Z' fill='black'/%3E%3C/svg%3E\")"
const MOBILE_MASK = "url(\"data:image/svg+xml,%3Csvg width='768' height='722' viewBox='0 0 768 722' fill='none' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H768L768 721.45V721.45L767.79 716.137L767.057 710.809L765.63 705.6L763.337 700.645L760.011 696.081L755.479 692.043L749.573 688.667L742.121 686.087L732.954 684.44L721.903 683.861H37.9023V683.861L27.5033 682.768L19.2044 679.8L12.7689 675.425L7.9599 670.112L4.54055 664.327L2.27404 658.539L0.92356 653.216L0.252277 648.825L0.0233649 645.834L0 644.711V0Z' fill='black'/%3E%3C/svg%3E\")"

export default function VideoBackdrop({ src = '/assets/video/hero-background.webm', masked = true, scrim = false }) {
  const videoRef = useRef(null)

  // Safari and some mobile browsers ignore the autoplay attribute unless muted
  // is set on the element itself, so kick playback off once mounted
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div
      className={`hero-video${masked ? '' : ' hero-video--plain'}`}
      aria-hidden="true"
      style={masked ? { '--desktop-mask': DESKTOP_MASK, '--mobile-mask': MOBILE_MASK } : undefined}
    >
      <video ref={videoRef} className="hero-video__media" autoPlay muted loop playsInline preload="auto">
        <source src={src} type="video/webm" />
      </video>
      <div className="hero-video__tint" />
      <div className="hero-video__dots" />
      {/* Sits inside the masked wrapper so the notch stays cut out */}
      {scrim && <div className="hero-video__scrim" />}
    </div>
  )
}
