# 📄 Gerador de CV Online

Aplicação web para criar um currículo profissional num formulário multi-step, com
pré-visualização em tempo real e exportação para PDF — tudo no browser, sem backend.

![demo](docs/demo.gif) <!-- adiciona um GIF do formulário em acção -->
![screenshot](docs/screenshot.png) <!-- adiciona um screenshot do CV gerado -->

**🔗 Demo ao vivo:** https://tembue2.github.io/CV-Online/

---

## ✨ Funcionalidades

- **Formulário multi-step** com barra de progresso e 7 secções: Pessoal, Experiência, Educação, Competências, Idiomas, Certificações e Projetos
- **Pré-visualização em tempo real** — escreves no formulário, o CV actualiza ao lado
- **18 templates** à escolha (Modern, Classic, Minimal, Elegant, Compact, Sidebar, Timeline, Professional, Corporate, Executive, Banner, Cards, Slate, Underline, Mono, Gradient, Refined, Creative)
- **Múltiplos perfis de CV** — guarda vários CVs (ex.: "CV Dev", "CV PM") e alterna entre eles
- **Mostrar/ocultar secções** sem apagar dados — adapta o mesmo CV a vagas diferentes
- **Bullets nas descrições** — uma linha por tópico
- **Cor de acento** configurável (presets + cor personalizada)
- **Reordenar** qualquer item com setas ↑↓ (a ordem importa num CV)
- **Exportação para PDF** com texto vetorial real (selecionável e legível por ATS) via impressão nativa, com paginação A4 automática
- **Export / Import dos dados em JSON** — leva o teu CV entre dispositivos
- **Persistência automática** no `localStorage` (com debounce)
- **Undo/redo** das edições (Ctrl+Z / Ctrl+Y) e indicador "Guardado ✓"
- **Medidor de completude** do CV e onboarding guiado no primeiro uso
- **PWA / offline** — instalável e funciona sem internet (service worker + cache)
- **Modo escuro** no editor (o CV mantém-se branco)
- **Pré-visualização de impressão** in-app antes de exportar
- **Acessível** — labels associados, `aria-*`, navegação por teclado
- **Responsivo** — no mobile alternas entre formulário e preview
- **Testado** — 32 testes (Vitest) a cobrir o store (CV + perfis), utilitários e
  componentes (FormWizard, ItemActions, SectionToggle, templates)

---

## 🛠️ Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) — estado central
- [Tailwind CSS](https://tailwindcss.com/) — estilo
- Impressão nativa do browser (`window.print()` + `@media print`) — exportação PDF
- [Vitest](https://vitest.dev/) — testes unitários

---

## 🚀 Como correr localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Build de produção:

```bash
npm run build
npm run preview
```

Qualidade de código:

```bash
npm test          # testes unitários (Vitest)
npm run lint      # ESLint (+ acessibilidade Vue)
npm run format    # Prettier
```

---

## 📁 Estrutura

```
src/
├── components/
│   ├── steps/            → passos do formulário
│   │   ├── StepPersonal.vue
│   │   ├── StepExperience.vue
│   │   ├── StepEducation.vue
│   │   └── StepSkills.vue
│   ├── templates/        → designs do CV
│   │   ├── TemplateModern.vue
│   │   ├── TemplateClassic.vue
│   │   └── TemplateMinimal.vue
│   ├── FormWizard.vue    → wizard multi-step + progresso
│   ├── CVPreview.vue     → escolhe e renderiza o template activo
│   └── TemplatePicker.vue
├── stores/cv.js          → estado central (Pinia) + persistência
├── composables/usePdfExport.js
├── App.vue               → layout (formulário | preview)
└── main.js
```

---

## ☁️ Deploy

O projeto está publicado no **GitHub Pages** (a partir do branch `gh-pages`). Para
republicar após mudanças, basta um comando:

```bash
npm run deploy   # build + publish do dist para o branch gh-pages
```

Por ser 100% estático, também corre tal-e-qual no Vercel ou Netlify.

---

## 🧠 Decisões técnicas

Algumas escolhas de arquitetura e o porquê:

- **PDF via impressão nativa (`window.print()`) em vez de `html2pdf.js`.**
  O `html2pdf` rasteriza o CV para uma imagem — o texto deixa de ser selecionável e,
  pior, **sistemas ATS não conseguem lê-lo**. Optei pela impressão nativa do browser:
  gera **texto vetorial real** (selecionável, pesquisável, legível por ATS), com
  **paginação A4 automática** e sem dependências pesadas. _Trade-off:_ o utilizador
  passa pelo diálogo de impressão ("Guardar como PDF"); a fidelidade é máxima no
  Chrome/Edge. Uma pré-visualização in-app prepara o utilizador para esse passo.
- **Deploy por branch `gh-pages` (e não GitHub Actions).** Permite publicar com um
  comando sem depender de minutos de CI, mantendo o `main` só com código-fonte.
- **`zoom` (não `transform: scale`) na pré-visualização.** O `zoom` reflui o layout,
  pelo que o A4 encolhe sem deixar espaço morto à volta.
- **Cor de acento via CSS `--accent` + `color-mix`.** Um único valor gera todos os
  tons derivados (claros/escuros), por isso os 18 templates reagem à mesma cor.
- **Perfis num store Pinia dedicado** que orquestra a persistência; o store do CV é
  apenas a "cópia de trabalho" do perfil ativo.

---

## 💡 Notas

- A exportação usa a **impressão nativa** do browser: o "Exportar PDF" abre o diálogo de
  impressão → escolhe "Guardar como PDF". O resultado tem texto vetorial real (não uma
  imagem), por isso é selecionável e legível por sistemas ATS.
- O nome de ficheiro sugerido vem de `document.title` (respeitado de forma fiável no Chrome).
- O template `Modern` (duas colunas) é ideal para 1 página; para CVs longos, `Classic` e
  `Minimal` (coluna única) paginam de forma mais robusta.

---

## 📄 Licença

[MIT](LICENSE) © tembue2
