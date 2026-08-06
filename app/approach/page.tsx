import type { Metadata } from "next";
import { ArrowLink, PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Athlete–Brand Partnership Approach",
  description:
    "See how Prime Champs evaluates athlete–brand fit, structures partnership expectations, and manages the work from first conversation through execution.",
  path: "/approach",
  keywords: ["athlete partnership process", "athlete scouting criteria", "sports sponsorship strategy", "brand athlete fit"],
});

const fitDimensions = [
  ["01", "Competitive credibility", "Performance context, discipline, momentum, and the authority the athlete carries inside the sport."],
  ["02", "Audience quality", "Who pays attention, why they care, and whether the relationship is strong enough to support the campaign idea."],
  ["03", "Professional readiness", "Responsiveness, reliability, content capability, existing obligations, and readiness to deliver."],
  ["04", "Rights and timing", "Category conflicts, usage expectations, schedule, geography, and the practical limits around the opportunity."],
  ["05", "Commercial alignment", "Brand values, objective, creative role, budget, and whether both sides can build something credible."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Prime Champs evaluate partnership fit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prime Champs reviews competitive credibility, audience quality, professional readiness, rights and timing, and commercial alignment before recommending a partnership.",
      },
    },
    {
      "@type": "Question",
      name: "Does applying guarantee representation or sponsorship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. An inquiry starts a review. Prime Champs does not guarantee representation, sponsorship, campaign performance, or income.",
      },
    },
  ],
};

export default function ApproachPage() {
  return (
    <PageShell currentPath="/approach">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />

      <section className="approach-hero">
        <div>
          <p className="eyebrow">The Prime Champs standard</p>
          <h1>Right athlete. Right brand. Clear terms.</h1>
        </div>
        <div className="approach-hero-side">
          <p>
            The best partnerships feel obvious to the audience because the work
            behind them was deliberate from the first conversation.
          </p>
          <a className="button-primary" href="/apply">Start a fit review ↗</a>
        </div>
      </section>

      <section className="ledger-section section-pad" aria-labelledby="ledger-title">
        <div className="ledger-header">
          <p className="eyebrow dark">Partnership work / end to end</p>
          <h2 id="ledger-title">What serious representation looks like.</h2>
          <p>
            We combine direct relationship management with commercial discipline.
            Every opportunity starts with context, moves through clear alignment,
            and stays accountable through delivery.
          </p>
        </div>
        <div className="ledger-grid">
          <article><span>LISTEN</span><h3>Start with the athlete and the brief</h3><p>Goals, identity, audience, timing, and non-negotiables come before outreach.</p></article>
          <article><span>ALIGN</span><h3>Make the commercial reality clear</h3><p>Creative role, value, deliverables, usage, schedule, and expectations are shaped together.</p></article>
          <article><span>DELIVER</span><h3>Stay accountable through execution</h3><p>We support communication, negotiation, handoffs, and the decision to extend the work.</p></article>
        </div>
      </section>

      <section className="fit-section section-pad dark-section">
        <div className="section-heading split-heading light-heading">
          <div><p className="eyebrow">The fit screen</p><h2>Five questions before the pitch.</h2></div>
          <p>Follower count can inform a decision. It cannot carry one. Each opportunity has to survive a more complete commercial review.</p>
        </div>
        <div className="fit-list">
          {fitDimensions.map(([number, title, copy]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="claim-standard section-pad">
        <div>
          <p className="eyebrow dark">Professional standards</p>
          <h2>Clear claims build better partnerships.</h2>
        </div>
        <div className="claim-grid">
          <article className="claim-yes">
            <span>WE STAND BEHIND</span>
            <ul>
              <li>The services and commercial decisions we support.</li>
              <li>The direct athlete and brand relationships we manage.</li>
              <li>The responsibilities and expectations agreed for each engagement.</li>
              <li>Our legal business identity and direct contact information.</li>
            </ul>
          </article>
          <article className="claim-no">
            <span>WE VERIFY BEFORE PUBLISHING</span>
            <ul>
              <li>Testimonials without the speaker&apos;s approval.</li>
              <li>Client or partner logos without a documented relationship.</li>
              <li>Campaign outcomes without a source and a clear measurement period.</li>
              <li>Private deal terms or athlete information that should stay private.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="standards-cta">
        <div><p className="eyebrow">Ready to test the fit?</p><h2>Bring the context. We&apos;ll bring the questions.</h2></div>
        <ArrowLink href="/apply" inverse>Submit an athlete or brand inquiry</ArrowLink>
      </section>
    </PageShell>
  );
}
