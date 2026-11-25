# Tema

O portfólio usa uma única paleta escura, inspirada em interfaces editoriais monocromáticas: fundo preto, texto branco e cinzas neutros. A cor fica reservada às artes dos produtos.

Os tokens ficam em `src/index.css` (`--page`, `--surface`, `--soft`, `--ink`, `--muted`, `--line`, `--focus` e as cores dos produtos). O script em `index.html` fixa `data-theme="dark"` antes da primeira pintura, e `src/elegance.css` — carregado por último — define a camada visual: tipografia, botões em pílula, cards escuros, manifesto e rodapé.

Preferências antigas salvas em `localStorage` (`portfolio-theme`) são ignoradas.

## Validação

```bash
bunx playwright test tests/theme.spec.ts
```
