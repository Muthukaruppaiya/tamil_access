import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import { Reveal } from '../components/Motion'
import { ParallaxBand, ParallaxImage, ParallaxLayer } from '../components/Parallax'
import { CtaBanner, PageHeader, SectionTitle } from '../components/Sections'
import { business, localBusinessSchema } from '../data/business'
import { photos } from '../data/media'

const values = [
  { icon: 'award', title: 'Quality first', text: 'We recommend products we would put in our own cars, nothing less.' },
  { icon: 'tool', title: 'Craftsmanship', text: 'Neat stitching, clean wiring and perfect alignment on every job.' },
  { icon: 'rupee', title: 'Honest pricing', text: 'Clear prices and options for every budget, with no surprises.' },
  { icon: 'shield', title: 'After-sales care', text: 'We stand by our work long after you drive out of our shop.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        description={`Learn about ${business.name}, Theni's trusted car accessories, car stereo and car decor shop on New Bus Stand Road. Quality products, expert fitting and honest prices.`}
        keywords={['about Tamil Car Accessories', 'car decor shop Theni', 'car stereo store Theni']}
        jsonLd={[localBusinessSchema, breadcrumbSchema([{ name: 'About', path: '/about' }])]}
      />
      <PageHeader
        eyebrow="Our story"
        title="About Tamil Car Accessories"
        subtitle="A passion for cars, a commitment to quality, and a shop built for the drivers of Theni."
        crumbs={[{ name: 'About' }]}
        image={photos.storefront.src}
      />

      <section className="section">
        <div className="container split">
          <Reveal className="prose">
            <h2>Theni&apos;s home for car accessories and car decors</h2>
            <p>
              {business.name} is a car accessories, car stereo and car decor shop on New Bus Stand Road, Annaji Vilakku, Unjampatti, Theni. We
              help car owners make their cars more comfortable, stylish, safe and fun to drive.
            </p>
            <p>
              From custom seat covers and 7D floor mats to Android touchscreen stereos, ambient lighting, reverse cameras and exterior styling, we
              stock the accessories that matter and fit them with real craftsmanship. Our {business.rating}-star Google rating from{' '}
              {business.reviewCount} reviews reflects the care we put into every car.
            </p>
            <p>
              Customers visit us from across Theni district, including {business.serviceAreas.slice(1, 7).join(', ')} and nearby towns.
            </p>
          </Reveal>
          <div className="stack-photos">
            <ParallaxImage src={photos.storefront.src} alt={photos.storefront.alt} speed={60} className="stack-photos__main" />
            <ParallaxLayer speed={-80} className="stack-photos__float">
              <img src={photos.beigeSeats.src} alt={photos.beigeSeats.alt} loading="lazy" />
            </ParallaxLayer>
          </div>
        </div>
      </section>

      <ParallaxBand src={photos.maroonSeats.src} tall>
        <p className="eyebrow">Our promise</p>
        <h2>We make your car proud.</h2>
        <p>Comfortable, memorable drives start with the right accessories and an honest fit.</p>
      </ParallaxBand>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow="What drives us" title="Our values" />
          <div className="cards cards--4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className="card">
                  <div className="card__icon">
                    <Icon name={v.icon} size={26} />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionTitle eyebrow="Service areas" title="Proudly serving Theni and nearby towns" center={false}>
              Drive in from any of these towns for expert car accessory fitting.
            </SectionTitle>
            <Reveal className="chips chips--left">
              {business.serviceAreas.map((a) => (
                <span key={a} className="chip">
                  <Icon name="pin" size={16} /> {a}
                </span>
              ))}
            </Reveal>
          </div>
          <ParallaxImage src={photos.ertiga.src} alt={photos.ertiga.alt} speed={70} className="about-photo" />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
