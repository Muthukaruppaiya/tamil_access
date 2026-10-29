import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { CtaBanner, PageHeader, SectionTitle } from '../components/Sections'
import { business, waLink } from '../data/business'
import { categories, products } from '../data/products'
import { photos } from '../data/media'

export default function Accessories() {
  const [active, setActive] = useState('all')
  const list = active === 'all' ? products : products.filter((p) => p.category === active)
  const catIcon = Object.fromEntries(categories.map((c) => [c.id, c.icon]))

  return (
    <>
      <Seo
        title="Car Accessories Shop"
        path="/accessories"
        description={`Shop car accessories in Theni: seat covers, 7D mats, Android stereos, speakers, LED lights, reverse cameras, chrome kits, body covers and car care at ${business.name}.`}
        keywords={['car accessories shop Theni', 'car seat cover shop', '7D car mats', 'car LED lights', 'car body cover Theni']}
        jsonLd={breadcrumbSchema([{ name: 'Accessories', path: '/accessories' }])}
      />
      <PageHeader
        eyebrow="Accessories"
        title="Car Accessories Collection"
        subtitle="Hundreds of accessories in store for every car model. Enquire on WhatsApp for availability and the best price."
        crumbs={[{ name: 'Accessories' }]}
        image={photos.maroonSeats.src}
      />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Browse" title="Find the right accessory" />
          <div className="filters" role="tablist" aria-label="Accessory categories">
            <button role="tab" aria-selected={active === 'all'} className={active === 'all' ? 'is-active' : ''} onClick={() => setActive('all')}>
              All
            </button>
            {categories.map((c) => (
              <button key={c.id} role="tab" aria-selected={active === c.id} className={active === c.id ? 'is-active' : ''} onClick={() => setActive(c.id)}>
                <Icon name={c.icon} size={18} /> {c.name}
              </button>
            ))}
          </div>

          <motion.div layout className="products">
            <AnimatePresence mode="popLayout">
              {list.map((p) => (
                <motion.article
                  key={p.name}
                  className="product"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                    <div className="product__icon">
                      <Icon name={catIcon[p.category]} size={28} />
                    </div>
                    {p.tag && <span className="product__tag">{p.tag}</span>}
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <a
                      className="product__cta"
                      href={waLink(`Hi ${business.name}, I am interested in "${p.name}". Car model: `)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" size={18} /> Enquire
                    </a>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CtaBanner title="Can't find what you need?" text="We stock much more in store and can order accessories for your exact car model. Just ask!" />
    </>
  )
}
