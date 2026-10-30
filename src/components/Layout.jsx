import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import { business, fullAddress, telLink, waLink } from '../data/business'
import { instagram } from '../data/media'
import { services } from '../data/services'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/accessories', label: 'Accessories' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label={`${business.name} home`}>
          <Logo />
          <span className="brand__text">
            <strong>Tamil</strong> Car Accessories
            <small>Theni</small>
          </span>
        </Link>
        <nav className="navbar__links" aria-label="Main navigation">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="btn btn--primary navbar__cta" href={telLink}>
          <Icon name="phone" size={18} /> Call Now
        </a>
        <button className="navbar__toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="brand">
            <Logo />
            <span className="brand__text">
              <strong>Tamil</strong> Car Accessories
              <small>Theni</small>
            </span>
          </Link>
          <p className="footer__about">
            Theni&apos;s trusted car accessories and car decor shop. Seat covers, Android stereos, lighting, floor mats and exterior styling,
            fitted by experts.
          </p>
          <div className="footer__pills">
            <a className="rating-pill" href={instagram.url} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={16} /> @{instagram.handle}
            </a>
            <a className="rating-pill" href={business.googleProfile} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={16} /> {business.rating} on Google &middot; {business.reviewCount}+ reviews
            </a>
          </div>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <address className="footer__contact">
          <h3>Visit Our Shop</h3>
          <p>
            <Icon name="pin" size={18} /> {fullAddress}
          </p>
          <p>
            <Icon name="phone" size={18} /> <a href={telLink}>{business.phoneDisplay}</a>
          </p>
          <p>
            <Icon name="clock" size={18} /> {business.hoursDisplay}
          </p>
          <a className="btn btn--ghost btn--sm" href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
            Get Directions <Icon name="arrow" size={16} />
          </a>
        </address>
      </div>
      <div className="container footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} {business.name}, Theni. All rights reserved.
        </p>
        <p className="footer__areas">Serving {business.serviceAreas.join(' · ')}</p>
      </div>
    </footer>
  )
}

function FloatingActions() {
  return (
    <div className="fab">
      <a className="fab__btn fab__btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" size={28} />
      </a>
      <a className="fab__btn fab__btn--call" href={telLink} aria-label="Call Tamil Car Accessories">
        <Icon name="phone" size={24} />
      </a>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
