import { useState } from 'react'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { Reveal } from '../components/Motion'
import { PageHeader } from '../components/Sections'
import { business, fullAddress, localBusinessSchema, telLink, waLink } from '../data/business'
import { services } from '../data/services'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', car: '', service: services[0].name, message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hi ${business.name},`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Car model: ${form.car}`,
      `Service: ${form.service}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(waLink(text), '_blank', 'noopener')
  }

  const cards = [
    { icon: 'phone', title: 'Call us', value: business.phoneDisplay, href: telLink },
    { icon: 'whatsapp', title: 'WhatsApp', value: 'Chat instantly', href: waLink() },
    { icon: 'pin', title: 'Visit us', value: `${business.address.locality}, ${business.address.region}`, href: business.directionsUrl },
    { icon: 'clock', title: 'Open hours', value: business.hoursDisplay },
  ]

  return (
    <>
      <Seo
        title="Contact Us"
        path="/contact"
        description={`Contact ${business.name}, ${fullAddress}. Call or WhatsApp ${business.phoneDisplay}. Open ${business.hoursDisplay}.`}
        keywords={['Tamil Car Accessories contact number', 'Tamil Car Accessories address', 'car accessories shop near me']}
        jsonLd={[localBusinessSchema, breadcrumbSchema([{ name: 'Contact', path: '/contact' }])]}
      />
      <PageHeader eyebrow="Contact" title="Get in Touch" subtitle="Call, WhatsApp or visit our shop in Theni." crumbs={[{ name: 'Contact' }]} />

      <section className="section">
        <div className="container">
          <div className="cards cards--4">
            {cards.map((c, i) => {
              const inner = (
                <article className="card card--contact">
                  <div className="card__icon">
                    <Icon name={c.icon} size={26} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.value}</p>
                </article>
              )
              return (
                <Reveal key={c.title} delay={i * 0.06}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card-link">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split split--top">
          <Reveal>
            <h2>Send an enquiry</h2>
            <p className="muted">Fill in the details and we will continue the conversation on WhatsApp.</p>
            <form className="form" onSubmit={submit}>
              <label>
                Your name
                <input required value={form.name} onChange={set('name')} autoComplete="name" />
              </label>
              <label>
                Phone number
                <input required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" pattern="[0-9+\s-]{10,15}" />
              </label>
              <label>
                Car model
                <input required value={form.car} onChange={set('car')} placeholder="e.g. Maruti Swift 2022" />
              </label>
              <label>
                Service needed
                <select value={form.service} onChange={set('service')}>
                  {services.map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                  <option>Other</option>
                </select>
              </label>
              <label className="form__full">
                Message
                <textarea rows="4" value={form.message} onChange={set('message')} />
              </label>
              <button className="btn btn--primary btn--lg form__full" type="submit">
                <Icon name="whatsapp" size={20} /> Send on WhatsApp
              </button>
            </form>
          </Reveal>
          <Reveal>
            <address className="address-card">
              <h2>{business.name}</h2>
              <p>
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.district}
                <br />
                {business.address.region} {business.address.postalCode}
                <br />
                Plus code: {business.plusCode}
              </p>
              <p>
                <a href={telLink}>{business.phoneDisplay}</a>
              </p>
            </address>
            <div className="map map--tall">
              <iframe title="Map to Tamil Car Accessories, Theni" src={business.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <a className="btn btn--ghost" href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
              Open in Google Maps <Icon name="arrow" size={16} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
