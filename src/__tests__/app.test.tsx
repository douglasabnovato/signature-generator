/* Testes: URLs seguras, progresso, prévia, troca de produto, cópia e PNG com sucesso e falha, limite do Gmail */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toPng } from "html-to-image";
import App, { initialState } from "../App";

/* O html-to-image não desenha no jsdom: o teste controla o resultado do toPng */
vi.mock("html-to-image", () => ({ toPng: vi.fn() }));
import { GMAIL_LIMIT, calculateProgress, gmailLimitWarning, initialsAvatar, mailtoLink, photoWarning, safeImage, safeUrl, telLink, waLink } from "../utils/signatureHelpers";

beforeEach(() => cleanup());

describe("regras", () => {
  it("safeUrl aceita só http(s) e completa o esquema", () => {
    expect(safeUrl("empresa.com.br")).toBe("https://empresa.com.br/");
    expect(safeUrl("javascript:alert(1)")).toBe("");
    expect(safeUrl("data:text/html,<b>x</b>")).toBe("");
    expect(safeImage("javascript:alert(1)")).toBe("");
    expect(safeImage("data:image/png;base64,iVBORw0KGgo=")).toMatch(/^data:image\/png/);
  });
  it("WhatsApp só com dígitos e avatar por iniciais", () => {
    expect(waLink("+55 (11) 98888-7777")).toBe("https://wa.me/5511988887777");
    expect(waLink("123")).toBe("");
    expect(decodeURIComponent(initialsAvatar("Ada Lovelace"))).toContain(">AL<");
  });
  it("mailto, tel e aviso da foto", () => {
    expect(mailtoLink(" ada@empresa.com.br ")).toBe("mailto:ada@empresa.com.br");
    expect(mailtoLink("ada@empresa")).toBe("");
    expect(mailtoLink("a b@empresa.com")).toBe("");
    expect(telLink("+55 (11) 98888-7777")).toBe("tel:+5511988887777");
    expect(telLink("(11) 98888-7777")).toBe("tel:11988887777");
    expect(telLink("123")).toBe("");
    expect(photoWarning("data:image/png;base64,iVBORw0KGgo=")).toMatch(/base64/);
    expect(photoWarning("http://exemplo.com/f.png")).toMatch(/https/);
    expect(photoWarning("https://exemplo.com/f.png")).toBe("");
  });
  it("progresso conta campos preenchidos", () => {
    expect(calculateProgress({ ...initialState, fullName: "A", phone: "1" })).toBe(50);
    expect(calculateProgress({ ...initialState, withPhoto: true, fullName: "A", phone: "1", position: "B", site: "c" })).toBe(80);
  });
});

/* Preenche os campos obrigatórios */
async function fillRequired(site = "empresa.com.br") {
  await userEvent.type(screen.getByLabelText(/Nome Completo/), "Ada Lovelace");
  await userEvent.type(screen.getByLabelText(/Cargo e Setor/), "Engenheira");
  await userEvent.type(screen.getByLabelText(/Site Oficial/), site);
  await userEvent.type(screen.getByLabelText(/Telefone de Contato/), "11 98888-7777");
}

describe("tela", () => {
  it("mostra progresso e depois a prévia com link saneado", async () => {
    render(<App />);
    expect(screen.getByText(/Preencha os dados obrigatórios no formulário/)).toBeTruthy();
    await userEvent.type(screen.getByLabelText(/Nome Completo/), "Ada");
    expect(screen.getByText("25%")).toBeTruthy();
    expect(screen.getByText(/Complete os campos obrigatórios/)).toBeTruthy();
    await userEvent.clear(screen.getByLabelText(/Nome Completo/));
    await fillRequired("javascript:alert(1)");
    const preview = screen.getByRole("region", { name: "Pré-visualização" });
    expect(preview.textContent).toContain("Ada Lovelace");
    expect(preview.querySelector('a[href^="javascript"]')).toBeNull();
    expect(preview.querySelector("img")).toBeNull();
  });

  it("copiar usa a área de transferência com HTML e avisa falhas", async () => {
    const write = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("negado"));
    Object.assign(navigator, { clipboard: { write } });
    vi.stubGlobal("ClipboardItem", class { constructor(public items: Record<string, Blob>) {} });
    const count = vi.fn();
    window.goatcounter = { count };
    render(<App />);
    await fillRequired();
    await userEvent.click(screen.getByRole("button", { name: "Copiar assinatura" }));
    expect(await screen.findByText(/Assinatura copiada/)).toBeTruthy();
    expect(count).toHaveBeenCalledWith({ path: "assinatura-copiada", title: "assinatura-copiada", event: true });
    expect(screen.getByRole("button", { name: "Copiado!" })).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Cargo e Setor/), { target: { value: "CTO" } });
    await userEvent.click(screen.getByRole("button", { name: "Copiar assinatura" }));
    expect(await screen.findByText(/Não foi possível copiar/)).toBeTruthy();
  });
});
describe("e-mail e foto", () => {
  it("valida o e-mail e o leva para a prévia", async () => {
    render(<App />);
    await fillRequired();
    const email = screen.getByLabelText(/E-mail profissional/);
    await userEvent.type(email, "ada@");
    expect(screen.getByText(/Use o formato nome@empresa/)).toBeTruthy();
    await userEvent.type(email, "empresa.com.br");
    const preview = screen.getByRole("region", { name: "Pré-visualização" });
    expect(preview.querySelector('a[href="mailto:ada@empresa.com.br"]')).toBeTruthy();
    expect(preview.querySelector('a[href="tel:11988887777"]')).toBeTruthy();
  });

  it("avisa quando a foto da assinatura é base64", async () => {
    render(<App />);
    await fillRequired();
    await userEvent.click(screen.getByLabelText("Sem foto"));
    fireEvent.change(screen.getByLabelText(/Link da Foto/), { target: { value: "data:image/png;base64,iVBORw0KGgo=" } });
    expect(screen.getByText(/pode não aparecer no Gmail/)).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Link da Foto/), { target: { value: "https://exemplo.com/f.png" } });
    expect(screen.queryByText(/pode não aparecer no Gmail/)).toBeNull();
  });
});
describe("PNG e limite do Gmail", () => {
  it("baixa o PNG, registra o evento e avisa quando o toPng falha", async () => {
    const png = vi.mocked(toPng);
    png.mockResolvedValueOnce("data:image/png;base64,iVBORw0KGgo=").mockRejectedValueOnce(new Error("CORS"));
    const count = vi.fn();
    window.goatcounter = { count };
    /* O jsdom não navega: troca o clique do link de download por um registro do nome do arquivo */
    const nomes: string[] = [];
    const clique = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      nomes.push(this.download);
    });
    render(<App />);
    await fillRequired();
    const baixar = screen.getByRole("button", { name: "Baixar como imagem (PNG)" });
    await userEvent.click(baixar);
    expect(await screen.findByText("Imagem PNG baixada.")).toBeTruthy();
    expect(png).toHaveBeenCalledTimes(1);
    expect(count).toHaveBeenCalledWith({ path: "assinatura-baixada", title: "assinatura-baixada", event: true });
    count.mockClear();
    await userEvent.click(baixar);
    expect(await screen.findByText(/Não foi possível gerar a imagem/)).toBeTruthy();
    expect(png).toHaveBeenCalledTimes(2);
    expect(count).not.toHaveBeenCalled();
    expect(nomes).toEqual(["email-signature-ada-lovelace.png"]);
    clique.mockRestore();
  });

  it("mostra o tamanho do HTML e avisa acima de 10.000 caracteres", async () => {
    expect(gmailLimitWarning(GMAIL_LIMIT)).toBe("");
    expect(gmailLimitWarning(GMAIL_LIMIT + 1)).toMatch(/limite de 10\.000/);
    render(<App />);
    await fillRequired();
    const tamanho = screen.getByText(/Tamanho do HTML copiado/);
    const atual = Number(tamanho.textContent!.match(/copiado: ([\d.]+)/)![1].replace(/\./g, ""));
    const copiado = document.querySelector(".signature")!.outerHTML.length;
    expect(atual).toBe(copiado);
    expect(screen.queryByText(/passa do limite/)).toBeNull();
    await userEvent.click(screen.getByLabelText("Sem foto"));
    const foto = screen.getByLabelText(/Link da Foto/);
    fireEvent.change(foto, { target: { value: `data:image/png;base64,${"A".repeat(12000)}` } });
    expect(screen.getByText(/passa do limite de 10\.000 caracteres do Gmail/)).toBeTruthy();
    fireEvent.change(foto, { target: { value: "https://exemplo.com/f.png" } });
    expect(screen.queryByText(/passa do limite/)).toBeNull();
  });

  it("não mostra o tamanho do Gmail no crachá", async () => {
    render(<App />);
    await fillRequired();
    fireEvent.change(document.querySelector<HTMLInputElement>("input[name=productType]")!, { target: { value: "digital-badge" } });
    expect(screen.queryByText(/Tamanho do HTML copiado/)).toBeNull();
  });
});
/* Fim de app.test.tsx */
