import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import nodeHtmlLabel from 'cytoscape-node-html-label'

cytoscape.use(dagre)
cytoscape.use(nodeHtmlLabel)

const COLORS = {
  node:      { background: '#dbeafe', border: '#1e40af', text: '#1e3a8a' },
  critical:  { background: '#fee2e2', border: '#dc2626' },
  highlight: { border: '#15803d', text: '#14532d', edge: '#16a34a' },
  edge:      { normal: '#6b7280', critical: '#dc2626', label: '#1f2937' },
  startEnd:  { background: '#e5e7eb', border: '#4b5563', text: '#374151' },
}

const SIZE = {
  nodeW:     300,
  nodeH:     300,
  startEndW: 200,
  startEndH: 200,
  edgeFont:  '22px',   // ← arc labels bigger
}

const BADGE_H  = 42
const BADGE_UP = 18

function buildNodeHtml(data) {
  if (data.id === 'DEB') {
    const w = SIZE.startEndW
    const h = SIZE.startEndH
    return `<div style="width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;gap:6px;">
      <div style="font-size:32px;font-weight:900;font-family:monospace;color:#374151;line-height:1;">DEB</div>
      <div style="font-size:20px;font-weight:700;font-family:monospace;color:#4b5563;">Jour 0</div>
    </div>`
  }

  if (data.id === 'FIN') {
    const w   = SIZE.startEndW
    const h   = SIZE.startEndH
    const day = data.lf ?? data.ef ?? ''
    return `<div style="width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;gap:6px;">
      <div style="font-size:32px;font-weight:900;font-family:monospace;color:#374151;line-height:1;">FIN</div>
      <div style="font-size:20px;font-weight:700;font-family:monospace;color:#4b5563;">Jour ${day}</div>
    </div>`
  }

  const isCritical = data.critical === 'true'
  const nameColor  = isCritical ? '#b91c1c' : '#1e3a8a'
  const dateColor  = isCritical ? '#dc2626' : '#1d4ed8'
  const badgeBg    = isCritical ? '#dc2626' : '#1e40af'
  const w = SIZE.nodeW
  const h = SIZE.nodeH

  return `<div style="width:${w}px;height:${h}px;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;gap:14px;">
    <div style="position:absolute;top:-${BADGE_UP + BADGE_H}px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;justify-content:center;background:${badgeBg};color:#fff;font-size:22px;font-weight:900;font-family:monospace;padding:4px 18px;height:${BADGE_H}px;border-radius:18px;white-space:nowrap;box-shadow:0 3px 8px rgba(0,0,0,0.22);letter-spacing:0.05em;">M:${data.tf}</div>
    <div style="font-size:62px;font-weight:900;color:${nameColor};font-family:monospace;line-height:1;letter-spacing:0.04em;text-align:center;">${data.label}</div>
    <div style="font-size:28px;font-weight:800;color:${dateColor};font-family:monospace;letter-spacing:0.04em;text-align:center;">Tôt:${data.es}|Tard:${data.ls}</div>
  </div>`
}

// ─── Pure canvas redraw for PNG export ───────────────────────────────────────
function drawGraphToCanvas(cy) {
  const PAD = 100
  const SC  = 2

  const nodes = cy.nodes()
  const edges = cy.edges()

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  nodes.forEach(n => {
    const p = n.position()
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y)
  })
  const maxR = SIZE.nodeW / 2
  minX -= maxR; minY -= maxR; maxX += maxR; maxY += maxR

  const graphW  = maxX - minX
  const graphH  = maxY - minY
  const canvasW = (graphW + PAD * 2) * SC
  const canvasH = (graphH + PAD * 2 + 80) * SC

  const canvas = document.createElement('canvas')
  canvas.width  = canvasW
  canvas.height = canvasH
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f9fafb'
  ctx.fillRect(0, 0, canvasW, canvasH)

  const gx = x => (x - minX + PAD) * SC
  const gy = y => (y - minY + PAD + 60) * SC

  // ── Edges ──
  edges.forEach(edge => {
    const src  = edge.source().position()
    const tgt  = edge.target().position()
    const d    = edge.data()
    const isCrit = d.critical === 'true'

    const srcId = edge.source().data().id
    const tgtId = edge.target().data().id
    const r1 = ((srcId === 'DEB' || srcId === 'FIN') ? SIZE.startEndW : SIZE.nodeW) / 2 * SC
    const r2 = ((tgtId === 'DEB' || tgtId === 'FIN') ? SIZE.startEndW : SIZE.nodeW) / 2 * SC

    const x1 = gx(src.x), y1 = gy(src.y)
    const x2 = gx(tgt.x), y2 = gy(tgt.y)
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const sx = x1 + Math.cos(angle) * r1
    const sy = y1 + Math.sin(angle) * r1
    const ex = x2 - Math.cos(angle) * r2
    const ey = y2 - Math.sin(angle) * r2

    ctx.strokeStyle = isCrit ? COLORS.edge.critical : COLORS.edge.normal
    ctx.lineWidth   = isCrit ? 6 : 3
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.stroke()

    // Arrowhead
    const arrowLen = 18
    const arrowAng = 0.42
    ctx.fillStyle = isCrit ? COLORS.edge.critical : COLORS.edge.normal
    ctx.beginPath()
    ctx.moveTo(ex, ey)
    ctx.lineTo(ex - arrowLen * Math.cos(angle - arrowAng), ey - arrowLen * Math.sin(angle - arrowAng))
    ctx.lineTo(ex - arrowLen * Math.cos(angle + arrowAng), ey - arrowLen * Math.sin(angle + arrowAng))
    ctx.closePath()
    ctx.fill()

    // Edge label
    if (d.label) {
      const mx = (sx + ex) / 2
      const my = (sy + ey) / 2
      const fs = 30   // ← bigger arc label in PNG
      ctx.font = `900 ${fs}px monospace`
      const tw   = ctx.measureText(d.label).width
      const bpad = 8
      ctx.fillStyle = '#ffffff'
      roundRectCtx(ctx, mx - tw/2 - bpad, my - fs/2 - bpad, tw + bpad*2, fs + bpad*2, 6)
      ctx.fill()
      ctx.strokeStyle = '#9ca3af'
      ctx.lineWidth   = 2
      ctx.stroke()
      ctx.fillStyle    = isCrit ? '#b91c1c' : COLORS.edge.label
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(d.label, mx, my)
    }
  })

  // ── Nodes ──
  nodes.forEach(node => {
    const d   = node.data()
    const pos = node.position()
    const cx  = gx(pos.x)
    const cy2 = gy(pos.y)

    const isSpecial  = d.id === 'DEB' || d.id === 'FIN'
    const isCritical = d.critical === 'true'
    const rW = (isSpecial ? SIZE.startEndW : SIZE.nodeW) / 2 * SC
    const rH = (isSpecial ? SIZE.startEndH : SIZE.nodeH) / 2 * SC

    ctx.fillStyle   = isSpecial ? COLORS.startEnd.background : (isCritical ? COLORS.critical.background : COLORS.node.background)
    ctx.strokeStyle = isSpecial ? COLORS.startEnd.border     : (isCritical ? COLORS.critical.border     : COLORS.node.border)
    ctx.lineWidth   = isCritical ? 7 : 5
    ctx.beginPath()
    ctx.ellipse(cx, cy2, rW, rH, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    if (isSpecial) {
      const label   = d.id === 'DEB' ? 'DEB' : 'FIN'
      const dayText = d.id === 'DEB' ? 'Jour 0' : `Jour ${d.lf ?? d.ef ?? ''}`
      ctx.fillStyle    = '#374151'
      ctx.font         = `900 ${32 * SC / 2}px monospace`
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, cx, cy2 - 14 * SC / 2)
      ctx.font         = `700 ${20 * SC / 2}px monospace`
      ctx.fillStyle    = '#4b5563'
      ctx.fillText(dayText, cx, cy2 + 16 * SC / 2)
      return
    }

    const badgeBg   = isCritical ? '#dc2626' : '#1e40af'
    const nameColor = isCritical ? '#b91c1c' : '#1e3a8a'
    const dateColor = isCritical ? '#dc2626' : '#1d4ed8'

    // Badge M:
    const badgeW  = 110 * SC / 2
    const badgeH2 = BADGE_H * SC / 2
    const badgeY  = cy2 - rH - BADGE_UP * SC / 2 - badgeH2
    const badgeX  = cx - badgeW / 2
    ctx.fillStyle = badgeBg
    roundRectCtx(ctx, badgeX, badgeY, badgeW, badgeH2, 14 * SC / 2)
    ctx.fill()
    ctx.fillStyle    = '#ffffff'
    ctx.font         = `900 ${22 * SC / 2}px monospace`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`M:${d.tf}`, cx, badgeY + badgeH2 / 2)

    // Task name
    ctx.fillStyle    = nameColor
    ctx.font         = `900 ${62 * SC / 2}px monospace`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(d.label ?? d.id, cx, cy2 - 20 * SC / 2)

    // Tôt | Tard
    ctx.fillStyle    = dateColor
    ctx.font         = `800 ${28 * SC / 2}px monospace`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Tôt:${d.es}|Tard:${d.ls}`, cx, cy2 + 28 * SC / 2)
  })

  return canvas
}

function roundRectCtx(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export default function Graph({ elements }) {
  const containerRef  = useRef(null)
  const fullscreenRef = useRef(null)
  const cyRef         = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const initLabels = (cy) => {
    cy.nodeHtmlLabel([{
      query:     'node',
      halign:    'center',
      valign:    'center',
      halignBox: 'center',
      valignBox: 'center',
      tpl: (data) => buildNodeHtml(data),
    }])
  }

  useEffect(() => {
    const container = isFullscreen ? fullscreenRef.current : containerRef.current
    if (!container || !elements || elements.length === 0) return

    if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null }

    const cy = cytoscape({
      container,
      elements,
      layout: {
        name:    'dagre',
        rankDir: 'LR',
        nodeSep: 100,
        rankSep: 180,
        padding: 120,
        animate: false,
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': COLORS.node.background,
            'border-color':     COLORS.node.border,
            'border-width':     3,
            'shape':            'ellipse',
            'width':            SIZE.nodeW,
            'height':           SIZE.nodeH,
            'label':            '',
          },
        },
        {
          selector: 'node[critical="true"]',
          style: {
            'background-color': COLORS.critical.background,
            'border-color':     COLORS.critical.border,
            'border-width':     4,
          },
        },
        {
          selector: 'node[id="DEB"], node[id="FIN"]',
          style: {
            'background-color': COLORS.startEnd.background,
            'border-color':     COLORS.startEnd.border,
            'border-width':     3,
            'shape':            'ellipse',
            'width':            SIZE.startEndW,
            'height':           SIZE.startEndH,
            'label':            '',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color':                   COLORS.edge.normal,
            'target-arrow-color':           COLORS.edge.normal,
            'target-arrow-shape':           'triangle-backcurve',
            'width':                        2.5,
            'curve-style':                  'bezier',
            'label':                        'data(label)',
            'font-size':                    SIZE.edgeFont,   // ← 22px
            'color':                        COLORS.edge.label,
            'font-weight':                  '900',
            'font-family':                  'monospace',
            'text-background-color':        '#ffffff',
            'text-background-opacity':      1,
            'text-background-padding':      '6px',
            'text-background-border-color': '#9ca3af',
            'text-background-border-width': 1.5,
          },
        },
        {
          selector: 'edge[critical="true"]',
          style: {
            'line-color':         COLORS.edge.critical,
            'target-arrow-color': COLORS.edge.critical,
            'width':              5,
            'color':              '#b91c1c',
            'z-index':            20,
          },
        },
        {
          selector: 'node.highlighted',
          style: { 'border-color': COLORS.highlight.border, 'border-width': 5, 'z-index': 100 },
        },
        {
          selector: 'edge.highlighted',
          style: {
            'line-color':         COLORS.highlight.edge,
            'target-arrow-color': COLORS.highlight.edge,
            'width':              5,
            'color':              COLORS.highlight.text,
            'z-index':            100,
          },
        },
        { selector: '.dimmed', style: { 'opacity': 0.1, 'z-index': 1 } },
      ],
      wheelSensitivity: 0.1,
      minZoom: 0.03,
      maxZoom: 4,
      autolock: false,
      boxSelectionEnabled: false,
    })

    initLabels(cy)
    cyRef.current = cy

    cy.on('tap', 'node', (event) => {
      event.originalEvent.stopPropagation()
      const node = event.target
      cy.elements().removeClass('highlighted dimmed')
      const connected = node.union(node.predecessors()).union(node.successors())
      cy.elements().not(connected).addClass('dimmed')
      connected.addClass('highlighted')
    })
    cy.on('tap', (event) => {
      if (event.target === cy) cy.elements().removeClass('highlighted dimmed')
    })
    cy.on('mouseover', 'node', (event) => {
      const d = event.target.data()
      if (d.id === 'DEB') {
        showTooltip(event.originalEvent, [
          { label: 'Nœud',  value: 'DÉBUT' },
          { label: 'Début', value: 'Jour 0' },
        ])
      } else if (d.id === 'FIN') {
        const day = d.lf ?? d.ef ?? ''
        showTooltip(event.originalEvent, [
          { label: 'Nœud', value: 'FIN' },
          { label: 'Fin',  value: `Jour ${day}` },
        ])
      } else {
        showTooltip(event.originalEvent, [
          { label: 'Tâche',         value: d.id + (d.critical === 'true' ? '  -  CRITIQUE' : '') },
          { label: 'Durée',         value: d.dur },
          { label: 'Date au plus tôt',  value: d.es },
          { label: 'Fin au plus tôt',   value: d.ef },
          { label: 'Date au plus tard', value: d.ls },
          { label: 'Fin au plus tard',  value: d.lf },
          { label: 'Marge totale',      value: d.tf },
        ], d.critical === 'true')
      }
    })
    cy.on('mouseout', 'node', hideTooltip)

    setTimeout(() => { if (cyRef.current) cyRef.current.fit(50) }, 150)
    return () => { if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null } }
  }, [elements, isFullscreen])

  const handleFit        = () => cyRef.current?.fit(50)
  const handleZoomIn     = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.2)
  const handleZoomOut    = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.83)
  const handleReset      = () => cyRef.current?.elements().removeClass('highlighted dimmed')
  const handleFullscreen = () => setIsFullscreen(f => !f)

  const handleDownloadPNG = () => {
    const cy = cyRef.current
    if (!cy) return
    const canvas = drawGraphToCanvas(cy)
    const a = document.createElement('a')
    a.href     = canvas.toDataURL('image/png')
    a.download = 'mpm_graph.png'
    a.click()
  }

  const ToolbarButtons = () => (
    <>
      <button style={btnStyle} onClick={handleFit}>Ajuster</button>
      <button style={btnStyle} onClick={handleZoomIn}>+</button>
      <button style={btnStyle} onClick={handleZoomOut}>−</button>
      <div style={{ width:'1px', height:'16px', background:'rgba(255,255,255,0.3)', margin:'0 4px' }} />
      <button style={btnStyle} onClick={handleReset}>Réinitialiser</button>
      <button style={btnStyle} onClick={handleDownloadPNG}>PNG</button>
      <button style={btnStyle} onClick={handleFullscreen}>
        {isFullscreen ? 'Quitter plein écran' : 'Plein écran'}
      </button>
      <div style={{ marginLeft:'auto', fontSize:'12px', fontWeight:'600', opacity:0.9, whiteSpace:'nowrap' }}>
        Rouge = Chemin critique &nbsp;|&nbsp; Vert = Chemin surligné
      </div>
    </>
  )

  const graphDiv = (ref, extra = {}) => (
    <div ref={ref} style={{
      flex: 1, width: '100%', background: '#f9fafb',
      position: 'relative', minHeight: 0, ...extra,
    }} />
  )

  if (isFullscreen) {
    return (
      <div style={{ position:'fixed', inset:0, zIndex:10000, background:'#f9fafb', display:'flex', flexDirection:'column' }}>
        <div style={toolbarStyle}><ToolbarButtons /></div>
        {graphDiv(fullscreenRef, { height:'calc(100vh - 56px)' })}
      </div>
    )
  }

  return (
    <div style={{
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)', display: 'flex',
      flexDirection: 'column', height: '520px', width: '100%',
    }}>
      <div style={toolbarStyle}><ToolbarButtons /></div>
      {graphDiv(containerRef)}
    </div>
  )
}

const btnStyle = {
  background: 'rgba(255,255,255,0.22)', color: 'white',
  border: 'none', fontWeight: '600', fontSize: '12px',
  padding: '6px 10px', cursor: 'pointer', borderRadius: '4px',
}

const toolbarStyle = {
  display: 'flex', gap: '6px', alignItems: 'center',
  padding: '10px 14px',
  background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
  color: 'white', flexWrap: 'wrap',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}

function showTooltip(event, rows, isCritical = false) {
  let tt = document.getElementById('cy-tooltip')
  if (!tt) {
    tt = document.createElement('div')
    tt.id = 'cy-tooltip'
    document.body.appendChild(tt)
  }

  const accentColor = isCritical ? '#dc2626' : '#2563eb'
  const accentLight = isCritical ? '#fee2e2' : '#eff6ff'

  tt.style.cssText = `
    position:fixed;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:12px;
    padding:0;
    font-family:'Inter','Segoe UI',system-ui,sans-serif;
    z-index:10005;
    box-shadow:0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
    pointer-events:none;
    min-width:100px;
    overflow:hidden;
    border-top:3px solid ${accentColor};
  `

  const header = rows[0]
  const rest   = rows.slice(1)

  const headerHtml = `
    <div style="background:${accentLight};padding:10px 16px 9px;border-bottom:1px solid #e2e8f0;">
      <span style="font-size:12px;font-weight:700;color:${accentColor};letter-spacing:0.04em;">${header.value}</span>
    </div>
  `

  const rowsHtml = rest.map(({ label, value }) => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 16px;gap:18px;">
      <span style="font-size:9px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;">${label}</span>
      <span style="font-size:10px;font-weight:700;color:#1e293b;white-space:nowrap;">${value}</span>
    </div>
  `).join('')

  tt.innerHTML = headerHtml + `<div style="padding:4px 0;">${rowsHtml}</div>`

  tt.style.left    = Math.min(event.clientX + 14, window.innerWidth  - 260) + 'px'
  tt.style.top     = Math.min(event.clientY + 14, window.innerHeight - 260) + 'px'
  tt.style.display = 'block'
}

function hideTooltip() {
  const tt = document.getElementById('cy-tooltip')
  if (tt) tt.style.display = 'none'
}