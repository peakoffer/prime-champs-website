import { PageShell } from "./components/SiteShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found">
        <p className="eyebrow">404 / Off the card</p>
        <h1>This page missed the match.</h1>
        <p>The page may have moved, but the next useful route is close.</p>
        <div className="button-row">
          <a className="button-primary" href="/">Return home ↗</a>
          <a className="button-secondary" href="/apply">Start a conversation ↗</a>
        </div>
      </section>
    </PageShell>
  );
}
