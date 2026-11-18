<h4 align="center"> 
	🚧 Digital Identity Suite  🚀
</h4> 

<h1 align="center">
    <img alt="Signature Generator App" title="#SignatureGeneratorApp" src="./.github/signature-generator-app-v3.1-desktop.jpg" />
</h1>

### 🌐 Em produção

- URL: https://douglasabnovato.github.io/signature-generator/
- Hospedagem: GitHub Pages, publicado pelo GitHub Actions a cada push na `master`
- Atenção: desde 16/11/2026 o deploy falha com 403 (#112). O site no ar é o build de 06/11/2026 e está atrás da `master`.
- Passo a passo: [documentacao/DEPLOY.md](documentacao/DEPLOY.md)
- Avaliação e plano: [documentacao/AVALIACAO.md](documentacao/AVALIACAO.md) · [documentacao/PLANO-ESTRATEGICO.md](documentacao/PLANO-ESTRATEGICO.md)

### 💻 Sobre o projeto

♻️ **Digital Identity Suite** é uma evolução profissional do clássico Signature Generator. A aplicação oferece um painel inteligente e responsivo para preenchimento de dados e geração em tempo real de identidades visuais corporativas e pessoais para o mercado digital.

O sistema suporta três grandes vertentes de apresentação profissional:
1. **Assinaturas de E-mail Corporativas:** Tabelas HTML com estilos *inline* para compatibilidade máxima com Gmail, Outlook e Apple Mail.
2. **Crachás Digitais (Digital ID Cards):** Modelos verticais sofisticados de identificação corporativa com dados de ID, departamento e validade.
3. **Cartões de Visita Digitais Mobile:** Formatos voltados para dispositivos móveis com gradientes, avatares em destaque, tags de especialidade e links interativos.
 
#### 🎨 Layout

Uma aplicação web moderna e responsiva desenvolvida em React com TypeScript, integrando Material-UI.

#### 📂 Estrutura de Pastas

```text
SIGNATURE-GENERATOR/
├── .github/workflows/ci.yml   # testes, build, e2e e deploy no Pages
├── documentacao/              # MVP, plano de ação, deploy e análises
├── e2e/                       # Playwright: fluxo, axe e teclado; axe nos 9 modelos; celular (375 px)
├── public/                    # ícones e manifest
├── src/
│   ├── __tests__/             # testes Vitest
│   ├── assets/
│   ├── components/            # Signature.tsx (os 9 modelos) e o progresso
│   ├── types/signature.ts
│   ├── utils/                 # signatureHelpers.ts e metrics.ts
│   ├── App.tsx                # formulário, prévia, cópia e PNG
│   └── main.tsx               # tema do MUI e entrada
├── index.html
├── package.json
├── playwright.config.ts
└── vite.config.ts
```

# Proposta de Funcionalidades e Arquitetura: Digital Identity Suite v5.0

## 🎯 1. Visão Geral da Funcionalidade Core
A aplicação permite que profissionais criem assinaturas de e-mail limpas, crachás digitais de identificação e cartões de visita móveis interativos em tempo real, oferecendo preenchimento guiado e uma galeria exclusiva de 9 variações de design.

---

## 🚀 2. Funcionalidades Principais (Features)

### A. Painel de Dados do Usuário (Formulário Inteligente)
* **Informações Básicas:** Nome completo, cargo/função, empresa/departamento.
* **Contatos:** E-mail principal, telefone/celular, site da empresa.
* **Redes Sociais Dinâmicas:** Links integrados com ícones automáticos em vetor SVG (LinkedIn, GitHub, Instagram, WhatsApp, YouTube e Twitter/X).
* **Avatar e Personalização:** Inclusão de foto de perfil (via link ou base64) com opção de ativar/desativar o modo com foto.
* **Atributos Específicos:** Suporte a ID de crachá, data de expiração, departamento e tags de especialidades profissionais dinâmicas.

### B. O Ecossistema de 9 Templates Visuais
* **Seletor de Produto Master:** Alternância dinâmica em tempo real entre *Assinatura de E-mail*, *Crachá Digital* e *Cartão de Visita Digital*.
* **Galeria de 9 Designs Exclusivos:** 
  * *Assinaturas:* Classic (divisor vertical), Modern (card destaque) e Minimalist (barra lateral).
  * *Crachás:* Tech Cyber, Corporate Clean e Creative Neon.
  * *Cartões Mobile:* Mobile App, Horizontal Banner e Sleek Dark.

### C. Engine de Pré-visualização Avançada (Live Preview)
* **Split-Screen Responsivo:** Atualização instantânea à medida que o usuário interage com os campos.
* **Alternância de Fundo (Dark / Light Preview):** Botões dedicados para testar o contraste e a legibilidade da identidade visual sob diferentes temas de fundo.

### D. Ações Contextuais e Exportação Otimizada
* **Cópia em HTML Formatado:** Injeção limpa na área de transferência para uso imediato em clientes de e-mail.
* **Exportação Direta em Imagem PNG (Alta Qualidade):** Conversão automatizada via processamento gráfico do DOM (`html-to-image`), permitindo baixar o card estilizado para compartilhamento rápido no WhatsApp, redes sociais ou portfólios.

---

## 📐 Requisitos Técnicos e de Arquitetura

### Requisitos Funcionais (RF)
* **RF01:** O sistema deve validar os campos de e-mail e URLs de redes sociais antes de gerar o código final.
* **RF02:** O layout gerado para e-mails deve utilizar tabelas HTML (`<table>`) aninhadas e estilos *inline* para compatibilidade irrestrita com webmails restritos.
* **RF03:** Arquitetura componentizada em React moderno com TypeScript estrito, garantindo segurança de tipos na gestão do estado global da suíte.

### Requisitos Não Funcionais (RNF)
* **RNF01 (Performance):** Renderização da pré-visualização em tempo real sem latência perceptível.
* **RNF02 (Compatibilidade Visual):** Ícones renderizados por meio de vetores SVG inline, blindando a aplicação contra bloqueios de políticas de CORS em exportações gráficas.
* **RNF03 (Stack Moderna):** Integração com Material-UI (v7) e bibliotecas de manipulação de imagem de alta performance.

---

#### Web - v5.1 (revisão de qualidade)
- [x] Voltou a compilar: a foto padrão (`src/assets/steve-jobs.jpg`) não estava no repositório; agora o avatar é gerado com as iniciais
- [x] Links da assinatura saneados (só http/https; `javascript:` era copiado para o e-mail)
- [x] Cópia com a API de área de transferência (HTML + texto) e aviso quando falha
- [x] Material UI 4 → 7, React 17 → 18, CRA 4 → Vite 8; Tailwind (sem uso) removido
- [x] WCAG AA na aplicação (axe-core sem violações); 5 testes automatizados
- Detalhes em [documentacao/](documentacao/ANALISE.md)

#### Web - v5.0
- Evolução completa para a **Digital Identity Suite**: Suporte a 3 produtos distintos (Assinatura, Crachá e Cartão Digital), totalizando 9 templates visuais exclusivos, alternador de fundo para preview, ícones em SVG inline e exportação automatizada em formato de imagem PNG.

#### Web - v3.1
- Revisando o design do projeto e identificando pontos de melhorias.
- **Próximo passo:**
  * [x] Hospedar aplicação
  * [ ] Design nas transições
  * [x] Eficiência da assinatura
  * [x] Limpar design

#### Web - v3.0
- Implementar as funcionalidades descritivas no projects board com as issues e fazer a atualização na master das branches com pull requests.

#### Web - v2.0
- Avançado design para uma estilização mais moderna.

#### Web - v1.0
- Um layout simples, preto e branco.

---

### 🛠 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:
* SPA (Single Page Application)
* HTML5 / CSS3 / JavaScript
* Material UI (v7)
* Vite 8 e Vitest
* TypeScript
* html-to-image
* Node.js
* React
* Git
* Github

#### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: **Git** e **Node.js**. 
Além disto, é bom ter um editor para trabalhar com o código como o **VSCode**.

### 🧭 Rodando a aplicação web

```bash
git clone https://github.com/douglasabnovato/signature-generator
cd signature-generator
npm install
npm run dev       # http://localhost:5173
npm test          # testes com Vitest
npm run build     # gera build/ (a publicação é feita pelo GitHub Actions)
npm run test:e2e  # Playwright com axe e teclado, sobre o build (rode npm run build antes; Node 22.12 ou mais novo)
npm run deploy    # alternativa manual: publica build/ na branch gh-pages
```

#### 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

#### 📝 Licença

Este projeto está sob a licença MIT.

---

Feito com ❤️ por <a href="https://www.linkedin.com/in/douglasabnovato/"><img src="https://img.shields.io/static/v1?label=Dev&message=douglasabnovato&color=7159c1&style=for-the-badge&logo=ghost"/></a>👋🏽

## Estado e próximos passos (ciclo de 16/11/2026)

No ar em https://douglasabnovato.github.io/signature-generator/ (HTTP 200 em 16/11/2026), mas com o build de 06/11/2026: o deploy falha com 403 desde 16/11 (#112, do responsável). Nível Vitrine (N2): 11 de 12 critérios atendidos em 16/11/2026, Finalizado: sim. Falta a conta do GoatCounter, do responsável (#87).

**O que foi feito**

- Aviso quando a assinatura passa do limite de 10.000 caracteres do Gmail, com o tamanho do HTML copiado na tela (#102, ciclo de 16/11/2026).
- Teste da falha do download do PNG (#103) e axe e teclado no Playwright; o teste achou o contorno de foco sumido nos botões do MUI, corrigido no tema (ciclo de 16/11/2026).
- PRs #72 e #68 do Dependabot fechados: pacotes do CRA que o projeto não usa mais (#104).
- GoatCounter ligado ao código `douglasabnovato`, só no site publicado, e fluxo principal no Playwright com o job `e2e` no CI (PR #111).
- `master` protegida pelo ruleset `principal-protegida`, com os checks `build-and-test` e `e2e` (PR #109).
- Telefone `tel:`, e-mail `mailto:`, aviso da foto e CI nos PRs para `developer/**` (PR #99).
- Assinatura de e-mail compatível, com teste do HTML (PR #95), e região principal para leitores de tela (PR #97).

**O que queremos fazer**

- Do responsável: fazer o deploy voltar (#112), criar a conta do GoatCounter (#87), validar a assinatura no Gmail e no Outlook (#96) e confirmar a meta (#100).
- Do código: salvar os dados no navegador (#105), rodar o axe nos 9 modelos (#114), testar no celular (#115), medir de novo o LCP quando o deploy voltar (#116) e tirar o build antigo do CRA (#113).

**Onde está a documentação**

- [documentacao/MVP.md](documentacao/MVP.md): critérios, evidências e medições.
- [documentacao/PLANO-DE-ACAO.md](documentacao/PLANO-DE-ACAO.md): seção "Ciclo de 16/11/2026", com pesquisa, produto e engenharia.
- [documentacao/DEPLOY.md](documentacao/DEPLOY.md): publicação no GitHub Pages e o passo a passo do 403.
