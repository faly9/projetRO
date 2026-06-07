import React from 'react'

export default function PredSuccTable({ data }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Tâche</th>
            <th>Predecesseurs</th>
            <th>Successeurs</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="font-mono" style={{ fontWeight: '600' }}>
                {row.Task}
              </td>
              <td className="font-mono">{row.Predecessors}</td>
              <td className="font-mono">{row.Successors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
