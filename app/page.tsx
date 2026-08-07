import type { Metadata } from "next";
import { PageShell } from "./components/SiteShell";
import { pageMetadata } from "./seo";

export const metadata: Metadata = pageMetadata({
  title: "Brand Opportunities for Athletes",
  description:
    "Prime Champs helps athletes stand out, meet the right brands, and manage partnerships from the first call through delivery.",
  path: "/",
  keywords: ["brand opportunities for athletes", "athlete partnerships", "athlete representation", "brand sponsorships"],
});

const services = [
  {
    number: "01",
    title: "Stand out",
    copy: "Show brands what makes you worth noticing.",
  },
  {
    number: "02",
    title: "Meet the right brands",
    copy: "Pursue opportunities that fit your sport, audience, and personality.",
  },
  {
    number: "03",
    title: "Handle the deal",
    copy: "Get support with terms, content, deadlines, and follow-through.",
  },
];

const applySteps = [
  {
    number: "01",
    title: "Send your profile",
    copy: "Tell us about your sport, audience, and goals.",
  },
  {
    number: "02",
    title: "We review it",
    copy: "We look at your story, content, credibility, and potential fit.",
  },
  {
    number: "03",
    title: "We contact strong fits",
    copy: "When there is a relevant next step, we reach out directly.",
  },
];

export default function Home() {
  return (
    <PageShell currentPath="/">
      <section className="home-hero athlete-first-hero">
        <div className="hero-copy">
          <p className="eyebrow">Brand opportunities for athletes</p>
          <h1>
            Turn performance{" "}
            <span>into momentum.</span>
          </h1>
          <p className="hero-deck">
            We help athletes stand out, meet the right brands, and manage the
            deal from first call to final post.
          </p>
          <div className="button-row">
            <a className="button-primary" href="/apply?type=athlete" data-track="cta_click" data-track-label="home_apply_athlete" data-track-location="hero">
              Apply as an athlete <span aria-hidden="true">↗</span>
            </a>
            <a className="button-secondary" href="/brands" data-track="cta_click" data-track-label="home_view_brands" data-track-location="hero">
              I&apos;m a brand <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Prime Champs athlete portfolio">
          <div className="hero-frame main-frame">
            <img src="/media/fight-training.webp" alt="Combat athlete training in a gym" width="1260" height="1549" fetchPriority="high" decoding="async" />
            <span>Combat / campaign ready</span>
          </div>
          <div className="hero-frame accent-frame">
            <img src="/media/surf-aerial.webp" alt="Surfer launching above a wave" width="1260" height="2037" fetchPriority="low" decoding="async" />
            <span>Surf / global culture</span>
          </div>
        </div>

        <div className="trust-rail" aria-label="What athletes should know">
          <span>No huge following required</span>
          <span>Every profile reviewed</span>
          <span>Support through the deal</span>
        </div>
      </section>

      <section className="quick-services section-pad dark-section">
        <div className="quick-section-head">
          <p className="eyebrow">What Prime Champs does</p>
          <h2>From profile to partnership.</h2>
          <p>Clear support before, during, and after the deal.</p>
        </div>

        <div className="quick-card-grid">
          {services.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>

        <div className="visual-sport-strip" aria-label="Athletes across sports culture">
          <figure>
            <img src="/media/fight-ring.webp" alt="Combat athletes competing in a ring" width="1260" height="1279" loading="lazy" decoding="async" />
            <figcaption>COMBAT</figcaption>
          </figure>
          <figure>
            <img src="/media/surf-sunset-carve.webp" alt="Surfer carving across a wave at sunset" width="1260" height="1623" loading="lazy" decoding="async" />
            <figcaption>SURF</figcaption>
          </figure>
          <figure>
            <img src="/media/tennis-campaign.webp" alt="Tennis ball with Prime Champs campaign branding" width="825" height="1024" loading="lazy" decoding="async" />
            <figcaption>TENNIS</figcaption>
          </figure>
        </div>
      </section>

      <section className="quick-process section-pad">
        <div className="quick-section-head dark-copy">
          <p className="eyebrow dark">How it works</p>
          <h2>Apply once. We take it from there.</h2>
        </div>
        <div className="quick-step-grid">
          {applySteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="athlete-cta-band">
        <div>
          <p className="eyebrow dark">Your next move</p>
          <h2>Ready to get in the right room?</h2>
        </div>
        <a className="button-primary" href="/apply?type=athlete" data-track="cta_click" data-track-label="home_send_profile" data-track-location="closing_cta">
          Send your athlete profile <span aria-hidden="true">↗</span>
        </a>
      </section>
    </PageShell>
  );
}
