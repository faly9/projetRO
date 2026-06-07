import React, { useState } from 'react'

export default function FileUpload({ onFileUpload }) {
  const [fileName, setFileName] = useState('')
  const inputRef = React.useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      onFileUpload(file)
    }
    event.target.value = ''
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.click()
    }
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          aria-label="File input"
        />
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={handleClick}
          style={{ fontWeight: '600' }}
        >
          Choisir un fichier
        </button>
        <input
          type="text"
          value={fileName}
          placeholder="Aucun fichier sélectionné"
          readOnly
          style={{
            flex: 1,
            minWidth: '200px',
            background: 'var(--color-bg-hover)',
            color: fileName ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            fontWeight: fileName ? '500' : '400',
            cursor: 'default',
          }}
        />
        <span className="text-tertiary" style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>
          CSV, XLSX, XLS
        </span>
      </div>
    </div>
  )
}