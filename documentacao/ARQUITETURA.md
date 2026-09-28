# Arquitetura — Digital Identity Suite

```mermaid
flowchart TB
  main[main.tsx - tema MUI 7] --> App[App.tsx - formulário por configuração]
  App --> Sig[components/Signature.tsx - 9 modelos com estilo inline]
  App --> Prog[components/CircularProgressWithLabel]
  App & Sig --> helpers[utils/signatureHelpers.ts - progresso, safeUrl, waLink, avatar]
  App --> clip[(Clipboard API: text/html + text/plain)]
  App --> png[(html-to-image → PNG)]
```

## ADRs

| # | Decisão | Motivo | Alternativa |
|---|---|---|---|
| ADR-01 | Estilos inline nos modelos | Clientes de e-mail ignoram CSS externo | Classes CSS |
| ADR-02 | Saneamento de URL na renderização | Um ponto de controle para prévia, cópia e PNG | Validar só no formulário |
| ADR-03 | Avatar SVG por iniciais | Sem foto de terceiros, sem arquivo externo | Imagem genérica em assets |
| ADR-04 | Documentação do ciclo em `documentacao/` | `docs/` contém um build antigo do GitHub Pages | Sobrescrever docs/ |
