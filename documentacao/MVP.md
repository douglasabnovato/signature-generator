# MVP — Digital Identity Suite

> Criado em 31/10/2026, com os critérios usados no `movies`. Situação baseada em `AVALIACAO.md` e na conferência deste ciclo.

## Problema e hipótese

**Problema e público:** Profissionais geram uma assinatura de e-mail, um crachá ou um cartão digital sem saber HTML ou design.

**Hipótese:** Pelo menos 50% de quem preenche os campos obrigatórios copia ou baixa o resultado. Proposta inicial, para o responsável confirmar ou trocar. Sem medição, a meta ainda não pode ser conferida.

## 1. Critérios

| # | Critério | Como verificar | Situação em 31/10/2026 |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Parcial: meta proposta |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: formulário, prévia, cópia e PNG testados; colar em e-mail real pendente (#66) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende |
| 5 | Medição de uso | A métrica principal é coletada | Parcial: cópia e download registrados no código, só com o nome do evento; falta a conta do GoatCounter (#87) |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: falhas de cópia e de imagem têm mensagem; a prévia estreita está corrigida em PR |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Atende: mediana de 1,71 s no site publicado (3 execuções), CLS 0 |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: Lighthouse 100, foco por Tab em 28 passos, com borda de 2 px nos campos; a região principal foi adicionada depois do alerta do axe |
| 9 | Segurança e conformidade | Riscos decididos; termos de terceiros cumpridos | Atende: URLs validadas; nenhum dado sai do navegador |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: publica só depois do CI; `master` sem proteção |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: regras, prévia e cópia |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Atende com este documento |

**Resultado:** 6 de 12 critérios atendidos por inteiro. É um julgamento técnico.

## 2. Tarefas

| # | Tarefa | Situação |
|---|---|---|
| 1 | Corrigir a prévia cortada em telas estreitas (#51) | Feito |
| 2 | Testar a assinatura em e-mail real (#66) | Com o responsável |
| 3 | Medir cópias e downloads | Com o responsável |

## 3. Fora do MVP

Contas de usuário, modelos salvos e editor visual. A lista é uma proposta e pode mudar com a decisão do responsável.

## Medições de 02/11/2026

Mediana do LCP de 1,71 s (1,71, 1,71 e 1,50 s), desempenho 89, acessibilidade 100. Lighthouse 12.8.2 local, perfil móvel simulado, sem aparelho real.
