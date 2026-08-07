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

const operatingModel = [
  ["DIRECT REVIEW", "Every athlete profile and brand brief is reviewed by Prime Champs—not passed through a volume intake queue."],
  ["ONE THROUGH-LINE", "The context gathered at the start stays attached to the introduction, terms, campaign, and follow-through."],
  ["LONG-GAME FIT", "We look for work that can strengthen an athlete's career and a brand's credibility at the same time."],
];

export default function AboutPage() {
  return (
    <PageShell currentPath="/about">
      <section className="about-hero">
        <div>
          <p className="eyebrow">About Prime Champs</p>
          <h1>Founder-led. Built for the work between.</h1>
        </div>
        <p>
          Prime Champs is an athlete partnership and marketing agency built for
          direct, hands-on work from first fit through campaign follow-through.
        </p>
      </section>

      <section className="about-story section-pad">
        <div className="about-story-image">
          <img src="/media/fight-bag.webp" alt="Combat athlete training on a heavy bag" width="1260" height="1572" fetchPriority="high" />
        </div>
        <div className="about-story-copy">
          <p className="eyebrow dark">Why Prime Champs exists</p>
          <h2>Keep opportunity close to the people doing the work.</h2>
          <p>
            Athletes need more than an introduction. They need a partner who
            understands that every commercial decision sits inside a larger
            career. Brands need more than a list. They need a reasoned match and
            someone accountable for what happens after the first call.
          </p>
          <p>
            Prime Champs is founder-led and intentionally hands-on. The same
            operating context follows the work through positioning, introductions,
            deal development, campaign execution, and the decision about what comes next.
          </p>
          <p className="company-note">
            Prime Champs is the registered trade name of VisionWave Agency LLC,
            a Wyoming limited liability company.
          </p>
        </div>
      </section>

      <section className="principle-section direct-model-section section-pad dark-section">
        <div className="section-heading split-heading light-heading">
          <div>
            <p className="eyebrow">How the work stays accountable</p>
            <h2>Direct by design.</h2>
          </div>
          <p>
            Prime Champs is built for judgment, communication, and follow-through—not
            the appearance of a giant roster.
          </p>
        </div>
        <div className="principle-grid three-principles">
          {operatingModel.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="network-section compact-network-section section-pad">
        <div className="network-copy">
          <p className="eyebrow dark">Across sports and categories</p>
          <h2>Different sports. One standard for readiness.</h2>
          <p>
            Our focus spans combat sports, motorsports, surfing, athletics,
            volleyball, hockey, ball sports, and action sports. The common thread
            is competitive credibility, a real community, and readiness to work.
          </p>
          <div className="sports-tags about-sports-tags" aria-label="Sports Prime Champs works across">
            <span>Combat</span><span>Motorsports</span><span>Surf</span>
            <span>Athletics</span><span>Volleyball</span><span>Hockey</span>
            <span>Ball sports</span><span>Action sports</span>
          </div>
        </div>
        <div className="about-standard-card" aria-label="Prime Champs operating standard">
          <span>THE STANDARD</span>{" "}
          <strong>Credible in sport.</strong>{" "}
          <strong>Ready in business.</strong>{" "}
          <strong>Clear on the work.</strong>{" "}
          <p>That is the room we are building.</p>
        </div>
      </section>

      <section className="inline-cta about-cta">
        <div>
          <p className="eyebrow dark">Start with context</p>
          <h2>Tell us what you compete for—or what your brand needs to change.</h2>
        </div>
        <a className="button-primary dark-button" href="/apply">Apply or inquire ↗</a>
      </section>
    </PageShell>
  );
}
