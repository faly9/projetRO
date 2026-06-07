import React from 'react'

export default function DataEditor({ tasks, onTasksChange }) {
  const handleAddRow = () => {
    onTasksChange([
      ...tasks,
      { Task: '', Duration: 0, Predecessors: '' }
    ])
  }

  const handleDeleteRow = (idx) => {
    onTasksChange(tasks.filter((_, i) => i !== idx))
  }

  const handleChange = (idx, field, value) => {
    const updated = [...tasks]
    updated[idx] = { ...updated[idx], [field]: value }
    onTasksChange(updated)
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Tâche</th>
            <th style={{ width: '100px' }}>Durée</th>
            <th>Predecesseurs</th>
            <th style={{ width: '60px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-tertiary">
                Aucune tâche disponible.
              </td>
            </tr>
          ) : (
            tasks.map((task, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    value={task.Task}
                    onChange={(e) => handleChange(idx, 'Task', e.target.value)}
                    placeholder="A"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={task.Duration}
                    onChange={(e) => handleChange(idx, 'Duration', e.target.value)}
                    placeholder="0"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={task.Predecessors}
                    onChange={(e) => handleChange(idx, 'Predecessors', e.target.value)}
                    placeholder="A,B,C"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRow(idx)}
                  >
                    Effacer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        className="btn btn-primary btn-sm"
        onClick={handleAddRow}
        style={{ marginTop: '12px' }}
      >
        Ajouter
      </button>
    </div>
  )
}
