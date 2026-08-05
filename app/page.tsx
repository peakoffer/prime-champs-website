import Link from "next/link";
import { ArrowLink, PageShell } from "./components/SiteShell";

const services = [
  {
    code: "MATCH",
    title: "Introductions with a reason",
    copy: "We pair competitive identity, audience fit, brand values, and campaign reality—not just reach on a spreadsheet.",
  },
  {
    code: "SHAPE",
    title: "Commercial positioning",
    copy: "We turn an athlete’s story, performance, and community into a clear proposition brands can act on.",
  },
  {
    code: "PROTECT",
    title: "Negotiation and deal support",
    copy: "We support terms, deliverables, timelines, and partnership expectations so both sides know what good looks like.",
  },
  {
    code: "GROW",
    title: "Campaign and relationship growth",
    copy: "We help partnerships move beyond a post into repeatable work with more creative range and long-term value.",
  },
];

const process = [
  {
    number: "01",
    title: "Find the real fit",
    copy: "We define the athlete, audience, ambition, and non-negotiables before we make an introduction.",
  },
  {
    number: "02",
    title: "Build the right deal",
    copy: "We align the idea, scope, value, timeline, usage, and expectations before the work begins.",
  },
  {
    number: "03",
    title: "Make it compound",
    copy: "We support execution, learn from the campaign, and look for the next credible chapter together.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Athlete partnerships / brand campaigns</p>
          <h1>
            Turn performance
            <span>into pull.</span>
          </h1>
          <p className="hero-deck">
            Prime Champs connects athletes with brands and platforms, then
            manages the work between the first conversation and a partnership
            worth repeating.
          </p>
          <div className="button-row">
            <Link className="button-primary" href="/athletes">
              I&apos;m an athlete <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button-secondary" href="/brands">
              I represent a brand <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Prime Champs sports portfolio">
          <div className="hero-frame main-frame">
            <img src="/media/fight-training.jpg" alt="Combat athlete training in a gym" />
            <span>Combat / campaign ready</span>
          </div>
          <div className="hero-frame accent-frame">
            <img src="/media/surf-aerial.jpg" alt="Surfer launching above a wave" />
            <span>Surf / global culture</span>
          </div>
          <img
            className="hero-mark"
            src="/media/prime-champs-mark.png"
            alt=""
            width="170"
            height="170"
          />
        </div>

        <div className="match-line" aria-label="Prime Champs partnership model">
          <span>ATHLETE</span>
          <i aria-hidden="true" />
          <strong>PRIME CHAMPS</strong>
          <i aria-hidden="true" />
          <span>BRAND</span>
        </div>
      </section>

      <section className="lane-section section-pad">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow dark">Two sides. One standard.</p>
            <h2>The right partnership has to work both ways.</h2>
          </div>
          <p>
            Strong campaigns are built where athletic credibility meets a real
            business objective. Prime Champs is the operating layer in between.
          </p>
        </div>

        <div className="lane-grid">
          <article className="lane-card athlete-lane">
            <p className="lane-number">A / 01</p>
            <h3>For athletes</h3>
            <p>
              Clarify your commercial story, meet aligned partners, protect the
              deal, and build value beyond the next event.
            </p>
            <ArrowLink href="/athletes">See athlete representation</ArrowLink>
            <div className="lane-tags">
              <span>Positioning</span><span>Introductions</span><span>Negotiation</span>
            </div>
          </article>

          <article className="lane-card brand-lane">
            <p className="lane-number">B / 02</p>
            <h3>For brands</h3>
            <p>
              Find athletes your audience can believe, shape the partnership,
              and move from brief to campaign without unnecessary friction.
            </p>
            <ArrowLink href="/brands">Build a brand partnership</ArrowLink>
            <div className="lane-tags">
              <span>Talent fit</span><span>Campaign design</span><span>Activation</span>
            </div>
          </article>
        </div>
      </section>

      <section className="services-section section-pad dark-section">
        <div className="section-heading split-heading light-heading">
          <div>
            <p className="eyebrow">What we manage</p>
            <h2>More than the intro.</h2>
          </div>
          <p>
            Prime Champs supports the full commercial arc: from opportunity
            discovery through negotiation and campaign follow-through.
          </p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article key={service.code}>
              <span>{service.code}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="culture-section section-pad">
        <div className="culture-copy">
          <p className="eyebrow dark">Built in sports culture</p>
          <h2>Competitive energy. Commercial clarity.</h2>
          <p>
            Our network reaches across combat sports, motorsports, surfing,
            athletics, volleyball, hockey, and action sports. The through-line
            is not category. It is conviction.
          </p>
          <ArrowLink href="/about">How Prime Champs operates</ArrowLink>
        </div>
        <div className="culture-grid">
          <figure className="culture-image culture-wide">
            <img src="/media/fight-night.jpg" alt="Athletes competing in a combat sports arena" />
            <figcaption>COMBAT / LIVE MOMENT</figcaption>
          </figure>
          <figure className="culture-image culture-tall">
            <img src="/media/surf-carve.jpg" alt="Surfer carving through a wave" />
            <figcaption>SURF / CULTURE</figcaption>
          </figure>
          <figure className="culture-image culture-small">
            <img src="/media/tennis-campaign.jpg" alt="Prime Champs campaign concept on a tennis ball" />
            <figcaption>CAMPAIGN / DETAIL</figcaption>
          </figure>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="process-intro">
          <p className="eyebrow dark">The partnership sequence</p>
          <h2>A disciplined process keeps the creative work moving.</h2>
        </div>
        <div className="process-grid">
          {process.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles-strip">
        <div>
          <span>01</span><strong>Fit before reach</strong>
        </div>
        <div>
          <span>02</span><strong>Clear terms before content</strong>
        </div>
        <div>
          <span>03</span><strong>Long-term value over one-off noise</strong>
        </div>
      </section>
    </PageShell>
  );
}
