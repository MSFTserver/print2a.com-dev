/* eslint-disable react/prefer-stateless-function */
import './Latest.scss'
import React from 'react'
import { Frame, Header, Heading, Link, Words, Row, Col } from 'arwes'
import GetLatest from './GetLatest'

class Latest extends React.Component {
  render() {
    return (
      <div className="Latest">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show={this.props.anim.entered}
        >
          <Header style={{ paddingTop: 20 }} animate>
            <Heading node="h1">Latest Projects</Heading>
          </Header>
          <br />
          <GetLatest />
        </Frame>
      </div>
    )
  }
}

export default Latest
