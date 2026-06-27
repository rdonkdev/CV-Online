# Changelog

Todas as alterações relevantes deste projeto são documentadas aqui.
O formato segue, de forma simplificada, [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] — 2026-06-27

Primeira versão estável.

### Funcionalidades

- Formulário **multi-step** com 7 secções (Pessoal, Experiência, Educação,
  Competências, Idiomas, Certificações, Projetos) e **pré-visualização em tempo real**.
- **18 templates** de CV com **galeria de miniaturas** reais e **cor de acento** configurável.
- **Múltiplos perfis de CV**, **mostrar/ocultar secções**, **reordenar itens**,
  **bullets** nas descrições e datas mês/ano.
- **Exportação para PDF** via impressão nativa (texto vetorial, legível por ATS) com
  paginação A4 e **pré-visualização de impressão** in-app.
- **Export/Import JSON** e **persistência** automática no `localStorage` (com debounce).
- **Undo/redo** (Ctrl+Z / Ctrl+Y), **medidor de completude**, **onboarding** e **toasts**.
- **PWA** instalável e offline (service worker) e **modo escuro** no editor.
- **Acessibilidade** (labels associados, `aria-*`, navegação por teclado) e layout **responsivo**.

### Qualidade

- Testes unitários e de componente com **Vitest** (store, utilitários e componentes).
- **ESLint** (+ acessibilidade Vue) e **Prettier** com configuração versionada.

### Infra

- Deploy contínuo para **GitHub Pages** (branch `gh-pages`) via `npm run deploy`.
