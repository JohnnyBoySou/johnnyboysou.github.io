# Loading e microinterações

A abertura usa somente `sousa.` em tipografia grande, centralizada e peso light (300). O próprio nome recebe um preenchimento da esquerda para a direita com borda suave, sem legenda, divisória ou barra separada. Há fallback com recorte simples quando o navegador não oferece máscaras CSS. O HTML e o CSS essenciais estão em `index.html`, para aparecerem antes de baixar o JavaScript. A paleta acompanha o tema desde a primeira pintura.

`SiteReady` avança o preenchimento por marcos: React montado, documento carregado e fontes prontas. Esses marcos representam a preparação da interface, não uma medição percentual dos bytes baixados. Não há progresso por temporizador nem duração mínima artificial de carregamento. Ao concluir, o preenchimento termina em 320 ms e o painel desliza para cima em 480 ms. A entrada do hero começa durante essa saída, conectando as duas cenas. Teclado, toque ou movimento reduzido podem liberar o conteúdo imediatamente.

Fontes e recursos lentos têm um limite de espera de três segundos depois da montagem. Se o aplicativo não montar em oito segundos, a abertura oferece um link para recarregar. Sem JavaScript, aparece uma mensagem simples em vez do indicador.

As microinterações estão em `src/microinteractions.css`:

- Shimmer passa uma vez pelos cards ao receber hover ou foco visível.
- Setas acompanham a direção dos links; botões respondem à pressão.
- As ilustrações de voz, vídeo e conversa respondem ao hover em dispositivos com mouse.
- `MotionGlyphs.tsx` fornece forma de onda, órbitas e brilho em SVG, usados fora do loading.

Movimento reduzido desativa shimmer, deslocamentos decorativos e animações do loading. As interações continuam disponíveis por teclado e toque.

## Resposta ao mouse

`src/hooks/usePointerMotion.ts` usa o GSAP já instalado, sem plugins adicionais. Os efeitos só são registrados quando o dispositivo oferece hover, ponteiro preciso e não pede movimento reduzido:

- As ilustrações dos produtos inclinam até 5°/6° e se deslocam até 12 px/8 px. A área do link, os títulos e as descrições permanecem estáveis. O efeito também aparece nas capas das páginas de produto.
- Um reflexo radial acompanha o mouse dentro da capa, sem interceptar cliques.
- Os três símbolos do hero respondem em profundidades diferentes, com retorno suave ao centro. A headline permanece estável.
- As setas de contato, voltar ao topo, links do footer e ações das páginas acompanham o ponteiro em até 5 px. Apenas o ícone se move.

Os tweens são criados com `gsap.quickTo` dentro de `gsap.matchMedia` e reutilizados em cada movimento, sem atualizar estado React. Saída do ponteiro, cancelamento, scroll, redimensionamento, perda de foco e uso de Tab devolvem os elementos ao repouso. Ao trocar a preferência de movimento ou desmontar, o contexto reverte os estilos e os listeners são removidos. Em telas de toque, as interações existentes de toque e foco continuam disponíveis, sem rastreamento do ponteiro.

Referências: [quickTo](https://gsap.com/docs/v3/GSAP/gsap.quickTo()/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

## Verificação

```bash
bun run check
bunx playwright test tests/motion.spec.ts
bunx playwright test tests/pointer-motion.spec.ts
bunx playwright test tests/header-menu.spec.ts
```

Os testes usam atrasos simulados nas fontes e falha simulada no download do JavaScript para verificar loading, liberação por teclado e recuperação. Também cobrem os SVGs, shimmer, tamanho do nome em mobile e movimento reduzido. A suíte completa inclui as verificações de tema e navegação.

Os testes de ponteiro verificam movimento nos dois sentidos, retorno ao repouso, estabilidade da área de clique, abertura real do projeto, fallback de toque, teclado, tema escuro e ativação/desativação dos efeitos ao mudar a preferência de movimento.

## Header em pílula

`PillHeader.tsx` mantém marca, tema e botão de menu em uma pílula fixa e centralizada. A abertura expande a largura de 360 para 560 px, respeitando as margens da tela, e revela os links em sequência. GSAP anima largura, altura, bordas e entrada dos itens; o ícone de duas linhas se transforma em X com CSS. `contextSafe` mantém as animações de interação vinculadas ao contexto React para limpeza ao desmontar.

O menu é uma navegação expansível, sem semântica de menu de aplicativo e sem prender o foco. `aria-expanded`, `aria-controls`, `aria-hidden` e `inert` mantêm o estado acessível. Escape devolve o foco ao botão; clique fora, saída do foco e navegação fecham o painel. Links internos transferem o foco para a seção de destino. A rolagem reserva espaço para a pílula fixa.

Um `ResizeObserver` ajusta a altura quando o conteúdo muda de tamanho; em telas baixas, o painel pode rolar internamente. Cliques rápidos interrompem a animação anterior a partir da posição atual. Movimento reduzido torna a abertura e o fechamento imediatos, inclusive quando a preferência muda durante a animação.

`tests/header-menu.spec.ts` cobre teclado, Escape, clique fora, navegação entre páginas e seções, cliques rápidos, tema, movimento reduzido e orientação horizontal com pouca altura. Referência: [GSAP com React](https://gsap.com/resources/React/).

## Entrada das seções na rolagem

A seção “Sistemas que eu construo” mantém um único painel expandido. A troca anima a altura com CSS Grid em 420 ms, acompanha a opacidade e transforma o ícone de mais em menos. A transição pode ser interrompida por novos cliques. Painéis fechados ficam fora da navegação e da árvore de acessibilidade; Enter e Espaço acionam os botões. Movimento reduzido torna a troca imediata. Ao terminar a mudança de altura, as posições do ScrollTrigger são recalculadas. `tests/capabilities.spec.ts` verifica a troca simultânea, cliques durante a transição e teclado.

`src/hooks/useSectionReveal.ts` aplica fade e subida de 28 px, em 700 ms com `power3.out`, quando o topo de um bloco alcança 92% da altura da tela. A animação acontece uma única vez. Conteúdo já visível na abertura ou na posição de rolagem restaurada permanece visível.

A home usa o efeito nos blocos de código público, IA, atuação, processo, sobre, stack e contato. As páginas internas aplicam o mesmo comportamento às apresentações, fluxos e modelos relacionados. Os controles de navegação permanecem estáveis. O hero mantém a própria entrada sincronizada ao loading.

Foco de teclado e links com fragmento concluem a entrada imediatamente para preservar leitura e navegação. `gsap.matchMedia` reverte os estilos ao ativar movimento reduzido; `useGSAP` limpa animações, listeners e ScrollTriggers ao desmontar. Os estilos de opacity e transform são removidos ao terminar a entrada.

`tests/section-reveal.spec.ts` cobre a transição real de opacidade, rolagem de volta, foco, links diretos e troca da preferência de movimento nas páginas principais e internas.


## Stack: navegação horizontal independente

`TechnologySection` usa rolagem horizontal local: arraste com mouse, deslize nativo no toque, setas e teclado. O scroll vertical da página permanece independente; não há `pin`, `scrub` ou controle do documento pelo carrossel. A barra acompanha o `scrollLeft` dos cards, e os filtros reiniciam somente a faixa horizontal. O recorte de 26 px pertence à área de rolagem, mantendo as bordas curvas durante o movimento.

O comportamento é o mesmo em todas as alturas de tela e com movimento reduzido. O arraste com mouse usa captura do ponteiro, finalizada na soltura ou cancelamento; o toque mantém os gestos nativos do navegador. `tests/stack.spec.ts` cobre arraste, deslize, independência do scroll vertical, progresso, limites, filtros, foco e redimensionamento.


## Pílula lateral de rolagem

`ScrollPill.tsx` e `.css` substituem visualmente a scrollbar do documento por uma pílula fixa à direita, afastada da borda. O navegador continua responsável pelo scroll: não há bloqueio de roda ou toque na página. O indicador usa GSAP `quickTo`, com atualização imediata durante arraste e com movimento reduzido. A altura do documento é recalculada após resize, mudanças do conteúdo e refresh do ScrollTrigger.

O controle tem semântica `scrollbar`, percentual acessível, orientação vertical e suporta arraste, clique, setas, PageUp/PageDown e Home/End. Aparece em todas as páginas e usa as cores do tema. Apenas a scrollbar global é ocultada; áreas internas continuam com seu comportamento. `tests/scroll-pill.spec.ts` valida progresso, filtros, mouse, toque, teclado, páginas internas, resize e movimento reduzido.


A pílula também mostra marcas das seções presentes na página, com tooltip em hover/foco e indicação da seção atual. As marcas preservam uma distância mínima para evitar áreas de clique sobrepostas; as posições são recalculadas com o layout. O clique na trilha, nas marcas ou a navegação por teclado anima o scroll com GSAP, enquanto o indicador usa easing elástico para a resposta de mola. Arraste permanece direto. Roda, toque e nova interação interrompem a transição anterior; movimento reduzido usa posição imediata. Os destinos descontam o deslocamento temporário das animações de entrada e reservam 112 px para o cabeçalho.
