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
  assert.match(html, /<title>Brand Opportunities for Athletes \| Prime Champs<\/title>/i);
  assert.match(html, /Turn performance/);
  assert.match(html, /into momentum\./);
  assert.match(html, /Apply as an athlete/);
  assert.match(html, /I&#x27;m a brand/);
  assert.match(html, /VisionWave Agency LLC/);
  assert.match(html, /No huge following required/i);
  assert.match(html, /Apply once\. We take it from there\./i);
  assert.doesNotMatch(html, /300\+|research coverage|public client roster/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(
    html,
    /<meta name="facebook-domain-verification" content="bp4x2jjm9vk4t7nersc48k7aatsr39"\s*\/?>/i
  );
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
  assert.match(formHtml, /Send my profile/);
  assert.match(formHtml, /Best social profile/);
  assert.match(formHtml, /Phone/);
  assert.match(formHtml, /privacy policy/);
  assert.match(formHtml, /Short athlete application/);
  assert.doesNotMatch(formHtml, /Total social following|Competitive highlights|Current or past sponsors/);

  const brandFormHtml = await (await render("/apply?type=brand")).text();
  assert.match(brandFormHtml, /Focused campaign brief/);
  assert.match(brandFormHtml, /Send campaign brief/);
});

test("ships indexable SEO support files and unique page metadata", async () => {
  const [robots, sitemap, assetHeaders, approachHtml, brandHtml] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/_headers", import.meta.url), "utf8"),
    render("/approach").then((response) => response.text()),
    render("/brands").then((response) => response.text()),
  ]);

  assert.match(robots, /Sitemap: https:\/\/www\.prime-champs\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/www\.prime-champs\.com\/approach/);
  assert.match(assetHeaders, /Content-Type: text\/css; charset=utf-8/);
  assert.match(assetHeaders, /Content-Type: application\/javascript; charset=utf-8/);
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

test("ships the final identity and credibility refinements", async () => {
  const [home, approach, brands, shell, styles, seo] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/approach/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/brands/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/seo.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(home, /hero-mark|prime-champs-mark/);
  assert.match(shell, /\/brand\/prime-champs-wordmark-reversed\.svg/);
  assert.match(shell, /width="1463"/);
  assert.match(home + shell, /\/brand\/prime-champs-monogram-white\.svg/);
  assert.match(seo, /og\.png/);
  assert.doesNotMatch(styles, /\.brand-lockup img[\s\S]*?transform: scale\(2\.85\)/);
  assert.match(home, /fight-ring\.jpg/);
  assert.match(home, /surf-sunset-carve\.jpg/);
  assert.match(home, /tennis-campaign\.jpg/);
  assert.doesNotMatch(home, /tennis-clean\.jpg/);
  assert.match(home, />TENNIS</);
  assert.doesNotMatch(home, /surf-wipeout\.jpg/);
  assert.doesNotMatch(shell, /footer-lead/);
  assert.match(shell, /currentPath === "\/brands"/);
  assert.match(shell, /\/apply\?type=brand/);
  assert.match(styles, /\.athlete-cta-band \.button-primary[\s\S]*?color: var\(--white\)/);
  assert.match(styles, /@media \(max-width: 720px\)[\s\S]*?\.compact-sports-section\s*{[\s\S]*?grid-template-columns: minmax\(0, 1fr\)/);
  assert.doesNotMatch(styles, /mobile-sticky-apply/);
  assert.doesNotMatch(home + approach + brands, /300\+|internal scouting|research coverage|public roster/i);
  assert.match(approach, /What disciplined partnership work looks like/);
  assert.match(brands, /A fuller view of fit/);
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
  await assert.rejects(access(new URL("../public/media/prime-champs-mark.png", import.meta.url)));
  await assert.rejects(access(new URL("../public/media/prime-champs-wordmark.png", import.meta.url)));
  await assert.rejects(access(new URL("../public/media/surf-wipeout.jpg", import.meta.url)));
});
