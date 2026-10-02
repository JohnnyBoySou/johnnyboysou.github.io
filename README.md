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

- `src/data/portfolio.ts`: perfil profissional, contatos, projetos em destaque e outros repositórios públicos.
- `src/data/sections.ts`: atuação técnica, decisões de engenharia e stack.
- `src/components/ProjectCard.tsx` e `.css`: diagramas ilustrativos e detalhes expansíveis dos projetos.
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

Inspirado na composição de [Shopify Design](https://shopify.design/): tipografia grande, espaço em branco e galeria visual. Os diagramas são ilustrações próprias de repositórios públicos, com links para o código.

GSAP e `@gsap/react` controlam a entrada, a rotação de elementos decorativos na rolagem e as respostas aos cliques. `useGSAP` e `gsap.matchMedia` limpam as animações ao desmontar ou trocar de breakpoint/preferência de movimento. Não há rolagem artificial nem animação infinita. A preferência `prefers-reduced-motion` desativa movimento e mantém as interações.

Os projetos em destaque são definidos em `featuredProjects` e os demais em `moreProjects`.

## Testes de navegador

Na primeira execução, instale o Chromium se necessário:

```bash
bunx playwright install chromium
bun run test:e2e
```

A suíte serve o build de produção em `127.0.0.1:4175` e verifica detalhes dos projetos, links e contato, acordeão, stack, teclado, âncoras, fonte, overflow e mudança da preferência de movimento em tempo real. Os testes não usam serviços externos.
