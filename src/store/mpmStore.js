import { create } from 'zustand'
import storageService from '../services/storageService'

export const useMPMStore = create((set, get) => ({
  currentPage: 'Home',
  inputMode: 'Manual input',
  tasks: [],
  mpmResults: null,
  history: storageService.loadHistory(),
  errors: [],
  loading: false,
  sessionId: null,
  sessionLabel: '',
  lastComputed: null,
  fromHistory: false,
  showHighlight: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setInputMode: (mode) => set({ inputMode: mode }),
  setTasks: (tasks) => set({ tasks }),
  setMPMResults: (results) => set({ mpmResults: results }),
  setErrors: (errors) => set({ errors }),
  setLoading: (loading) => set({ loading }),
  setSessionId: (sid) => set({ sessionId: sid }),
  setSessionLabel: (label) => set({ sessionLabel: label }),
  setLastComputed: (data) => set({ lastComputed: data }),
  setFromHistory: (from) => set({ fromHistory: from }),
  setShowHighlight: (show) => set({ showHighlight: show }),

  // FIX: session already saved in useMPM — just update history list, no second saveSession
  addToHistory: (sid, label, duration, n_tasks, n_paths, tasks) => {
    const history = storageService.addToHistory(sid, label, duration, n_tasks, n_paths)
    set({ history })
  },

  loadFromHistory: (sid) => {
    const session = storageService.loadSession(sid)
    if (session) {
      set({
        mpmResults: {
          results:    session.results,
          predSucc:   session.predSucc,
          paths:      session.paths,
          elements:   session.elements,
          duration:   session.duration,
          n_tasks:    session.results?.length || 0,
          n_critical: session.results?.filter(r => r.Total_Float === 0)?.length || 0,
        },
        tasks:      session.tasks || [],
        sessionId:  sid,
        fromHistory: true,
      })
      return true
    }
    return false
  },

  clearResults: () => {
    set({
      mpmResults:   null,
      errors:       [],
      sessionId:    null,
      sessionLabel: '',
      fromHistory:  false,
      showHighlight: false,
    })
  },

  clearAll: () => {
    set({
      tasks:        [],
      mpmResults:   null,
      errors:       [],
      sessionId:    null,
      sessionLabel: '',
      lastComputed: null,
      fromHistory:  false,
      showHighlight: false,
    })
  },

  deleteFromHistory: (sid) => {
    storageService.deleteSession(sid)
    const history = get().history.filter((h) => h.sid !== sid)
    set({ history })
  },

  clearHistory: () => {
    storageService.clearHistory()
    set({
      history:    [],
      mpmResults: null,
      tasks:      [],
      sessionId:  null,
    })
  },
}))

export default useMPMStore