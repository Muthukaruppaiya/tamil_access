import { Link } from 'react-router-dom'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import BeforeAfter from '../components/BeforeAfter'
import { Reveal } from '../components/Motion'
import { ParallaxBand, ParallaxImage } from '../components/Parallax'
import { CtaBanner, PageHeader, SectionTitle } from '../components/Sections'
import { SITE_URL, business } from '../data/business'
import { services } from '../data/services'
import { photos, serviceImages } from '../data/media'

const serviceListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/services/${s.slug}`,
    name: s.keyword,
  })),
}

export default function Services() {
  return (
    <>
      <Seo
        title="Car Accessories Services"
        path="/services"
        description={`Car seat covers, Android stereo fitting, ambient lighting, 7D floor mats, exterior styling, reverse cameras and parking sensors in Theni. Expert fitting at ${business.name}.`}
        keywords={services.map((s) => s.keyword)}
        jsonLd={[serviceListSchema, breadcrumbSchema([{ name: 'Services', path: '/services' }])]}
      />
      <PageHeader
        eyebrow="Services"
        title="Car Accessories & Fitting Services"
        subtitle="Complete car upgrades in Theni: interiors, audio, lighting, exterior styling and safety electronics."
        crumbs={[{ name: 'Services' }]}
        image={photos.combo.src}
      />

      <section className="section">
        <div className="container">
          <div className="service-rows">
            {services.map((s, i) => (
              <Reveal key={s.slug} className={`service-row ${i % 2 ? 'is-reverse' : ''}`}>
                <div className="service-row__visual">
                  <ParallaxImage src={serviceImages[s.slug].src} alt={serviceImages[s.slug].alt} speed={50} />
                  <span className="service-row__num">0{i + 1}</span>
                </div>
                <div className="service-row__body">
                  <p className="eyebrow">{s.keyword}</p>
                  <h2>{s.name}</h2>
                  <p>{s.summary}</p>
                  <ul className="ticks">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f}>
                        <Icon name="check" size={18} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link className="btn btn--primary" to={`/services/${s.slug}`}>
                    View details <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBand src={photos.sonetSeats.src} tall>
        <p className="eyebrow">One shop, every upgrade</p>
        <h2>Interiors, audio, lighting and safety.</h2>
        <p>Same-day fitting for most jobs at our Theni workshop.</p>
      </ParallaxBand>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="Before & after" title="See what a full interior makeover looks like" />
          <BeforeAfter />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
