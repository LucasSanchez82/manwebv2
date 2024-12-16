import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export function MangaDexAcknowledgment() {
  return (
    <section className="container mx-auto py-24 sm:py-32">
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Remerciements à MangaDex
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Manweb utilise les services de MangaDex pour vous offrir une
            expérience de lecture optimale. Nous tenons à remercier MangaDex
            pour leur API et leurs services qui enrichissent notre plateforme.
          </p>
          <Link
            href="https://mangadex.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Visitez MangaDex
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
