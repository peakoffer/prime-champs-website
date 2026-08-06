import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Athlete Partnership Agency",
  description:
    "Learn how Prime Champs, a trade name of VisionWave Agency LLC, approaches athlete representation, sports marketing, and brand partnership work.",
  path: "/about",
  keywords: ["Prime Champs agency", "VisionWave Agency LLC", "sports marketing company", "athlete partnership agency"],
});

const principles = [
  ["FIT", "A partnership needs a reason to exist beyond reach."],
  ["CLARITY", "Athletes and brands should understand the work, terms, and expectations."],
  ["MOMENTUM", "The best deal strengthens the next chapter instead of borrowing from it."],
  ["RESPECT", "Competitive careers and brand reputations both deserve disciplined representation."],
];

export default function AboutPage() {
  return (
    <PageShell currentPath="/about">
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
          <img src="/media/fight-bag.jpg" alt="Combat athlete training on a heavy bag" width="1260" height="1572" fetchPriority="high" />
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
            Prime Champs supports the work that connects the two: positioning,
            introductions, deal development, campaign execution, and
            follow-through.
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
          <p className="eyebrow dark">Across sports and categories</p>
          <h2>Different sports. Shared intensity.</h2>
          <p>
            Our focus spans combat sports, motorsports, surfing,
            athletics, volleyball, hockey, ball sports, and action sports. We
            stay open to any athlete whose credibility, community, and ambition
            create a real commercial story.
          </p>
        </div>
        <div className="network-images">
          <img src="/media/surf-power-carve.jpg" alt="Surfer driving through a powerful turn" width="1260" height="1974" loading="lazy" decoding="async" />
          <img src="/media/fight-ring.jpg" alt="Combat athlete landing a kick in competition" width="1260" height="1279" loading="lazy" decoding="async" />
          <img src="/media/tennis-campaign.jpg" alt="Prime Champs campaign concept on a tennis ball" width="825" height="1024" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="inline-cta about-cta">
        <div>
          <p className="eyebrow dark">Start with context</p>
          <h2>Tell us what you compete for—or what your brand needs to change.</h2>
        </div>
        <a className="button-primary dark-button" href="/apply">Start a conversation ↗</a>
      </section>
    </PageShell>
  );
}
