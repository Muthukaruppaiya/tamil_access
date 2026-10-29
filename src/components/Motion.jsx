import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

export function TiltCard({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? children : fallback
}

export function Counter({ to, suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(to)
  const [ref, setRef] = useState(null)
  useEffect(() => {
    if (!ref) return
    setVal(0)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400)
        setVal(to * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref)
    return () => io.disconnect()
  }, [ref, to])
  return (
    <span ref={setRef}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
