# Análise — Digital Identity Suite (signature-generator)

## 1. Especificação

Gerador de assinatura de e-mail, crachá digital e cartão de visitas digital (3 produtos × 3 modelos), com prévia ao vivo, cópia para colar no cliente de e-mail e download em PNG.

| ID | Requisito | Antes | Depois |
|---|---|---|---|
| RF01 | Preencher dados e ver progresso | ✅ | ✅ |
| RF02 | Prévia ao vivo dos 9 modelos | ❌ não compilava | ✅ |
| RF03 | Copiar assinatura | ⚠️ `execCommand` sem aviso de falha | ✅ Clipboard API + aviso |
| RF04 | Baixar PNG | ⚠️ erro só no console | ✅ aviso na tela |
| RF05 | Links das redes | ⚠️ sem validação | ✅ só http(s) |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Crítica | `import Profile from "../assets/steve-jobs.jpg"` — arquivo não versionado: o build falha a partir do repositório | — |
| D2 | Alta | URLs digitadas vão cruas para `href` no HTML copiado (`javascript:` chega ao e-mail de quem recebe) | OWASP A05:2025 (injeção) |
| D3 | Média | Foto de uma pessoa real (Steve Jobs) como avatar padrão | Direito de imagem |
| D4 | Média | `copied` continuava verdadeiro depois de editar; botão dizia "Copiar Código HTML" mas copiava o conteúdo renderizado | Nielsen #1 |
| D5 | Média | Material UI 4 (fim de suporte), React 17, CRA 4 com `--openssl-legacy-provider`; Tailwind carregado sem nenhuma classe usada | OWASP A03:2025 |
| D6 | Baixa | WhatsApp aceitava qualquer texto em `wa.me/` | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| Build | ❌ (asset ausente) | ✅ |
| Testes | 0 | 5 |
| `npm audit` | dezenas (CRA 4) | 0 |
| axe-core | não executável | 0 violações (4 estados) |

## Rubrica v2 (grupo front-end)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 17% | 3 | 8 | Chromium: formulário → prévia dos 3 produtos → copiar | Não compilava em Node atual: CRA 4 exige openssl legado. Correção da auditoria: a foto src/assets/steve-jobs.jpg está versionada (a cópia usada na análise não a trouxe); ela deixou de ser usada |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 10% | 4 | 8 | testes: falha de cópia com aviso; foto inválida | Falha ao copiar ou gerar PNG só ia para o console |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 11% | 4 | 8 | axe-core 0 violações (vazio, assinatura, crachá, cartão) | Contraste da prévia, rótulos das redes sociais, estado dos botões claro/escuro |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 10% | 3 | 8 | testes: javascript:/data: recusados; wa.me só dígitos | Links digitados iam sem filtro para o HTML copiado (javascript:); foto de pessoa real como padrão |
| C5 | Dados | 3FN / ACID / fonte única | 3% | 5 | 7 | tipos em types/signature.ts; regras puras testadas | Estado 'copied' ficava ligado depois de editar |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 9% | 0 | 7 | vitest 5 cenários | Não havia testes |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 8% | 5 | 8 | App por configuração de campos (antes 480 linhas repetitivas); tsc estrito | makeStyles e Tailwind sem uso removidos |
| C8 | Desempenho | Complexidade; Core Web Vitals | 7% | 5 | 7 | PNG com pixelRatio 2; build Vite | Sem Lighthouse |
| C9 | Operação | 12-Factor; DORA | 6% | 4 | 7 | deploy gh-pages mantido; CI em ci/ | Sem URL publicada verificada |
| C10 | Documentação | README como contrato | 5% | 6 | 7 | README + documentacao/ | Documentação do ciclo em documentacao/ (docs/ é build antigo) |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 8% | 6 | 7 | 3 produtos x 3 modelos funcionando | Falta salvar os dados entre visitas |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 6% | 2 | 8 | npm audit 0; MUI 4 (sem suporte) → MUI 7 | @material-ui/core 4 e react-scripts 4 descontinuados |

**Média ponderada:** antes **3,69** (REPROVADO) → depois **7,62** (APROVADO).

