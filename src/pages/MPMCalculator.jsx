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

export default function MPMCalculator() {
  const inputMode = useMPMStore((state) => state.inputMode)
  const setInputMode = useMPMStore((state) => state.setInputMode)
  const tasks = useMPMStore((state) => state.tasks)
  const setTasks = useMPMStore((state) => state.setTasks)
  const mpmResults = useMPMStore((state) => state.mpmResults)
  const errors = useMPMStore((state) => state.errors)
  const setErrors = useMPMStore((state) => state.setErrors)
  const loading = useMPMStore((state) => state.loading)
  const clearAll = useMPMStore((state) => state.clearAll)
  const clearResults = useMPMStore((state) => state.clearResults)
  const sessionLabel = useMPMStore((state) => state.sessionLabel)
  const setSessionLabel = useMPMStore((state) => state.setSessionLabel)
  const showHighlight = useMPMStore((state) => state.showHighlight)
  const setShowHighlight = useMPMStore((state) => state.setShowHighlight)

  const { compute } = useMPM()
  const [editedTasks, setEditedTasks] = useState(tasks)
  const [isRecomputing, setIsRecomputing] = useState(false)
  const [fileUploadKey, setFileUploadKey] = useState(0)

  const handleFileUpload = async (file) => {
    try {
      const data = await fileService.loadFile(file)
      setEditedTasks(data)
      clearResults()
      setErrors([])
    } catch (error) {
      setErrors([error.message])
    }
  }

  const handleFileReset = () => {
    setFileUploadKey((k) => k + 1)
    setEditedTasks([])
    clearAll()
  }

  const handleLoadExample = () => {
    const exampleTasks = [
      { Task: 'A', Duration: 5, Predecessors: '' },
      { Task: 'B', Duration: 7, Predecessors: 'A' },
      { Task: 'C', Duration: 10, Predecessors: 'B' },
      { Task: 'D', Duration: 6, Predecessors: 'A' },
      { Task: 'E', Duration: 8, Predecessors: 'D' },
      { Task: 'F', Duration: 12, Predecessors: 'C,E' },
    ]
    setEditedTasks(exampleTasks)
    setErrors([])
    clearResults()
  }

  const handleTasksChange = (updatedTasks) => {
    setEditedTasks(updatedTasks)
    clearResults()
  }

  const handleCompute = async () => {
    if (!editedTasks || editedTasks.length === 0) {
      setErrors(['Veuillez ajouter au moins une tâche avant de calculer'])
      return
    }

    const validationErrors = []
    const taskNames = new Set()

    editedTasks.forEach((row) => {
      const task = String(row.Task).trim()
      if (!task) {
        validationErrors.push('Tâche vide détectée')
        return
      }
      if (taskNames.has(task)) {
        validationErrors.push(`Tâche en double : "${task}"`)
      }
      taskNames.add(task)

      const duration = Number(row.Duration)
      if (isNaN(duration)) {
        validationErrors.push(`Durée invalide pour la tâche "${task}" - doit être un nombre`)
      } else if (duration < 0) {
        validationErrors.push(`Durée négative pour la tâche "${task}" - la durée doit être positive`)
      } else if (duration === 0) {
        validationErrors.push(`Durée nulle pour la tâche "${task}" - la durée doit être supérieure à 0`)
      }
    })

    editedTasks.forEach((row) => {
      const task = String(row.Task).trim()
      if (!task) return

      const preds = String(row.Predecessors || '')
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p)

      preds.forEach((pred) => {
        if (!taskNames.has(pred)) {
          validationErrors.push(`Prédécesseur non défini "${pred}" pour la tâche "${task}"`)
        }
      })
    })

    if (validationErrors.length > 0) {
      setErrors([...new Set(validationErrors)])
      return
    }

    setIsRecomputing(true)
    setTimeout(() => {
      const result = compute(editedTasks, sessionLabel)
      if (result) {
        setTasks(editedTasks)
      }
      setIsRecomputing(false)
    }, 300)
  }

  const handleClear = () => {
    setEditedTasks([])
    setFileUploadKey((k) => k + 1)
    clearAll()
  }

  const handleClearResults = () => {
    clearResults()
  }

  const handleSwitchMode = (newMode) => {
    setInputMode(newMode)
    setEditedTasks([])
    setFileUploadKey((k) => k + 1)
    clearResults()
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: '100%', padding: '0 20px' }}>

        {/* En-tête */}
        <div className="flex-between" style={{ marginBottom: '24px', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '28px' }}>Calculateur MPM</h1>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
              Définissez les tâches et calculez le chemin critique
            </p>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleClear}
            title="Effacer toutes les tâches et les résultats"
            style={{ fontWeight: '600', height: 'fit-content', padding: '8px 12px', fontSize: '13px' }}
          >
            Tout effacer
          </button>
        </div>

        {/* Animation recalcul */}
        {isRecomputing && (
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.3s ease',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2.5px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ color: 'white', fontWeight: '600', fontSize: '13px' }}>
              Calcul en cours... Veuillez patienter
            </span>
          </div>
        )}

        {/* Mode de saisie */}
        <div style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ marginBottom: '12px' }}>Méthode de saisie</h3>
          <InputMode currentMode={inputMode} onModeChange={handleSwitchMode} />
        </div>

        {/* Import de fichier — toujours monté en mode import, key contrôle le reset */}
        {inputMode === 'Import CSV/Excel' && (
          <div style={{ marginBottom: '16px' }}>
            <h3 className="section-title" style={{ marginBottom: '12px' }}>Importer un fichier</h3>
            <FileUpload
              key={fileUploadKey}
              onFileUpload={handleFileUpload}
              onReset={handleFileReset}
            />
          </div>
        )}

        {/* Charger un exemple — visible en mode manuel, même après compute */}
        {inputMode === 'Manual input' && (
          <div style={{ marginBottom: '12px' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleLoadExample}
              style={{ fontWeight: '600', fontSize: '13px', padding: '6px 12px' }}
            >
              Charger un exemple
            </button>
          </div>
        )}

        {/* Erreurs */}
        {errors.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            {errors.map((error, idx) => (
              <ErrorAlert key={idx} message={error} />
            ))}
          </div>
        )}

        {/* 1. GRAPHE EN PREMIER */}
        {mpmResults && (
          <div style={{ marginBottom: '24px' }}>
            <div className="flex-between" style={{ marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
              <h2 style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: '22px' }}>Résultats</h2>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleClearResults}
                title="Effacer les résultats et calculer un nouveau scénario"
                style={{ fontWeight: '600', fontSize: '13px', padding: '6px 12px' }}
              >
                Effacer les résultats
              </button>
            </div>
            <h3 className="section-title" style={{ marginBottom: '12px' }}>Graphe du réseau</h3>
            <Graph elements={mpmResults.elements} />
          </div>
        )}

        {/* 2. KPI EN DEUXIÈME */}
        {mpmResults && (
          <div style={{ marginBottom: '20px' }}>
            <ResultsKPI results={mpmResults} />
          </div>
        )}

        {/* 3. TABLEAU DES TÂCHES EN TROISIÈME */}
        <div style={{ marginBottom: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '16px', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex-between" style={{ marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
            <h3 className="section-title" style={{ margin: 0, fontSize: '16px' }}>Tâches</h3>
            <input
              type="text"
              placeholder="Libellé de session (optionnel)"
              value={sessionLabel}
              onChange={(e) => setSessionLabel(e.target.value)}
              style={{
                width: '250px',
                maxWidth: '100%',
                fontSize: '13px',
                padding: '6px 10px',
              }}
            />
          </div>
          <div style={{ marginBottom: '12px', maxHeight: '250px', overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '8px' }}>
            <DataEditor tasks={editedTasks} onTasksChange={handleTasksChange} />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleCompute}
            disabled={loading || isRecomputing}
            style={{
              background: (loading || isRecomputing) ? 'var(--color-text-tertiary)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: (loading || isRecomputing) ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)',
              cursor: (loading || isRecomputing) ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              padding: '8px 16px',
            }}
          >
            {(loading || isRecomputing) ? (
              <><LoadingSpinner />Calcul en cours...</>
            ) : (
              'Calculer MPM'
            )}
          </button>
        </div>

        {/* 4. RESTE DES RÉSULTATS EN BAS */}
        {mpmResults && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '14px', boxShadow: 'var(--shadow-md)' }}>
                <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '10px' }}>Dépendances</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <PredSuccTable data={mpmResults.predSucc} />
                </div>
              </div>
              <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '14px', boxShadow: 'var(--shadow-md)' }}>
                <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '10px' }}>Chemins critiques</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <CriticalPaths paths={mpmResults.paths} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '14px', boxShadow: 'var(--shadow-md)' }}>
              <div className="flex-between" style={{ marginBottom: '10px', gap: '12px', flexWrap: 'wrap' }}>
                <h3 className="section-title" style={{ margin: 0, fontSize: '14px' }}>Résultats des tâches</h3>
                <button
                  className={`btn btn-sm ${showHighlight ? 'btn-primary' : 'btn'}`}
                  onClick={() => setShowHighlight(!showHighlight)}
                  style={{ fontWeight: '600', fontSize: '12px', padding: '4px 10px' }}
                  title="Mettre en surbrillance les tâches critiques"
                >
                  {showHighlight ? 'Désactiver' : 'Tâches critiques'}
                </button>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'auto' }}>
                <ResultsTable
                  data={mpmResults.results}
                  criticalNodes={mpmResults.results
                    .filter(r => r.Total_Float === 0)
                    .map(r => r.Task)}
                  showHighlight={showHighlight}
                />
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '14px', boxShadow: 'var(--shadow-md)' }}>
              <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '12px' }}>Exporter</h3>
              <ExportButtons data={mpmResults.results} mpmResults={mpmResults} />
            </div>
          </>
        )}

        {/* État vide */}
        {!mpmResults && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #dbeafe, #f0f4f8)',
            borderRadius: 'var(--radius-lg)',
            marginTop: '30px',
            border: '2px dashed #3b82f6'
          }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '8px', fontSize: '18px' }}>Aucun calcul effectué</h3>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '13px' }}>
              Ajoutez des tâches et cliquez sur "Calculer MPM" pour voir les résultats
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}