/* eslint-disable react/prefer-stateless-function */
import './Latest.scss'
import React from 'react'
import { Frame, Heading, Link, Words } from 'arwes'

class Latest extends React.Component {
  render() {
    return (
      <div className="Latest">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          sounds={this.sounds}
          timeout={1000}
          appear
          style={{ marginBottom: '6em' }}
        >
          <div className="latestContents">
            <Heading animate show={this.props.anim.entered}>
              <h2>Latest Files and Stats</h2>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Latest