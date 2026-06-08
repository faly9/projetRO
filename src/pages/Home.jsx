import React from 'react'
import './Home.css'

export default function Home() {

  const cards = [
  { num: '01', icon: 'ti-list-details',  bg: '#E6F1FB', color: '#185FA5', title: 'Définir les tâches',    text: 'Créez vos tâches, durées et dépendances ou importez-les depuis Excel et CSV.' },
  { num: '02', icon: 'ti-calculator',    bg: '#E1F5EE', color: '#0F6E56', title: 'Calcul automatique',   text: 'Calcul instantané des dates au plus tôt, au plus tard et des marges.' },
  { num: '03', icon: 'ti-route',         bg: '#FCEBEB', color: '#A32D2D', title: 'Chemin critique',      text: 'Identification automatique des tâches critiques impactant le délai global.' },
  { num: '04', icon: 'ti-file-export',   bg: '#FAEEDA', color: '#854F0B', title: 'Exportation',          text: 'Exportez vos résultats en Excel, CSV, JSON ou image PNG.' },
]

  return (
    <div className="home-page">
      <div className="hero-section">

        <h1 className="hero-title">
          Planifiez vos projets avec
          <span> précision et efficacité</span>
        </h1>

        <p className="hero-description">
          Créez, analysez et optimisez vos graphes MPM grâce à une interface
          moderne permettant d'identifier les chemins critiques, les marges
          et les dépendances entre tâches.
        </p>
      </div>

<div className="feature-grid">
  {cards.map(c => (
    <div className="feature-card" key={c.num}>
      <div className='icone-grid'>
      <p className="feature-card-num">{c.num}</p>
      <div className="feature-icon" style={{ background: c.bg, color: c.color }}>
        <i className={`ti ${c.icon}`} aria-hidden="true" />
      </div>
      </div>
      <h3>{c.title}</h3>
      <p>{c.text}</p>
    </div>
  ))}
</div>
      <div className="content-grid">

        <section className="glass-card">
          <h2>
            <i className="ti ti-rocket"></i>
            Démarrage rapide
          </h2>

          <div className="steps">
            <div className="step">
              <span>1</span>
              <div>
                <strong>Accéder au calculateur</strong>
                <p>Sélectionnez "Calculateur MPM" dans la navigation.</p>
              </div>
            </div>

            <div className="step">
              <span>2</span>
              <div>
                <strong>Ajouter les tâches</strong>
                <p>Renseignez les durées et les dépendances.</p>
              </div>
            </div>

            <div className="step">
              <span>3</span>
              <div>
                <strong>Calculer</strong>
                <p>Lancez automatiquement l'analyse MPM.</p>
              </div>
            </div>

            <div className="step">
              <span>4</span>
              <div>
                <strong>Analyser</strong>
                <p>Consultez les chemins critiques et les statistiques.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card">
          <h2>
            <i className="ti ti-bulb"></i>
            Pourquoi utiliser MPM ?
          </h2>

          <div className="advantage-list">
            <div className="advantage success">
              <h4>Identifier les tâches critiques</h4>
              <p>
                Visualisez immédiatement les tâches qui influencent la durée
                totale du projet.
              </p>
            </div>

            <div className="advantage info">
              <h4>Optimiser les ressources</h4>
              <p>
                Utilisez les marges pour améliorer votre planification.
              </p>
            </div>

            <div className="advantage warning">
              <h4>Réduire les risques</h4>
              <p>
                Anticipez les retards grâce à une meilleure visibilité.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="help-card">
        <i className="ti ti-help-circle"></i>

        <div>
          <h3>Besoin d'aide ?</h3>
          <p>
            Consultez la documentation pour découvrir toutes les
            fonctionnalités du calculateur MPM.
          </p>
        </div>
      </div>
    </div>
  )
}