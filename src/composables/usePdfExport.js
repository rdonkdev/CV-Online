import { ref } from 'vue'

/**
 * Exportação via impressão nativa do browser.
 *
 * Em vez de rasterizar o CV para uma imagem (html2canvas), usamos window.print()
 * com regras @media print. Vantagens decisivas para um CV:
 *   - Texto vetorial REAL → selecionável, pesquisável e legível por sistemas ATS.
 *   - Paginação A4 automática → conteúdo longo flui para várias páginas sem cortes.
 *   - Sem dependências pesadas nem vulnerabilidades transitivas.
 *
 * O utilizador escolhe "Guardar como PDF" no diálogo de impressão.
 */
export function usePdfExport() {
  const exporting = ref(false)

  function exportPdf(filename = 'cv') {
    const originalTitle = document.title
    // Em muitos browsers o título do documento vira o nome de ficheiro sugerido.
    document.title = filename
    exporting.value = true

    // Garante que o DOM reflecte o estado mais recente antes de imprimir.
    requestAnimationFrame(() => {
      window.print()
      document.title = originalTitle
      exporting.value = false
    })
  }

  return { exportPdf, exporting }
}
