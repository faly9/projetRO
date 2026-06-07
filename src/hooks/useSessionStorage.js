import { useEffect, useState } from 'react'
import storageService from '../services/storageService'

export const useSessionStorage = (sessionId) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sessionId) {
      setLoading(false)
      return
    }

    try {
      const savedSession = storageService.loadSession(sessionId)
      if (savedSession) {
        setSession(savedSession)
      } else {
        setError('Session not found')
      }
    } catch (err) {
      setError(err.message || 'Failed to load session')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const saveSession = (data) => {
    try {
      const sid = storageService.saveSession(data)
      setSession(data)
      return sid
    } catch (err) {
      setError(err.message || 'Failed to save session')
      return null
    }
  }

  const deleteSession = (sid) => {
    try {
      storageService.deleteSession(sid)
      if (sessionId === sid) {
        setSession(null)
      }
    } catch (err) {
      setError(err.message || 'Failed to delete session')
    }
  }

  return {
    session,
    loading,
    error,
    saveSession,
    deleteSession,
  }
}

export default useSessionStorage
