import { ApplyForm } from "../components/ApplyForm";
import { PageShell } from "../components/SiteShell";

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const initialType = params.type === "brand" ? "brand" : "athlete";

  return (
    <PageShell>
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
