import React from 'react'

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        <h1>Calculateur de Graphe MPM</h1>
        <p style={{ fontSize: '16px', marginBottom: '32px', maxWidth: '600px' }}>
          Bienvenue sur le calculateur professionnel de graphe MPM (Méthode des Potentiels Metra). 
          Un outil puissant pour la planification de projet, l'analyse du chemin critique et la gestion des ressources.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Définir les tâches</h3>
            <p>
              Saisissez les tâches de votre projet avec leurs durées et interdépendances. 
              Utilisez la saisie manuelle ou importez-les directement depuis des fichiers CSV/Excel en un clic.
            </p>
          </div>

          <div className="feature-card">
            <h3>Calculer le calendrier</h3>
            <p>
              Le moteur calcule automatiquement les dates au plus tôt et au plus tard, les marges totales 
              et identifie instantanément tous les chemins critiques.
            </p>
          </div>

          <div className="feature-card">
            <h3>Visualiser les résultats</h3>
            <p>
              Analysez les résultats détaillés à l'aide de tableaux interactifs, de statistiques et 
              d'une visualisation graphique du réseau avec surlignage en temps réel.
            </p>
          </div>

          <div className="feature-card">
            <h3>Exporter & Partager</h3>
            <p>
              Exportez vos résultats aux formats Json, CSV, Excel ou PNG. Enregistrez vos calculs 
              localement pour y accéder à tout moment depuis l'historique.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">Guide de démarrage rapide</div>
          <ol className="step-list">
            <li>
              <span>
                <strong>Accéder au calculateur MPM</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
                  Cliquez sur le bouton "Calculateur MPM" dans la barre latérale
                </p>
              </span>
            </li>
            <li>
              <span>
                <strong>Saisir vos tâches</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
                  Ajoutez vos tâches avec leur durée et leurs liens de précédence
                </p>
              </span>
            </li>
            <li>
              <span>
                <strong>Calculer le MPM</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
                  Cliquez sur "Calculer le MPM" pour lancer l'algorithme de calcul
                </p>
              </span>
            </li>
            <li>
              <span>
                <strong>Analyser les résultats</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
                  Consultez les statistiques, les tableaux, les graphiques et les chemins critiques
                </p>
              </span>
            </li>
            <li>
              <span>
                <strong>Exporter ou Enregistrer</strong>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0' }}>
                  Téléchargez les résultats ou retrouvez-les dans l'historique à tout moment
                </p>
              </span>
            </li>
          </ol>
        </div>

        <div className="section">
          <div className="section-title">Pourquoi utiliser la méthode MPM ?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--color-success-light)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-success)' }}>
              <strong style={{ color: 'var(--color-success)' }}>Identifier les tâches critiques</strong>
              <p style={{ fontSize: '13px', marginTop: '8px', margin: '0' }}>
                Découvrez quelles tâches impactent directement les délais de votre projet
              </p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-info-light)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-info)' }}>
              <strong style={{ color: 'var(--color-info)' }}>Optimiser la planification</strong>
              <p style={{ fontSize: '13px', marginTop: '8px', margin: '0' }}>
                Calculez les temps de marge pour planifier vos ressources plus efficacement
              </p>
            </div>
            <div style={{ padding: '16px', background: 'var(--color-warning-light)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-warning)' }}>
              <strong style={{ color: 'var(--color-warning-dark)' }}>Gérer les risques</strong>
              <p style={{ fontSize: '13px', marginTop: '8px', margin: '0' }}>
                Anticipez les risques du projet et gérez les marges de sécurité efficacement
              </p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <strong>Besoin d'aide ?</strong>
          <p style={{ fontSize: '14px', margin: '8px 0 0 0' }}>
            Consultez la page d'Aide pour obtenir une documentation détaillée sur les formats de saisie, 
            les contrôles du graphique et les règles de validation.
          </p>
        </div>
      </div>
    </div>
  )
}