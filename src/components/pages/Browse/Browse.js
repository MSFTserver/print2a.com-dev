/* eslint-disable react/prefer-stateless-function */
import './Browse.scss'
import React from 'react'
import { Frame, Heading, Appear } from 'arwes'

class Browse extends React.Component {
  render() {
    return (
      <div className="Browse">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show={this.props.anim.entered}
        >
          <div className="browseContents">
            <Heading node="h2">
              <div className="h2">Browse</div>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Browse
