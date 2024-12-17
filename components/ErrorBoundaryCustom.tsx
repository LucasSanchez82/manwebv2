import { PropsWithChildren } from 'react'

export default function ErrorBoundarySuspens(props: PropsWithChildren) {
  return <ErrorBoundarySuspens>{props.children}</ErrorBoundarySuspens>
}
