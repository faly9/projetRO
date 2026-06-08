import React, { useState } from 'react'
import useMPMStore from '../store/mpmStore'

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Supprimer', cancelText = 'Annuler', isDangerous = false }) => {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '28px',
        maxWidth: '100px',
        width: '90%',
        boxShadow: '0 10px 35px rgba(0,0,0,.15)',
        border: '1px solid rgba(0,0,0,.08)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', marginTop: 0, color: '#111827' }}>
          {title}
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '12px 0 24px 0' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-sm" onClick={onCancel} style={{ fontWeight: '500', color: '#111827' }}>
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

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: null, sid: null })

  const handleLoad = (sid) => {
    const success = loadFromHistory(sid)
    if (success) {
      setShowHighlight(false)
      setCurrentPage('MPM Calculator')
    }
  }

  const handleDeleteClick = (sid) => setConfirmModal({ isOpen: true, type: 'delete', sid })
  const handleConfirmDelete = () => {
    if (confirmModal.sid) deleteFromHistory(confirmModal.sid)
    setConfirmModal({ isOpen: false, type: null, sid: null })
  }
  const handleClearAllClick = () => setConfirmModal({ isOpen: true, type: 'clearAll', sid: null })
  const handleConfirmClearAll = () => {
    clearHistory()
    setConfirmModal({ isOpen: false, type: null, sid: null })
  }
  const handleCancelModal = () => setConfirmModal({ isOpen: false, type: null, sid: null })

const pageStyle = {
  marginLeft: '284px',
  padding: '32px',
  minHeight: '100vh',
  background: '#f5f7fb',
  width: 'calc(100vw - 284px)',   // ← prend tout l'espace restant
  boxSizing: 'border-box',
}
  const mobileFix = `
    @media (max-width: 768px) {
      .history-page { margin-left: 0 !important; padding: 80px 16px 32px 16px !important; }
    }
  `

  if (history.length === 0) {
    return (
      <div className="history-page" style={pageStyle}>
        <style>{mobileFix}</style>
        <h1 style={{ color: '#111827', marginTop: 0 }}>Historique des calculs</h1>
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '16px',
          border: '2px dashed #3b82f6',
          marginTop: '40px'
        }}>
          <h3 style={{ color: '#3b82f6', marginBottom: '12px' }}>Aucun historique</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Lancez le calculateur MPM pour sauvegarder des calculs et y accéder ici
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="history-page" style={pageStyle}>
      <style>{mobileFix}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ color: '#111827', marginTop: 0, marginBottom: '4px' }}>Historique des calculs</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Enregistrés : {history.length} sur 20 calculs
          </p>
        </div>
        <button className="btn btn-danger btn-sm" onClick={handleClearAllClick} style={{ height: 'fit-content' }}>
          Effacer tout l'historique
        </button>
      </div>

<div style={{ display: 'grid', gap: '12px', width: '100%' }}>
  {history.map((item, idx) => (
  <div key={idx} style={{
    background: 'white',
    border: '1px solid rgba(0,0,0,.06)',
    borderLeft: '4px solid #3b82f6',
    borderRadius: '16px',
    width:'100%',
    padding: '32px',              // 20px → 32px
    boxShadow: '0 2px 8px rgba(0,0,0,.04)',
    transition: 'all 0.3s ease'
  }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ marginBottom: '4px', marginTop: 0, color: '#111827' }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px 0' }}>
                  {item.ts}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-success">{item.duration} jours</span>
                  <span className="badge badge-info">{item.n_tasks} tâches</span>
                  <span className="badge badge-warning">{item.n_paths} chemin(s)</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <button className="btn btn-primary btn-sm" onClick={() => handleLoad(item.sid)} style={{ fontWeight: '600' }}>
                  Charger
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(item.sid)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
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