import Link from "next/link";
import { ArrowLink, PageShell } from "../components/SiteShell";

const representationSteps = [
  ["01", "Review", "We look at your sport, momentum, story, audience, goals, and existing commercial position."],
  ["02", "Position", "We define what makes you credible, distinct, and valuable to the right category of partner."],
  ["03", "Match", "We pursue partnerships with a clear reason to exist—not a generic sponsorship blast."],
  ["04", "Manage", "We support negotiation, deliverables, communication, and the path to repeat work."],
];

export default function AthletesPage() {
  return (
    <PageShell>
      <section className="subpage-hero athlete-page-hero">
        <div className="subpage-hero-copy">
          <p className="eyebrow">Representation for modern athletes</p>
          <h1>Your sport is the proof. We help turn it into leverage.</h1>
          <p>
            Prime Champs helps athletes sharpen their commercial position,
            meet aligned partners, negotiate clearly, and build relationships
            that can grow with the career.
          </p>
          <Link className="button-primary" href="/apply?type=athlete">
            Apply for representation ↗
          </Link>
        </div>
        <div className="subpage-hero-image">
          <img src="/media/fight-training.jpg" alt="Combat athlete training with a coach" />
          <div className="image-data-label"><span>FOCUS</span><strong>Career × commercial</strong></div>
        </div>
      </section>

      <section className="outcomes-section section-pad">
        <p className="eyebrow dark">What representation should change</p>
        <div className="outcome-grid">
          <article>
            <span>POSITION</span>
            <h2>Know what you stand for.</h2>
            <p>Your athletic identity becomes a clear commercial story without sanding off what makes it real.</p>
          </article>
          <article>
            <span>PARTNERSHIPS</span>
            <h2>Meet brands with a reason to care.</h2>
            <p>We prioritize category, audience, timing, values, and creative fit—not the biggest logo available.</p>
          </article>
          <article>
            <span>PROTECTION</span>
            <h2>Understand the work and the terms.</h2>
            <p>We help clarify deliverables, usage, timing, value, and expectations before a partnership goes live.</p>
          </article>
        </div>
      </section>

      <section className="sequence-section section-pad dark-section">
        <div className="sequence-heading">
          <p className="eyebrow">How it works</p>
          <h2>Representation is a sequence, not a promise.</h2>
          <p>
            We use commercially reasonable efforts to create and manage
            opportunities. No legitimate agency can guarantee a deal or a
            specific income outcome.
          </p>
        </div>
        <div className="sequence-list">
          {representationSteps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sports-section section-pad">
        <div className="sports-image">
          <img src="/media/surf-aerial.jpg" alt="Surfer performing an aerial maneuver" />
        </div>
        <div className="sports-copy">
          <p className="eyebrow dark">Who we work with</p>
          <h2>Competitive people with something real to build on.</h2>
          <p>
            Prime Champs reviews professional, national, collegiate, emerging,
            and creator-athletes across combat sports, motorsports, surfing,
            volleyball, hockey, athletics, action sports, and adjacent fields.
          </p>
          <div className="sports-tags">
            <span>Combat</span><span>Motorsports</span><span>Surf</span>
            <span>Athletics</span><span>Volleyball</span><span>Hockey</span>
            <span>Action sports</span><span>Beyond</span>
          </div>
          <ArrowLink href="/apply?type=athlete">Share your athlete profile</ArrowLink>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div>
          <p className="eyebrow dark">Before you apply</p>
          <h2>Good fit starts with honest expectations.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Do I need a huge following?</summary>
            <p>No. Audience quality, competitive credibility, story, momentum, professionalism, and category fit can matter as much as scale.</p>
          </details>
          <details>
            <summary>Does applying guarantee representation?</summary>
            <p>No. We review every profile for current fit and capacity. If there is a next step, we will contact you directly.</p>
          </details>
          <details>
            <summary>Do you guarantee sponsorship income?</summary>
            <p>No. Prime Champs works to identify, introduce, negotiate, and manage opportunities, but no specific deal or income level is guaranteed.</p>
          </details>
          <details>
            <summary>What happens after I apply?</summary>
            <p>We review your information, social presence, competitive context, and goals. Strong potential fits move to a direct conversation.</p>
          </details>
        </div>
      </section>
    </PageShell>
  );
}
