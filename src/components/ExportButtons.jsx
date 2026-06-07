import React from 'react'
import exportService from '../services/exportService'

export default function ExportButtons({ data, mpmResults }) {
  // Récupère les tâches critiques (float = 0)
  const criticalTasks = mpmResults?.results
    ? mpmResults.results.filter(r => r.Total_Float === 0).map(r => r.Task)
    : []

  const handleExportCSV = () => {
    exportService.exportToCSV(data, 'mpm_results.csv', criticalTasks)
  }

  const handleExportXLSX = () => {
    exportService.exportToExcel(data, 'mpm_results.xlsx', criticalTasks)
  }

  const handleExportJSON = () => {
    exportService.exportToJSON(data, 'mpm_results.json')
  }

  return (
    <div className="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleExportCSV}
        title="Export task results as CSV (critical tasks marked)"
      >
        Télécharger CSV
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleExportXLSX}
        title="Export task results as Excel (critical tasks highlighted in red)"
      >
        Télécharger XLSX
      </button>
      <button
        className="btn btn-primary btn-sm"
        onClick={handleExportJSON}
        title="Export full results as JSON"
      >
        Télécharger JSON
      </button>
    </div>
  )
}