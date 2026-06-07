import { useCallback } from 'react'
import MPMEngine from '../services/mpmEngine'
import storageService from '../services/storageService'
import useMPMStore from '../store/mpmStore'

export const useMPM = () => {
  const setMPMResults = useMPMStore((state) => state.setMPMResults)
  const setErrors = useMPMStore((state) => state.setErrors)
  const setLoading = useMPMStore((state) => state.setLoading)
  const setSessionId = useMPMStore((state) => state.setSessionId)
  const addToHistory = useMPMStore((state) => state.addToHistory)

  const compute = useCallback(
    (tasks, label = '') => {
      setLoading(true)
      setErrors([])

      try {
        const engine = new MPMEngine()

        const validationErrors = engine.validate(tasks)
        if (validationErrors.length > 0) {
          setErrors(validationErrors)
          setLoading(false)
          return null
        }

        engine.load(tasks)

        if (engine.hasCycles()) {
          setErrors(['Cycle detected! Remove circular dependencies.'])
          setLoading(false)
          return null
        }

        engine.computeTimes()

        const results    = engine.getResults()
        const predSucc   = engine.getPredSuccTable()
        const paths      = engine.getCriticalPaths()
        const elements   = engine.getCytoscapeElements(paths)

        // FIX 1: use Math.max over all Early_Finish values — same logic as ResultsKPI
        const duration   = results.length > 0
          ? Math.max(...results.map(r => r.Early_Finish || r.EF || 0))
          : 0
        const n_tasks    = results.length
        const n_critical = results.filter((r) => r.Total_Float === 0).length

        const mpmResults = {
          results,
          predSucc,
          paths,
          elements,
          duration,
          n_tasks,
          n_critical,
        }

        // FIX 2: save session once here, then pass sid + tasks to addToHistory
        const sid = storageService.saveSession({
          results,
          predSucc,
          paths,
          elements,
          duration,
          tasks,
        })

        // FIX 3: pass tasks so addToHistory doesn't overwrite the session with tasks: undefined
        addToHistory(sid, label, duration, n_tasks, paths.length, tasks)

        setMPMResults(mpmResults)
        setSessionId(sid)
        setLoading(false)

        return mpmResults
      } catch (error) {
        setErrors([error.message])
        setLoading(false)
        return null
      }
    },
    [setMPMResults, setErrors, setLoading, setSessionId, addToHistory]
  )

  return { compute }
}

export default useMPM