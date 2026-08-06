import type { Metadata } from "next";
import { ArrowLink, PageShell } from "./components/SiteShell";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "Athlete Partnerships & Brand Campaigns",
  description:
    "Prime Champs builds credible athlete partnerships through focused scouting, commercial positioning, negotiation, and campaign support.",
  path: "/",
  keywords: ["athlete partnerships", "sports marketing agency", "athlete representation", "brand sponsorships"],
});

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
    copy: "We support terms, deliverables, timelines, and partnership expectations so both sides know what success looks like.",
  },
  {
    code: "GROW",
    title: "Partnership growth",
    copy: "We help partnerships grow beyond a one-time post into repeatable work with greater creative range and long-term value.",
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
    title: "Build what comes next",
    copy: "We support execution, learn from the campaign, and look for the next credible chapter together.",
  },
];

export default function Home() {
  return (
    <PageShell currentPath="/">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Athlete partnerships / brand campaigns</p>
          <h1>
            Turn performance
            <span>into pull.</span>
          </h1>
          <p className="hero-deck">
            Prime Champs helps athletes sharpen their commercial story, helps
            brands find credible talent, and supports the partnership from
            first fit through delivery.
          </p>
          <div className="button-row">
            <a className="button-primary" href="/athletes">
              I&apos;m an athlete <span aria-hidden="true">↗</span>
            </a>
            <a className="button-secondary" href="/brands">
              I represent a brand <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Prime Champs sports portfolio">
          <div className="hero-frame main-frame">
            <img src="/media/fight-training.jpg" alt="Combat athlete training in a gym" width="1260" height="1549" fetchPriority="high" />
            <span>Combat / campaign ready</span>
          </div>
          <div className="hero-frame accent-frame">
            <img src="/media/surf-aerial.jpg" alt="Surfer launching above a wave" width="1260" height="2037" fetchPriority="high" />
            <span>Surf / global culture</span>
          </div>
        </div>

        <div className="match-line" aria-label="Prime Champs partnership model">
          <span>ATHLETE</span>
          <i aria-hidden="true" />
          <span className="match-mark" aria-hidden="true">
            <img
              src="/brand/prime-champs-monogram-white.svg"
              alt=""
              width="1081"
              height="597"
            />
          </span>
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
            business objective. Prime Champs helps both sides turn that fit into
            a working partnership.
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
              Find athletes your audience can believe in, shape the partnership,
              and move from brief to campaign with less friction.
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
            We support the work around a partnership—from finding the
            opportunity and shaping the deal through campaign delivery.
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

      <section className="proof-section section-pad" aria-labelledby="proof-heading">
        <div className="proof-intro">
          <p className="eyebrow dark">Built around the athlete</p>
          <h2 id="proof-heading">Athletes are people. Partnerships are personal.</h2>
          <p>
            Prime Champs starts with the athlete—their goals, competitive
            story, voice, and commercial potential—then builds outward toward
            the right opportunity.
          </p>
          <ArrowLink href="/approach">See how we build partnerships</ArrowLink>
        </div>
        <div className="proof-ledger">
          <article><span>DIRECT</span><strong>Athlete context first</strong><p>We start with goals, voice, schedule, existing obligations, and direction before considering the right opportunity.</p></article>
          <article><span>CROSS-SPORT</span><strong>A cross-sport point of view</strong><p>Our focus includes combat sports, motorsports, surfing, athletics, volleyball, hockey, action sports, and adjacent fields.</p></article>
          <article><span>FULL ARC</span><strong>Built for the full partnership arc</strong><p>Positioning, introductions, negotiation, deliverables, communication, and the next credible chapter.</p></article>
        </div>
      </section>

      <section className="culture-section section-pad">
        <div className="culture-copy">
          <p className="eyebrow dark">Built in sports culture</p>
          <h2>Competitive energy. Commercial clarity.</h2>
          <p>
            Our focus spans combat sports, motorsports, surfing,
            athletics, volleyball, hockey, and action sports. The through-line
            is not category. It is conviction.
          </p>
          <ArrowLink href="/about">How Prime Champs operates</ArrowLink>
        </div>
        <div className="culture-grid">
          <figure className="culture-image culture-wide">
            <img src="/media/fight-ring.jpg" alt="Two combat athletes competing in a ring" width="1260" height="1279" loading="lazy" decoding="async" />
            <figcaption>COMBAT / COMPETITION</figcaption>
          </figure>
          <figure className="culture-image culture-tall">
            <img src="/media/surf-sunset-carve.jpg" alt="Surfer carving across a wave at sunset" width="1260" height="1623" loading="lazy" decoding="async" />
            <figcaption>SURF / CONTROL</figcaption>
          </figure>
          <figure className="culture-image culture-small">
            <img src="/media/tennis-campaign.jpg" alt="Prime Champs campaign concept on a tennis ball" width="825" height="1024" loading="lazy" decoding="async" />
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
