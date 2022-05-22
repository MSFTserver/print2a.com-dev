/* eslint-disable react/prefer-stateless-function */
import './Browse.scss'
import React from 'react'
import { Frame, Heading } from 'arwes'

class Browse extends React.Component {
  render() {
    return (
      <div className="Browse">
        <Frame
          animate
          level={3}
          corners={8}
          layer="primary"
          timeout={1000}
          appear
          style={{ marginBottom: '6em' }}
        >
          <div className="browseContents">
            <Heading animate show={this.props.anim.entered}>
              <h2 className="title">Browse</h2>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Browse
