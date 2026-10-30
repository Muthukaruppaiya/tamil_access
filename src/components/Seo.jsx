import { Helmet } from 'react-helmet-async'
import { SITE_URL, business } from '../data/business'

const DEFAULT_IMAGE = '/images/instagram/post-02.jpg'

export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, keywords = [], jsonLd = [], noindex = false }) {
  const fullTitle = title ? `${title} | ${business.name} Theni` : `${business.name} | Best Car Accessories & Car Decors Shop in Theni`
  const url = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const allKeywords = [
    business.name,
    'Tamil Car Accessories Theni',
    'car accessories Theni',
    'car decors Theni',
    ...keywords,
  ].join(', ')
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
