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
          show={this.props.anim.entered}
        >
          <div className="latestContents">
            <Heading node="h2">
              <div className="h2">Latest Files and Stats</div>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Latest
