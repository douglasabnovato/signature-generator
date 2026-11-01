/* Digital Identity Suite: formulário à esquerda e prévia ao vivo à direita, com cópia e download em PNG */
import React, { useState } from "react";
import {
  AppBar, Box, Button, ButtonGroup, Container, FormControlLabel, Grid, MenuItem, Paper, Snackbar, Alert,
  Switch, TextField, Toolbar, Typography,
} from "@mui/material";
import { CheckOutlined, ContentCopyOutlined, DownloadOutlined, Brightness4Outlined, Brightness7Outlined } from "@mui/icons-material";
import { toPng } from "html-to-image";
import Signature from "./components/Signature";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import { SignatureData, ProductType } from "./types/signature";
import { calculateProgress, hasRequiredData, safeImage } from "./utils/signatureHelpers";
import "./App.css";
import { trackEvent } from "./utils/metrics";

export const initialState: SignatureData = {
  productType: "email-signature",
  template: "classic",
  fullName: "",
  position: "",
  site: "",
  phone: "",
  email: "",
  photo: "",
  withPhoto: false,
  copied: false,
  linkedinUrl: "",
  githubUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  whatsappNumber: "",
  twitterUrl: "",
  youtubeUrl: "",
  badgeId: "",
  badgeExpiration: "",
  department: "",
  specialties: ["PREDIAL", "INDUSTRIAL", "RESIDENCIAL", "MANUTENÇÃO"],
};

const TEMPLATES: Record<ProductType, [string, string][]> = {
  "email-signature": [["classic", "Clássico (Divisor Vertical)"], ["modern", "Moderno (Card Destaque)"], ["minimalist", "Minimalista (Barra Lateral)"]],
  "digital-badge": [["tech", "Tech Cyber (Frente/Verso com QR)"], ["corporate", "Corporate Clean (Executivo)"], ["creative", "Creative Neon (Estilo Moderno)"]],
  "digital-business-card": [["mobile-app", "Mobile App (Estilo Smartphone)"], ["horizontal-banner", "Banner Horizontal (Corporativo)"], ["sleek-dark", "Sleek Dark (Minimalista Escuro)"]],
};

const REQUIRED: [keyof SignatureData, string, string?][] = [
  ["fullName", "Nome Completo"],
  ["position", "Cargo e Setor"],
  ["site", "Site Oficial da Empresa", "url"],
  ["phone", "Telefone de Contato", "tel"],
];
const BADGE: [keyof SignatureData, string][] = [
  ["badgeId", "Código do Crachá (ID ex: 324553)"],
  ["badgeExpiration", "Data de Validade (EXP ex: 31-12-28)"],
  ["department", "Departamento / Setor"],
];
const SOCIAL: [keyof SignatureData, string][] = [
  ["linkedinUrl", "Link do LinkedIn"],
  ["githubUrl", "Link do GitHub"],
  ["instagramUrl", "Link do Instagram"],
  ["whatsappNumber", "Número do WhatsApp (com DDI e DDD)"],
  ["youtubeUrl", "Link do Canal no YouTube"],
];

/* Copia a prévia como HTML rico (e texto) para colar no cliente de e-mail; recorre ao execCommand em navegadores antigos */
async function copySignature(node: HTMLElement): Promise<void> {
  const html = node.outerHTML;
  if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
    await navigator.clipboard.write([new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([node.innerText], { type: "text/plain" }),
    })]);
    return;
  }
  const range = document.createRange();
  range.selectNode(node);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  const ok = document.execCommand("copy");
  sel?.removeAllRanges();
  if (!ok) throw new Error("copy failed");
}

function App() {
  const [state, setState] = useState<SignatureData>(initialState);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });
  const [dark, setDark] = useState(true);

  /* Atualiza um campo; trocar o produto escolhe o primeiro modelo dele; qualquer edição desfaz o "Copiado" */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    const key = name as keyof SignatureData;
    setState((prev) => {
      const next = { ...prev, [key]: type === "checkbox" ? checked : value, copied: false } as SignatureData;
      if (key === "productType") next.template = TEMPLATES[value as ProductType][0][0] as SignatureData["template"];
      return next;
    });
  };

  const notify = (message: string, severity: "success" | "error" = "success") => setToast({ open: true, message, severity });

  /* Copia a prévia */
  const handleCopy = async () => {
    const node = document.querySelector<HTMLElement>(".signature");
    if (!node) return;
    try {
      await copySignature(node);
      setState((p) => ({ ...p, copied: true }));
      trackEvent("assinatura-copiada");
      notify("Assinatura copiada. Cole nas configurações de assinatura do seu e-mail.");
    } catch {
      notify("Não foi possível copiar. Selecione a prévia e use Ctrl+C.", "error");
    }
  };

  /* Baixa a prévia como PNG */
  const handleDownload = async () => {
    const node = document.querySelector<HTMLElement>(".signature");
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `${state.productType}-${(state.fullName || "identidade").trim().replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      trackEvent("assinatura-baixada");
      notify("Imagem PNG baixada.");
    } catch {
      notify("Não foi possível gerar a imagem (a foto pode estar em um site que bloqueia cópia). Tente outra URL de foto.", "error");
    }
  };

  const progress = calculateProgress(state);
  const ready = hasRequiredData(state);
  const photoInvalid = state.withPhoto && state.photo.trim() !== "" && !safeImage(state.photo);
  const pristine = JSON.stringify(state) === JSON.stringify(initialState);
  const field = (key: keyof SignatureData, label: string, type = "text", required = false) => (
    <TextField key={key} fullWidth margin="dense" required={required} label={label} name={key} type={type}
      value={state[key] as string} onChange={handleChange} />
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <AppBar position="static" component="header" sx={{ borderRadius: 2, mb: 3 }}>
        <Toolbar><Typography variant="h6" component="h1">Digital Identity Suite — Gerador Profissional</Typography></Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper component="section" aria-label="Dados" sx={{ p: 3 }}>
            <Box component="form" noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <TextField select fullWidth margin="dense" label="Produto de Identidade Digital" name="productType" value={state.productType} onChange={handleChange}>
                <MenuItem value="email-signature">Assinatura de E-mail</MenuItem>
                <MenuItem value="digital-badge">Crachá Digital (ID Card)</MenuItem>
                <MenuItem value="digital-business-card">Cartão de Visitas Digital</MenuItem>
              </TextField>
              <TextField select fullWidth margin="dense" label="Estilo do Design (Template)" name="template" value={state.template} onChange={handleChange}>
                {TEMPLATES[state.productType].map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
              </TextField>
              {REQUIRED.map(([k, l, t]) => field(k, l, t, true))}
              {state.productType === "digital-badge" && BADGE.map(([k, l]) => field(k, l))}
              {SOCIAL.map(([k, l]) => field(k, l, k === "whatsappNumber" ? "tel" : "url"))}
              <FormControlLabel control={<Switch checked={state.withPhoto} onChange={handleChange} name="withPhoto" />} label={state.withPhoto ? "Foto habilitada" : "Sem foto"} />
              {state.withPhoto && (
                <TextField fullWidth margin="dense" required label="Link da Foto de Perfil" name="photo" value={state.photo} onChange={handleChange}
                  error={photoInvalid} helperText={photoInvalid ? "Use um link https:// para uma imagem (ou uma imagem em base64)." : " "} />
              )}
              <Button disabled={pristine} onClick={() => setState(initialState)} color="secondary" sx={{ mt: 1 }}>Limpar campos</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper component="section" aria-label="Pré-visualização" sx={{ p: 3 }}>
            {ready ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="overline" component="h2" sx={{ color: "#475569" }}>Pré-visualização</Typography>
                  <ButtonGroup size="small" variant="outlined" aria-label="Fundo da prévia">
                    <Button aria-pressed={dark} variant={dark ? "contained" : "outlined"} onClick={() => setDark(true)} startIcon={<Brightness4Outlined />}>Escuro</Button>
                    <Button aria-pressed={!dark} variant={!dark ? "contained" : "outlined"} onClick={() => setDark(false)} startIcon={<Brightness7Outlined />}>Claro</Button>
                  </ButtonGroup>
                </Box>
                <Box className={dark ? "preview preview-dark" : "preview preview-light"}>
                  <Signature {...state} photo={state.withPhoto ? state.photo : "no-photo"} />
                </Box>
                <Box sx={{ display: "flex", gap: 1.25, justifyContent: "center", flexWrap: "wrap", mt: 2 }}>
                  <Button variant="contained" onClick={handleCopy} endIcon={state.copied ? <CheckOutlined /> : <ContentCopyOutlined />}>
                    {state.copied ? "Copiado!" : "Copiar assinatura"}
                  </Button>
                  <Button variant="outlined" onClick={handleDownload} startIcon={<DownloadOutlined />}>Baixar como imagem (PNG)</Button>
                </Box>
              </>
            ) : progress > 0 ? (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgressWithLabel value={progress} />
                <Typography sx={{ mt: 1, color: "#475569" }}>Complete os campos obrigatórios para ver a prévia.</Typography>
              </Box>
            ) : (
              <Typography sx={{ textAlign: "center", p: 5, color: "#475569" }}>
                Preencha os dados obrigatórios no formulário para gerar sua identidade digital em tempo real.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={toast.open} autoHideDuration={5000} onClose={(_, reason) => reason !== "clickaway" && setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert elevation={6} variant="filled" severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))}>{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
/* Fim de App.tsx */
