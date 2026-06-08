import React from 'react'

export default function PredSuccTable({ data }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <style>{`
        .no-hover-table tbody tr:hover,
        .no-hover-table tbody tr:hover td {
          background-color: inherit !important;
          cursor: default;
        }
      `}</style>
      <table style={{ background: 'white' }} className="no-hover-table">
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
              <td className="font-mono" style={{ fontWeight: '600', color: 'black' }}>
                {row.Task}
              </td>
              <td className="font-mono" style={{ color: 'black' }}>{row.Predecessors}</td>
              <td className="font-mono" style={{ color: 'black' }}>{row.Successors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}