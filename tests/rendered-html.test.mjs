import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Prime Champs homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Athlete Partnerships &amp; Brand Campaigns \| Prime Champs<\/title>/i);
  assert.match(html, /Turn performance/);
  assert.match(html, /into pull\./);
  assert.match(html, /I&#x27;m an athlete/);
  assert.match(html, /I represent a brand/);
  assert.match(html, /VisionWave Agency LLC/);
  assert.match(html, /300\+/);
  assert.match(html, /research coverage—not a public client roster/i);
  assert.match(html, /application\/ld\+json/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders every public route and the dual intake form", async () => {
  const routes = ["/athletes", "/brands", "/approach", "/about", "/apply", "/privacy", "/terms"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should render`);
  }

  const formHtml = await (await render("/apply")).text();
  assert.match(formHtml, /I&#x27;m an athlete/);
  assert.match(formHtml, /I represent a brand/);
  assert.match(formHtml, /Send athlete profile/);
  assert.match(formHtml, /privacy policy/);
  assert.match(formHtml, /No automatic mailing-list enrollment/);
});

test("ships indexable SEO support files and unique page metadata", async () => {
  const [robots, sitemap, approachHtml, brandHtml] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    render("/approach").then((response) => response.text()),
    render("/brands").then((response) => response.text()),
  ]);

  assert.match(robots, /Sitemap: https:\/\/www\.prime-champs\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/www\.prime-champs\.com\/approach/);
  assert.match(approachHtml, /Our Athlete–Brand Partnership Approach \| Prime Champs/);
  assert.match(brandHtml, /Athlete Marketing &amp; Brand Partnerships \| Prime Champs/);
  assert.match(approachHtml, /FAQPage/);
});

test("uses reliable native navigation and the current Supabase intake", async () => {
  const [shell, applyForm] = await Promise.all([
    readFile(new URL("../app/components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ApplyForm.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(shell, /next\/link|<Link/);
  assert.match(shell, /href="\/approach"/);
  assert.match(applyForm, /rmxuwyxpoazsuqvdadlo\.supabase\.co\/functions\/v1\/website-intake/);
  assert.doesNotMatch(applyForm, /kfjzwbopdssfvyiyofws/);
  assert.doesNotMatch(applyForm, /Authorization:/);
});

test("removes all disposable starter artifacts", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Turn performance/);
  assert.match(layout, /Prime Champs/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
