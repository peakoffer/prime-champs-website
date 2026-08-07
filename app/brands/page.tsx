import type { Metadata } from "next";
import { ArrowLink, PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Athlete Marketing & Brand Partnerships",
  description:
    "Prime Champs helps brands define athlete briefs, qualify credible talent, structure partnership terms, and support sports campaign execution.",
  path: "/brands",
  keywords: ["athlete marketing agency", "sports influencer campaigns", "brand athlete partnerships", "sports sponsorship campaigns"],
});

const campaignSteps = [
  ["01 / DEFINE", "Name the outcome", "Audience, objective, timing, rights, and budget come before a talent list."],
  ["02 / MATCH", "Find the credible athlete", "We qualify sport, story, community, professionalism, and commercial fit."],
  ["03 / DELIVER", "Make the work land", "We align terms and support communication from agreement through campaign close."],
];

export default function BrandsPage() {
  return (
    <PageShell currentPath="/brands">
      <section className="subpage-hero brand-page-hero">
        <div className="subpage-hero-copy">
          <p className="eyebrow">Partnerships for ambitious brands</p>
          <h1>Find the athlete your audience will believe in.</h1>
          <p>
            Prime Champs helps brands move from campaign objective to athlete
            match, partnership structure, and activation—with clear support
            from brief through delivery.
          </p>
          <a className="button-primary" href="/apply?type=brand" data-track="cta_click" data-track-label="brands_campaign_brief" data-track-location="hero">
            Start a campaign brief ↗
          </a>
        </div>
        <div className="subpage-hero-image brand-hero-image">
          <img src="/media/surf-carve-clean.webp" alt="Surfer carving across a blue wave" width="1002" height="1570" fetchPriority="high" />
          <div className="image-data-label"><span>FILTER</span><strong>Credibility × audience</strong></div>
        </div>
      </section>

      <section className="transparency-band">
        <p><strong>A fuller view of fit:</strong> We look beyond a talent list—combining athlete credibility, audience, professionalism, rights, timing, and the campaign objective.</p>
        <ArrowLink href="/approach">Review the qualification framework</ArrowLink>
      </section>

      <section className="brand-value-section section-pad dark-section">
        <div className="brand-value-image">
          <img src="/media/cage-control.webp" alt="View through a combat sports cage before an event" width="1260" height="771" loading="lazy" decoding="async" />
          <span>THE MOMENT BEFORE THE MOMENT</span>
        </div>
        <div className="brand-value-copy">
          <p className="eyebrow">What brands get</p>
          <h2>A better match—and clearer execution.</h2>
          <ul className="check-list">
            <li><strong>Sharper talent briefs</strong><span>Audience, category, creative, timing, usage, and budget in one view.</span></li>
            <li><strong>Curated athlete fit</strong><span>A reasoned shortlist grounded in credibility and campaign reality.</span></li>
            <li><strong>Commercial alignment</strong><span>Support on scope, deliverables, compensation, and expectations.</span></li>
            <li><strong>Execution support</strong><span>Communication and follow-through from agreement to campaign close.</span></li>
          </ul>
        </div>
      </section>

      <section className="brand-process compact-brand-process section-pad">
        <div className="brand-process-head">
          <div>
            <p className="eyebrow dark">From brief to partnership</p>
            <h2>Three decisions. One accountable path.</h2>
          </div>
          <p>
            Launches, ambassador relationships, social content, and live activations
            all move through the same clear operating path.
          </p>
        </div>
        <div className="brand-process-grid three-column-process">
          {campaignSteps.map(([label, title, copy]) => (
            <article key={label}>
              <span>{label}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inline-cta">
        <div>
          <p className="eyebrow dark">Have a live brief?</p>
          <h2>Give us the outcome, not a list of followers.</h2>
        </div>
        <ArrowLink href="/apply?type=brand">Start a campaign brief</ArrowLink>
      </section>
    </PageShell>
  );
}
