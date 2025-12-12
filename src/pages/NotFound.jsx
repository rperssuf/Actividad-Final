import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div>
      <h2>404 - No encontrado</h2>
      <p>La página no existe. <Link to="/">Volver al inicio</Link></p>
    </div>
  )
}