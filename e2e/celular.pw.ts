/* Celular (375 × 812 px): a página não rola na horizontal e os botões da prévia ficam ao alcance (#115) */
import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
});

/* Sem overflow escondido: mede a largura real do documento (a prévia pode rolar dentro da própria caixa) */
async function semRolagemLateral(page: Page, quando: string) {
  const { scroll, cliente } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    cliente: document.documentElement.clientWidth,
  }));
  expect(scroll, `${quando}: largura do documento`).toBe(cliente);
}

test("no celular, preenche os campos, vê a prévia e baixa sem rolagem horizontal", async ({ page }) => {
  await page.goto("/");
  await semRolagemLateral(page, "tela vazia");

  await page.getByLabel(/Nome Completo/).fill("Ada Lovelace");
  await page.getByLabel(/Cargo e Setor/).fill("Engenheira de Software");
  await page.getByLabel(/Site Oficial/).fill("empresa.example.com");
  await page.getByLabel(/Telefone de Contato/).fill("11 98888-7777");
  await page.getByLabel(/E-mail profissional/).fill("ada@empresa.example.com");
  await expect(page.getByRole("region", { name: "Pré-visualização" })).toContainText("Ada Lovelace");
  await semRolagemLateral(page, "com a prévia");

  for (const nome of ["Copiar assinatura", "Baixar como imagem (PNG)"]) {
    const botao = page.getByRole("button", { name: nome });
    await botao.scrollIntoViewIfNeeded();
    await expect(botao).toBeInViewport({ ratio: 1 });
    await expect(botao).toBeEnabled();
  }
  const [arquivo] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Baixar como imagem (PNG)" }).tap(),
  ]);
  expect(arquivo.suggestedFilename()).toMatch(/ada-lovelace\.png$/);
  await expect(page.getByText("Imagem PNG baixada.")).toBeVisible();
  await semRolagemLateral(page, "com o aviso de download");
});
/* Fim de e2e/celular.pw.ts */
