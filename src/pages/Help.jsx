import React from 'react'

export default function Help() {
  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1>Aide & Documentation</h1>
          <p style={{ maxWidth: '700px', color: 'var(--color-text-secondary)' }}>
            Guide complet d'utilisation du calculateur MPM. Suivez les instructions ci-dessous 
            pour exploiter pleinement le potentiel de l'outil pour la planification de votre projet.
          </p>
        </div>

        <div className="section">
          <div className="section-title">Méthodes de saisie</div>
          
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '12px', marginTop: 0 }}>Saisie manuelle</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
                Cliquez sur le bouton "Saisie manuelle" et modifiez directement le tableau des tâches. Chaque ligne requiert :
              </p>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
                <li><strong>Tâche :</strong> Identifiant unique (A, B, Tâche1)</li>
                <li><strong>Durée :</strong> Nombre positif (jours/heures)</li>
                <li><strong>Prédécesseurs :</strong> Séparés par des virgules (A,B,C)</li>
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-success)' }}>
              <h3 style={{ color: 'var(--color-success)', marginBottom: '12px', marginTop: 0 }}>Importer un fichier</h3>
              <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '12px' }}>
                Téléversez des fichiers CSV ou Excel contenant les colonnes : Tâche, Durée, Prédécesseurs.
              </p>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8' }}>
                <li>Fichiers .csv (séparés par des virgules)</li>
                <li>Fichiers .xlsx (Excel 2007+)</li>
                <li>Fichiers .xls (Excel 97-2003)</li>
              </ul>
              <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginBottom: 0, marginTop: '12px' }}>
                Prend en charge les entêtes en français : Tâche, Durée, Prédécesseurs
              </p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Contrôles du graphique</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <div className="card" style={{ borderTop: '4px solid var(--color-info)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-info)', marginBottom: '12px', marginTop: 0 }}>Navigation</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li><strong>Déplacer :</strong> Cliquez et glissez sur le fond</li>
                <li><strong>Zoom avant :</strong> Appuyez sur + ou faites défiler vers le haut</li>
                <li><strong>Zoom arrière :</strong> Appuyez sur - ou faites défiler vers le bas</li>
                <li><strong>Ajuster la vue :</strong> Cliquez sur le bouton "Ajuster"</li>
              </ul>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--color-warning)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-warning)', marginBottom: '12px', marginTop: 0 }}>Interaction</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li><strong>Infos du nœud :</strong> Survolez pour afficher l'infobulle</li>
                <li><strong>Surligner :</strong> Cliquez sur un nœud</li>
                <li><strong>Réinitialiser :</strong> Cliquez sur "Réinitialiser le surlignage"</li>
                <li><strong>Plein écran :</strong> Cliquez sur "Plein écran"</li>
              </ul>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-primary)', marginBottom: '12px', marginTop: 0 }}>Barre d'outils</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li><strong>Ajuster :</strong> Afficher l'intégralité du graphique</li>
                <li><strong>+/- :</strong> Zoom avant / arrière</li>
                <li><strong>Réinitialiser :</strong> Effacer le surlignage</li>
                <li><strong>Télécharger :</strong> Enregistrer au format PNG</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Comprendre les résultats</div>
          
          <div style={{ marginTop: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Indicateurs clés</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'linear-gradient(135deg, var(--color-success-light), #e0f2fe)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-success)' }}>
                <strong style={{ color: 'var(--color-success)', display: 'block', marginBottom: '4px' }}>Durée du projet</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Temps total de bout en bout</p>
              </div>
              <div style={{ padding: '14px', background: 'linear-gradient(135deg, var(--color-primary-light), #fce7f3)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)' }}>
                <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Total des tâches</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Nombre d'éléments de travail</p>
              </div>
              <div style={{ padding: '14px', background: 'linear-gradient(135deg, var(--color-danger-light), #fed7aa)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-danger)' }}>
                <strong style={{ color: 'var(--color-danger)', display: 'block', marginBottom: '4px' }}>Tâches critiques</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Tâches qui ne peuvent être retardées</p>
              </div>
              <div style={{ padding: '14px', background: 'linear-gradient(135deg, var(--color-warning-light), #fcd34d)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-warning)' }}>
                <strong style={{ color: 'var(--color-warning)', display: 'block', marginBottom: '4px' }}>Chemins critiques</strong>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Succession de tâches critiques</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Colonnes du tableau</h3>
            <div style={{ overflowX: 'auto', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '150px' }}>Colonne</th>
                    <th>Définition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Durée</strong></td>
                    <td>Temps requis pour accomplir la tâche</td>
                  </tr>
                  <tr>
                    <td><strong>Début au plus tôt (DTO)</strong></td>
                    <td>Le moment le plus tôt où la tâche peut commencer</td>
                  </tr>
                  <tr>
                    <td><strong>Fin au plus tôt (FTO)</strong></td>
                    <td>Le moment le plus tôt où la tâche peut se terminer</td>
                  </tr>
                  <tr>
                    <td><strong>Début au plus tard (DTA)</strong></td>
                    <td>Le moment le plus tard où la tâche peut commencer sans retarder le projet</td>
                  </tr>
                  <tr>
                    <td><strong>Fin au plus tard (FTA)</strong></td>
                    <td>Le moment le plus tard où la tâche peut se terminer sans retarder le projet</td>
                  </tr>
                  <tr>
                    <td><strong>Marge totale</strong></td>
                    <td>Temps de flexibilité disponible (0 = tâche critique)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Règles de validation</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-danger)', marginBottom: '12px', marginTop: 0 }}>Obligatoire</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li>Noms de tâches uniques</li>
                <li>Durées positives</li>
                <li>Aucune tâche vide</li>
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-danger)', marginBottom: '12px', marginTop: 0 }}>Interdit</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li>Dépendances circulaires (boucles)</li>
                <li>Prédécesseurs non définis</li>
                <li>Durées négatives</li>
              </ul>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-success)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-success)', marginBottom: '12px', marginTop: 0 }}>Optionnel</h3>
              <ul style={{ marginLeft: '20px', fontSize: '13px', lineHeight: '1.8', margin: 0 }}>
                <li>Entêtes en français</li>
                <li>Prédécesseurs multiples</li>
                <li>Libellés de session</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Bonnes pratiques</div>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--color-info-light), var(--color-primary-light))',
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginTop: '20px'
          }}>
            <ul style={{ marginLeft: '20px', lineHeight: '1.8', fontSize: '14px', margin: 0 }}>
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
    </div>
  )
}