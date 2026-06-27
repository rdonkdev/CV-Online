# 📄 Gerador de CV Online

Aplicação web para criar um currículo profissional num formulário multi-step, com
pré-visualização em tempo real e exportação para PDF — tudo no browser, sem backend.

![demo](docs/demo.gif) <!-- adiciona um GIF do formulário em acção -->
![screenshot](docs/screenshot.png) <!-- adiciona um screenshot do CV gerado -->

**🔗 Demo ao vivo:** https://rdonkdev.github.io/CV-Online/

---

## ✨ Funcionalidades

- **Formulário multi-step** com barra de progresso e 7 secções: Pessoal, Experiência, Educação, Competências, Idiomas, Certificações e Projetos
- **Pré-visualização em tempo real** — escreves no formulário, o CV actualiza ao lado
- **3 templates** com um clique: `Modern`, `Classic`, `Minimal`
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
- **Modo escuro** no editor (o CV mantém-se branco)
- **Pré-visualização de impressão** in-app antes de exportar
- **Acessível** — labels associados, `aria-*`, navegação por teclado
- **Responsivo** — no mobile alternas entre formulário e preview
- **Testado** — testes unitários com Vitest (`npm test`)

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

O projecto é 100% estático — qualquer um destes serviços liga directamente ao GitHub:

- **Vercel:** importa o repo → framework `Vite` → deploy
- **Netlify:** build command `npm run build`, publish dir `dist`
- **GitHub Pages:** `npm run build` e publica a pasta `dist`

---

## 💡 Notas

- A exportação usa a **impressão nativa** do browser: o "Exportar PDF" abre o diálogo de
  impressão → escolhe "Guardar como PDF". O resultado tem texto vetorial real (não uma
  imagem), por isso é selecionável e legível por sistemas ATS.
- O nome de ficheiro sugerido vem de `document.title` (respeitado de forma fiável no Chrome).
- O template `Modern` (duas colunas) é ideal para 1 página; para CVs longos, `Classic` e
  `Minimal` (coluna única) paginam de forma mais robusta.
