import * as XLSX from 'xlsx'

export const exportService = {
  exportToCSV: (data, filename = 'export.csv', criticalTasks = []) => {
    if (!data || data.length === 0) return

    const headers = Object.keys(data[0])
    const allHeaders = [...headers, 'Critical_Path']

    const rows = [
      allHeaders.join(','),
      ...data.map((row) => {
        const isCritical = criticalTasks.includes(row.Task)
        const vals = headers.map((h) => {
          const val = row[h]
          if (typeof val === 'string' && val.includes(',')) return `"${val}"`
          return val ?? ''
        })
        vals.push(isCritical ? 'YES' : 'NO')
        return vals.join(',')
      }),
    ]

    const csv = rows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  exportToExcel: (data, filename = 'export.xlsx', criticalTasks = []) => {
    if (!data || data.length === 0) return

    // Enrichit les données avec la colonne Critical_Path
    const enrichedData = data.map((row) => ({
      ...row,
      Critical_Path: criticalTasks.includes(row.Task) ? 'YES' : 'NO',
    }))

    const worksheet = XLSX.utils.json_to_sheet(enrichedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results')

    // Largeurs de colonnes auto
    const range = XLSX.utils.decode_range(worksheet['!ref'])
    const colWidths = []
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxLength = 0
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })]
        if (cell?.v) maxLength = Math.max(maxLength, String(cell.v).length)
      }
      colWidths.push({ wch: maxLength + 2 })
    }
    worksheet['!cols'] = colWidths

    XLSX.writeFile(workbook, filename)
  },

  exportToPNG: (canvasElement, filename = 'export.png') => {
    if (!canvasElement) return
    const link = document.createElement('a')
    link.href = canvasElement.toDataURL()
    link.download = filename
    link.click()
  },

  exportToJSON: (data, filename = 'export.json') => {
    if (!data) return
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  generateReport: (mpmResults, projectName = 'MPM Report') => {
    return {
      projectName,
      generatedAt: new Date().toISOString(),
      projectDuration: mpmResults.duration,
      totalTasks: mpmResults.n_tasks,
      criticalTasks: mpmResults.n_critical,
      numberOfCriticalPaths: mpmResults.paths.length,
      tasks: mpmResults.results,
      criticalPaths: mpmResults.paths,
      predecessorSuccessor: mpmResults.predSucc,
    }
  },
}

export default exportService