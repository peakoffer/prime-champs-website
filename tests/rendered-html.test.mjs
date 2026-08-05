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
  assert.match(html, /<title>Prime Champs \| Athlete Partnerships &amp; Brand Campaigns<\/title>/i);
  assert.match(html, /Turn performance/);
  assert.match(html, /into pull\./);
  assert.match(html, /I&#x27;m an athlete/);
  assert.match(html, /I represent a brand/);
  assert.match(html, /VisionWave Agency LLC/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders every public route and the dual intake form", async () => {
  const routes = ["/athletes", "/brands", "/about", "/apply", "/privacy", "/terms"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should render`);
  }

  const formHtml = await (await render("/apply")).text();
  assert.match(formHtml, /I&#x27;m an athlete/);
  assert.match(formHtml, /I represent a brand/);
  assert.match(formHtml, /Send athlete profile/);
  assert.match(formHtml, /privacy policy/);
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
