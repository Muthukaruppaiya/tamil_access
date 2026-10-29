import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import BeforeAfter from '../components/BeforeAfter'
import { Reveal } from '../components/Motion'
import { ParallaxBand, ParallaxLayer } from '../components/Parallax'
import { CtaBanner, PageHeader, ReelGrid, SectionTitle } from '../components/Sections'
import { business } from '../data/business'
import { photos, reels, workGallery } from '../data/media'

const columnSpeeds = [40, -60, 80]

export default function Gallery() {
  const columns = [[], [], []]
  workGallery.forEach((p, i) => columns[i % 3].push(p))

  return (
    <>
      <Seo
        title="Gallery – Our Work"
        path="/gallery"
        description={`See seat cover fittings, Android stereo installs, exterior styling and interior makeovers done by ${business.name} in Theni.`}
        keywords={['car interior modification Theni', 'car seat cover fitting photos', 'android stereo install Theni']}
        jsonLd={breadcrumbSchema([{ name: 'Gallery', path: '/gallery' }])}
      />
      <PageHeader
        eyebrow="Gallery"
        title="Our Work"
        subtitle="Real cars and real fittings from our Theni workshop."
        crumbs={[{ name: 'Gallery' }]}
        image={photos.beigeSeats.src}
      />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Showcase" title="Recent projects">
            Photos from our Google Maps listing.
          </SectionTitle>
          <div className="pgallery">
            {columns.map((col, c) => (
              <ParallaxLayer key={c} speed={columnSpeeds[c]} className="pgallery__col">
                {col.map((p) => (
                  <figure key={p.src} className="pgallery__item">
                    <img src={p.src} alt={p.alt} loading="lazy" />
                    <figcaption>{p.title}</figcaption>
                  </figure>
                ))}
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBand src={photos.stereo.src}>
        <p className="eyebrow">Interactive</p>
        <h2>Before &amp; after, side by side.</h2>
      </ParallaxBand>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Drag the line" title="Stock vs upgraded interior" />
          <BeforeAfter />
        </div>
      </section>

      <section className="section section--alt section--reels">
        <div className="container">
          <SectionTitle eyebrow="Videos" title="Watch us on Google Maps" />
          <ReelGrid items={reels} />
          <Reveal className="gallery__more">
            <p>See more photos, videos and customer reviews on our Google profile.</p>
            <a className="btn btn--primary" href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={18} /> View on Google Maps
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
