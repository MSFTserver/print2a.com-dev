import React, { useEffect, useState } from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'

const print2aApiHost = 'https://print2a.com'
const print2aApiPort = '5757'
const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`

const GetLatest = (props) => {
  console.log(props)
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
  const apiResponse = [...latest]
  const repoStats = [apiResponse.shift()]
  const stats = repoStats.map((stat, i) => {
    const details = stat.tags.split('\n').map((file, index) => {
      const key = file.split(':')[0]
      const value = file.split(':')[1]
      return (
        <Col m={6} l={6} xl={6} offset={['s3', 'l3', 'xl3']}>
          <Frame
            animate
            level={3}
            corners={1}
            layer="primary"
            show={props.anim.entered}
          >
            <Words>{key}:&nbsp;</Words>
            <Words layer="alert">{value}</Words>
          </Frame>
          <br />
        </Col>
      )
    })
    return (
      <Row col s={1} m={10} offset={['s3', 'l1']}>
        <Frame
          animate
          level={3}
          corners={3}
          layer="primary"
          show={props.anim.entered}
        >
          <Heading style={{ paddingTop: 20 }} node="h2">
            {stat.title}
          </Heading>
          {details}
        </Frame>
      </Row>
    )
  })
  let latestProjects = [
    { desc: <i className="fa-solid fa-gun  fa-shake"></i> },
    { desc: 'Nothing New' },
    { desc: 'Check Back Later' },
    {
      desc: (
        <i data-fa-transform="flip-h" className="fa-solid fa-gun fa-shake"></i>
      ),
    },
  ].map((file, index) => (
    <Col m={6} l={4} xl={3} style={props.style}>
      <Frame>{file.desc}</Frame>
    </Col>
  ))
  if (apiResponse.length) {
    latestProjects = apiResponse.map((file, index) => (
      <Col m={6} l={4} xl={3} style={props.style}>
        <Frame>test</Frame>
      </Col>
    ))
  }

  console.log(latestProjects)

  return [...stats, ...latestProjects]
}
export default GetLatest
