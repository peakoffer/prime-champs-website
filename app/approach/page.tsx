import type { Metadata } from "next";
import { ArrowLink, PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Athlete–Brand Partnership Approach",
  description:
    "See how Prime Champs researches athletes, assesses commercial fit, structures partnership expectations, and distinguishes process evidence from outcome claims.",
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
      name: "Does Prime Champs publish a client roster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prime Champs does not describe its internal research database as a public client roster. Named relationships and outcomes are published only when approval and substantiation are available.",
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
          <h1>Evidence before endorsement.</h1>
        </div>
        <div className="approach-hero-side">
          <p>
            Trust is not a wall of borrowed logos. It is a clear method, careful
            claims, and work both sides can understand before they commit.
          </p>
          <a className="button-primary" href="/apply">Start a fit review ↗</a>
        </div>
      </section>

      <section className="ledger-section section-pad" aria-labelledby="ledger-title">
        <div className="ledger-header">
          <p className="eyebrow dark">Research coverage / August 2026</p>
          <h2 id="ledger-title">What we can substantiate today.</h2>
          <p>
            Our internal scouting source currently contains more than 300 athlete
            profiles spanning at least eight sport categories. That is research
            coverage—not a claim that every profile is represented by Prime Champs.
          </p>
        </div>
        <div className="ledger-grid">
          <article><span>300+</span><h3>Profiles researched</h3><p>Structured athlete records used to assess potential partnership fit.</p></article>
          <article><span>8+</span><h3>Sport categories</h3><p>Cross-category coverage from combat and motorsport to surf and athletics.</p></article>
          <article><span>5</span><h3>Fit dimensions</h3><p>A common screen for credibility, audience, readiness, rights, and alignment.</p></article>
        </div>
        <p className="ledger-source">
          Source: Prime Champs internal athlete research materials reviewed August 5, 2026.
          Methodology and underlying records are private; named relationships are not implied.
        </p>
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
          <p className="eyebrow dark">Claim discipline</p>
          <h2>What we say—and what we refuse to imply.</h2>
        </div>
        <div className="claim-grid">
          <article className="claim-yes">
            <span>WE CAN SAY</span>
            <ul>
              <li>How our scouting and qualification process works.</li>
              <li>Which services and commercial decisions we support.</li>
              <li>How many profiles and sport categories our research system covers.</li>
              <li>Our legal business identity and direct contact information.</li>
            </ul>
          </article>
          <article className="claim-no">
            <span>WE WILL NOT INVENT</span>
            <ul>
              <li>Testimonials without the speaker&apos;s approval.</li>
              <li>Client or partner logos without a documented relationship.</li>
              <li>Campaign outcomes without a source and a clear measurement period.</li>
              <li>A public roster from private scouting or prospect data.</li>
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
