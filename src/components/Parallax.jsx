import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

// 1 on desktop, smaller on tablet/phone, 0 when the user prefers reduced motion.
export function useMotionScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tablet = window.matchMedia('(max-width: 1024px)')
    const phone = window.matchMedia('(max-width: 640px)')
    const update = () => setScale(reduce.matches ? 0 : phone.matches ? 0.4 : tablet.matches ? 0.65 : 1)
    update()
    ;[reduce, tablet, phone].forEach((m) => m.addEventListener('change', update))
    return () => [reduce, tablet, phone].forEach((m) => m.removeEventListener('change', update))
  }, [])
  return scale
}

function useScrollShift(ref, distance, offset = ['start end', 'end start']) {
  const scale = useMotionScale()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const raw = useTransform(scrollYProgress, [0, 1], [-distance * scale, distance * scale])
  return useSpring(raw, { stiffness: 120, damping: 30, mass: 0.3 })
}

export function ParallaxLayer({ speed = 60, className = '', children, as = 'div' }) {
  const ref = useRef(null)
  const y = useScrollShift(ref, speed)
  const Tag = motion[as]
  return (
    <Tag ref={ref} className={className} style={{ y }}>
      {children}
    </Tag>
  )
}

export function ParallaxImage({ src, alt, speed = 70, className = '' }) {
  const ref = useRef(null)
  const y = useScrollShift(ref, speed)
  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} loading="lazy" draggable="false" />
    </div>
  )
}

export function ParallaxBand({ src, children, speed = 120, tall = false }) {
  const ref = useRef(null)
  const y = useScrollShift(ref, speed)
  const contentY = useScrollShift(ref, -speed * 0.35)
  return (
    <section ref={ref} className={`parallax-band ${tall ? 'parallax-band--tall' : ''}`}>
      <motion.div className="parallax-band__img" style={{ y, backgroundImage: `url(${src})` }} aria-hidden="true" />
      <div className="parallax-band__veil" aria-hidden="true" />
      {children && (
        <motion.div className="parallax-band__content" style={{ y: contentY }}>
          {children}
        </motion.div>
      )}
    </section>
  )
}

export function ParallaxHero({ background, cards = [], children }) {
  const ref = useRef(null)
  const scale = useMotionScale()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220 * scale])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.08 + 0.12 * scale])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90 * scale])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, scale ? 0.2 : 1])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const bgX = useTransform(sx, (v) => v * -14)
  const bgMY = useTransform(sy, (v) => v * -10)

  const onMove = (e) => {
    if (!scale || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section ref={ref} className="phero" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
      <motion.div className="phero__bg" style={{ y: bgY, scale: bgScale }} aria-hidden="true">
        <motion.img src={background.src} alt="" style={{ x: bgX, y: bgMY }} fetchpriority="high" draggable="false" />
      </motion.div>
      <div className="phero__veil" aria-hidden="true" />
      <div className="container phero__inner">
        <motion.div className="phero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          {children}
        </motion.div>
        <div className="phero__cards">
          {cards.map((c, i) => (
            <HeroCard key={c.src} card={c} index={i} progress={scrollYProgress} sx={sx} sy={sy} scale={scale} />
          ))}
        </div>
      </div>
      <div className="phero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

const cardDepth = [
  { scroll: -260, mouse: 34 },
  { scroll: -140, mouse: 22 },
  { scroll: -380, mouse: 46 },
]

function HeroCard({ card, index, progress, sx, sy, scale }) {
  const d = cardDepth[index % cardDepth.length]
  const scrollY = useTransform(progress, [0, 1], [0, d.scroll * scale])
  const mouseX = useTransform(sx, (v) => v * d.mouse * scale)
  const mouseY = useTransform(sy, (v) => v * d.mouse * scale)
  const y = useTransform([scrollY, mouseY], ([a, b]) => a + b)
  return (
    <motion.figure
      className={`phero__card phero__card--${index + 1}`}
      style={{ x: mouseX, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.15 }}
    >
      <img src={card.src} alt={card.alt} draggable="false" />
      {card.title && <figcaption>{card.title}</figcaption>}
    </motion.figure>
  )
}

// Vertical scroll drives a horizontal strip on wide screens; on phones it becomes a swipeable row.
export function HorizontalScroll({ children, label }) {
  const ref = useRef(null)
  const track = useRef(null)
  const scale = useMotionScale()
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 140, damping: 32, mass: 0.3 })
  const pinned = scale === 1

  useEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - track.current.parentElement.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  return (
    <section
      ref={ref}
      className={`hscroll ${pinned ? 'is-pinned' : ''}`}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-label={label}
    >
      <div className="hscroll__sticky">
        <div className="hscroll__viewport">
          <motion.div ref={track} className="hscroll__track" style={pinned ? { x } : undefined}>
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function MouseParallax({ src, alt, className = '' }) {
  const wrap = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 50, damping: 20 })
  const y = useSpring(my, { stiffness: 50, damping: 20 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = wrap.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 40)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 28)
  }

  return (
    <div ref={wrap} className={`mouse-parallax ${className}`} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
      <motion.img src={src} alt={alt} style={{ x, y }} draggable="false" />
    </div>
  )
}
