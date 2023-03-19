import { useState } from 'react'
import { useNavigate } from 'react-router'

const Actions = () => {
  const navigate = useNavigate()
  const handleToggleModal = () => {
    navigate('/create')
  }

  return (
    <button type="button" className="button button--update" onClick={handleToggleModal}>
      Add film
    </button>
  )
}

export default Actions
