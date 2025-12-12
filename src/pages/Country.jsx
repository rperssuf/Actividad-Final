import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Spinner, Button } from 'react-bootstrap'

export default function Country(){
  const { name } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!name) return
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true&fields=name,flags,capital,currencies,languages,population`
    fetch(url).then(r=> r.json()).then(data => {
      setCountry(Array.isArray(data) ? data[0] : data)
    }).catch(err=> console.error(err)).finally(()=> setLoading(false))
  },[name])

  if(loading) return <div className="text-center"><Spinner animation="border" /></div>
  if(!country) return <div>No se encontró el país. <br/><Link to="/">Volver</Link></div>

  const currencies = country.currencies ? Object.entries(country.currencies).map(([k,v])=> `${v.name} (${k})`).join(', ') : '—'
  const languages = country.languages ? Object.values(country.languages).join(', ') : '—'

  return (
    <Card>
      <Card.Img variant="top" src={country.flags?.png} style={{height:300, objectFit:'cover'}} />
      <Card.Body>
        <Card.Title>{country.name?.common}</Card.Title>
        <Card.Text>
          Capital: {country.capital ? country.capital.join(', ') : '—'}<br/>
          Población: {country.population?.toLocaleString() || '—'}<br/>
          Monedas: {currencies}<br/>
          Idiomas: {languages}
        </Card.Text>
        <Button as={Link} to="/" variant="secondary">Volver</Button>
      </Card.Body>
    </Card>
  )
}