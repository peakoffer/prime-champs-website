import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Prime Champs and VisionWave Agency LLC collect, use, retain, and protect website inquiry information.",
  path: "/privacy",
  keywords: ["Prime Champs privacy policy"],
});

export default function PrivacyPage() {
  return (
    <PageShell currentPath="/privacy">
      <article className="legal-page">
        <p className="eyebrow dark">Last updated August 5, 2026</p>
        <h1>Privacy policy</h1>
        <p className="legal-lead">
          This policy explains how VisionWave Agency LLC, doing business as
          Prime Champs, handles information submitted through this website.
        </p>

        <section>
          <h2>Information we collect</h2>
          <p>
            We collect the information you choose to provide in athlete and
            brand inquiry forms. Depending on the form, this can include your
            name, email, phone number, company, role, social profiles,
            competitive background, sponsorship history, goals, audience,
            budget, campaign timing, and related notes.
          </p>
        </section>

        <section>
          <h2>How we use information</h2>
          <p>
            We use submitted information to review potential representation,
            partnership, referral, consulting, or campaign opportunities; to
            contact you about that inquiry; to operate and improve our intake
            process; and to prevent misuse or duplicate submissions.
          </p>
        </section>

        <section>
          <h2>Service providers</h2>
          <p>
            Our inquiry workflow uses Supabase for application processing and
            data infrastructure. Transactional messages may be delivered using
            Resend or another email service provider. These providers process
            information on our behalf to operate the service.
          </p>
        </section>

        <section>
          <h2>Retention and sharing</h2>
          <p>
            We keep inquiry information for as long as reasonably necessary to
            evaluate and manage the relationship, meet legal obligations,
            resolve disputes, and protect the service. We do not sell inquiry
            information. We may share it with service providers, professional
            advisers, or relevant partners when necessary to evaluate or manage
            an opportunity and when appropriate for the purpose you requested.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            You may ask to access, correct, or delete information you submitted,
            subject to legal and operational requirements. Contact us at{" "}
            <a href="mailto:info@prime-champs.com">info@prime-champs.com</a>.
          </p>
        </section>

        <section>
          <h2>Security and changes</h2>
          <p>
            We use reasonable safeguards designed to protect inquiry data, but
            no online system is risk-free. We may update this policy as our
            services change and will post the current date above.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
