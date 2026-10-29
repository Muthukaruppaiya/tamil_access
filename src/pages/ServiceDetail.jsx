import { Link, useParams } from 'react-router-dom'
import Seo, { breadcrumbSchema, faqSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { Reveal } from '../components/Motion'
import { ParallaxImage, ParallaxLayer } from '../components/Parallax'
import { CtaBanner, FaqList, PageHeader } from '../components/Sections'
import { SITE_URL, business, waLink } from '../data/business'
import { getService, services } from '../data/services'
import { serviceImages } from '../data/media'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const path = `/services/${service.slug}`
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.keyword,
    serviceType: service.name,
    description: service.summary,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: business.serviceAreas.map((name) => ({ '@type': 'City', name })),
  }
  const others = services.filter((s) => s.slug !== service.slug)
  const image = serviceImages[service.slug]

  return (
    <>
      <Seo
        title={service.keyword}
        path={path}
        description={`${service.summary} Best ${service.name.toLowerCase()} in Theni at ${business.name}. Call ${business.phoneDisplay}.`}
        keywords={[service.keyword, `${service.name} near me`, `${service.name} Theni`]}
        jsonLd={[
          serviceSchema,
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Services', path: '/services' },
            { name: service.name, path },
          ]),
        ]}
      />
      <PageHeader
        eyebrow={service.name}
        title={service.keyword}
        subtitle={service.summary}
        crumbs={[{ name: 'Services', path: '/services' }, { name: service.name }]}
        image={image.src}
      />

      <section className="section">
        <div className="container split split--top">
          <Reveal className="prose">
            <h2>{service.name} by experts</h2>
            <p>{service.description}</p>
            <h3>What you get</h3>
            <ul className="ticks">
              {service.features.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} /> {f}
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <a className="btn btn--primary" href={waLink(`Hi ${business.name}, I need ${service.name} for my car. Car model: `)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={20} /> Enquire on WhatsApp
              </a>
              <a className="btn btn--ghost" href={`tel:${business.phone}`}>
                <Icon name="phone" size={18} /> Call Now
              </a>
            </div>
          </Reveal>
          <div className="stack-photos">
            <ParallaxImage src={image.src} alt={image.alt} speed={60} className="stack-photos__main" />
            <ParallaxLayer speed={-80} className="stack-photos__float stack-photos__float--icon">
              <Icon name={service.icon} size={40} strokeWidth={1.5} />
            </ParallaxLayer>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split split--top">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>{service.name} questions</h2>
          </div>
          <FaqList items={service.faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="is-center">Other services</h2>
          <div className="mini-links">
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="mini-link">
                <Icon name={s.icon} size={22} /> {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={`Need ${service.name.toLowerCase()} for your car?`} />
    </>
  )
}
