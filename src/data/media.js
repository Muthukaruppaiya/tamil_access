const dir = '/images/shop'

export const photos = {
  storefront: {
    src: `${dir}/tamil-car-accessories-theni-storefront.jpg`,
    alt: 'Tamil Car Accessories shop front on New Bus Stand Road, Annaji Vilakku, Theni',
    title: 'Our Theni showroom',
  },
  maroonSeats: {
    src: `${dir}/maroon-leather-seat-covers.jpg`,
    alt: 'Maroon leather car seat covers fitted at Tamil Car Accessories Theni',
    title: 'Maroon leather seat covers',
  },
  beigeSeats: {
    src: `${dir}/beige-quilted-seat-covers.jpg`,
    alt: 'Beige diamond-quilted car seat covers with black piping fitted in Theni',
    title: 'Diamond-quilted seat covers',
  },
  stereo: {
    src: `${dir}/android-stereo-360-camera-install.jpg`,
    alt: 'Android car stereo with 360 degree camera installed in a Maruti Ertiga',
    title: 'Android stereo + 360° camera',
  },
  ertiga: {
    src: `${dir}/ertiga-exterior-styling-workshop.jpg`,
    alt: 'White Maruti Ertiga with roof spoiler and rear guard at the Tamil Car Accessories workshop',
    title: 'Exterior styling – Ertiga',
  },
  interior: {
    src: '/images/interior-after.jpg',
    alt: 'Car interior upgraded with seat covers, ambient lighting and floor mats',
    title: 'Full interior makeover',
  },
}

export const serviceImages = {
  'car-seat-covers': photos.beigeSeats,
  'android-car-stereo': photos.stereo,
  'car-ambient-lighting': photos.interior,
  'car-floor-mats': photos.maroonSeats,
  'exterior-car-accessories': photos.ertiga,
  'reverse-camera-parking-sensors': photos.stereo,
}

export const workGallery = [photos.beigeSeats, photos.stereo, photos.maroonSeats, photos.ertiga, photos.interior, photos.storefront]

// Set `video` to a file in /public/videos to play it inline; otherwise the reel links to the Google Maps listing.
export const reels = [
  { poster: `${dir}/reel-shop-tour.jpg`, title: 'Shop tour', text: 'Speakers, stereos and amplifiers in stock', video: null },
  { poster: `${dir}/reel-thar-accessories.jpg`, title: 'Thar accessories', text: 'Upgrades picked for the Mahindra Thar', video: null },
  { poster: `${dir}/reel-new-arrivals.jpg`, title: 'New arrivals', text: 'Latest Android stereos unboxed', video: null },
  { poster: `${dir}/reel-saving-offers.jpg`, title: 'Combo offers', text: 'Save more with accessory combos', video: null },
]
