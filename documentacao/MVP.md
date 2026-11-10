# MVP — Digital Identity Suite

> Criado em 31/10/2026, com os critérios usados no `movies`. Revisto em 10/11/2026 (ciclo da faixa de 90%, decisões D1 a D7 do repositório `engenharia`).

**Resumo:** 11 de 12 aplicáveis atendidos

**Finalizado:** sim

**Nível:** Vitrine (N2), 12 critérios. O único parcial (5) depende da conta do GoatCounter, do responsável, com issue `depende-do-responsavel` (#87).

## Problema e hipótese

**Problema e público:** Profissionais geram uma assinatura de e-mail, um crachá ou um cartão digital sem saber HTML ou design.

**Hipótese:** Pelo menos 50% de quem preenche os campos obrigatórios copia ou baixa o resultado. Meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável (#100). Conferir a meta depende da medição (#87).

## 1. Critérios

| # | Critério | Como verificar | Situação em 10/11/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável (#100) |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende (decisão D2): `npm run test:e2e` (Playwright, novo job `e2e` no CI), 10/11/2026: 4 testes, 0 falhas; preenche os campos obrigatórios, confere a prévia, copia (HTML lido da área de transferência) e baixa o PNG. O fluxo roda todo no navegador; o site publicado responde (`curl`, HTTP 200, 10/11/2026). Colar num e-mail real virou validação (#96) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende |
| 5 | Medição de uso | A métrica principal é coletada | Parcial: código pronto; falta a conta (decisão D5, #87). O GoatCounter usa o código `douglasabnovato` no site publicado, sem cookie, só com o nome do evento (`assinatura-copiada`, `assinatura-baixada`); não carrega em localhost nem nos testes (Vitest e Playwright) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falhas de cópia e de imagem têm mensagem; a prévia estreita está corrigida em PR |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: Lighthouse 12.8.2 móvel no site publicado, 10/11/2026: 1,72 / 1,79 / 1,65 s, mediana 1,72 s, TBT 400 ms, elemento do LCP `header h1` |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100, foco por Tab em 28 passos, com borda de 2 px nos campos; a região principal foi adicionada depois do alerta do axe |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: URLs validadas; nenhum dado da assinatura sai do navegador. `npm audit --omit=dev`: 0 vulnerabilidades; Dependabot pela API: 0 alertas abertos, 10/11/2026 |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: `gh api repos/douglasabnovato/signature-generator/rules/branches/master`, 10/11/2026: `required_status_checks` com `build-and-test`, além de PR obrigatório e bloqueio de force push e exclusão; o workflow publica só depois do build, dos testes e do e2e (#101). Incluir o job `e2e` nos checks obrigatórios é do responsável (#101) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: `npm test`, 10/11/2026: 34 testes Vitest, 0 falhas; 4 testes Playwright no job `e2e` |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende: README com comandos conferidos contra o `package.json`, 10/11/2026 |

## Histórico

- 06/11/2026 (PR #99), critério 10 revisto em 10/11/2026: 9 de 12. Parciais: 2 (meta só proposta), 3 (colar em e-mail real) e 5 (falta a conta).

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Corrigir a prévia cortada em telas estreitas (#51) | Feito |
| 2 | Testar a assinatura em e-mail real (#96) | Com o responsável |
| 3 | Medir cópias e downloads (#87) | Com o responsável |
| 4 | Telefone e e-mail clicáveis e aviso da foto (PR #99) | Feito |
| 5 | Confirmar a meta (#100) e proteger a `master` (#101) | Meta com o responsável; `master` protegida em 10/11/2026 |

## 3. Fora do MVP

Contas de usuário, modelos salvos e editor visual. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 02/11/2026

Mediana do LCP de 1,71 s (1,71, 1,71 e 1,50 s), desempenho 89, acessibilidade 100. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.

## Medições de 06/11/2026

Site publicado depois do PR #106 (bundle `index-CUVXHT6R.js`, com o contato clicável). Mediana do LCP de 1,66 s (1,66, 1,73 e 1,66 s), desempenho 80, 83 e 85, acessibilidade 100 nas 3 execuções. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real. Duas execuções anteriores pararam com `NO_FCP` (Chrome sem pintar a página no computador sobrecarregado) e foram descartadas.
