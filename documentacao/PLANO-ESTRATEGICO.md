# Plano estratégico — Digital Identity Suite (signature-generator)

> Criado em 30/10/2026. Diagnóstico em `AVALIACAO.md`.

## Objetivo

Chegar ao nível N2 (vitrine): versão atual no ar, fluxos testados, CI ativo e issues em dia.

## Execução

| Etapa | Entrega | Situação |
|---|---|---|
| 1 | Build corrigido, CI ativo e deploy compatível com o Pages | PR aberto |
| 2 | Avaliação e plano | Este PR |
| 3 | Publicar a v5.1 e testar no ar | Depende do merge |
| 4 | Revisar as transições de layout (issue #51) | Depois da etapa 3 |
| 5 | Testar a assinatura em Gmail, Outlook e Apple Mail (issue #66) | Com o responsável |

## O que você pode melhorar

- **Arquitetura:** separar os geradores de assinatura, crachá e cartão, para que cada formato evolua sem afetar os outros.
- **Engenharia:** adicionar lint ao CI, que hoje só roda testes e build, e reduzir o pacote de 419 KB.
- **Produto:** salvar os dados no navegador, já previsto no plano de ação, para a pessoa não preencher tudo de novo.
