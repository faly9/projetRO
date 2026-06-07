class MPMEngine {
  constructor() {
    this.nodes = new Map()
    this.topoCache = null
    this.isDirty = true
  }

  load(tasks) {
    this.nodes.clear()
    this.topoCache = null
    this.isDirty = true

    this.nodes.set('DEB', { duration: 0, preds: [], succs: [] })
    this.nodes.set('FIN', { duration: 0, preds: [], succs: [] })

    const taskNames = new Set()

    tasks.forEach((row) => {
      const task = String(row.Task).trim()
      if (!task) return
      
      taskNames.add(task)
      this.nodes.set(task, {
        duration: Number(row.Duration) || 0,
        preds: [],
        succs: [],
      })
    })

    tasks.forEach((row) => {
      const task = String(row.Task).trim()
      if (!task) return

      const predsList = String(row.Predecessors || '')
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p)

      if (predsList.length === 0) {
        this.nodes.get('DEB').succs.push(task)
        this.nodes.get(task).preds.push('DEB')
      } else {
        predsList.forEach((pred) => {
          if (!taskNames.has(pred)) {
            throw new Error(`Predecessor '${pred}' not defined for '${task}'`)
          }
          this.nodes.get(pred).succs.push(task)
          this.nodes.get(task).preds.push(pred)
        })
      }
    })

    taskNames.forEach((task) => {
      if (this.nodes.get(task).succs.length === 0) {
        this.nodes.get(task).succs.push('FIN')
        this.nodes.get('FIN').preds.push(task)
      }
    })
  }

  hasCycles() {
    const WHITE = 0
    const GRAY = 1
    const BLACK = 2

    const colors = new Map()
    this.nodes.forEach((_, node) => colors.set(node, WHITE))

    const visit = (node) => {
      if (colors.get(node) === BLACK) return false
      if (colors.get(node) === GRAY) return true

      colors.set(node, GRAY)
      for (const succ of this.nodes.get(node).succs) {
        if (visit(succ)) return true
      }
      colors.set(node, BLACK)
      return false
    }

    for (const node of this.nodes.keys()) {
      if (colors.get(node) === WHITE && visit(node)) {
        return true
      }
    }
    return false
  }

  _topologicalSort() {
    if (this.topoCache) return this.topoCache

    const inDegree = new Map()
    this.nodes.forEach((data, node) => {
      inDegree.set(node, data.preds.length)
    })

    const queue = []
    inDegree.forEach((degree, node) => {
      if (degree === 0) queue.push(node)
    })

    const result = []

    while (queue.length > 0) {
      const node = queue.shift()
      result.push(node)

      for (const succ of this.nodes.get(node).succs) {
        inDegree.set(succ, inDegree.get(succ) - 1)
        if (inDegree.get(succ) === 0) {
          queue.push(succ)
        }
      }
    }

    this.topoCache = result
    return result
  }

  computeTimes() {
    if (!this.isDirty) return

    const topoOrder = this._topologicalSort()

    topoOrder.forEach((node) => {
      const preds = this.nodes.get(node).preds
      const es = Math.max(0, ...preds.map((p) => this.nodes.get(p).ef || 0))
      this.nodes.get(node).es = es
      this.nodes.get(node).ef = es + this.nodes.get(node).duration
    })

    const projectFinish = this.nodes.get('FIN').ef
    ;[...topoOrder].reverse().forEach((node) => {
      const succs = this.nodes.get(node).succs
      const lf = Math.min(
        projectFinish,
        ...succs.map((s) => this.nodes.get(s).ls || projectFinish)
      )
      this.nodes.get(node).lf = lf
      this.nodes.get(node).ls = lf - this.nodes.get(node).duration
      
      this.nodes.get(node).tf =
        node === 'DEB' || node === 'FIN'
          ? 0
          : this.nodes.get(node).ls - this.nodes.get(node).es
    })

    this.isDirty = false
  }

  getCriticalPaths() {
    const paths = []
    const memo = new Map()

    const dfs = (node) => {
      if (memo.has(node)) return memo.get(node)

      if (node === 'FIN') return [[node]]

      const result = []
      const nodeData = this.nodes.get(node)

      for (const succ of nodeData.succs) {
        const succData = this.nodes.get(succ)

        // Vérifier si le nœud successeur est critique ET si le nœud courant se termine exactement quand le successeur commence
        if (succData.tf === 0 && nodeData.ef === succData.es) {
          const subPaths = dfs(succ)
          for (const path of subPaths) {
            result.push([node, ...path])
          }
        }
      }

      memo.set(node, result)
      return result
    }

    const allPaths = dfs('DEB')
    
    // Déduplique les chemins critiques
    const uniquePaths = []
    const seenPaths = new Set()

    for (const path of allPaths) {
      const pathStr = path.join('-')
      if (!seenPaths.has(pathStr)) {
        uniquePaths.push(path)
        seenPaths.add(pathStr)
      }
    }

    return uniquePaths
  }

  getResults() {
    const results = []
    const excluded = new Set(['DEB', 'FIN'])

    this.nodes.forEach((data, task) => {
      if (excluded.has(task)) return

      results.push({
        Task: task,
        Duration: data.duration,
        Early_Start: data.es,
        Early_Finish: data.ef,
        Late_Start: data.ls,
        Late_Finish: data.lf,
        Total_Float: data.tf,
      })
    })

    return results.sort((a, b) => a.Task.localeCompare(b.Task))
  }

  getPredSuccTable() {
    const table = []
    const excluded = new Set(['DEB', 'FIN'])

    this.nodes.forEach((data, task) => {
      if (excluded.has(task)) return

      table.push({
        Task: task,
        Predecessors: data.preds.filter((p) => p !== 'DEB').join(',') || '-',
        Successors: data.succs.filter((s) => s !== 'FIN').join(',') || '-',
      })
    })

    return table.sort((a, b) => a.Task.localeCompare(b.Task))
  }

  getCytoscapeElements(criticalPaths) {
    const criticalNodes = new Set()
    const criticalEdges = new Set()

    criticalPaths.forEach((path) => {
      for (let i = 0; i < path.length; i++) {
        criticalNodes.add(path[i])
        if (i < path.length - 1) {
          const edgeId = `${path[i]}__${path[i + 1]}`
          criticalEdges.add(edgeId)
        }
      }
    })

    const elements = []

    this.nodes.forEach((data, node) => {
      elements.push({
        data: {
          id: node,
          label: node,
          es: data.es || 0,
          ef: data.ef || 0,
          ls: data.ls || 0,
          lf: data.lf || 0,
          tf: data.tf || 0,
          dur: data.duration,
          critical: criticalNodes.has(node) ? 'true' : 'false',
        },
      })
    })

    const edgeSet = new Set()
    this.nodes.forEach((data, u) => {
      data.succs.forEach((v) => {
        const edgeId = `${u}__${v}`
        if (!edgeSet.has(edgeId)) {
          elements.push({
            data: {
              id: edgeId,
              source: u,
              target: v,
              label: u === 'DEB' ? '0' : String(this.nodes.get(u).duration),
              critical: criticalEdges.has(edgeId) ? 'true' : 'false',
            },
          })
          edgeSet.add(edgeId)
        }
      })
    })

    return elements
  }

  validate(tasks) {
    const errors = []
    const taskNames = new Set()

    // Vérifier les tâches vides et les doublons
    tasks.forEach((row) => {
      const task = String(row.Task).trim()

      if (!task) {
        errors.push('Empty task detected')
        return
      }

      if (taskNames.has(task)) {
        errors.push(`Duplicate task: "${task}"`)
      }
      taskNames.add(task)

      const duration = Number(row.Duration)
      if (isNaN(duration)) {
        errors.push(`Invalid duration for task "${task}" - must be a number`)
      } else if (duration < 0) {
        errors.push(`Negative duration for task "${task}" - duration must be positive`)
      } else if (duration === 0) {
        errors.push(`Zero duration for task "${task}" - duration must be greater than 0`)
      }
    })

    // Vérifier les prédécesseurs
    tasks.forEach((row) => {
      const task = String(row.Task).trim()
      if (!task) return

      const preds = String(row.Predecessors || '')
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p)

      preds.forEach((pred) => {
        if (!taskNames.has(pred)) {
          errors.push(`Undefined predecessor "${pred}" for task "${task}"`)
        }
      })
    })

    return [...new Set(errors)]
  }

  getStats() {
    const results = this.getResults()
    const criticalCount = results.filter((r) => r.Total_Float === 0).length

    return {
      projectDuration: this.nodes.get('FIN').ef || 0,
      totalTasks: results.length,
      criticalTasks: criticalCount,
    }
  }
}

export default MPMEngine
