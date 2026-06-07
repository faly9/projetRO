import React from 'react'

export default function ResultsTable({ data, criticalNodes, showHighlight }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Tâche</th>
            <th>Durée</th>
            <th>Date au plus tôt</th>
            <th>Date au plus tard</th>
            <th>Marge totale</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const isHighlighted = showHighlight && criticalNodes.includes(row.Task)
            return (
              <tr
                key={idx}
                style={{
                  background: isHighlighted ? '#d1fae5' : 'transparent',
                  fontWeight: isHighlighted ? '600' : 'normal',
                  color: isHighlighted ? '#14532d' : 'inherit',
                }}
              >
                <td className="font-mono">{row.Task}</td>
                <td>{row.Duration}</td>
                <td>{row.Early_Start}</td>
                <td>{row.Late_Start}</td>
                <td>
                  <span style={{
                    fontWeight: '600',
                    color: row.Total_Float === 0 ? 'var(--color-danger)' : 'var(--color-success)'
                  }}>
                    {row.Total_Float}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}