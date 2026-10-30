import { Link } from 'react-router-dom'
import Seo, { faqSchema } from '../components/Seo'
import Icon from '../components/Icon'
import BeforeAfter from '../components/BeforeAfter'
import { Counter, Reveal } from '../components/Motion'
import { ParallaxBand, ParallaxHero, ParallaxImage, ParallaxLayer } from '../components/Parallax'
import { CtaBanner, FaqList, InstagramBand, ReelGrid, SectionTitle, WorkStrip } from '../components/Sections'
import { SITE_URL, business, fullAddress, localBusinessSchema, telLink, waLink } from '../data/business'
import { services } from '../data/services'
import { faqs } from '../data/faqs'
import { instagram, photos, reels, serviceImages, workGallery } from '../data/media'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: business.name,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#business` },
  inLanguage: 'en-IN',
}

const why = [
  { icon: 'tool', title: 'Expert Fitting', text: 'Trained technicians fit every accessory with care, neat wiring and a factory-like finish.' },
  { icon: 'award', title: 'Quality Brands', text: 'Trusted products for seats, audio, lighting and safety that last for years.' },
  { icon: 'rupee', title: 'Best Prices', text: 'Honest prices and combo offers with options for every budget and every car.' },
  { icon: 'clock', title: 'Quick Service', text: 'Most installations are completed the same day while you wait.' },
]

const steps = [
  { n: '01', title: 'Tell us your car', text: 'Visit the shop or WhatsApp your car model and what you want.' },
  { n: '02', title: 'Choose your style', text: 'See samples, colours and options with honest recommendations.' },
  { n: '03', title: 'Expert fitting', text: 'Our team installs everything neatly at our Theni workshop.' },
  { n: '04', title: 'Drive away happy', text: 'Quality check, demo and after-sales support for peace of mind.' },
]

export default function Home() {
  return (
    <>
      <Seo
        description={`${business.name} is the best car accessories and car decors shop in Theni. Seat covers, Android stereo, ambient lighting, 7D mats, reverse camera and expert fitting. Call ${business.phoneDisplay}.`}
        keywords={['car seat covers Theni', 'android car stereo Theni', 'car accessories near me', 'car accessories Theni', 'car stereo shop Theni']}
        jsonLd={[localBusinessSchema, websiteSchema, faqSchema(faqs.slice(0, 5))]}
      />

      <ParallaxHero background={photos.swift360} cards={[photos.sonetSeats, photos.combo, photos.sunFilm]}>
        <p className="eyebrow">
          <Icon name="pin" size={16} /> New Bus Stand Road, Theni
        </p>
        <h1>
          <span className="hero__brand">Tamil Car Accessories</span>
          <span className="hero__line">Style. Comfort. Performance.</span>
        </h1>
        <p className="hero__sub">
          Theni&apos;s one-stop car accessories and car decors shop. Seat covers, Android stereos, lighting, floor mats and exterior styling,
          fitted by experts.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> Get a Quote
          </a>
          <Link className="btn btn--ghost btn--lg" to="/services">
            Explore Services <Icon name="arrow" size={18} />
          </Link>
        </div>
        <a className="hero__rating" href={business.googleProfile} target="_blank" rel="noopener noreferrer">
          <span className="stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={16} />
            ))}
          </span>
          <strong>{business.rating}</strong> on Google from {business.reviewCount} reviews
        </a>
      </ParallaxHero>

      <section className="stats">
        <div className="container stats__grid">
          <div>
            <strong>
              <Counter to={business.rating} decimals={1} />
            </strong>
            <span>Google Rating</span>
          </div>
          <div>
            <strong>
              <Counter to={business.reviewCount} />
            </strong>
            <span>Google Reviews</span>
          </div>
          <div>
            <strong>
              <Counter to={7} />
            </strong>
            <span>Days Open a Week</span>
          </div>
          <div>
            <strong>
              <Counter to={12} suffix="+" />
            </strong>
            <span>Car Brands Served</span>
          </div>
        </div>
      </section>

      <InstagramBand />

      <section className="section" id="before-after">
        <div className="container">
          <SectionTitle eyebrow="01 · See the difference" title="Drag the line. Transform the interior.">
            Slide left for a plain stock interior. Slide right to see the same car after our seat covers, Android stereo, lighting and floor mats.
          </SectionTitle>
          <BeforeAfter />
        </div>
      </section>

      <ParallaxBand src={photos.sonetSeats.src} tall>
        <p className="eyebrow">Crafted in Theni</p>
        <h2>Interiors that feel brand new.</h2>
        <p>Model-specific seat covers, quilted 7D mats and clean stitching on every car.</p>
      </ParallaxBand>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="02 · What we do" title="Car accessories and fitting in Theni">
            Everything your car needs under one roof, from interiors to electronics.
          </SectionTitle>
          <div className="cards">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link to={`/services/${s.slug}`} className="card card--photo">
                  <ParallaxImage src={serviceImages[s.slug].src} alt={serviceImages[s.slug].alt} speed={30} className="card__media" />
                  <div className="card__body">
                    <div className="card__icon">
                      <Icon name={s.icon} size={24} />
                    </div>
                    <h3>{s.name}</h3>
                    <p>{s.summary}</p>
                    <span className="card__link">
                      Learn more <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WorkStrip eyebrow="03 · Our work" title="Fresh from the workshop" items={workGallery} />

      <section className="section section--alt section--reels">
        <div className="container">
          <SectionTitle eyebrow="04 · Watch us" title="Shop videos on Instagram">
            Product walk-throughs, new arrivals and combo offers from @{instagram.handle}.
          </SectionTitle>
          <ReelGrid items={reels} />
          <div className="is-center reels__more">
            <a className="btn btn--primary" href={instagram.reelsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={18} /> Watch all reels
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack-photos">
            <ParallaxImage src={photos.combo.src} alt={photos.combo.alt} speed={60} className="stack-photos__main" />
            <ParallaxLayer speed={-90} className="stack-photos__float">
              <img src={photos.subwoofer.src} alt={photos.subwoofer.alt} loading="lazy" />
            </ParallaxLayer>
          </div>
          <div>
            <SectionTitle eyebrow="05 · Why choose us" title="Trusted by drivers across Theni" center={false}>
              Rated {business.rating} on Google by {business.reviewCount} customers.
            </SectionTitle>
            <div className="why-list">
              {why.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.06} className="why-item">
                  <div className="card__icon">
                    <Icon name={w.icon} size={22} />
                  </div>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="06 · How it works" title="From stock to stunning in four steps" />
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.n} className="step" delay={i * 0.08}>
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
          <p className="brands-line">Accessories for {business.carBrands.join(', ')}.</p>
        </div>
      </section>

      <ParallaxBand src={photos.camera360.src}>
        <p className="eyebrow">Smart dashboards</p>
        <h2>Android stereos with 360° cameras.</h2>
        <p>CarPlay, Android Auto, GPS and reverse cameras with neat, safe wiring.</p>
      </ParallaxBand>

      <section className="section">
        <div className="container split split--top">
          <div>
            <SectionTitle eyebrow="07 · Questions" title="Frequently asked questions" center={false}>
              Quick answers about our car accessories shop in Theni.
            </SectionTitle>
            <Link to="/faq" className="btn btn--ghost">
              View all FAQs <Icon name="arrow" size={16} />
            </Link>
          </div>
          <FaqList items={faqs.slice(0, 5)} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">08 · Visit us</p>
            <h2>Find Tamil Car Accessories in Theni</h2>
            <a href={photos.shop.href} target="_blank" rel="noopener noreferrer">
              <ParallaxImage src={photos.shop.src} alt={photos.shop.alt} speed={40} className="visit-photo" />
            </a>
            <ul className="contact-list">
              <li>
                <Icon name="pin" /> <span>{fullAddress}</span>
              </li>
              <li>
                <Icon name="phone" /> <a href={telLink}>{business.phoneDisplay}</a>
              </li>
              <li>
                <Icon name="clock" /> <span>{business.hoursDisplay}</span>
              </li>
            </ul>
            <div className="hero__actions">
              <a className="btn btn--primary" href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                Get Directions <Icon name="arrow" size={16} />
              </a>
              <Link className="btn btn--ghost" to="/contact">
                Contact Page
              </Link>
            </div>
          </Reveal>
          <Reveal className="map map--tall">
            <iframe title="Tamil Car Accessories location on Google Maps" src={business.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
