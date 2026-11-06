# MVP — Digital Identity Suite

> Criado em 31/10/2026, com os critérios usados no `movies`. Revisto em 06/11/2026 (ciclo de 03/11/2026, PR #99).

**Nível:** Vitrine (N2), 12 critérios. **Finalizado: sim** — os 4 critérios parciais dependem do responsável e cada um tem issue com o rótulo `depende-do-responsavel` (#100, #96, #87, #101).

## Problema e hipótese

**Problema e público:** Profissionais geram uma assinatura de e-mail, um crachá ou um cartão digital sem saber HTML ou design.

**Hipótese:** Pelo menos 50% de quem preenche os campos obrigatórios copia ou baixa o resultado. Proposta inicial, para o responsável confirmar ou trocar. Sem medição, a meta ainda não pode ser conferida. Decisão do responsável: #100.

## 1. Critérios

| # | Critério | Como verificar | Situação em 06/11/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Parcial: meta proposta; confirmar é do responsável (#100) |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: formulário, prévia, cópia e PNG testados; colar em e-mail real pendente (#96) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende |
| 5 | Medição de uso | A métrica principal é coletada | Parcial: cópia e download registrados no código, só com o nome do evento; falta a conta do GoatCounter (#87) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falhas de cópia e de imagem têm mensagem; a prévia estreita está corrigida em PR |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: mediana de 1,66 s no site publicado em 06/11/2026 (3 execuções); era 1,71 s em 02/11 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100, foco por Tab em 28 passos, com borda de 2 px nos campos; a região principal foi adicionada depois do alerta do axe |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: URLs validadas; nenhum dado sai do navegador |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: publica só depois do CI; `master` sem proteção, conferido pela API em 06/11/2026 (#101) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 33 testes Vitest no CI (regras, prévia, cópia, HTML dos 3 modelos, `tel:` e `mailto:`, aviso da foto) |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende com este documento |

**Resultado:** 8 de 12 critérios atendidos por inteiro (1, 4, 6, 7, 8, 9, 11 e 12) e 4 parciais (2, 3, 5 e 10), todos dependentes do responsável. É um julgamento técnico.

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Corrigir a prévia cortada em telas estreitas (#51) | Feito |
| 2 | Testar a assinatura em e-mail real (#96) | Com o responsável |
| 3 | Medir cópias e downloads (#87) | Com o responsável |
| 4 | Telefone e e-mail clicáveis e aviso da foto (PR #99) | Feito |
| 5 | Confirmar a meta (#100) e proteger a `master` (#101) | Com o responsável |

## 3. Fora do MVP

Contas de usuário, modelos salvos e editor visual. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 02/11/2026

Mediana do LCP de 1,71 s (1,71, 1,71 e 1,50 s), desempenho 89, acessibilidade 100. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.

## Medições de 06/11/2026

Site publicado depois do PR #106 (bundle `index-CUVXHT6R.js`, com o contato clicável). Mediana do LCP de 1,66 s (1,66, 1,73 e 1,66 s), desempenho 80, 83 e 85, acessibilidade 100 nas 3 execuções. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real. Duas execuções anteriores pararam com `NO_FCP` (Chrome sem pintar a página no computador sobrecarregado) e foram descartadas.
