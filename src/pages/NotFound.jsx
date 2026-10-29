import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" description="The page you are looking for could not be found." noindex />
      <section className="notfound">
        <div className="container">
          <p className="notfound__code">404</p>
          <h1>Wrong turn!</h1>
          <p>This page doesn&apos;t exist. Let&apos;s get you back on the road.</p>
          <Link to="/" className="btn btn--primary btn--lg">
            Back to Home <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
