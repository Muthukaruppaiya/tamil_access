import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function BeforeAfter({
  before = '/images/interior-before.jpg',
  after = '/images/interior-after.jpg',
  beforeLabel = 'Stock Interior',
  afterLabel = 'With Tamil Car Accessories',
}) {
  const wrapRef = useRef(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const inView = useInView(wrapRef, { once: true, amount: 0.5 })

  const updateFromClientX = useCallback((clientX) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  // Sweep the divider once on first view so visitors discover it can be dragged.
  useEffect(() => {
    if (!inView || touched) return
    const frames = [50, 22, 78, 50]
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= frames.length) return clearInterval(id)
      setPos(frames[i])
    }, 700)
    return () => clearInterval(id)
  }, [inView, touched])

  useEffect(() => {
    if (!dragging) return
    const move = (e) => updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX)
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('pointerup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('touchend', up)
    }
  }, [dragging, updateFromClientX])

  const start = (e) => {
    setTouched(true)
    setDragging(true)
    updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX)
  }

  return (
    <motion.div
      className="ba"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div
        ref={wrapRef}
        className={`ba__frame ${dragging ? 'is-dragging' : ''} ${touched ? '' : 'is-auto'}`}
        onPointerDown={start}
        onTouchStart={start}
      >
        <img src={after} alt="Car interior upgraded with leather seat covers, Android stereo and ambient lighting by Tamil Car Accessories" className="ba__img" draggable="false" />
        <img
          src={before}
          alt="Stock car interior without accessories before upgrade"
          className="ba__img ba__img--top"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable="false"
        />
        <span className="ba__label ba__label--left" style={{ opacity: pos > 12 ? 1 : 0 }}>
          {beforeLabel}
        </span>
        <span className="ba__label ba__label--right" style={{ opacity: pos < 88 ? 1 : 0 }}>
          {afterLabel}
        </span>
        <div className="ba__line" style={{ left: `${pos}%` }}>
          <span className="ba__handle" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <input
          className="ba__range"
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => {
            setTouched(true)
            setPos(Number(e.target.value))
          }}
          aria-label="Drag to compare the car interior before and after accessories"
        />
      </div>
      <p className="ba__hint">
        <span>&larr; Drag left: Without accessories</span>
        <span>Drag right: With accessories &rarr;</span>
      </p>
    </motion.div>
  )
}
