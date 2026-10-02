# Fontes do conteúdo profissional

Consulta realizada em 1 de outubro de 2026, a pedido de João Sousa. Os perfis foram apenas lidos; nenhuma informação foi alterada no LinkedIn ou no GitHub.

## Perfil e atuação

- [LinkedIn de João Sousa](https://www.linkedin.com/in/jo%C3%A3o-sousa-8441321aa/): título e seção Sobre consultados na sessão autenticada do navegador. Confirmam Tech Lead na LAI, TypeScript, Go, Python, sistemas de voz, HubSpot, Asterisk, NATS, design system em React e manutenção da API do Meu Shamar.
- [README do perfil no GitHub](https://github.com/JohnnyBoySou): descrição de voz em tempo real, mensageria, captura de reuniões, serving/treinamento de modelos, plataforma e developer tooling. O e-mail profissional foi obtido na seção pública Contact. O telefone não foi incluído no portfólio.

A atuação é apresentada conforme descrita pelo próprio profissional nos perfis. Não foram inferidas métricas de escala, disponibilidade, redução de custos ou resultados de clientes. Posts compartilhados de terceiros não foram usados como realizações de João.

## Projetos com código público

| Projeto | Fonte | Escopo usado no portfólio |
| --- | --- | --- |
| wkix | [README](https://github.com/JohnnyBoySou/wkix) | Zig, tree-sitter, indexação incremental de JavaScript/TypeScript, saída em `.workspace/` e contexto para agentes. Não é apresentado como indexador universal. |
| worker-thoth | [README](https://github.com/JohnnyBoySou/worker-thoth) | Worker Go, Redis Streams, jobs assíncronos, texto com TTL, áudio em memória e acesso serializado ao Whisper. Preservada a restrição de instância para uploads. |
| nani | [README](https://github.com/JohnnyBoySou/nani) | Navegação de pastas em terminal, Go, integração ao editor micro, gopls/tsgo e LSP. |
| Walkmap | [README](https://github.com/adila-sh/walkmap) | Projeto fixado no perfil. Indexação JS/TS com oxc-parser e artefatos para agentes. O repositório pertence à organização adila-sh. |
| worker-whisper | [README](https://github.com/JohnnyBoySou/worker-whisper) | API FastAPI com OpenAI Whisper, CUDA e Docker. Não confundir a implementação deste repositório com faster-whisper/CTranslate2 citados em outros trabalhos no perfil. |
| bowser | [README](https://github.com/JohnnyBoySou/bowser) | Navegador CLI Linux em C, WebKitGTK/GTK3 e captura de páginas. Sem reproduzir os benchmarks do README como medições verificadas. |

## Limites

- Diagramas dos cards são ilustrações locais da arquitetura, não capturas de execução, jobs reais ou testes dos repositórios apresentados.
- O fluxo `POST /transcribe → 202 { jobId }` descreve aceitação assíncrona, não conclusão da transcrição.
- Os testes do portfólio verificam o site e os destinos dos links. Não validam disponibilidade ou comportamento em produção dos projetos externos.
- Repositórios privados não foram inspecionados nem publicados para montar o portfólio.
- As seções de decisões de engenharia e stack são uma síntese editorial das fontes. Datas de contratação, clientes, formação e métricas não confirmadas não foram adicionados.
