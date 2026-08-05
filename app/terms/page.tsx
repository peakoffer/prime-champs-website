import { PageShell } from "../components/SiteShell";

export default function TermsPage() {
  return (
    <PageShell>
      <article className="legal-page">
        <p className="eyebrow dark">Last updated August 5, 2026</p>
        <h1>Website terms</h1>
        <p className="legal-lead">
          These terms govern your use of the Prime Champs website. Separate
          signed agreements govern any representation, referral, consulting,
          sponsorship, or campaign services.
        </p>

        <section>
          <h2>Informational purpose</h2>
          <p>
            Website content describes our services in general terms. It is not
            a binding offer, legal advice, financial advice, or a guarantee of
            representation, acceptance by a platform or brand, a sponsorship,
            campaign performance, payment amount, or income.
          </p>
        </section>

        <section>
          <h2>Inquiry submissions</h2>
          <p>
            You agree that information submitted through this website is
            accurate and that you are authorized to provide it. Sending an
            inquiry does not create an agency, employment, partnership,
            fiduciary, or other professional relationship.
          </p>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            The Prime Champs name, branding, site design, original copy, and
            owned media are protected by applicable intellectual property laws.
            Third-party names, marks, and media remain the property of their
            respective owners.
          </p>
        </section>

        <section>
          <h2>Acceptable use</h2>
          <p>
            You may not interfere with the website, attempt unauthorized access,
            submit unlawful or misleading information, harvest data, impersonate
            another person or organization, or use the site to violate another
            party&apos;s rights.
          </p>
        </section>

        <section>
          <h2>Availability and liability</h2>
          <p>
            We may change or discontinue website features at any time. To the
            extent permitted by law, the website is provided as available and
            without warranties. Prime Champs is not liable for indirect,
            incidental, consequential, or special damages arising solely from
            use of this website.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms may be sent to{" "}
            <a href="mailto:info@prime-champs.com">info@prime-champs.com</a>.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
