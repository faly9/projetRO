import React from 'react'

export default function Help() {
  const pageStyle = {
    marginLeft: '284px',
    padding: '32px',
    minHeight: '100vh',
    background: '#f5f7fb',
    width: 'calc(100vw - 284px)',
    boxSizing: 'border-box',
  }

  const mobileFix = `
    @media (max-width: 768px) {
      .help-page { margin-left: 0 !important; padding: 80px 16px 32px 16px !important; width: 100vw !important; }
    }
  `

  return (
    <div className="help-page" style={pageStyle}>
      <style>{mobileFix}</style>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#111827', marginTop: 0 }}>Aide & Documentation</h1>
        <p style={{ maxWidth: '700px', color: '#6b7280' }}>
          Guide complet d'utilisation du calculateur MPM. Suivez les instructions ci-dessous
          pour exploiter pleinement le potentiel de l'outil pour la planification de votre projet.
        </p>
      </div>

      <div className="section">
        <div className="section-title" style={{color:'black'}}>Méthodes de saisie</div>
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ background: 'white', borderLeft: '4px solid #3b82f6' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '12px', marginTop: 0 }}>Saisie manuelle</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '12px', color: '#374151' }}>
              Cliquez sur le bouton "Saisie manuelle" et modifiez directement le tableau des tâches. Chaque ligne requiert :
            </p>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#374151' }}>
              <li><strong>Tâche :</strong> Identifiant unique (A, B, Tâche1)</li>
              <li><strong>Durée :</strong> Nombre positif (jours/heures)</li>
              <li><strong>Prédécesseurs :</strong> Séparés par des virgules (A,B,C)</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'white', borderLeft: '4px solid var(--color-success)' }}>
            <h3 style={{ color: 'var(--color-success)', marginBottom: '12px', marginTop: 0 }}>Importer un fichier</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '12px', color: '#374151' }}>
              Téléversez des fichiers CSV ou Excel contenant les colonnes : Tâche, Durée, Prédécesseurs.
            </p>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', color: '#374151' }}>
              <li>Fichiers .csv (séparés par des virgules)</li>
              <li>Fichiers .xlsx (Excel 2007+)</li>
              <li>Fichiers .xls (Excel 97-2003)</li>
            </ul>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: 0, marginTop: '12px' }}>
              Prend en charge les entêtes en français : Tâche, Durée, Prédécesseurs
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title" style={{color:'black'}}>Contrôles du graphique</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div className="card" style={{ background: 'white', borderTop: '4px solid var(--color-info)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-info)', marginBottom: '12px', marginTop: 0 }}>Navigation</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li><strong>Déplacer :</strong> Cliquez et glissez sur le fond</li>
              <li><strong>Zoom avant :</strong> Appuyez sur + ou faites défiler vers le haut</li>
              <li><strong>Zoom arrière :</strong> Appuyez sur - ou faites défiler vers le bas</li>
              <li><strong>Ajuster la vue :</strong> Cliquez sur le bouton "Ajuster"</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'white', borderTop: '4px solid var(--color-warning)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-warning)', marginBottom: '12px', marginTop: 0 }}>Interaction</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li><strong>Infos du nœud :</strong> Survolez pour afficher l'infobulle</li>
              <li><strong>Surligner :</strong> Cliquez sur un nœud</li>
              <li><strong>Réinitialiser :</strong> Cliquez sur "Réinitialiser le surlignage"</li>
              <li><strong>Plein écran :</strong> Cliquez sur "Plein écran"</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'white', borderTop: '4px solid #3b82f6' }}>
            <h3 style={{ fontSize: '16px', color: '#3b82f6', marginBottom: '12px', marginTop: 0 }}>Barre d'outils</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li><strong>Ajuster :</strong> Afficher l'intégralité du graphique</li>
              <li><strong>+/- :</strong> Zoom avant / arrière</li>
              <li><strong>Réinitialiser :</strong> Effacer le surlignage</li>
              <li><strong>Télécharger :</strong> Enregistrer au format PNG</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title" style={{color:'black'}}>Comprendre les résultats</div>

        <div style={{ marginTop: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#111827' }}>Indicateurs clés</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '14px', background: 'white', borderRadius: '12px', borderLeft: '4px solid var(--color-success)', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <strong style={{ color: 'var(--color-success)', display: 'block', marginBottom: '4px' }}>Durée du projet</strong>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Temps total de bout en bout</p>
            </div>
            <div style={{ padding: '14px', background: 'white', borderRadius: '12px', borderLeft: '4px solid #3b82f6', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '4px' }}>Total des tâches</strong>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Nombre d'éléments de travail</p>
            </div>
            <div style={{ padding: '14px', background: 'white', borderRadius: '12px', borderLeft: '4px solid var(--color-danger)', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <strong style={{ color: 'var(--color-danger)', display: 'block', marginBottom: '4px' }}>Tâches critiques</strong>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Tâches qui ne peuvent être retardées</p>
            </div>
            <div style={{ padding: '14px', background: 'white', borderRadius: '12px', borderLeft: '4px solid var(--color-warning)', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              <strong style={{ color: 'var(--color-warning)', display: 'block', marginBottom: '4px' }}>Chemins critiques</strong>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Succession de tâches critiques</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#111827' }}>Colonnes du tableau</h3>
          <div style={{ overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,.06)', borderRadius: '12px', background: 'white' }}>
            <table style={{ background: 'white' }}>
              <thead>
                <tr>
                  <th style={{ width: '150px', color: '#111827' }}>Colonne</th>
                  <th style={{ color: '#111827' }}>Définition</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Durée', 'Temps requis pour accomplir la tâche'],
                  ['Début au plus tôt (DTO)', 'Le moment le plus tôt où la tâche peut commencer'],
                  ['Fin au plus tôt (FTO)', 'Le moment le plus tôt où la tâche peut se terminer'],
                  ['Début au plus tard (DTA)', 'Le moment le plus tard où la tâche peut commencer sans retarder le projet'],
                  ['Fin au plus tard (FTA)', 'Le moment le plus tard où la tâche peut se terminer sans retarder le projet'],
                  ['Marge totale', 'Temps de flexibilité disponible (0 = tâche critique)'],
                ].map(([col, def], i) => (
                  <tr key={i}>
                    <td style={{ color: '#111827' }}><strong>{col}</strong></td>
                    <td style={{ color: '#374151' }}>{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title" style={{color:'black'}}>Règles de validation</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div className="card" style={{ background: 'white', borderLeft: '4px solid var(--color-danger)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-danger)', marginBottom: '12px', marginTop: 0 }}>Obligatoire</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li>Noms de tâches uniques</li>
              <li>Durées positives</li>
              <li>Aucune tâche vide</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'white', borderLeft: '4px solid var(--color-danger)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-danger)', marginBottom: '12px', marginTop: 0 }}>Interdit</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li>Dépendances circulaires (boucles)</li>
              <li>Prédécesseurs non définis</li>
              <li>Durées négatives</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'white', borderLeft: '4px solid var(--color-success)' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--color-success)', marginBottom: '12px', marginTop: 0 }}>Optionnel</h3>
            <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0, color: '#374151' }}>
              <li>Entêtes en français</li>
              <li>Prédécesseurs multiples</li>
              <li>Libellés de session</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title" style={{color:'black'}}>Bonnes pratiques</div>
        <div style={{
          background: 'white',
          border: '2px solid #3b82f6',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,.04)'
        }}>
          <ul style={{ marginLeft: '20px', lineHeight: '1.8', fontSize: '14px', margin: 0, color: '#374151' }}>
            <li>Commencez par les tâches indépendantes (sans prédécesseur)</li>
            <li>Utilisez un nommage cohérent (A, B, C ou Tâche1, Tâche2)</li>
            <li>Vérifiez que les estimations de durée sont réalistes</li>
            <li>Concentrez vos efforts sur les tâches du chemin critique</li>
            <li>Enregistrez vos calculs dans l'historique</li>
            <li>Exportez les résultats pour sauvegarde</li>
          </ul>
        </div>
      </div>
    </div>
  )
}