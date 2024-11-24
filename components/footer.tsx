import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="py-12 px-4 md:px-6">
        <div className="bg-muted/50 rounded-lg p-6 shadow-sm">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                À propos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Notre histoire
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    L&apos;équipe
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Ressources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">
                Contact
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Nous contacter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>© 2024 Manweb. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
