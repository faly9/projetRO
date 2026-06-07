import React from 'react'

export default function ResultsKPI({ results }) {
  // Calcul du nombre de jours (la durée du projet)
  const projectDuration = results.results && results.results.length > 0
    ? Math.max(...results.results.map(r => r.Early_Finish || r.EF || 0))
    : results.duration || 0

  const kpis = [
    {
      label: 'Durée du projet',
      value: projectDuration,
      unit: 'jours',
      className: 'success'
    },
    {
      label: 'Total des tâches',
      value: results.n_tasks || results.results?.length || 0,
      unit: '',
      className: ''
    },
    {
      label: 'Tâches critiques',
      value: results.n_critical || results.results?.filter(r => r.Total_Float === 0)?.length || 0,
      unit: '',
      className: 'danger'
    },
    {
      label: 'Chemins critiques',
      value: results.paths?.length || 0,
      unit: '',
      className: 'warning'
    }
  ]

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="kpi-card">
          <div className="kpi-label">{kpi.label}</div>
          <div className={`kpi-value ${kpi.className}`}>
            {kpi.value}
            {kpi.unit && <span className="kpi-unit">{kpi.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
