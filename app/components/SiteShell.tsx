const primaryLinks = [
  { href: "/athletes", label: "For athletes" },
  { href: "/brands", label: "For brands" },
  { href: "/approach", label: "Our approach" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="/" aria-label="Prime Champs home">
        <img
          src="/media/prime-champs-wordmark.png"
          alt="Prime Champs"
          width="250"
          height="136"
          fetchPriority="high"
        />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            aria-current={currentPath === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        className="header-cta"
        href="/apply"
        aria-current={currentPath === "/apply" ? "page" : undefined}
      >
        Start a conversation <span aria-hidden="true">↗</span>
      </a>

      <details className="mobile-nav">
        <summary aria-label="Toggle navigation menu">
          <span>Menu</span>
          <i aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {primaryLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              aria-current={currentPath === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a href="/apply" aria-current={currentPath === "/apply" ? "page" : undefined}>
            Start a conversation ↗
          </a>
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
        <a className="text-link light" href="/apply">
          Tell us what you&apos;re building <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <img
            src="/media/prime-champs-wordmark.png"
            alt="Prime Champs"
            width="176"
            height="96"
            loading="lazy"
            decoding="async"
          />
          <p>
            Athlete representation, brand partnerships, and campaign support
            built for the pace of modern sports culture.
          </p>
        </div>

        <div>
          <p className="footer-label">Explore</p>
          <a href="/athletes">For athletes</a>
          <a href="/brands">For brands</a>
          <a href="/approach">Our approach</a>
          <a href="/about">About Prime Champs</a>
          <a href="/apply">Apply or inquire</a>
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
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
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

export function PageShell({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader currentPath={currentPath} />
      <main id="main-content">{children}</main>
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
    <a className={`text-link${inverse ? " light" : ""}`} href={href}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
