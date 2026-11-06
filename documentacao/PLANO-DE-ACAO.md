# Plano de ação — Digital Identity Suite

Timebox: 40 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Voltar a compilar (D1) | Alto | Baixo | ✅ |
| Must | Saneamento de links (D2) | Alto | Baixo | ✅ |
| Should | Avatar por iniciais (D3) | Médio | Baixo | ✅ |
| Should | Cópia confiável e avisos (D4) | Médio | Baixo | ✅ |
| Should | MUI 7 + Vite (D5) | Médio | Médio | ✅ |
| Could | Salvar os dados no navegador | Médio | Baixo | Próximo ciclo |
| Could | Upload de foto (hoje é URL) | Médio | Médio | Próximo ciclo |

## Ciclo de 03/11/2026

> Branch `feature/2026-11-05` → `developer/sprint-2026-11-05` → `master`. Nível: Vitrine (N2), 12 critérios.

### Produto

**Problema e público.** Profissionais precisam de uma assinatura de e-mail, um crachá ou um cartão digital sem saber HTML ou design.

**Hipótese e meta.** Pelo menos 50% de quem preenche os campos obrigatórios copia ou baixa o resultado. A meta é uma proposta; confirmar é do responsável (#100). Medir depende da conta no GoatCounter (#87).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Telefone e e-mail clicáveis | Guias de assinatura pedem `tel:` e `mailto:` reais, para o celular discar e o cliente abrir o e-mail. Virou link nos 3 modelos, com estilo inline | [Hivly: HTML email signature tips](https://hivly-signature.pages.dev/guides/html-email-signature-tips), [NeatStamp: best practices](https://neatstamp.pages.dev/blog/email-signature-best-practices) |
| Imagem por link público, e não embutida | Imagem em base64 costuma ser removida ou bloqueada e aumenta muito o e-mail. Virou um aviso no campo da foto quando ela é base64 ou `http://` | [Email Signature Rescue: Gmail best practices](https://www.emailsignaturerescue.com/blog/gmail-signatures-best-practices-for-creating-perfect-gmail-signatures-every-time), [NeatStamp: assinatura no Gmail](https://neatstamp.pages.dev/email-signature-gmail) |
| Limite de 10.000 caracteres no Gmail | O Gmail recusa assinaturas longas, e o HTML e as imagens contam. Virou a issue #102 | [Exclaimer: limite de 10.000 caracteres](https://support.exclaimer.com/hc/en-gb/articles/6627910753437-10-000-character-limit-for-client-side-in-Google-Workspace), [Letsignit: ficar abaixo de 10 mil](https://help.letsignit.com/en/articles/83105-google-clients-best-practices-to-stay-within-10k-characters) |
| Testar em mais de um cliente | Uma assinatura certa no Gmail pode quebrar no Outlook. Segue com o responsável (#96) | [Hivly: HTML email signature tips](https://hivly-signature.pages.dev/guides/html-email-signature-tips) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Telefone e e-mail clicáveis | Alto | Baixo | Este ciclo (PR #99) |
| 2 | Aviso de foto base64 ou http | Médio | Baixo | Este ciclo (PR #99) |
| 3 | CI nos PRs para a `developer` | Alto | Baixo | Este ciclo (PR #99) |
| 4 | Teste em e-mail real | Alto | Baixo | Responsável (#96) |
| 5 | Conta de medição | Alto | Baixo | Responsável (#87) |
| 6 | Proteger a `master` | Alto | Baixo | Responsável (#101) |
| 7 | Aviso do limite do Gmail | Médio | Baixo | Issue (#102) |
| 8 | Teste do download do PNG | Médio | Baixo | Issue (#103) |
| 9 | Dependabot de versão maior | Baixo | Baixo | Issue (#104) |
| 10 | Salvar os dados no navegador | Médio | Médio | Issue (#105) |

**Fora do escopo.** Contas de usuário, modelos salvos na nuvem, editor visual e upload de foto.

### Engenharia

**Arquitetura.** SPA React 18 com Vite 8 e MUI 7. O formulário fica em `src/App.tsx`; os modelos, em `src/components/Signature.tsx`, com estilos inline para clientes de e-mail. As regras de links (`safeUrl`, `safeImage`, `waLink`, `mailtoLink`, `telLink`, `photoWarning`) são funções puras em `src/utils/signatureHelpers.ts`. Publicação no GitHub Pages pelo CI, só em push na `master`.

**Riscos.**
- Clientes de e-mail exibem o HTML de formas diferentes; o teste automático só prova a estrutura (#96).
- Sem proteção, um push direto na `master` ainda passa sem PR (#101).
- `tel:` monta o número só com dígitos (8 a 15) e o `+` do DDI; número digitado fora disso fica como texto.

**Qualidade.**
- Testes: 33 testes Vitest (regras, prévia, cópia, HTML dos 3 modelos, contato clicável e aviso da foto).
- CI: agora também nos PRs e pushes para `developer/**`, que antes passavam sem verificação.
- Acessibilidade: campo novo com rótulo e mensagem de ajuda; aviso da foto em cor escura (#92400e) sobre fundo claro.
- Desempenho: LCP medido no ar depois do merge (seção de medições do `MVP.md`).
- Segurança: e-mail validado antes de virar `mailto:`; nada sai do navegador.

**Definição de pronto.** `npm ci`, `npm test` e `npm run build` passam; CI verde no PR; `documentacao/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Telefone `tel:` e e-mail `mailto:` nos 3 modelos, com testes.
2. Campo de e-mail validado e aviso de foto base64 ou http, com testes.
3. CI nos PRs para a `developer`.
4. `MVP.md` com o resumo batendo com a tabela; README com o estado e os próximos passos.

**Vira issue.** #100, #101 (responsável); #87 e #96 seguem com o responsável; #102, #103, #104, #105 (agente).
