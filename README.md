# 📄 Gerador de CV Online

Aplicação web para criar um currículo profissional num formulário multi-step, com
pré-visualização em tempo real e exportação para PDF — tudo no browser, sem backend.

![demo](docs/demo.gif) <!-- adiciona um GIF do formulário em acção -->
![screenshot](docs/screenshot.png) <!-- adiciona um screenshot do CV gerado -->

**🔗 Demo ao vivo:** _adiciona aqui o link depois do deploy_

---

## ✨ Funcionalidades

- **Formulário multi-step** com barra de progresso (Pessoal → Experiência → Educação → Skills)
- **Pré-visualização em tempo real** — escreves no formulário, o CV actualiza ao lado
- **3 templates** com um clique: `Modern`, `Classic`, `Minimal`
- **Exportação para PDF** em formato A4 (via `html2pdf.js`)
- **Persistência automática** no `localStorage` — fechas o browser e os dados continuam lá
- **Responsivo** — no mobile alternas entre formulário e preview
- **Dados de exemplo** num clique para experimentar rapidamente

---

## 🛠️ Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) — estado central
- [Tailwind CSS](https://tailwindcss.com/) — estilo
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) — exportação PDF

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

- A exportação captura o elemento `#cv-preview` exactamente como aparece no ecrã,
  por isso o que vês é o que sai no PDF.
- Para melhor qualidade, o `html2canvas` usa `scale: 2`.
