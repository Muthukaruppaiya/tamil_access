import Seo, { breadcrumbSchema } from '../components/Seo'
import Icon from '../components/Icon'
import BeforeAfter from '../components/BeforeAfter'
import { Reveal } from '../components/Motion'
import { ParallaxBand, ParallaxLayer } from '../components/Parallax'
import { CtaBanner, InstagramBand, PageHeader, ReelGrid, SectionTitle } from '../components/Sections'
import { business } from '../data/business'
import { instagram, photos, reels, workGallery } from '../data/media'

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
        image={photos.sonetSeats.src}
      />

      <InstagramBand />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Showcase" title="Recent projects">
            Photos from our Instagram, @{instagram.handle}.
          </SectionTitle>
          <div className="pgallery">
            {columns.map((col, c) => (
              <ParallaxLayer key={c} speed={columnSpeeds[c]} className="pgallery__col">
                {col.map((p) => (
                  <figure key={p.src} className="pgallery__item">
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      <img src={p.src} alt={p.alt} loading="lazy" />
                    </a>
                    <figcaption>{p.title}</figcaption>
                  </figure>
                ))}
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBand src={photos.camera360.src}>
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
          <SectionTitle eyebrow="Videos" title="Watch us on Instagram" />
          <ReelGrid items={reels} />
          <Reveal className="gallery__more">
            <p>More photos and videos are on our Instagram, updated from the Theni shop.</p>
            <a className="btn btn--primary" href={instagram.reelsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" size={18} /> Watch on Instagram
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
