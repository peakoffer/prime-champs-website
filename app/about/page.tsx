import Link from "next/link";
import { PageShell } from "../components/SiteShell";

const principles = [
  ["FIT", "A partnership needs a reason to exist beyond reach."],
  ["CLARITY", "Athletes and brands should understand the work, terms, and expectations."],
  ["MOMENTUM", "The best deal strengthens the next chapter instead of borrowing from it."],
  ["RESPECT", "Competitive careers and brand reputations both deserve disciplined representation."],
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="about-hero">
        <div>
          <p className="eyebrow">About Prime Champs</p>
          <h1>Built between the arena and the boardroom.</h1>
        </div>
        <p>
          Prime Champs is an athlete partnership and marketing agency. We help
          athletes and brands turn competitive credibility into well-structured
          commercial relationships.
        </p>
      </section>

      <section className="about-story section-pad">
        <div className="about-story-image">
          <img src="/media/fight-night.jpg" alt="Two athletes competing in a combat sports match" />
        </div>
        <div className="about-story-copy">
          <p className="eyebrow dark">Our role</p>
          <h2>Make the opportunity clearer on both sides.</h2>
          <p>
            Athletes need more than access. They need positioning, negotiation,
            and a partner who understands that every deal sits inside a larger
            career. Brands need more than a talent list. They need credible fit,
            commercial alignment, and follow-through.
          </p>
          <p>
            Prime Champs operates in that space between the two—supporting
            introductions, consulting, deal development, sponsorship and
            promotional activity, and the relationships that follow.
          </p>
          <p className="company-note">
            Prime Champs is the registered trade name of VisionWave Agency LLC,
            a Wyoming limited liability company.
          </p>
        </div>
      </section>

      <section className="principle-section section-pad dark-section">
        <div className="section-heading split-heading light-heading">
          <div>
            <p className="eyebrow">Operating principles</p>
            <h2>What we optimize for.</h2>
          </div>
          <p>
            A legitimate partnership creates value without asking either side
            to pretend. These are the filters we bring to the work.
          </p>
        </div>
        <div className="principle-grid">
          {principles.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="network-section section-pad">
        <div className="network-copy">
          <p className="eyebrow dark">A cross-category network</p>
          <h2>Different sports. Shared intensity.</h2>
          <p>
            Our working network spans combat sports, motorsports, surfing,
            athletics, volleyball, hockey, ball sports, and action sports. We
            stay open to any athlete whose credibility, community, and ambition
            create a real commercial story.
          </p>
        </div>
        <div className="network-images">
          <img src="/media/surf-aerial.jpg" alt="Surfer high above a wave" />
          <img src="/media/fight-training.jpg" alt="Combat athlete training in a gym" />
          <img src="/media/tennis-campaign.jpg" alt="Prime Champs campaign concept on a tennis ball" />
        </div>
      </section>

      <section className="inline-cta about-cta">
        <div>
          <p className="eyebrow dark">Start with context</p>
          <h2>Tell us what you compete for—or what your brand needs to change.</h2>
        </div>
        <Link className="button-primary dark-button" href="/apply">Start a conversation ↗</Link>
      </section>
    </PageShell>
  );
}
