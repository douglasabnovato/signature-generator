# Deploy · Digital Identity Suite (signature-generator)

## Estado em 18/11/2026

- **Publicação em dia:** o run 43888664058, do merge do PR #118 (commit `cfa17b5`), passou no job `deploy` em 16/11/2026. Em 18/11/2026, o site serve `assets/index-CBoBlsDB.js`, com o mesmo md5 de um `npm run build` local desse commit. A fonte do Pages segue **Deploy from a branch → `gh-pages` / (root)** (`build_type: legacy`): **não apague a branch `gh-pages`**, ou o site sai do ar.
- O 403 de 16/11/2026 (#112) foi uma negação temporária durante uma rajada de merges; passou com um novo run, sem mudar configuração. O registro abaixo fica como histórico.

## Estado em 16/11/2026 (histórico)

- **Como publica hoje:** o job `deploy` do `.github/workflows/ci.yml` roda só em push na `master`, depois de `build-and-test` e `e2e`. Ele usa `peaceiris/actions-gh-pages@v4` para enviar o `build/` à branch `gh-pages`. Em Settings → Pages, a fonte é **Deploy from a branch → `gh-pages` / (root)** (lido pela API em 16/11/2026: `build_type: legacy`).
- **O que quebrou:** o run 43799581411, do merge do PR #110 em 16/11/2026, falhou no job `deploy` com `Permission to douglasabnovato/signature-generator.git denied to github-actions[bot]` (403). Os jobs `build-and-test` e `e2e` passaram.
- **O que está no ar:** `https://douglasabnovato.github.io/signature-generator/` responde 200 com o build de 06/11/2026 (`index-CUVXHT6R.js`, `Last-Modified` de 06/11). O que entrou na `master` depois disso (GoatCounter, fluxo no Playwright) ainda não está no ar.
- **O que já foi descartado (16/11/2026):** a `gh-pages` não tem proteção (`branches/gh-pages/protection` dá 404) nem regra de ruleset (`rules/branches/gh-pages` dá `[]`); as Actions estão ligadas para todas as ações; o job declara `contents: write`.

### Passo a passo do responsável (#112)

1. **Settings → Actions → General → Workflow permissions:** marcar **Read and write permissions** e clicar em **Save**, mesmo que já pareça marcado. Atenção: o job já declara `contents: write`, e essa opção só vale como padrão para workflows sem `permissions`. Este passo pode não resolver; se o 403 seguir no passo 3, ir direto ao passo 5.
2. **Settings → Rules → Rulesets:** conferir que só existe o `principal-protegida`, com alvo `~DEFAULT_BRANCH`. Se houver outra regra que pegue todas as branches, ela barra o push na `gh-pages`.
3. **Actions → CI → run 43799581411 → Re-run failed jobs.** O job `deploy` precisa ficar verde.
4. Conferir: `curl -s https://douglasabnovato.github.io/signature-generator/ | grep -o 'index-[A-Za-z0-9_-]*\.js'` deve mostrar um nome diferente de `index-CUVXHT6R.js`.
5. **Se continuar negado:** trocar para o Pages por Actions. Em **Settings → Pages → Build and deployment → Source**, escolher **GitHub Actions**. Depois, um agente troca o job `deploy` por `actions/upload-pages-artifact` e `actions/deploy-pages` (permissões `pages: write` e `id-token: write`), sem push de branch.

As seções abaixo são históricas, de 30/10/2026.

> **Atualização de 30/10/2026:** o workflow fica em `.github/workflows/ci.yml` e publica na branch `gh-pages`, que é a fonte configurada no GitHub Pages. As etapas abaixo que citam `ci/` e `deploy-pages` são históricas.

Plano de ação para publicar o gerador de assinaturas no GitHub Pages, sem custo.

## 1. Desafio

Publicar uma SPA em React + Vite (sem backend, sem variáveis de ambiente) de forma automática a cada push na `master`, substituindo a publicação manual pela branch `gh-pages` e o build antigo do CRA que ficou na pasta `docs/`.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages publicado pelo GitHub Actions (escolhida)** | O CI já testa e gera o `build/`; o job `deploy` publica o mesmo artefato. Nada de branch extra nem build no computador |
| GitHub Pages pela branch `gh-pages` (`npm run deploy`) | Continua funcionando como alternativa manual. Só vale se o Pages estiver configurado em **Deploy from a branch → gh-pages** |
| GitHub Pages pela pasta `/docs` da `master` | Não recomendado: exige copiar o build à mão e versionar arquivos gerados. O build antigo do CRA que ficava em `docs/` saiu em 18/11/2026 (#113) |
| Netlify / Vercel | Funcionariam, mas o usuário prefere o GitHub Pages e o projeto já está lá |

### O que foi ajustado

| Mudança | Arquivo | Por quê |
|---|---|---|
| Job `deploy` (configure-pages, upload-pages-artifact com `build/`, deploy-pages), só em push na `master` | `ci/github-actions-ci.yml` → `.github/workflows/ci.yml` | Publicação automática depois de testes e build verdes |
| Node 20 → 22 no CI | `ci/github-actions-ci.yml` | O Node 20 saiu de suporte em abr/2026 |
| Nenhuma mudança em `vite.config.ts` | — | `base: "./"` gera caminhos relativos, que funcionam em `https://douglasabnovato.github.io/signature-generator/`. O app não tem rotas no cliente, então não precisa de `404.html` |
| Seção "Em produção" | `README.md` | URL e link para este guia |

### Pasta `docs/` (removida em 18/11/2026)

- `docs/` guardava um build do CRA antigo (`static/js/2.39a8124c.chunk.js`, `asset-manifest.json` etc.) que nada usava: o Pages publica a branch `gh-pages` (`gh api repos/douglasabnovato/signature-generator/pages`, 18/11/2026: `build_type: legacy`, fonte `gh-pages` na raiz). O site no ar já servia o build da `master`.
- A pasta e o `public/index.html`, que também sobrou do CRA, saíram no PR do ciclo de 18/11/2026 (#113).
- A branch `gh-pages` só pode ser apagada **depois** de trocar a fonte do Pages para GitHub Actions (passo 5 acima). Hoje ela é a fonte do site (18/11/2026).

### Limitações e pontos de atenção

- Plano gratuito do Pages: repositório público, 1 GB de site, 100 GB/mês de banda, 10 builds/hora. Folgado para este app.
- Não há dados pessoais armazenados: tudo fica no navegador de quem usa. A foto padrão de pessoa real (`src/assets/steve-jobs.jpg`) sai do repositório no passo de `git rm`.
- `npm audit`: 0 vulnerabilidades (produção e desenvolvimento).

## 3. Solução (passo a passo)

Branch principal: **`master`**.

### Etapa 1 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/signature-generator`
2. `npm install` (o lockfile já está em dia; `npm ci` também funciona)
3. `npm test` (esperado: 5 testes passando)
4. `npm run build` (gera `build/`)
5. `npm run preview` e abrir a URL mostrada: trocar produto e template, copiar a assinatura, baixar o PNG.

### Etapa 2 · Subir para o GitHub

1. Remover os arquivos substituídos:
   ```bash
   git rm public/index.html src/index.tsx src/react-app-env.d.ts tailwind.config.js postcss.config.js
   git rm src/assets/steve-jobs.jpg
   ```
2. Ativar o CI (a pasta `.github` é protegida para a ferramenta que preparou o projeto):
   ```bash
   mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci
   ```
3. `git status` (não podem aparecer `node_modules/` nem `build/`)
4. `git add -A`
5. `git commit -m "feat(deploy): Vite 8 + MUI 7, CI com publicação no GitHub Pages por Actions"`
6. `git push origin master`

### Etapa 3 · Configurar o GitHub Pages

1. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Aba **Actions**: rodar de novo o workflow **CI** do último commit (**Re-run all jobs**) se ele tiver terminado antes da troca da fonte. Os jobs `web` e `deploy` precisam ficar verdes.
3. Alternativa manual (sem Actions): manter **Deploy from a branch → gh-pages / (root)** e rodar `npm run deploy`. As duas formas não convivem: vale a que estiver selecionada em Settings → Pages.

### Etapa 4 · Conferir no ar

1. Abrir `https://douglasabnovato.github.io/signature-generator/`.
2. O título da aba é "Digital Identity Suite — gerador de assinaturas" (o build antigo do CRA tinha outro título; se ele aparecer, o Pages ainda está servindo `docs/` ou `gh-pages`).
3. DevTools → Network: nenhum 404 em `assets/index-*.js` ou `manifest.json`.
4. Preencher nome e cargo: a pré-visualização muda na hora; "Copiar" mostra o aviso de sucesso; o PNG é baixado.

### Etapa 5 · Fechar

1. `docs/`: removida em 18/11/2026 (#113).
2. No GitHub, **About → Website**: `https://douglasabnovato.github.io/signature-generator/`.
