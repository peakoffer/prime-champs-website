import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Brand Opportunities & Support for Athletes",
  description:
    "Apply to Prime Champs for athlete positioning, relevant brand opportunities, negotiation, and partnership support.",
  path: "/athletes",
  keywords: ["brand deals for athletes", "athlete representation", "athlete sponsorship agency", "sports partnerships"],
});

const applySteps = [
  ["01", "Apply", "Share your sport, best social profile, and what you want to build."],
  ["02", "We review", "We look at your story, audience, credibility, goals, and current fit."],
  ["03", "We reach out", "If there is a strong next step, we contact you directly."],
];

export default function AthletesPage() {
  return (
    <PageShell currentPath="/athletes">
      <section className="subpage-hero athlete-page-hero concise-athlete-hero">
        <div className="subpage-hero-copy">
          <p className="eyebrow">For athletes</p>
          <h1>Ready for better brand opportunities?</h1>
          <p>
            Apply once. We&apos;ll review your sport, story, audience, and goals.
            If there is a strong fit, we&apos;ll contact you.
          </p>
          <a className="button-primary" href="/apply?type=athlete">
            Apply now <span aria-hidden="true">↗</span>
          </a>
          <p className="hero-fine-print">
            Following size isn&apos;t everything. Applying does not guarantee representation or a deal.
          </p>
        </div>
        <div className="subpage-hero-image">
          <img src="/media/fight-training.jpg" alt="Combat athlete training with a coach" width="1260" height="1549" fetchPriority="high" />
          <div className="image-data-label"><span>FOCUS</span><strong>Sport × story × audience</strong></div>
        </div>
      </section>

      <section className="athlete-fit-rail" aria-label="What Prime Champs looks for">
        <span>Active competitors</span>
        <span>A real story</span>
        <span>Ready to work with brands</span>
      </section>

      <section className="athlete-steps section-pad dark-section">
        <div className="quick-section-head">
          <p className="eyebrow">How it works</p>
          <h2>Three steps. No runaround.</h2>
        </div>
        <div className="quick-step-grid inverse-grid">
          {applySteps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sports-section compact-sports-section section-pad">
        <div className="sports-image">
          <img src="/media/surf-camera.jpg" alt="Surfer launching above a wave during a filmed session" width="1260" height="1853" loading="lazy" decoding="async" />
        </div>
        <div className="sports-copy">
          <p className="eyebrow dark">Who can apply</p>
          <h2>Serious athletes with something real to build.</h2>
          <p>
            Professional, national, collegiate, emerging, and creator-athletes
            across sports are welcome to apply.
          </p>
          <div className="sports-tags">
            <span>Combat</span><span>Motorsports</span><span>Surf</span>
            <span>Athletics</span><span>Volleyball</span><span>Hockey</span>
            <span>Action sports</span><span>Other sports</span>
          </div>
          <a className="button-primary" href="/apply?type=athlete">Send your profile <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="faq-section concise-faq section-pad">
        <div>
          <p className="eyebrow dark">Quick answers</p>
          <h2>Before you apply.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Do I need a huge following?</summary>
            <p>No. Your sport, story, audience quality, momentum, and professionalism all matter.</p>
          </details>
          <details>
            <summary>Does applying guarantee representation?</summary>
            <p>No. We review every profile for fit and current capacity.</p>
          </details>
          <details>
            <summary>Do you guarantee sponsorship income?</summary>
            <p>No. We can pursue and manage opportunities, but no deal or income is guaranteed.</p>
          </details>
          <details>
            <summary>What happens next?</summary>
            <p>If we see a strong next step, we&apos;ll contact you directly.</p>
          </details>
        </div>
      </section>

    </PageShell>
  );
}
