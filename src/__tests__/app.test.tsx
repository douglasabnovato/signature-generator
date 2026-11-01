/* Testes: URLs seguras, progresso, prévia, troca de produto e cópia com sucesso e falha */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { initialState } from "../App";
import { calculateProgress, initialsAvatar, safeImage, safeUrl, waLink } from "../utils/signatureHelpers";

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
    await userEvent.type(screen.getByLabelText(/Nome Completo/), "Ada");
    expect(screen.getByText("25%")).toBeTruthy();
    await userEvent.clear(screen.getByLabelText(/Nome Completo/));
    await fillRequired("javascript:alert(1)");
    const preview = screen.getByRole("region", { name: "Pré-visualização" });
    expect(preview.textContent).toContain("Ada Lovelace");
    expect(preview.querySelector('a[href^="javascript"]')).toBeNull();
    expect(screen.getByAltText("Foto de Ada Lovelace")).toBeTruthy();
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
/* Fim de app.test.tsx */
