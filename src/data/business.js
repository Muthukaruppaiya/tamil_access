// Replace with the client's real domain before deploying. Used for canonical URLs, sitemap and structured data.
export const SITE_URL = 'https://www.tamilcaraccessories.in'

export const business = {
  name: 'Tamil Car Accessories',
  tagline: 'Car Accessories & Car Decors in Theni',
  phone: '+919943388039',
  phoneDisplay: '+91 99433 88039',
  whatsapp: '919943388039',
  address: {
    street: 'New Bus Stand Road, Annaji Vilakku, Unjampatti',
    locality: 'Theni',
    district: 'Theni District',
    region: 'Tamil Nadu',
    postalCode: '625531',
    country: 'IN',
  },
  plusCode: '2FRW+5Q',
  geo: { lat: 10.0429048, lng: 77.4969197 },
  rating: 4.8,
  reviewCount: 53,
  category: 'Car stereo store',
  googleProfile: 'https://www.google.com/maps/place/Tamil+Car+Accessories/@10.0429048,77.4969197,18z',
  mapsUrl: 'https://www.google.com/maps/place/Tamil+Car+Accessories/@10.0429048,77.4969197,18z/data=!4m6!3m5!1s0x3b076bac2633ed9f:0xfb71bca7276a4a6d!8m2!3d10.0429048!4d77.4969197!16s%2Fg%2F11mt4jhffq',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.0429048,77.4969197',
  mapEmbed:
    'https://www.google.com/maps?q=Tamil+Car+Accessories&ll=10.0429048,77.4969197&z=18&output=embed',
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '21:00' },
  hoursDisplay: 'Monday – Sunday: 9:00 AM – 9:00 PM',
  serviceAreas: [
    'Theni',
    'Andipatti',
    'Periyakulam',
    'Bodinayakanur',
    'Cumbum',
    'Chinnamanur',
    'Uthamapalayam',
    'Allinagaram',
    'Gudalur',
    'Kombai',
  ],
  carBrands: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'Kia', 'Honda', 'Renault', 'MG', 'Skoda', 'Volkswagen', 'Nissan'],
}

export const fullAddress = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`

export const waLink = (message = `Hi ${business.name}, I would like to know more about your car accessories.`) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = `tel:${business.phone}`

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  alternateName: ['Tamil Car Accessories Theni', 'Tamil Car Decors'],
  description:
    'Tamil Car Accessories is a car accessories and car decor shop in Theni offering seat covers, Android car stereos, ambient lighting, floor mats, reverse cameras and exterior styling with expert fitting.',
  url: SITE_URL,
  telephone: business.phone,
  image: [
    `${SITE_URL}/images/shop/tamil-car-accessories-theni-storefront.jpg`,
    `${SITE_URL}/images/shop/beige-quilted-seat-covers.jpg`,
    `${SITE_URL}/images/shop/android-stereo-360-camera-install.jpg`,
  ],
  logo: `${SITE_URL}/logo.svg`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapsUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: business.hours.days,
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
  ],
  areaServed: business.serviceAreas.map((name) => ({ '@type': 'City', name })),
  sameAs: [business.mapsUrl],
}
