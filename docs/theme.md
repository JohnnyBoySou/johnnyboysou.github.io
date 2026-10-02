# Temas e transição de luz

A paleta usa tokens em `src/index.css`: superfícies, texto, divisórias, foco e cores dos produtos. Os estilos compartilhados em `src/theme.css` adaptam as seções e o header aos dois temas.

O botão de lâmpada no header alterna o tema. No escuro, a imagem do tema claro se recolhe até o botão enquanto perde luminosidade. Ao voltar, a luz se expande pelo viewport. A transição dura 900 ms e usa a View Transitions API, sem dependências adicionais.

A primeira visita acompanha a preferência do sistema. Uma escolha explícita fica em `localStorage` na chave `portfolio-theme`. O script em `index.html` aplica a preferência antes da primeira pintura. Se o armazenamento estiver bloqueado, a escolha continua funcionando na página atual.

Com movimento reduzido ou sem suporte à API, a troca é imediata. Cliques repetidos durante a animação são ignorados, preservando o foco no botão. Ativar movimento reduzido durante a transição também a interrompe com segurança.

## Validação

```bash
bun run check
bunx playwright test tests/theme.spec.ts
```

A suíte usa o build em `dist/` e cobre desktop, 390 px e 320 px: teclado, persistência, preferência do sistema, animação, cliques repetidos, interrupção, movimento reduzido, ausência da API e armazenamento bloqueado.

Para validar uma versão já publicada:

```bash
E2E_BASE_URL=https://johnnyboysou.github.io bunx playwright test tests/theme.spec.ts
```
