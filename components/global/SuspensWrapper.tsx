import { ComponentType, Suspense } from 'react'

const SuspensWrapper = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense fallback={<p>Chargement...</p>}>
      <Component {...props} />
    </Suspense>
  )

  return WrappedComponent
}

export default SuspensWrapper
