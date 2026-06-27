# Contribuir

Obrigado pelo interesse! Este é um projeto pessoal/portfolio, mas contribuições são bem-vindas.

## Como começar

```bash
npm install
npm run dev
```

## Antes de abrir um Pull Request

Garante que tudo passa:

```bash
npm test          # testes (Vitest)
npm run lint      # ESLint (+ acessibilidade Vue)
npm run format    # Prettier
npm run build     # build de produção
```

## Adicionar um template de CV

1. Cria `src/components/templates/TemplateX.vue` (usa o composable `useTemplateData`).
2. Respeita: `cv.sections.*` (visibilidade), `--accent` (cor), `bullets()`/`fmt()`,
   e o tamanho A4 (`.cv-page`) com `break-inside-avoid` nos blocos.
3. Regista-o em `src/components/templates/registry.js`.

## Estilo

- Vue 3 `<script setup>`, Tailwind, sem ponto-e-vírgula (regra do Prettier).
- Mensagens de commit descritivas; um assunto por commit.
