import React, { useEffect, useState } from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'

const print2aApiHost = 'https://print2a.com'
const print2aApiPort = '5757'
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`

const GetLatest = () => {
  const [latest, setLatest] = useState([
    { title: 'LOADING...', tags: 'LOADING...', link: '#' },
  ])
  async function getLatest() {
    const req = await fetch(`${print2aApiEndpoint}/LatestProjects`)
    const res = await req.json()
    setLatest(res)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getLatest()
    }
  }, [])

  const repoStats = [[...latest].shift()]
  const stats = repoStats.map((stat, i) => (
    <Row col s={1} m={8} offset={['s3', 'l2']}>
      <Frame>{stat?.title}</Frame>
    </Row>
  ))

  const latestProjects = latest.map((file, index) => (
    <Row>
      <Col m={6} l={4} xl={3}>
        <Frame>test</Frame>
      </Col>
      <Col m={6} l={4} xl={3}>
        <Frame>test</Frame>
      </Col>
      <Col s={4} m={6} l={4} xl={3}>
        <Frame>test</Frame>
      </Col>
      <Col s={4} m={6} l={4} xl={3}>
        <Frame>test</Frame>
      </Col>
    </Row>
  ))
  return [...stats, ...latestProjects]
}
export default GetLatest
