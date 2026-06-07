import React from 'react'
import useMPMStore from './store/mpmStore'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import MPMCalculator from './pages/MPMCalculator'
import History from './pages/History'
import Help from './pages/Help'

export default function App() {
  const currentPage = useMPMStore((state) => state.currentPage)
  const setCurrentPage = useMPMStore((state) => state.setCurrentPage)

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />
      case 'MPM Calculator':
        return <MPMCalculator />
      case 'History':
        return <History />
      case 'Help':
        return <Help />
      default:
        return <Home />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flex: 1, overflowY: 'auto', minWidth: 0, width: '100%' }}>
        {renderPage()}
      </main>
    </div>
  )
}
