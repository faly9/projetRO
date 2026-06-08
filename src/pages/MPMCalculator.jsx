import React, { useState } from 'react'
import useMPMStore from '../store/mpmStore'
import useMPM from '../hooks/useMPM'
import fileService from '../services/fileService'

import DataEditor from '../components/DataEditor'
import InputMode from '../components/InputMode'
import FileUpload from '../components/FileUpload'
import ErrorAlert from '../components/ErrorAlert'
import ResultsKPI from '../components/ResultsKPI'
import ResultsTable from '../components/ResultsTable'
import PredSuccTable from '../components/PredSuccTable'
import CriticalPaths from '../components/CriticalPaths'
import Graph from '../components/Graph'
import ExportButtons from '../components/ExportButtons'
import LoadingSpinner from '../components/LoadingSpinner'
import './calcul.css'

export default function MPMCalculator() {

  const inputMode = useMPMStore(s => s.inputMode)
  const setInputMode = useMPMStore(s => s.setInputMode)

  const tasks = useMPMStore(s => s.tasks)
  const setTasks = useMPMStore(s => s.setTasks)

  const mpmResults = useMPMStore(s => s.mpmResults)
  const errors = useMPMStore(s => s.errors)
  const setErrors = useMPMStore(s => s.setErrors)

  const loading = useMPMStore(s => s.loading)
  const clearAll = useMPMStore(s => s.clearAll)
  const clearResults = useMPMStore(s => s.clearResults)

  const sessionLabel = useMPMStore(s => s.sessionLabel)
  const setSessionLabel = useMPMStore(s => s.setSessionLabel)

  const showHighlight = useMPMStore(s => s.showHighlight)
  const setShowHighlight = useMPMStore(s => s.setShowHighlight)

  const { compute } = useMPM()

  const [editedTasks, setEditedTasks] = useState(tasks)
  const [isRecomputing, setIsRecomputing] = useState(false)
  const [fileUploadKey, setFileUploadKey] = useState(0)

  /* ---------------- FILE ---------------- */
  const handleFileUpload = async (file) => {
    try {
      const data = await fileService.loadFile(file)
      setEditedTasks(data)
      clearResults()
      setErrors([])
    } catch (e) {
      setErrors([e.message])
    }
  }

  const handleFileReset = () => {
    setFileUploadKey(k => k + 1)
    setEditedTasks([])
    clearAll()
  }

  /* ---------------- EXAMPLE ---------------- */
  const handleLoadExample = () => {
    setEditedTasks([
      { Task: 'A', Duration: 5, Predecessors: '' },
      { Task: 'B', Duration: 7, Predecessors: 'A' },
      { Task: 'C', Duration: 10, Predecessors: 'B' },
      { Task: 'D', Duration: 6, Predecessors: 'A' },
      { Task: 'E', Duration: 8, Predecessors: 'D' },
      { Task: 'F', Duration: 12, Predecessors: 'C,E' },
    ])
    setErrors([])
    clearResults()
  }

  /* ---------------- CHANGE ---------------- */
  const handleTasksChange = (t) => {
    setEditedTasks(t)
    clearResults()
  }

  /* ---------------- VALIDATION + COMPUTE ---------------- */
  const handleCompute = async () => {

    if (!editedTasks.length) {
      setErrors(['Ajoutez au moins une tâche'])
      return
    }

    const errors = []
    const set = new Set()

    editedTasks.forEach(r => {
      const t = String(r.Task).trim()

      if (!t) errors.push('Tâche vide')
      if (set.has(t)) errors.push(`Doublon: ${t}`)
      set.add(t)

      const d = Number(r.Duration)
      if (isNaN(d) || d <= 0)
        errors.push(`Durée invalide: ${t}`)
    })

    if (errors.length) {
      setErrors([...new Set(errors)])
      return
    }

    setIsRecomputing(true)

    setTimeout(() => {
      const res = compute(editedTasks, sessionLabel)
      if (res) setTasks(editedTasks)
      setIsRecomputing(false)
    }, 300)
  }

  const handleClear = () => {
    setEditedTasks([])
    setFileUploadKey(k => k + 1)
    clearAll()
  }

  const handleClearResults = () => clearResults()

  const handleSwitchMode = (m) => {
    setInputMode(m)
    setEditedTasks([])
    setFileUploadKey(k => k + 1)
    clearResults()
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="page">
      <div className="page-content">

        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Calculateur MPM</h1>
            <p className="page-subtitle">
              Définir les tâches et calculer le chemin critique
            </p>
          </div>

          <button className="btn btn-danger btn-sm" onClick={handleClear}>
            Tout effacer
          </button>
        </div>

        {/* LOADING */}
        {isRecomputing && (
          <div className="card loading-bar">
            <LoadingSpinner />
            <span>Calcul en cours...</span>
          </div>
        )}

        {/* MODE */}
        <div className="card">
          <h3 className="section-title" style={{color:'black'}}>Méthode de saisie</h3>
          <InputMode currentMode={inputMode} onModeChange={handleSwitchMode} />
        </div>

        {/* FILE */}
        {inputMode === 'Import CSV/Excel' && (
          <div className="card">
            <h3 className="section-title">Importer un fichier</h3>
            <FileUpload
              key={fileUploadKey}
              onFileUpload={handleFileUpload}
              onReset={handleFileReset}
            />
          </div>
        )}

        {/* EXAMPLE */}
        {inputMode === 'Manual input' && (
          <div style={{ margin: '10px 0' }}>
            <button className="btn btn-primary btn-sm" onClick={handleLoadExample}>
              Charger un exemple
            </button>
          </div>
        )}

        {/* ERRORS */}
        {errors.length > 0 && (
          <div className="card">
            {errors.map((e, i) => (
              <ErrorAlert key={i} message={e} />
            ))}
          </div>
        )}

        {/* GRAPH */}
        {mpmResults && (
          <div className="card">
            <div className="flex-between">
              <h2>Résultats</h2>
              <button className="btn btn-danger btn-sm" onClick={handleClearResults}>
                Effacer résultats
              </button>
            </div>

            <h3 className="section-title" style={{color:'black'}}>Graphe</h3>
            <Graph elements={mpmResults.elements} />
          </div>
        )}

        {/* KPI */}
        {mpmResults && (
          <div className="card">
            <ResultsKPI results={mpmResults} />
          </div>
        )}

        {/* TABLE INPUT */}
        <div className="card">
          <div className="flex-between">
            <h3 className="section-title" style={{color:'black'}}>Tâches</h3>

<input
  value={sessionLabel}
  onChange={e => setSessionLabel(e.target.value)}
  placeholder="Session"
  style={{ background: 'white', color: 'black' }}
  className="input"
/>          </div>

          <DataEditor tasks={editedTasks} onTasksChange={handleTasksChange} />

          <button
          style={{marginTop: '0.5rem'}}
            className="btn btn-primary"
            onClick={handleCompute}
            disabled={loading || isRecomputing}
          >
            {(loading || isRecomputing) ? (
              <>
                <LoadingSpinner /> Calcul...
              </>
            ) : 'Calculer MPM'}
          </button>
        </div>

        {/* DETAILS */}
        {mpmResults && (
          <>
            <div className="grid-2">
              <div className="card">
                <h3>Dépendances</h3>
                <PredSuccTable data={mpmResults.predSucc} />
              </div>

              <div className="card">
                <h3>Chemins critiques</h3>
                <CriticalPaths paths={mpmResults.paths} />
              </div>
            </div>

            <div className="card">
              <div className="flex-between">
                <h3>Résultats tâches</h3>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowHighlight(!showHighlight)}
                >
                  {showHighlight ? 'OFF' : 'Critiques'}
                </button>
              </div>

              <ResultsTable
                data={mpmResults.results}
                criticalNodes={mpmResults.results
                  .filter(r => r.Total_Float === 0)
                  .map(r => r.Task)}
                showHighlight={showHighlight}
              />
            </div>

            <div className="card">
              <h3>Exporter</h3>
              <ExportButtons data={mpmResults.results} mpmResults={mpmResults} />
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {!mpmResults && (
          <div className="empty-state">
            <h3>Aucun calcul</h3>
            <p>Ajoutez des tâches pour commencer</p>
          </div>
        )}

      </div>
    </div>
  )
}