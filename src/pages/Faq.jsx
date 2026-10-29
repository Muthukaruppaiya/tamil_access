import Seo, { breadcrumbSchema, faqSchema } from '../components/Seo'
import { CtaBanner, FaqList, PageHeader } from '../components/Sections'
import { business } from '../data/business'
import { faqs } from '../data/faqs'
import { photos } from '../data/media'

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ"
        path="/faq"
        description={`Answers to common questions about ${business.name} in Theni: location, timings, products, fitting, warranty and WhatsApp quotes.`}
        jsonLd={[faqSchema(faqs), breadcrumbSchema([{ name: 'FAQ', path: '/faq' }])]}
      />
      <PageHeader eyebrow="Help" title="Frequently Asked Questions" subtitle="Everything you need to know before visiting our shop." crumbs={[{ name: 'FAQ' }]} image={photos.ertiga.src} />
      <section className="section">
        <div className="container container--narrow">
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBanner title="Still have a question?" text="Call or WhatsApp us and we will be happy to help." />
    </>
  )
}
