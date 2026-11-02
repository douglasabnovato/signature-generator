/* Testes: o HTML das assinaturas de e-mail usa tabelas e estilos inline, sem o que os clientes de e-mail removem; e os ícones publicados existem */
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Signature from "../components/Signature";
import { initialState } from "../App";
import { EmailTemplateType } from "../types/signature";
import indexHtml from "../../index.html?raw";
import manifestRaw from "../../public/manifest.json?raw";

const TEMPLATES: EmailTemplateType[] = ["classic", "modern", "minimalist"];

const html = (template: EmailTemplateType, photo = "no-photo") =>
  renderToStaticMarkup(
    <Signature
      {...initialState}
      productType="email-signature"
      template={template}
      fullName="Ada Lovelace"
      position="Engenharia"
      phone="(11) 90000-0000"
      site="empresa.com.br"
      photo={photo}
      linkedinUrl="https://www.linkedin.com/in/exemplo"
      githubUrl="javascript:alert(1)"
      whatsappNumber="5511900000000"
    />
  );

describe.each(TEMPLATES)("assinatura de e-mail %s", (template) => {
  const out = html(template);

  it("é uma tabela com estilos inline em todas as células", () => {
    expect(out.startsWith("<table")).toBe(true);
    for (const td of out.match(/<td[^>]*>/g) ?? []) expect(td).toContain("style=");
  });

  it("não usa o que os clientes de e-mail removem", () => {
    expect(out).not.toMatch(/<script|<style|<svg|<link|\son\w+=|display:\s*flex/i);
  });

  it("só tem links http(s), todos com estilo inline, e recusa o inválido", () => {
    const links = out.match(/<a [^>]*>/g) ?? [];
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a).toMatch(/href="https?:\/\//);
      expect(a).toContain("style=");
    }
    expect(out).toContain("LinkedIn");
    expect(out).toContain("WhatsApp");
    expect(out).not.toContain("javascript:");
    expect(out).not.toContain("GitHub");
  });

  it("sem foto, não inclui imagem", () => {
    expect(out).not.toContain("<img");
  });
});

describe("foto na assinatura", () => {
  it.each(["classic", "modern"] as EmailTemplateType[])("%s mostra a foto com largura e altura fixas", (template) => {
    const out = html(template, "https://exemplo.com/foto.png");
    expect(out).toContain('src="https://exemplo.com/foto.png"');
    expect(out).toMatch(/<img[^>]*width="[^"]+"[^>]*height="[^"]+"/);
  });
});

describe("ícones do site", () => {
  const published = Object.keys(import.meta.glob("../../public/*", { query: "?url" })).map((f) => f.replace("../../public/", ""));

  it("o index.html aponta para um ícone que existe", () => {
    const href = indexHtml.match(/rel="icon"[^>]*href="\.\/([^"]+)"/)?.[1];
    expect(href).toBeTruthy();
    expect(published).toContain(href);
  });

  it("o manifest só cita arquivos que existem", () => {
    const icons: { src: string }[] = JSON.parse(manifestRaw).icons;
    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) expect(published).toContain(icon.src);
  });
});
/* Fim de signatureHtml.test.tsx */
