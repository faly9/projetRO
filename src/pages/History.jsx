import React, { useState } from 'react'
import useMPMStore from '../store/mpmStore'

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Supprimer', cancelText = 'Annuler', isDangerous = false }) => {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--color-border)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', marginTop: 0, color: 'var(--color-text-primary)' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px', margin: '12px 0 24px 0' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-sm" onClick={onCancel} style={{ fontWeight: '500' }}>
            {cancelText}
          </button>
          <button 
            className={`btn btn-sm ${isDangerous ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            style={{ fontWeight: '600' }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function History() {
  const history = useMPMStore((state) => state.history)
  const loadFromHistory = useMPMStore((state) => state.loadFromHistory)
  const deleteFromHistory = useMPMStore((state) => state.deleteFromHistory)
  const setCurrentPage = useMPMStore((state) => state.setCurrentPage)
  const setShowHighlight = useMPMStore((state) => state.setShowHighlight)
  const clearHistory = useMPMStore((state) => state.clearHistory)

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    sid: null,
  })

  const handleLoad = (sid) => {
    const success = loadFromHistory(sid)
    if (success) {
      setShowHighlight(false)
      setCurrentPage('MPM Calculator')
    }
  }

  const handleDeleteClick = (sid) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      sid: sid,
    })
  }

  const handleConfirmDelete = () => {
    if (confirmModal.sid) {
      deleteFromHistory(confirmModal.sid)
    }
    setConfirmModal({ isOpen: false, type: null, sid: null })
  }

  const handleClearAllClick = () => {
    setConfirmModal({
      isOpen: true,
      type: 'clearAll',
      sid: null,
    })
  }

  const handleConfirmClearAll = () => {
    clearHistory()
    setConfirmModal({ isOpen: false, type: null, sid: null })
  }

  const handleCancelModal = () => {
    setConfirmModal({ isOpen: false, type: null, sid: null })
  }

  if (history.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h1>Historique des calculs</h1>
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, var(--color-info-light), var(--color-primary-light))',
            borderRadius: 'var(--radius-lg)',
            border: '2px dashed var(--color-primary)',
            marginTop: '40px'
          }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>Aucun historique</h3>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              Lancez le calculateur MPM pour sauvegarder des calculs et y accéder ici
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div className="flex-between" style={{ marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1>Historique des calculs</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
              Enregistrés : {history.length} sur 20 calculs
            </p>
          </div>
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleClearAllClick}
            style={{ height: 'fit-content' }}
          >
            Effacer tout l'historique
          </button>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {history.map((item, idx) => (
            <div key={idx} className="card" style={{
              background: 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-hover))',
              borderLeft: '4px solid var(--color-primary)',
              transition: 'all 0.3s ease'
            }}>
              <div className="flex-between" style={{ gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h3 style={{ marginBottom: '4px', marginTop: 0, color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', margin: '0 0 12px 0' }}>
                    {item.ts}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-success">
                      {item.duration} jours
                    </span>
                    <span className="badge badge-info">
                      {item.n_tasks} tâches
                    </span>
                    <span className="badge badge-warning">
                      {item.n_paths} chemin(s)
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleLoad(item.sid)}
                    style={{ fontWeight: '600' }}
                  >
                    Charger
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(item.sid)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'delete' ? 'Supprimer le calcul' : "Effacer tout l'historique"}
        message={confirmModal.type === 'delete' 
          ? 'Ce calcul sera définitivement supprimé. Cette action est irréversible.'
          : "Toutes les entrées de l'historique seront définitivement supprimées. Cette action est irréversible."
        }
        confirmText={confirmModal.type === 'delete' ? 'Supprimer' : 'Tout effacer'}
        cancelText="Annuler"
        isDangerous={true}
        onConfirm={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmClearAll}
        onCancel={handleCancelModal}
      />
    </div>
  )
}