import React from 'react'

export default function CriticalPaths({ paths }) {
  if (!paths || paths.length === 0) {
    return (
      <div className="alert alert-warning">
        Aucun chemin critique trouvé.
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {paths.map((path, idx) => (
        <div key={idx} className="card" style={{ padding: '12px 16px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
            {path.join(' → ')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
            Longueur: {path.length} nœuds
          </div>
        </div>
      ))}
    </div>
  )
}
