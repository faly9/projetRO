import React, { useState } from 'react'

// On garde les identifiants techniques originaux en anglais pour ne pas casser le parent
const pages = ['Home', 'MPM Calculator', 'History', 'Help']

// On crée un dictionnaire de traduction pour l'affichage visuel uniquement
const pageLabels = {
  'Home': 'Accueil',
  'MPM Calculator': 'Calculateur MPM',
  'History': 'Historique',
  'Help': 'Aide'
}

export default function Navigation({ currentPage, setCurrentPage }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Overlay — clic extérieur pour fermer */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.25)',
            zIndex: 100,
          }}
        />
      )}

      {/* Barre latérale coulissante */}
      <nav
        className="sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '220px',
          zIndex: 101,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: open ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-primary)',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            lineHeight: 1,
          }}
          title="Fermer le menu"
        >
          ×
        </button>

        {/* Branding */}
        <div style={{
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '2px solid var(--color-border)',
          paddingRight: '40px',
        }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Calculateur MPM
          </h2>
          <p style={{
            fontSize: '12px',
            color: 'var(--color-text-tertiary)',
            margin: 0,
            fontWeight: '500',
          }}>
            Outil de planification de projet
          </p>
        </div>

        {/* Éléments de navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {pages.map((page) => {
            const isActive = currentPage === page
            return (
              <button
                key={page}
                className={isActive ? 'btn btn-primary' : 'btn'}
                onClick={() => { 
                  setCurrentPage(page) // Envoie toujours 'Home', 'History', etc. au parent
                  setOpen(false) 
                }}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '11px 14px',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: isActive
                    ? 'linear-gradient(135deg, #2563eb, #1e40af)'
                    : 'transparent',
                  color: isActive ? 'white' : 'var(--color-text-primary)',
                  border: isActive ? 'none' : '1px solid transparent',
                  borderRadius: '7px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {/* TRADUCTION VISUELLE ICI : Affiche le label français */}
                {pageLabels[page]} 
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bouton de bascule */}
      <button
        onClick={() => setOpen(true)}
        title="Ouvrir le menu"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px',
          zIndex: 99,
          transition: 'box-shadow 0.2s, background 0.2s',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '16px',
              height: '2px',
              borderRadius: '2px',
              background: 'var(--color-text-secondary)',
            }}
          />
        ))}
      </button>
    </>
  )
}