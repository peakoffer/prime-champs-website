import Link from "next/link";

const primaryLinks = [
  { href: "/athletes", label: "For athletes" },
  { href: "/brands", label: "For brands" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Prime Champs home">
        <img
          src="/media/prime-champs-wordmark.png"
          alt="Prime Champs"
          width="152"
          height="83"
        />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/apply">
        Start a conversation <span aria-hidden="true">↗</span>
      </Link>

      <details className="mobile-nav">
        <summary aria-label="Open navigation">
          <span>Menu</span>
          <i aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/apply">Start a conversation ↗</Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow">The next move starts here</p>
        <h2>Build the partnership people remember.</h2>
        <Link className="text-link light" href="/apply">
          Tell us what you&apos;re building <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <img
            src="/media/prime-champs-wordmark.png"
            alt="Prime Champs"
            width="176"
            height="96"
          />
          <p>
            Athlete representation, brand partnerships, and campaign support
            built for the pace of modern sports culture.
          </p>
        </div>

        <div>
          <p className="footer-label">Explore</p>
          <Link href="/athletes">For athletes</Link>
          <Link href="/brands">For brands</Link>
          <Link href="/about">About Prime Champs</Link>
          <Link href="/apply">Apply or inquire</Link>
        </div>

        <div>
          <p className="footer-label">Connect</p>
          <a href="mailto:info@prime-champs.com">info@prime-champs.com</a>
          <a
            href="https://www.instagram.com/primechamps"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </div>

        <div>
          <p className="footer-label">Details</p>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <p className="legal-identity">
            Prime Champs is a trade name of VisionWave Agency LLC.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Prime Champs</span>
        <span>Built for the long game.</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export function ArrowLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <Link className={`text-link${inverse ? " light" : ""}`} href={href}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}
