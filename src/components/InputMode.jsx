import React from 'react'

export default function InputMode({ currentMode, onModeChange }) {
  const modes = [
    { label: 'Saisie manuelle', value: 'Manual input' },
    { label: 'Importer CSV/Excel', value: 'Import CSV/Excel' },
  ]

  return (
    <div className="flex" style={{ gap: '12px' }}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          className={`btn ${currentMode === mode.value ? 'btn-primary' : ''}`}
          onClick={() => onModeChange(mode.value)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  )
}