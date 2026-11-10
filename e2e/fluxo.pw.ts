/* Fluxo principal no navegador: preencher os campos obrigatórios, copiar e baixar a assinatura */
import { expect, test, type Page } from "@playwright/test";

/* Corta a rede externa: o fluxo não depende de nada fora do próprio site */
test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1|douglasabnovato\.github\.io)/, (r) => r.abort());
});

async function preencher(page: Page) {
  await page.getByLabel(/Nome Completo/).fill("Ada Lovelace");
  await page.getByLabel(/Cargo e Setor/).fill("Engenheira");
  await page.getByLabel(/Site Oficial/).fill("empresa.example.com");
  await page.getByLabel(/Telefone de Contato/).fill("11 98888-7777");
}

test("preenche os dados, vê a prévia e copia a assinatura", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await preencher(page);
  const previa = page.getByRole("region", { name: "Pré-visualização" });
  await expect(previa).toContainText("Ada Lovelace");
  await expect(previa.locator('a[href="https://empresa.example.com/"]').first()).toBeAttached();

  await page.getByRole("button", { name: "Copiar assinatura" }).click();
  await expect(page.getByText(/Assinatura copiada/)).toBeVisible();
  const html = await page.evaluate(async () => {
    const [item] = await navigator.clipboard.read();
    return (await item.getType("text/html")).text();
  });
  expect(html).toContain("Ada Lovelace");
});

test("baixa a assinatura como PNG", async ({ page }) => {
  await page.goto("/");
  await preencher(page);
  const [arquivo] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Baixar como imagem (PNG)" }).click(),
  ]);
  expect(arquivo.suggestedFilename()).toMatch(/ada-lovelace\.png$/);
  await expect(page.getByText("Imagem PNG baixada.")).toBeVisible();
});

test("o GoatCounter não carrega nos testes nem em localhost", async ({ page }) => {
  const pedidos: string[] = [];
  page.on("request", (r) => pedidos.push(r.url()));
  await page.goto("/");
  await preencher(page);
  await expect(page.locator("script[data-goatcounter]")).toHaveCount(0);
  expect(pedidos.filter((u) => /goatcounter|gc\.zgo\.at/.test(u))).toEqual([]);
});

test("no site publicado, copiar e baixar registram os eventos no GoatCounter do portfólio", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  // Simula o navegador de um visitante: sem a marca de automação e fora de localhost.
  await page.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));
  await page.route("https://douglasabnovato.github.io/**", async (r) => {
    const caminho = new URL(r.request().url()).pathname.replace(/^\/signature-generator/, "") || "/";
    await r.fulfill({ response: await page.request.get(caminho) });
  });
  await page.route("https://gc.zgo.at/**", (r) =>
    r.fulfill({
      contentType: "text/javascript",
      body: "window.contagens = []; window.goatcounter = { count: (v) => window.contagens.push(v) };",
    }),
  );
  await page.goto("https://douglasabnovato.github.io/signature-generator/");
  await expect(page.locator("script[data-goatcounter]")).toHaveAttribute(
    "data-goatcounter",
    "https://douglasabnovato.goatcounter.com/count",
  );
  await preencher(page);
  await page.getByRole("button", { name: "Copiar assinatura" }).click();
  await expect(page.getByText(/Assinatura copiada/)).toBeVisible();
  await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Baixar como imagem (PNG)" }).click(),
  ]);
  await expect(page.getByText("Imagem PNG baixada.")).toBeVisible();
  const contagens = await page.evaluate(() => (window as unknown as { contagens: unknown[] }).contagens);
  for (const nome of ["assinatura-copiada", "assinatura-baixada"]) {
    expect(contagens).toContainEqual({ path: nome, title: nome, event: true });
  }
});
/* Fim de e2e/fluxo.pw.ts */
