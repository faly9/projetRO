import React from 'react'

export default function SuccessAlert({ message }) {
  return (
    <div className="alert alert-success">
      <span>Success:</span>
      <span>{message}</span>
    </div>
  )
}
