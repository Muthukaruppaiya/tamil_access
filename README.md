# Tamil Car Accessories – Website

React + Vite website for Tamil Car Accessories, Theni. Includes scroll and pointer parallax, a before/after interior slider, real shop photos from the Google Maps listing, and pre-rendered static HTML for SEO.

## Commands

```bash
npm install
npm run dev      # local development at http://localhost:5173
npm run build    # production build + pre-render every page into dist/
npm run preview  # serve dist/ locally
```

Upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, Hostinger, etc.).

## Before going live

1. Set the real domain in `src/data/business.js` (`SITE_URL`), then rebuild. It drives canonical URLs, `sitemap.xml`, `robots.txt` and structured data.
2. Confirm shop timings, services and products with the client (`src/data/*.js`).
3. Shop photos live in `public/images/shop/` and are listed in `src/data/media.js`.
4. Videos: download the shop's reels (Google Maps / Instagram) as MP4 into `public/videos/` and set the `video` field of the matching reel in `src/data/media.js`. Reels without a video link to the Google Maps listing instead.

## SEO checklist after deploy

- Add the site to Google Search Console and submit `https://<domain>/sitemap.xml`.
- Add the website URL to the client's Google Business Profile.
- Use the exact same name, address and phone (NAP) everywhere: Google, JustDial, Facebook, Instagram.
- Ask happy customers for Google reviews.
