import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home(){
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(()=>{
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,currencies,languages,population')
      .then(res => res.json())
      .then(data => {
        // sort by population desc
        data.sort((a,b)=> (b.population||0) - (a.population||0))
        setCountries(data)
      })
      .catch(err=> console.error(err))
      .finally(()=> setLoading(false))
  },[])

  const filtered = countries.filter(c => {
    const name = c.name && c.name.common ? c.name.common.toLowerCase() : ''
    return name.includes(q.toLowerCase())
  })

  return (
    <div>
      <Form className="mb-3">
        <Form.Control placeholder="Buscar país..." value={q} onChange={e=>setQ(e.target.value)} />
      </Form>

      {loading ? <div className="text-center"><Spinner animation="border" /></div> : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {filtered.map((c, idx)=> (
            <Col key={idx}>
              <Card className="h-100">
                <Card.Img variant="top" src={c.flags && c.flags.png ? c.flags.png : ''} style={{height:180, objectFit:'cover'}} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{c.name?.common}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Capital: {c.capital ? c.capital.join(', ') : '—'}<br/>
                    Población: {c.population?.toLocaleString() || '—'}
                  </Card.Text>
                  <div className="mt-2">
                    <Link to={`/country/${encodeURIComponent(c.name?.common || '')}`} className="btn btn-primary">Ver detalles</Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}