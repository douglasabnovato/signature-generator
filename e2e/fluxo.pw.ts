/* Fluxo principal no navegador: preencher, copiar e baixar a assinatura; axe e teclado (WCAG 2.4.7) */
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
/* axe com as regras WCAG 2.x A e AA. O app não tem tema escuro próprio: o botão "Escuro" muda só o fundo da prévia */
async function semViolacoes(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
}

test("axe sem violações na tela vazia, na prévia com dados reais e com os avisos", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  await semViolacoes(page);

  await preencher(page);
  await page.getByLabel(/E-mail profissional/).fill("ada@empresa.example.com");
  await page.getByLabel(/LinkedIn/).fill("https://www.linkedin.com/in/exemplo");
  await page.getByLabel(/WhatsApp/).fill("+55 11 98888-7777");
  await expect(page.getByRole("region", { name: "Pré-visualização" })).toContainText("Ada Lovelace");
  await semViolacoes(page);

  await page.getByRole("button", { name: "Claro" }).click();
  await semViolacoes(page);

  // Foto base64 grande: aparecem o aviso da foto e o do limite do Gmail
  await page.getByLabel("Sem foto").check();
  await page.getByLabel(/Link da Foto/).fill(`data:image/png;base64,${"A".repeat(12000)}`);
  await expect(page.getByText(/passa do limite de 10\.000 caracteres do Gmail/)).toBeVisible();
  await semViolacoes(page);
});

/* Aperta Tab até o foco chegar ao elemento (no máximo 40 vezes) */
async function tabAte(page: Page, alvo: ReturnType<Page["locator"]>) {
  for (let i = 0; i < 40; i++) {
    if (await alvo.evaluate((el) => el === document.activeElement)) return;
    await page.keyboard.press("Tab");
  }
  throw new Error("o foco não chegou ao elemento pelo Tab");
}

test("só com teclado: preenche, vê o foco, fecha a lista e o aviso com Esc e copia", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");

  // Lista de produtos: abre com a seta, fecha com Esc, e o foco volta para ela
  const produto = page.getByRole("combobox", { name: /Produto de Identidade Digital/ });
  await tabAte(page, produto);
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toBeHidden();
  await expect(produto).toBeFocused();

  // Campos: o tema do app desenha a borda de 2 px na cor primária no campo com foco
  const campos: [RegExp, string][] = [
    [/Nome Completo/, "Ada Lovelace"],
    [/Cargo e Setor/, "Engenheira"],
    [/Site Oficial/, "empresa.example.com"],
    [/Telefone de Contato/, "11 98888-7777"],
  ];
  for (const [rotulo, valor] of campos) {
    const campo = page.getByLabel(rotulo);
    await tabAte(page, campo);
    await page.keyboard.type(valor);
    const borda = await campo.evaluate((el) => {
      const fs = el.parentElement!.querySelector("fieldset")!;
      return `${getComputedStyle(fs).borderTopWidth} ${getComputedStyle(fs).borderTopColor}`;
    });
    expect(borda).toBe("2px rgb(30, 64, 175)");
  }

  // Botão: contorno de 3 px definido no App.css (:focus-visible), não o padrão do navegador
  const copiar = page.getByRole("button", { name: "Copiar assinatura" });
  await tabAte(page, copiar);
  const contorno = await copiar.evaluate((el) => {
    const cs = getComputedStyle(el);
    return `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`;
  });
  expect(contorno).toBe("solid 3px rgb(29, 78, 216)");
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Assinatura copiada/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText(/Assinatura copiada/)).toBeHidden();
});
/* Fim de e2e/fluxo.pw.ts */
