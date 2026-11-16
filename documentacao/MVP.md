# MVP — Digital Identity Suite

> Criado em 31/10/2026, com os critérios usados no `movies`. Revisto em 16/11/2026, contra a coluna de evidência da régua do repositório `engenharia`.

**Resumo:** 11 de 12 aplicáveis atendidos

**Finalizado:** sim

**Nível:** Vitrine (N2), 12 critérios. O único parcial (5) depende da conta do GoatCounter, do responsável, com issue `depende-do-responsavel` (#87).

## Problema e hipótese

**Problema e público:** Profissionais geram uma assinatura de e-mail, um crachá ou um cartão digital sem saber HTML ou design.

**Hipótese:** Acreditamos que a prévia ao vivo faz quem preenche os campos obrigatórios levar o resultado. Meta: pelo menos 50% de quem preenche os campos obrigatórios copia ou baixa. Saberemos quando o GoatCounter mostrar, em uma semana, os eventos `assinatura-copiada` e `assinatura-baixada` contra as visitas (#87). A meta foi decidida pelo coordenador em 10/11/2026 (decisão D1) e o responsável pode trocá-la (#100).

## 1. Critérios

| # | Critério | Como verificar | Situação em 16/11/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: frase acima e no README |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende: "Acreditamos que… saberemos quando…" acima, com a meta de 50% (decisão D1, revisável pelo responsável em #100) |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador (Playwright) no CI | Atende: `npm run build && npm run test:e2e`, 16/11/2026: 6 testes, 0 falhas. Preenche os campos, confere a prévia, copia (HTML lido da área de transferência) e baixa o PNG; job `e2e` do CI, run [43826990972](https://github.com/douglasabnovato/signature-generator/actions/runs/43826990972), 16/11/2026: 6 passed. Colar num e-mail real segue como validação de produto (#96) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: seção "Fora do MVP" |
| 5 | Medição de uso | Painel da ferramenta com visitas | Parcial: o código conta `assinatura-copiada` e `assinatura-baixada` só no site publicado (teste Playwright com o domínio roteado), mas a conta do GoatCounter não existe e o site no ar ainda é o build de 06/11, sem o script (#87 e #112, do responsável) |
| 6 | Falhas tratadas | Testes de falha, vazio e espera | Atende: `npm test`, 16/11/2026: 38 testes Vitest, 0 falhas. Falha: a cópia negada ("Não foi possível copiar") e o `toPng` que falha (mensagem, sem contar o evento). Vazio: a instrução da tela sem dados e o progresso parcial (25%). Espera: enquanto o PNG é gerado, o botão mostra "Gerando imagem…", fica desabilitado e não aceita outro clique. O app não chama rede; a cópia é imediata |
| 7 | Desempenho aceitável | Lighthouse móvel no site publicado, 3 execuções, mediana | Atende: Lighthouse 12.8.2 móvel em `https://douglasabnovato.github.io/signature-generator/`, 16/11/2026: LCP 1,72 / 1,66 / 1,50 s, mediana 1,66 s; TBT 347 / 399 / 465 ms, mediana 399 ms; elemento do LCP `header h1` (título da barra). A primeira execução da série foi descartada pela regra do portfólio (FCP observado acima de ~2 s: foi 2,8 s); ela daria LCP de 1,81 s, também dentro da meta. O site no ar é o build de 06/11 (`index-CUVXHT6R.js`); medir de novo quando o deploy voltar (#112) |
| 8 | Acessibilidade básica | axe e teclado (Tab, Esc, foco visível) | Atende: `npm run test:e2e`, 16/11/2026. O axe (`@axe-core/playwright`, WCAG 2.x A e AA) roda sem violações em 1366 px, na tela vazia, na prévia com dados reais (fundo escuro e claro da prévia) e com os avisos da foto e do Gmail. O teste só com teclado chega aos campos com `Tab`, confere a borda de foco de 2 px e o contorno de 3 px nos 4 botões da prévia (Escuro, Claro, Copiar e Baixar), fecha a lista de produtos e o aviso com `Esc` (o aviso precisa sumir em até 1 s; sozinho, ele leva 5 s). O app não tem tema escuro próprio: o botão "Escuro" muda só o fundo da prévia |
| 9 | Segurança e conformidade | `npm audit --omit=dev` e alertas do Dependabot | Atende: `npm audit --omit=dev`, 16/11/2026: 0 vulnerabilidades. `gh api "repos/douglasabnovato/signature-generator/dependabot/alerts?state=open&per_page=100"`, 16/11/2026: 0 alertas abertos. Nenhum segredo no código; nenhum dado da assinatura sai do navegador; links validados (só http e https) |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende: `gh api repos/douglasabnovato/signature-generator/rulesets/26932559`, 16/11/2026: ruleset `principal-protegida` ativo, com PR obrigatório, bloqueio de force push e de exclusão e os checks `build-and-test` e `e2e`. O CI roda nos PRs para `master` e `developer/**`. A publicação está parada por um 403 no deploy (#112), mas nada entra na principal sem CI |
| 11 | Testes dos fluxos críticos | Testes no CI, sem `# skipped` | Atende: run [43826990972](https://github.com/douglasabnovato/signature-generator/actions/runs/43826990972), 16/11/2026: job `build-and-test` com 38 testes Vitest passando e job `e2e` com 6 testes Playwright passando, sem `skipped` no log |
| 12 | Documentação honesta | README com comandos conferidos | Atende: comandos do README conferidos contra o `package.json` em 16/11/2026 (`dev`, `test`, `test:e2e`, `build`, `deploy`); o README diz que o site no ar está atrás da `master` (#112) |

**Evidência do CI:** PR #117, run [43826990972](https://github.com/douglasabnovato/signature-generator/actions/runs/43826990972) (commit `cca8e49`), 16/11/2026: `build-and-test` e `e2e` verdes. O run anterior, 43825928317, falhou no axe por uma cor lida no meio da transição de um botão; o teste passou a desligar as transições antes do axe.

## Histórico

- 10/11/2026 (PR #111): 11 de 12. O critério 8 estava "Atende" com Lighthouse 100 e teclado manual, sem axe no teste de navegador; foi conferido de novo e passou a ter o teste em 16/11/2026.
- 06/11/2026 (PR #99), critério 10 revisto em 10/11/2026: 9 de 12. Parciais: 2 (meta só proposta), 3 (colar em e-mail real) e 5 (falta a conta).

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Corrigir a prévia cortada em telas estreitas (#51) | Feito |
| 2 | Testar a assinatura em e-mail real (#96) | Com o responsável |
| 3 | Medir cópias e downloads (#87) | Com o responsável |
| 4 | Telefone e e-mail clicáveis e aviso da foto (PR #99) | Feito |
| 5 | Confirmar a meta (#100) | Com o responsável |
| 6 | Deploy de volta no Pages (#112) | Com o responsável |
| 7 | Aviso do limite do Gmail (#102) e teste da falha do PNG (#103) | Em PR para a sprint de 19/11 (#117), falta a principal |

## 3. Fora do MVP

Contas de usuário, modelos salvos na nuvem, editor visual, upload de foto e tema escuro do app. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 16/11/2026

Site publicado (build de 06/11, `index-CUVXHT6R.js`). Comando: `npx lighthouse@12.8.2 https://douglasabnovato.github.io/signature-generator/ --only-categories=performance,accessibility --output=json --chrome-flags="--headless --no-sandbox"`, 4 vezes seguidas, perfil móvel simulado (padrão). Regra de descarte, a do `aprendizados.md` do portfólio: FCP observado acima de ~2 s ou TBT acima de ~5 s. Execuções válidas: LCP 1,72 / 1,66 / 1,50 s (mediana 1,66 s), TBT 347 / 399 / 465 ms, desempenho 91 / 90 / 88, acessibilidade 100. Descartada: a primeira execução (LCP 1,81 s, FCP observado 2,8 s, cache frio).

## Medições de 02/11/2026

Mediana do LCP de 1,71 s (1,71, 1,71 e 1,50 s), desempenho 89, acessibilidade 100. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.

## Medições de 06/11/2026

Site publicado depois do PR #106 (bundle `index-CUVXHT6R.js`, com o contato clicável). Mediana do LCP de 1,66 s (1,66, 1,73 e 1,66 s), desempenho 80, 83 e 85, acessibilidade 100 nas 3 execuções. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real. Duas execuções anteriores pararam com `NO_FCP` (Chrome sem pintar a página no computador sobrecarregado) e foram descartadas.
