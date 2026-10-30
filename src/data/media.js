const dir = '/images/instagram'

const reel = (code) => `https://www.instagram.com/reel/${code}/`

export const instagram = {
  url: 'https://www.instagram.com/tamil_car_accessories1/',
  reelsUrl: 'https://www.instagram.com/tamil_car_accessories1/reels/',
  handle: 'tamil_car_accessories1',
  followers: '5,485',
}

export const logoSrc = `${dir}/logo.jpg`

function shot(file, title, alt, code) {
  return {
    src: `${dir}/${file}`,
    title,
    alt,
    href: code ? reel(code) : instagram.reelsUrl,
  }
}

export const photos = {
  shop: shot('post-shop.jpg', 'Our Theni shop', 'Road to Tamil Car Accessories in Theni, from our Instagram', 'DDG7ZkRIYHB'),
  sunFilm: shot('post-01.jpg', 'Sun control film', 'Nano ceramic sun control film for a cooler car cabin', 'DfGZQezPFEp'),
  swift360: shot('post-02.jpg', 'Swift 360° camera', 'Maruti Swift fitted with an Android stereo and 360 degree camera', 'DfD00Movtv0'),
  doorGuard: shot('post-03.jpg', 'Door edge guard', 'Door edge guard that keeps car paint safe from scratches', 'DfBNhHOPCmw'),
  subwoofer: shot('post-04.jpg', 'Subwoofers', 'Under-seat, spare-wheel and box subwoofers in stock', 'De5nW0yPZDi'),
  camera360: shot('post-05.jpg', '360° camera setup', 'Android player with a 360 degree bird’s-eye camera', 'De29K-YvTv9'),
  combo: shot('post-06.jpg', 'Android + speaker combo', 'MOCO Android player and speaker combo offer', 'De0YtfMvO5L'),
  sonetSeats: shot('post-07.jpg', 'Kia Sonet seat covers', 'Kia Sonet seat covers in black and beige', 'Dex0CRwPLCZ'),
  i20Audio: shot('post-08.jpg', 'i20 Nakamichi audio', 'Hyundai i20 with a Nakamichi two-way audio setup', 'Deu_T0Rzfgp'),
  blindSpot: shot('post-09.jpg', 'Blind spot mirror', 'Blind spot mirror for safer lane changes', 'DenfS3IPV6m'),
  neckPillow: shot('post-10.jpg', 'Neck pillow', 'Memory foam neck pillow for long drives', 'Dek3MZRPHSo'),
  moco: shot('post-11.jpg', 'MOCO Android system', 'MOCO Android system with Aura speakers', 'DeiX7A_vj41'),
  sonetAudio: shot('post-12.jpg', 'Sonet Nakamichi DSP', 'Kia Sonet upgraded with a Nakamichi DSP audio setup', null),
}

export const serviceImages = {
  'car-seat-covers': photos.sonetSeats,
  'android-car-stereo': photos.combo,
  'car-ambient-lighting': photos.sunFilm,
  'car-floor-mats': photos.neckPillow,
  'exterior-car-accessories': photos.doorGuard,
  'reverse-camera-parking-sensors': photos.swift360,
}

export const workGallery = [
  photos.sonetSeats,
  photos.swift360,
  photos.combo,
  photos.subwoofer,
  photos.camera360,
  photos.i20Audio,
  photos.sunFilm,
  photos.moco,
  photos.doorGuard,
  photos.blindSpot,
  photos.neckPillow,
  photos.sonetAudio,
]

export const reels = [photos.swift360, photos.sonetSeats, photos.combo, photos.subwoofer, photos.camera360, photos.i20Audio].map((p) => ({
  poster: p.src,
  title: p.title,
  text: p.alt,
  href: p.href,
}))
