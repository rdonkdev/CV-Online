import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import a11y from 'eslint-plugin-vuejs-accessibility'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...a11y.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Componentes de página/single-instance não precisam de nome multi-palavra.
      'vue/multi-word-component-names': 'off',
      // Aceita associação por id (for/id) OU aninhamento — ambos são acessíveis.
      'vuejs-accessibility/label-has-for': ['error', { required: { some: ['nesting', 'id'] } }],
    },
  },

  // Testes (Vitest)
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Desativa regras de formatação que conflitam com o Prettier (deve ser o último).
  prettier,
]
