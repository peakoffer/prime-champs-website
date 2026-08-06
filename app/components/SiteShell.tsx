const primaryLinks = [
  { href: "/athletes", label: "For athletes" },
  { href: "/brands", label: "For brands" },
  { href: "/approach", label: "How it works" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  const headerCta =
    currentPath === "/brands"
      ? { href: "/apply?type=brand", label: "Start a campaign brief" }
      : currentPath === "/athletes" || currentPath === "/"
        ? { href: "/apply?type=athlete", label: "Apply now" }
        : { href: "/apply", label: "Apply / inquire" };

  return (
    <header className="site-header">
      <a className="brand-lockup" href="/" aria-label="Prime Champs home">
        <img
          src="/brand/prime-champs-wordmark-reversed.svg"
          alt="Prime Champs"
          width="1463"
          height="390"
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
        href={headerCta.href}
        data-track="cta_click"
        data-track-label="header_primary_cta"
        data-track-location="header"
        aria-current={currentPath === "/apply" ? "page" : undefined}
      >
        {headerCta.label} <span aria-hidden="true">↗</span>
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
          <a href={headerCta.href} aria-current={currentPath === "/apply" ? "page" : undefined}>
            {headerCta.label} ↗
          </a>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid footer-grid-compact">
        <div className="footer-brand">
          <a className="footer-brand-lockup" href="/" aria-label="Prime Champs home">
            <img
              src="/brand/prime-champs-wordmark-reversed.svg"
              alt="Prime Champs"
              width="1463"
              height="390"
              loading="lazy"
              decoding="async"
            />
          </a>
          <span className="footer-brand-signature">Athlete × brand partnerships</span>
          <p>
            Helping athletes and brands build partnerships that fit.
          </p>
        </div>

        <div>
          <p className="footer-label">Explore</p>
          <a href="/athletes">For athletes</a>
          <a href="/brands">For brands</a>
          <a href="/approach">How it works</a>
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
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <p className="legal-identity">
            Prime Champs is a trade name of VisionWave Agency LLC.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Prime Champs</span>
        <span className="footer-signoff">
          <img
            src="/brand/prime-champs-monogram-white.svg"
            alt=""
            width="1081"
            height="597"
            loading="lazy"
            decoding="async"
          />
          Built for the long game.
        </span>
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
    <a className={`text-link${inverse ? " light" : ""}`} href={href} data-track="cta_click" data-track-label={href} data-track-location="text_link">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
