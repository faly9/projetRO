import React, { useState, useEffect } from 'react'

const pages = ['Home', 'MPM Calculator', 'History', 'Help']

const pageLabels = {
  Home: 'Accueil',
  'MPM Calculator': 'Calculateur MPM',
  History: 'Historique',
  Help: 'Aide',
}

const pageIcons = {
  Home: 'ti-home',
  'MPM Calculator': 'ti-chart-dots',
  History: 'ti-history',
  Help: 'ti-help-circle',
}
const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

:root{
  --sidebar-width:260px;

  --bg:#f5f7fb;
  --surface:rgba(255,255,255,.95);
  --text:#111827;
  --muted:#6b7280;

  --primary:#3b82f6;
  --primary-dark:#4f46e5;
}

*{
  box-sizing:border-box;
}

body{
  margin:0;
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--text);
}

/* SIDEBAR */
.nav-sidebar{
  position:fixed;
  top:12px;
  left:12px;
  width:var(--sidebar-width);
  height:calc(100vh - 24px);

  display:flex;
  flex-direction:column;

  border-radius:24px;
  backdrop-filter:blur(18px);
  background:var(--surface);
  border:1px solid rgba(0,0,0,.06);
  box-shadow:0 10px 35px rgba(0,0,0,.08);

  z-index:1000;
  transition:.3s;
}

/* MOBILE */
.nav-sidebar.mobile-closed{
  transform:translateX(-120%);
}

.nav-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.35);
  z-index:999;
}

/* TOGGLE */
.nav-toggle{
  display:none;
  position:fixed;
  top:15px;
  left:15px;

  width:45px;
  height:45px;

  border:none;
  border-radius:12px;
  cursor:pointer;
  z-index:1001;

  background:white;
  box-shadow:0 8px 20px rgba(0,0,0,.1);
}

/* HEADER */
.nav-header{
  text-align:center;
  padding: 0.5rem;
}

.nav-brand{
  margin:0;
  font-family:'DM Serif Display',serif;
  font-size:28px;
  color:var(--color-primary-hover);
}

.nav-brand em{
  color:var(--color-primary-hover);
}

.nav-subtitle{
  margin-top:10px;
  font-size:12px;
  color:var(--muted);
}

/* MENU */
.nav-menu{
  flex:1;
  padding:1rem;
  flex-direction:column;
  gap:8px;
}

.nav-item{
  border:none;
  background:transparent;

  gap:12px;

  padding:14px 16px;
  border-radius:14px;
  width: 100%;
  display:flex;
  align-items:start;
  justify-content: start;

  cursor:pointer;
  transition:.25s;

  color:var(--text);
  font-weight:500;
}

.nav-item:hover{
  background:rgba(59,130,246,.08);
  transform:translateX(4px);
}

.nav-item.active{
  background:linear-gradient(135deg,var(--primary),var(--primary-dark));
  color:white;
  font-weight:600;

  transform:translateX(6px);
  box-shadow:0 8px 20px rgba(59,130,246,.25);
}

/* ICON */
.nav-item i{
  font-size:20px;
}

/* FOOTER */
.nav-footer{
  padding:1rem;
  text-align:center;
  border-top:1px solid rgba(0,0,0,.06);
}

.nav-version{
  margin:0;
  font-size:12px;
  color:var(--muted);
}

/* MOBILE */
@media(max-width:768px){

  .nav-toggle{
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .nav-sidebar{
    top:0;
    left:0;
    height:100vh;
    border-radius:0 24px 24px 0;
  }
}
`;

export default function Navigation({
  currentPage,
  setCurrentPage,
}) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)



  useEffect(() => {
    const mq = window.matchMedia('(max-width:768px)')

    const update = (e) => {
      setIsMobile(e.matches)
    }

    update(mq)

    mq.addEventListener('change', update)

    return () =>
      mq.removeEventListener('change', update)
  }, [])

  const navigate = (page) => {
    setCurrentPage(page)

    if (isMobile) {
      setOpen(false)
    }
  }

  return (
    <>
      <style>{styles}</style>

      {isMobile && open && (
        <div
          className="nav-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {isMobile && (
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
        >
          <i
            className={`ti ${
              open ? 'ti-x' : 'ti-menu-2'
            }`}
          />
        </button>
      )}

      <nav
        className={`nav-sidebar ${
          isMobile && !open
            ? 'mobile-closed'
            : ''
        }`}
      >
        <div className="nav-menu">
          {pages.map((page) => (
            <button
              key={page}
              className={`nav-item ${
                currentPage === page
                  ? 'active'
                  : ''
              }`}
              onClick={() => navigate(page)}
            >
              <i
                className={`ti ${pageIcons[page]}`}
              />
              {pageLabels[page]}
            </button>
          ))}
        </div>

<div className="nav-header">
  <div className="logo-wrap">
    <svg className="logo-svg" viewBox="0 0 220 60">
      
      {/* background shape */}
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#4f46e5"/>
        </linearGradient>

        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9"/>
          <stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
      </defs>

      {/* icon node network */}
      <circle cx="18" cy="30" r="5" fill="url(#g1)" />
      <circle cx="38" cy="15" r="4" fill="url(#g2)" />
      <circle cx="38" cy="45" r="4" fill="url(#g1)" />

      <line x1="18" y1="30" x2="38" y2="15" stroke="#94a3b8" strokeWidth="1.5"/>
      <line x1="18" y1="30" x2="38" y2="45" stroke="#94a3b8" strokeWidth="1.5"/>

      {/* text MPM */}
      <text x="60" y="36" fontSize="22" fontFamily="DM Serif Display" fill="url(#g1)">
        MPM
      </text>

      {/* RO badge */}
      <rect x="130" y="18" rx="10" ry="10" width="40" height="24" fill="url(#g2)"/>
      <text x="140" y="35" fontSize="12" fontWeight="700" fill="#fff">
        RO
      </text>

    </svg>
  </div>

</div>

      </nav>
    </>
  )
}