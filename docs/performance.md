# Performance e SEO

Auditoria de 2 de outubro de 2026. As notas são de laboratório e variam entre execuções; não representam dados de usuários reais.

## Contexto da versão publicada

O primeiro PageSpeed avaliou a versão anterior, pois o workflow do commit `dc4bbbc` falhou no E2E e não chegou ao deploy. Resultado dessa versão: mobile 97 de performance e 100 de SEO; desktop 100 nas duas categorias. Relatório: https://pagespeed.web.dev/analysis/https-johnnyboysou-github-io/r37985imte.

As seis falhas do E2E vinham da ausência de espaço nos links “Explorar Lume” e “Conhecer Disk”. A correção preserva os testes e libera a publicação.

## Comparação local

Lighthouse 13.5.0, Chromium do Playwright, mobile, servidor Vite preview. Não comparar diretamente estas notas locais com as notas do PageSpeed da versão anterior.

| Métrica | Antes | Após otimizações e integração de quatro idiomas |
| --- | ---: | ---: |
| Performance | 90 | 94 |
| SEO | 91 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| FCP | 2,4 s | 1,8 s |
| LCP | 2,4 s | 2,1 s |
| TBT | 220 ms | 190 ms |
| CLS | 0,002 | 0 |
| Speed Index | 3,7 s | 3,1 s |
| Transferência inicial | 4.095 KiB | 230 KiB |

As medições incluem a evolução dos idiomas feita em paralelo; a medição inicial precedeu a inclusão do alemão. Os PNGs originais foram preservados. Os derivados WebP de 800 px pesam cerca de 395 KB juntos, comparados aos 3,83 MB dos originais. Eles só são solicitados quando o retrato se aproxima da tela. As traduções EN/ES/DE são chunks separados; o idioma salvo é carregado antes de renderizar a página.

A fonte principal recebe preload. O CSS inclui somente os subconjuntos latinos, com fallback do sistema para outros símbolos. O build gera canonical, Open Graph, Twitter e JSON-LD por rota, sitemap e robots.txt; a página 404 tem noindex e não entra no sitemap. O conteúdo continua renderizado pelo React no cliente.

## Reproduzir

```bash
bun run check
bunx playwright test
bun run preview --host 127.0.0.1 --port 4175 --strictPort
```

Em outro terminal, sem executar o E2E ao mesmo tempo:

```bash
CHROME_PATH=$(node -e 'process.stdout.write(require("@playwright/test").chromium.executablePath())') \
  bunx --bun lighthouse@13.5.0 http://127.0.0.1:4175 \
  --only-categories=performance,seo,accessibility,best-practices \
  --chrome-flags='--headless --no-sandbox' \
  --output=json --output-path=/tmp/portfolio-lighthouse.json
```

Após o workflow concluir com sucesso, conferir os nomes dos assets publicados contra `dist/index.html` antes de medir no PageSpeed. `tests/seo.spec.ts` valida os HTMLs sem execução de JavaScript, URLs do sitemap, exclusão da 404 e carregamento adiado dos retratos. `tests/i18n.spec.ts` valida troca, persistência e teclado nos quatro idiomas.
