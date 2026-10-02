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

A pasta `dist/` contém o site estático para uma publicação futura. Este projeto não configura hospedagem automaticamente. Mantenha `bun.lock` versionado e use `bun install --frozen-lockfile` em CI.

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
