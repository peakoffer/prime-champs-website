import Link from "next/link";
import { ArrowLink, PageShell } from "../components/SiteShell";

const campaignTypes = [
  ["LAUNCH", "Product and category launches", "Put the product inside a credible performance story, not beside a borrowed audience."],
  ["AMBASSADOR", "Long-term athlete partnerships", "Build familiarity and trust through a relationship with room to evolve."],
  ["CONTENT", "Social and platform campaigns", "Match the athlete, format, and idea to how the audience actually consumes sports culture."],
  ["EVENT", "Appearances and live activations", "Turn competitive moments, events, and communities into participatory brand experiences."],
];

export default function BrandsPage() {
  return (
    <PageShell>
      <section className="subpage-hero brand-page-hero">
        <div className="subpage-hero-copy">
          <p className="eyebrow">Partnerships for ambitious brands</p>
          <h1>Find the athlete your audience will believe.</h1>
          <p>
            Prime Champs helps brands move from campaign objective to athlete
            match, partnership structure, and activation—with one accountable
            team between brief and delivery.
          </p>
          <Link className="button-primary" href="/apply?type=brand">
            Start a campaign brief ↗
          </Link>
        </div>
        <div className="subpage-hero-image brand-hero-image">
          <img src="/media/surf-carve.jpg" alt="Surfer carving across a blue wave" />
          <div className="image-data-label"><span>FILTER</span><strong>Credibility × audience</strong></div>
        </div>
      </section>

      <section className="campaign-section section-pad">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow dark">Ways to work together</p>
            <h2>Start with the objective. Then earn the attention.</h2>
          </div>
          <p>
            We design the athlete brief around the business problem and the
            audience, then pursue talent that can make the idea believable.
          </p>
        </div>
        <div className="campaign-grid">
          {campaignTypes.map(([label, title, copy]) => (
            <article key={label}>
              <span>{label}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-value-section section-pad dark-section">
        <div className="brand-value-image">
          <img src="/media/cage-control.jpg" alt="View through a combat sports cage before an event" />
          <span>THE MOMENT BEFORE THE MOMENT</span>
        </div>
        <div className="brand-value-copy">
          <p className="eyebrow">What brands get</p>
          <h2>A better match—and fewer dropped handoffs.</h2>
          <ul className="check-list">
            <li><strong>Sharper talent briefs</strong><span>Audience, category, creative, timing, usage, and budget in one view.</span></li>
            <li><strong>Curated athlete fit</strong><span>A reasoned shortlist grounded in credibility and campaign reality.</span></li>
            <li><strong>Commercial alignment</strong><span>Support on scope, deliverables, compensation, and expectations.</span></li>
            <li><strong>Execution support</strong><span>Communication and follow-through from agreement to campaign close.</span></li>
          </ul>
        </div>
      </section>

      <section className="brand-process section-pad">
        <div className="brand-process-head">
          <p className="eyebrow dark">From brief to partnership</p>
          <h2>Four decisions keep the work honest.</h2>
        </div>
        <div className="brand-process-grid">
          <article><span>01 / OBJECTIVE</span><h3>What must change?</h3><p>We clarify the commercial and audience outcome before talking talent.</p></article>
          <article><span>02 / FIT</span><h3>Who can make it credible?</h3><p>We map sport, story, community, tone, reach, and brand compatibility.</p></article>
          <article><span>03 / TERMS</span><h3>What will both sides own?</h3><p>We align the idea, deliverables, rights, timing, and partnership value.</p></article>
          <article><span>04 / EXECUTION</span><h3>How does it land?</h3><p>We support delivery, communication, and the decision to extend or evolve.</p></article>
        </div>
      </section>

      <section className="inline-cta">
        <div>
          <p className="eyebrow dark">Have a live brief?</p>
          <h2>Give us the outcome, not a list of followers.</h2>
        </div>
        <ArrowLink href="/apply?type=brand">Start the brand inquiry</ArrowLink>
      </section>
    </PageShell>
  );
}
