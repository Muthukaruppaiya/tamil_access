import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Icon from './Icon'
import { Reveal } from './Motion'
import { HorizontalScroll, ParallaxLayer, useMotionScale } from './Parallax'
import { business, telLink, waLink } from '../data/business'
import { instagram, logoSrc, photos } from '../data/media'

export function PageHeader({ eyebrow, title, subtitle, crumbs = [], image = photos.swift360.src }) {
  const ref = useRef(null)
  const scale = useMotionScale()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160 * scale])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -50 * scale])
  return (
    <section ref={ref} className="page-header">
      <motion.div className="page-header__bg" style={{ y: bgY, backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div className="page-header__veil" aria-hidden="true" />
      <motion.div className="container page-header__inner" style={{ y: copyY }}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.name}>
              <span aria-hidden="true">/</span> {c.path ? <Link to={c.path}>{c.name}</Link> : c.name}
            </span>
          ))}
        </nav>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__sub">{subtitle}</p>}
      </motion.div>
    </section>
  )
}

export function SectionTitle({ eyebrow, title, children, center = true }) {
  return (
    <Reveal className={`section-title ${center ? 'is-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="section-title__sub">{children}</p>}
    </Reveal>
  )
}

export function CtaBanner({ title = 'Ready to transform your car?', text = 'Visit our Theni shop or send your car model on WhatsApp for the best accessories and prices.' }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta__actions">
            <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> WhatsApp Us
            </a>
            <a className="btn btn--ghost" href={telLink}>
              <Icon name="phone" size={18} /> {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function FaqList({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((f, i) => (
        <div key={f.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
          <h3>
            <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {f.q}
              <span className="faq__icon" aria-hidden="true" />
            </button>
          </h3>
          <div className="faq__a">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const reelSpeeds = [50, -40, 70, -30]

export function ReelGrid({ items }) {
  return (
    <div className="reels">
      {items.map((r, i) => (
        <ParallaxLayer key={r.poster} speed={reelSpeeds[i % reelSpeeds.length]} className="reel-wrap">
          <Reel reel={r} />
        </ParallaxLayer>
      ))}
    </div>
  )
}

function Reel({ reel }) {
  const [playing, setPlaying] = useState(false)
  if (reel.video) {
    return (
      <figure className="reel">
        {playing ? (
          <video src={reel.video} poster={reel.poster} controls autoPlay playsInline />
        ) : (
          <button type="button" className="reel__btn" onClick={() => setPlaying(true)} aria-label={`Play video: ${reel.title}`}>
            <img src={reel.poster} alt="" loading="lazy" />
            <span className="reel__play">
              <Icon name="play" size={22} />
            </span>
          </button>
        )}
        <figcaption>
          <strong>{reel.title}</strong>
          <span>{reel.text}</span>
        </figcaption>
      </figure>
    )
  }
  return (
    <a className="reel" href={reel.href || instagram.reelsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch "${reel.title}" on Instagram`}>
      <span className="reel__btn">
        <img src={reel.poster} alt="" loading="lazy" />
        <span className="reel__play">
          <Icon name="play" size={22} />
        </span>
      </span>
      <span className="reel__cap">
        <strong>{reel.title}</strong>
        <span>{reel.text}</span>
      </span>
    </a>
  )
}

export function WorkStrip({ items, title, eyebrow }) {
  return (
    <HorizontalScroll label={title}>
      <div className="hscroll__intro">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        <p className="muted">Latest looks from our Instagram. Scroll or swipe to explore.</p>
        <Link to="/gallery" className="btn btn--ghost">
          Full gallery <Icon name="arrow" size={16} />
        </Link>
      </div>
      {items.map((p, i) => (
        <figure key={p.src} className={`work-card ${i % 2 ? 'is-low' : ''}`}>
          <a href={p.href || instagram.url} target="_blank" rel="noopener noreferrer">
            <img src={p.src} alt={p.alt} loading="lazy" draggable="false" />
          </a>
          <figcaption>{p.title}</figcaption>
        </figure>
      ))}
    </HorizontalScroll>
  )
}

export function InstagramBand() {
  return (
    <section className="ig-band">
      <div className="container ig-band__inner">
        <img className="ig-band__logo" src={logoSrc} alt="" width="64" height="64" />
        <div>
          <p className="eyebrow">On Instagram</p>
          <h2>@{instagram.handle}</h2>
          <p>Photos, reels and offers from the Theni shop. {instagram.followers} people already follow along.</p>
        </div>
        <a className="btn btn--primary" href={instagram.url} target="_blank" rel="noopener noreferrer">
          <Icon name="instagram" size={18} /> Follow
        </a>
      </div>
    </section>
  )
}

export function Carousel3D({ items }) {
  return (
    <div className="cat-row">
      {items.map((item) => (
        <span key={item.name} className="chip">
          <Icon name={item.icon} size={18} /> {item.name}
        </span>
      ))}
    </div>
  )
}
