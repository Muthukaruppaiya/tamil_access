import { logoSrc } from '../data/media'

export default function Logo({ size = 42 }) {
  return <img className="logo" src={logoSrc} width={size} height={size} alt="" aria-hidden="true" />
}
