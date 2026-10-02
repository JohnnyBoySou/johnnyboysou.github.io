# Portfólio

Portfólio pessoal com React, TypeScript e Vite. Dependências e comandos gerenciados com Bun. Google Sans Flex variável servida localmente pelo pacote Fontsource.

## Desenvolvimento

Requisitos: Bun 1.4.2 (versão usada no projeto) e Node.js 22.12+ ou 24+ para o CLI do Vite.

```bash
bun install
bun run dev
```

Abra a URL exibida no terminal (http://localhost:5174, porta fixa com `strictPort`).

## Comandos

- `bun run dev`: servidor de desenvolvimento com atualização automática.
- `bun run typecheck`: verificação de tipos com TypeScript em modo estrito.
- `bun run lint`: análise estática com Oxlint.
- `bun run build`: verificação de tipos e geração de `dist/`.
- `bun run check`: lint e build.
- `bun run preview`: serve localmente o build gerado.
- `bun run test:e2e`: gera o build e testa a interface em Chromium (desktop, mobile e movimento reduzido).

## Personalização

- `src/data/portfolio.ts`: perfil profissional, contatos e repositórios públicos.
- `src/data/sections.ts`: atuação técnica, decisões de engenharia e stack.
- `src/data/products.ts`: produtos em produção, funcionalidades e links.
- `src/components/ProductCard.tsx` e `.css`: ilustrações e links para as páginas dos produtos.
- `src/components/PortfolioSections.tsx` e `.css`: acordeão de atuação, decisões e seletor de stack.
- `src/hooks/usePortfolioMotion.ts`: animações de entrada e rolagem com GSAP e ScrollTrigger.
- `src/App.tsx` e `.css`: composição e layout responsivo.
- `src/index.css`: tipografia e estilos globais.
- `index.html`: título, idioma e metadados.

As fontes profissionais e os limites das afirmações estão em [docs/content-sources.md](docs/content-sources.md). Os contatos e repositórios usam links públicos reais. A página não envia formulários nem executa os projetos ilustrados.

## Build

```bash
bun run check
bun run preview
```

A pasta `dist/` contém o site estático. Mantenha `bun.lock` versionado e use `bun install --frozen-lockfile` em CI.

## GitHub Pages

Repositório: [JohnnyBoySou/johnnyboysou.github.io](https://github.com/JohnnyBoySou/johnnyboysou.github.io).
Endereço de publicação: https://johnnyboysou.github.io/.

O workflow `.github/workflows/pages.yml` executa lint, TypeScript, build e testes de navegador antes de publicar `dist/`. Ele roda a cada push em `main` e também pode ser iniciado manualmente em Actions. O Vite usa a base padrão `/`, pois este é o site principal do usuário.

Antes do primeiro deployment, habilite **Settings → Pages → Source → GitHub Actions**. O plano da conta precisa permitir Pages para a visibilidade do repositório; no plano atual, é necessário um repositório público.

Para validar o site após um deployment, sem iniciar um servidor local:

```bash
E2E_BASE_URL=https://johnnyboysou.github.io bunx playwright test
```

## Direção visual e animação

Inspirado na composição de [Shopify Design](https://shopify.design/): tipografia grande, espaço em branco e galeria visual. Os produtos ganham ilustrações próprias e links para suas páginas públicas. Código aberto e ferramentas aparecem em uma seção secundária.

GSAP e `@gsap/react` controlam a entrada, a rotação de elementos decorativos na rolagem e as respostas aos cliques. `useGSAP` e `gsap.matchMedia` limpam as animações ao desmontar ou trocar de breakpoint/preferência de movimento. Não há rolagem artificial. As microinterações são curtas; o indicador da abertura anima apenas durante o carregamento. A preferência `prefers-reduced-motion` desativa movimento e mantém as interações. Os comportamentos e comandos de validação estão em [docs/motion.md](docs/motion.md) e [docs/theme.md](docs/theme.md).

Os cinco produtos em destaque são definidos em `products`. `featuredProjects` e `moreProjects` compõem a seção de código aberto. Os estágios dos modelos do Shamar seguem sua página pública, sem equiparar pesquisa a produção.

## Testes de navegador

Na primeira execução, instale o Chromium se necessário:

```bash
bunx playwright install chromium
bun run test:e2e
```

A suíte serve o build de produção em `127.0.0.1:4175` e verifica detalhes dos projetos, links e contato, acordeão, stack, teclado, âncoras, fonte, overflow e mudança da preferência de movimento em tempo real. Os testes não usam serviços externos.


## Páginas e modelos

- `/`: portfólio e galerias de projetos.
- `/modelos`: Lume, Dália, Lira, Sonata, Vita e Dit 1, com filtros por produto, entrada/saída, estágio e links públicos.
- `/projetos/:id`: página própria para os cinco produtos e os seis repositórios apresentados.

O catálogo está em `src/data/models.ts`; os fluxos dos produtos, em `src/data/productStories.ts`. `src/pages/PortfolioPages.tsx` resolve as rotas e compartilha cabeçalho e rodapé com a página inicial. A navegação usa links nativos, incluindo voltar/avançar e abertura em nova aba.

Após o Vite, `scripts/generate-pages.ts` gera entradas HTML com título e descrição para as 12 rotas, além de `404.html`. Isso permite acesso direto e recarregamento em hospedagem estática, inclusive GitHub Pages, sem depender de um fallback de SPA no servidor. O conteúdo é renderizado no cliente por React; os HTMLs gerados não são uma implementação de SSR.

Os testes cobrem os filtros de modelos, associação com os produtos, fragmentos como `/modelos#dit`, acesso direto às 11 páginas de projetos, recarregamento, histórico e página não encontrada.


## Destaque de IA na página inicial

A seção `/#ia` é implementada em `src/components/AISection.tsx` e `.css`. O seletor reutiliza o catálogo `src/data/models.ts`, com Dit 1 como seleção inicial. Cada modelo apresenta aplicação, estágio, entrada/saída e links para os detalhes e o produto. Os três blocos de atuação explicam treinamento/fine-tuning, avaliação e inferência.

A animação de troca usa GSAP com limpeza por seleção e respeito a movimento reduzido. `tests/ai-section.spec.ts` verifica seleção por teclado, vínculo com o catálogo, estágios, tema escuro e overflow.

As seções também usam `src/hooks/useSectionReveal.ts` para aparecer uma vez durante a rolagem, com fade e deslocamento curto. O efeito preserva foco por teclado, links diretos e movimento reduzido; veja [docs/motion.md](docs/motion.md).


## Stack de trabalho

`src/data/stack.ts` contém as tecnologias, áreas, papéis e exemplos de utilização. `src/components/TechnologySection.tsx` e `.css` apresentam a faixa horizontal com filtros e progresso. GSAP ScrollTrigger fixa a área dos cards e liga o deslocamento horizontal à rolagem vertical da página. A barra acompanha o progresso; controles anterior/próximo e teclado (setas, Home/End, PageUp/PageDown) navegam pelo mesmo percurso. Movimento reduzido e telas com menos de 740 px de altura usam navegação horizontal direta, sem fixação. O recorte da faixa tem cantos arredondados. `tests/stack.spec.ts` verifica navegação, filtros, limites, gestos e overflow em desktop e mobile.
