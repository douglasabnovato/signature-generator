/* axe nos 9 modelos (3 assinaturas, 3 crachás e 3 cartões), com dados reais, nos dois fundos da prévia (#114) */
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
});

const MODELOS: [string, string[]][] = [
  ["Assinatura de E-mail", ["Clássico (Divisor Vertical)", "Moderno (Card Destaque)", "Minimalista (Barra Lateral)"]],
  ["Crachá Digital (ID Card)", ["Tech Cyber (Frente/Verso com QR)", "Corporate Clean (Executivo)", "Creative Neon (Estilo Moderno)"]],
  ["Cartão de Visitas Digital", ["Mobile App (Estilo Smartphone)", "Banner Horizontal (Corporativo)", "Sleek Dark (Minimalista Escuro)"]],
];

async function escolher(page: Page, campo: RegExp, opcao: string) {
  await page.getByRole("combobox", { name: campo }).click();
  await page.getByRole("option", { name: opcao, exact: true }).click();
  await expect(page.getByRole("listbox")).toBeHidden();
}

/* Página inteira sem violações; na prévia, contraste sobre gradiente ou imagem ("incomplete" no axe) também reprova */
async function semViolacoes(page: Page, rotulo: string) {
  await page.mouse.move(0, 0);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const lista = (vs: typeof r.violations) => vs.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
  expect(lista(r.violations), `${rotulo}: violações`).toEqual([]);
  // Na prévia, contraste que o axe não consegue medir também reprova; o texto sobre gradiente é medido abaixo, cor a cor
  const previa = await new AxeBuilder({ page }).include(".preview").withRules(["color-contrast"]).analyze();
  const naoMedidos = previa.incomplete
    .flatMap((v) => v.nodes.map((n) => ({ alvo: n.target.join(" "), motivo: n.any.map((c) => c.message).join("; ") })))
    .filter((n) => !/background gradient/.test(n.motivo))
    .map((n) => `${n.alvo} (${n.motivo})`);
  expect(naoMedidos, `${rotulo}: contraste não medido na prévia`).toEqual([]);
  expect(await contrasteSobreGradiente(page), `${rotulo}: texto sobre gradiente abaixo de 4,5:1`).toEqual([]);
}

/* Mede cada texto da prévia que fica sobre um gradiente contra todas as cores do gradiente (WCAG 1.4.3, 4,5:1).
   Camadas semitransparentes entre o texto e o gradiente (ex.: rgba(0,0,0,0.2)) entram na conta. */
async function contrasteSobreGradiente(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    type Cor = [number, number, number, number];
    const cores = (txt: string): Cor[] =>
      [...txt.matchAll(/rgba?\(([^)]+)\)/g)].map((m) => {
        const [r, g, b, a = "1"] = m[1].split(",").map((x) => x.trim());
        return [Number(r), Number(g), Number(b), Number(a)];
      });
    const sobre = (cima: Cor, baixo: Cor): Cor => {
      const a = cima[3];
      return [0, 1, 2].map((i) => cima[i] * a + baixo[i] * (1 - a)).concat(1) as Cor;
    };
    const lum = (c: Cor) => {
      const [r, g, b] = c.slice(0, 3).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const razao = (a: Cor, b: Cor) => {
      const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
      return (x + 0.05) / (y + 0.05);
    };
    const falhas: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>(".preview .signature, .preview .signature *")) {
      const temTexto = [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim() !== "");
      if (!temTexto) continue;
      const camadas: Cor[] = [];
      let fundo: Cor[] = [];
      for (let p: HTMLElement | null = el; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.backgroundImage.includes("gradient")) {
          fundo = cores(cs.backgroundImage);
          break;
        }
        const bg = cores(cs.backgroundColor)[0];
        if (bg && bg[3] === 1) break; // fundo sólido: o axe já mede
        if (bg && bg[3] > 0) camadas.push(bg);
      }
      if (fundo.length === 0) continue;
      const texto = cores(getComputedStyle(el).color)[0];
      for (const parada of fundo) {
        const base = camadas.reduceRight((acc, c) => sobre(c, acc), parada);
        const r = razao(sobre(texto, base), base);
        if (r < 4.5) falhas.push(`"${el.textContent!.trim().slice(0, 30)}": ${r.toFixed(2)}:1 sobre rgb(${parada.slice(0, 3).join(", ")})`);
      }
    }
    return falhas;
  });
}

for (const [produto, modelos] of MODELOS) {
  test(`axe sem violações nos modelos de "${produto}", nos fundos escuro e claro`, async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto("/");
    await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; animation: none !important; }" });
    await escolher(page, /Produto de Identidade Digital/, produto);
    await page.getByLabel(/Nome Completo/).fill("Ada Lovelace");
    await page.getByLabel(/Cargo e Setor/).fill("Engenheira de Software");
    await page.getByLabel(/Site Oficial/).fill("empresa.example.com");
    await page.getByLabel(/Telefone de Contato/).fill("11 98888-7777");
    await page.getByLabel(/E-mail profissional/).fill("ada@empresa.example.com");
    if (produto.startsWith("Crachá")) {
      await page.getByLabel(/Código do Crachá/).fill("324553");
      await page.getByLabel(/Data de Validade/).fill("31-12-28");
      await page.getByLabel(/Departamento/).fill("Tecnologia");
    }
    await page.getByLabel(/LinkedIn/).fill("https://www.linkedin.com/in/exemplo");
    await page.getByLabel(/WhatsApp/).fill("+55 11 98888-7777");
    const previa = page.getByRole("region", { name: "Pré-visualização" });
    for (const modelo of modelos) {
      await escolher(page, /Estilo do Design/, modelo);
      await expect(previa).toContainText("Ada Lovelace");
      await page.getByRole("button", { name: "Escuro" }).click();
      await semViolacoes(page, `${modelo}, fundo escuro`);
      await page.getByRole("button", { name: "Claro" }).click();
      await semViolacoes(page, `${modelo}, fundo claro`);
    }
  });
}
/* Fim de e2e/modelos.pw.ts */
