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

export default function ApproachPage() {
  return (
    <PageShell currentPath="/approach">
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
          <p className="eyebrow dark">From first fit to follow-through</p>
          <h2 id="ledger-title">What disciplined partnership work looks like.</h2>
          <p>
            Our approach combines personal context with commercial discipline.
            Every opportunity starts with context, moves through clear
            alignment, and stays accountable through delivery.
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
          <h2>Clear expectations make better partnerships.</h2>
        </div>
        <div className="claim-grid">
          <article className="claim-yes">
            <span>BEFORE THE AGREEMENT</span>
            <ul>
              <li>Deliverables and the athlete&apos;s creative role.</li>
              <li>Compensation and payment timing.</li>
              <li>Usage rights, category restrictions, and exclusivity.</li>
              <li>The approval path and working deadlines.</li>
            </ul>
          </article>
          <article className="claim-no">
            <span>THROUGH DELIVERY</span>
            <ul>
              <li>Named points of contact on both sides.</li>
              <li>Clear communication, approvals, and handoffs.</li>
              <li>Progress against the agreed deliverables.</li>
              <li>A closeout and a clear decision about what comes next.</li>
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
