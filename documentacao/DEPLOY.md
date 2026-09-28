# Deploy · Digital Identity Suite (signature-generator)

Plano de ação para publicar o gerador de assinaturas no GitHub Pages, sem custo.

## 1. Desafio

Publicar uma SPA em React + Vite (sem backend, sem variáveis de ambiente) de forma automática a cada push na `master`, substituindo a publicação manual pela branch `gh-pages` e o build antigo do CRA que ficou na pasta `docs/`.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages publicado pelo GitHub Actions (escolhida)** | O CI já testa e gera o `build/`; o job `deploy` publica o mesmo artefato. Nada de branch extra nem build no computador |
| GitHub Pages pela branch `gh-pages` (`npm run deploy`) | Continua funcionando como alternativa manual. Só vale se o Pages estiver configurado em **Deploy from a branch → gh-pages** |
| GitHub Pages pela pasta `/docs` da `master` | Não recomendado: exige copiar o build à mão e versionar arquivos gerados. Hoje `docs/` tem um build antigo do CRA (v3/v4) |
| Netlify / Vercel | Funcionariam, mas o usuário prefere o GitHub Pages e o projeto já está lá |

### O que foi ajustado

| Mudança | Arquivo | Por quê |
|---|---|---|
| Job `deploy` (configure-pages, upload-pages-artifact com `build/`, deploy-pages), só em push na `master` | `ci/github-actions-ci.yml` → `.github/workflows/ci.yml` | Publicação automática depois de testes e build verdes |
| Node 20 → 22 no CI | `ci/github-actions-ci.yml` | O Node 20 saiu de suporte em abr/2026 |
| Nenhuma mudança em `vite.config.ts` | — | `base: "./"` gera caminhos relativos, que funcionam em `https://douglasabnovato.github.io/signature-generator/`. O app não tem rotas no cliente, então não precisa de `404.html` |
| Seção "Em produção" | `README.md` | URL e link para este guia |

### Pasta `docs/` (decisão sua)

- `docs/` contém um build do CRA antigo (`static/js/2.39a8124c.chunk.js`, `asset-manifest.json` etc.). Com o Pages em **GitHub Actions**, essa pasta **deixa de ser usada**.
- Recomendação: apagar `docs/` depois de confirmar que o site novo está no ar (`git rm -r docs`). Não foi apagada aqui porque a decisão é sua.
- Se quiser, a branch `gh-pages` também pode ser apagada no GitHub depois da troca (Branches → lixeira).

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

1. Decidir sobre `docs/`: se o site novo estiver ok, `git rm -r docs && git commit -m "chore: remove build antigo do CRA" && git push`.
2. No GitHub, **About → Website**: `https://douglasabnovato.github.io/signature-generator/`.
