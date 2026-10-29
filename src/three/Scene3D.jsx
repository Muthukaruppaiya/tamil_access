import { Component, Suspense, lazy } from 'react'
import { ClientOnly } from '../components/Motion'

const scenes = {
  car: lazy(() => import('./CarScene')),
  wheel: lazy(() => import('./WheelScene')),
}

class WebGLBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function Scene3D({ name = 'car', className = '' }) {
  const Scene = scenes[name]
  const fallback = <div className="scene3d__fallback" aria-hidden="true" />
  return (
    <div className={`scene3d ${className}`} aria-hidden="true">
      <ClientOnly fallback={fallback}>
        <WebGLBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <Scene />
          </Suspense>
        </WebGLBoundary>
      </ClientOnly>
    </div>
  )
}
