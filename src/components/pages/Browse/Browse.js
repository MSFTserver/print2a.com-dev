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
          timeout={1000}
          appear
          style={{ marginBottom: '6em' }}
        >
          <div className="browseContents">
            <Heading animate show={this.props.anim.entered}>
              <h2 className="h2">Browse</h2>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Browse
