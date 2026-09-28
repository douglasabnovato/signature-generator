/* Regras puras: progresso do formulário, URLs seguras, link do WhatsApp e avatar por iniciais */
import { SignatureData } from "../types/signature";

/* Percentual dos campos obrigatórios preenchidos (a foto conta quando habilitada) */
export const calculateProgress = (state: SignatureData): number => {
  const fields: (keyof SignatureData)[] = state.withPhoto
    ? ["fullName", "phone", "position", "site", "photo"]
    : ["fullName", "phone", "position", "site"];
  const filled = fields.filter((f) => String(state[f] ?? "").trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
};

/* Aceita só http(s); completa "site.com" com https:// e recusa javascript:, data: etc. (antes o link ia cru para a assinatura) */
export function safeUrl(input: string): string {
  const s = String(input || "").trim();
  if (!s) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
  } catch {
    return "";
  }
}

/* Imagem da foto: URL http(s) ou data:image base64 */
export function safeImage(input: string): string {
  const s = String(input || "").trim();
  if (/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(s)) return s;
  return /^https?:\/\//i.test(s) ? safeUrl(s) : "";
}

/* wa.me só com dígitos (DDI + DDD + número) */
export function waLink(number: string): string {
  const d = String(number || "").replace(/\D/g, "");
  return d.length >= 10 ? `https://wa.me/${d}` : "";
}

/* Avatar SVG com as iniciais (substitui a foto de uma pessoa real usada como padrão) */
export function initialsAvatar(name: string): string {
  const initials = String(name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("") || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#1e3a8a"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="48" fill="#ffffff">${initials.replace(/[<&>]/g, "")}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* Dados obrigatórios preenchidos para mostrar a prévia */
export function hasRequiredData(s: SignatureData): boolean {
  const base = Boolean(s.fullName.trim() && s.phone.trim() && s.position.trim() && s.site.trim());
  return s.withPhoto ? base && Boolean(safeImage(s.photo)) : base;
}
/* Fim de signatureHelpers.ts */
