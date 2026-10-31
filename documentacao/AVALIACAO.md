# Avaliação — Digital Identity Suite (signature-generator)

> Data: 30/10/2026 · Base: `master` em `3f9d978` · Complementa `ANALISE.md`.

## Evidências

| Item | Resultado |
|---|---|
| `npm test` e `vite build` na `master` | **Falham**: `postcss.config.js` carrega pacotes não instalados |
| Depois da correção | 5 testes, `tsc` e build passam |
| `npm audit --omit=dev` | Nenhuma vulnerabilidade |
| CI | Não rodava: o arquivo estava em `ci/` |
| Site publicado | Responde com a v5.0 em Create React App, anterior à versão com Vite |
| GitHub Pages | Publica a branch `gh-pages`; o workflow antigo usava outro método |

**Não testado:** o job de deploy, que só roda depois do merge, e a assinatura em clientes de e-mail reais (issue #66).

## Achados

| # | Severidade | Achado | Encaminhamento |
|---|---|---|---|
| A1 | Alta | A `master` não compila | PR de correção |
| A2 | Alta | CI inativo, e a v5.1 nunca foi publicada | PR de correção |
| A3 | Média | Workflow incompatível com a fonte do Pages | PR de correção |
| A4 | Baixa | `docs/` guarda um build antigo que o Pages não usa | Remover em outro ciclo |
| A5 | Baixa | 5 branches do Dependabot abertas | Avaliar depois que o CI estiver ativo |

## Nota

Nota anterior do portfólio: 6,3, dada sem compilar o projeto. **Nota atual: 7,0 com a correção.** É um julgamento técnico.
