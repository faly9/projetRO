import React from 'react'

export default function ErrorAlert({ message }) {
  return (
    <div className="alert alert-error">
      <span>Error:</span>
      <span>{message}</span>
    </div>
  )
}
