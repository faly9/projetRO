import { useCallback, useState } from 'react'
import fileService from '../services/fileService'

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const uploadFile = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const uploadedData = await fileService.loadFile(file)
      setData(uploadedData)
      return uploadedData
    } catch (err) {
      const errorMessage = err.message || 'Failed to upload file'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { uploadFile, loading, error, data }
}

export default useFileUpload
