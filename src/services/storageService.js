const SAVE_DIR = 'mpm_sessions'
const HISTORY_FILE = 'mpm_history'

export const storageService = {
  saveSession: (data) => {
    const sid = data.sid || String(Math.random()).substring(2, 10)
    const sessionKey = `${SAVE_DIR}_${sid}`

    const sessionData = {
      sid,
      timestamp: new Date().toISOString(),
      ...data,
    }

    localStorage.setItem(sessionKey, JSON.stringify(sessionData))
    return sid
  },

  loadSession: (sid) => {
    const sessionKey = `${SAVE_DIR}_${sid}`
    const data = localStorage.getItem(sessionKey)
    return data ? JSON.parse(data) : null
  },

  addToHistory: (sid, label, duration, n_tasks, n_paths) => {
    const history = storageService.loadHistory()

    const filtered = history.filter((h) => h.sid !== sid)

    const entry = {
      sid,
      label: label || `Computation ${new Date().toLocaleTimeString()}`,
      duration,
      n_tasks,
      n_paths,
      ts: new Date().toLocaleString(),
    }

    filtered.unshift(entry)
    const limited = filtered.slice(0, 20)

    localStorage.setItem(HISTORY_FILE, JSON.stringify(limited))
    return limited
  },

  loadHistory: () => {
    const data = localStorage.getItem(HISTORY_FILE)
    return data ? JSON.parse(data) : []
  },

  clearHistory: () => {
    localStorage.removeItem(HISTORY_FILE)
  },

  deleteSession: (sid) => {
    const sessionKey = `${SAVE_DIR}_${sid}`
    localStorage.removeItem(sessionKey)
  },

  exportCSV: (data, filename = 'mpm_results.csv') => {
    if (!data || data.length === 0) return

    const headers = Object.keys(data[0])
    const rows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = row[h]
            return typeof val === 'string' && val.includes(',')
              ? `"${val}"`
              : val
          })
          .join(',')
      ),
    ]

    const csv = rows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },

  exportJSON: (data, filename = 'mpm_results.json') => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },
}

export default storageService
