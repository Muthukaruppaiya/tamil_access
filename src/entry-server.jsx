import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles.css'

export { SITE_URL } from './data/business'
export { services } from './data/services'

export function render(url) {
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
  const { helmet } = helmetContext
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((t) => t.toString()).join('\n    ')
  return { html, head, htmlAttributes: helmet.htmlAttributes.toString() }
}
