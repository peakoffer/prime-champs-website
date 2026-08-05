import type { Metadata } from "next";
import { ApplyForm } from "../components/ApplyForm";
import { PageShell } from "../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata: Metadata = pageMetadata({
  title: "Apply or Start an Athlete Campaign Brief",
  description:
    "Athletes can submit a representation profile and brands can share a campaign brief for direct review by Prime Champs.",
  path: "/apply",
  keywords: ["apply for athlete representation", "athlete campaign brief", "sports sponsorship inquiry", "Prime Champs contact"],
});

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = params.type === "brand" ? "brand" : "athlete";

  return (
    <PageShell currentPath="/apply">
      <section className="apply-hero">
        <div>
          <p className="eyebrow">Athletes / brands / agencies</p>
          <h1>Bring the context. We&apos;ll find the next move.</h1>
        </div>
        <p>
          Choose the inquiry that fits, share the details that matter, and our
          team will review it directly. No generic pitch deck required.
        </p>
      </section>
      <ApplyForm initialType={initialType} />
    </PageShell>
  );
}
