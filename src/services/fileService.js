import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export const fileService = {
  readCSV: (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data)
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  },

  readExcel: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'array' })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const data = XLSX.utils.sheet_to_json(worksheet)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => {
        reject(new Error('File read error'))
      }

      reader.readAsArrayBuffer(file)
    })
  },

  cleanDataFrame: (data) => {
    const mapping = {
      tache: 'Task',
      durée: 'Duration',
      duree: 'Duration',
      predecesseurs: 'Predecessors',
      prédécesseurs: 'Predecessors',
    }

    return data.map((row) => {
      const cleaned = {}
      Object.keys(row).forEach((key) => {
        const newKey =
          mapping[key.toLowerCase()] ||
          (Object.keys(mapping).includes(key.toLowerCase())
            ? mapping[key.toLowerCase()]
            : key)

        cleaned[newKey] = row[key]
      })

      return {
        Task: String(cleaned.Task || '').trim(),
        Duration: Number(cleaned.Duration) || 0,
        Predecessors: String(cleaned.Predecessors || '')
          .replace(/;/g, ',')
          .replace(/\s/g, ''),
      }
    })
  },

  loadFile: async (file) => {
    if (!file) throw new Error('No file selected')

    let data

    if (file.name.endsWith('.csv')) {
      data = await fileService.readCSV(file)
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      data = await fileService.readExcel(file)
    } else {
      throw new Error('Unsupported format (CSV or Excel required)')
    }

    return fileService.cleanDataFrame(data)
  },
}

export default fileService
