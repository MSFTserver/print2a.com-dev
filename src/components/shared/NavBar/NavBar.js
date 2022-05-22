/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React from 'react'
import { Button, Header, Heading, Row } from 'arwes'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    console.log(this.props.sounds)
    return (
      <div className="NavBar">
        <Header animate show={this.props.anim.entered}>
          <nav className="container-fluid navbar">
            <Heading>Print2a</Heading>
            <Row className="row wrap mr-1" id="navLinks" col s={12}>
              <Link to="/" id="navToHomePage">
                <Button
                  animate
                  show={this.props.anim.entered}
                  onClick={this.props.setShowHomePage}
                  sounds={this.props.sounds}
                >
                  Home
                </Button>
              </Link>
              <Link to="/latest" id="navToLatest">
                <Button
                  animate
                  show={this.props.anim.entered}
                  onClick={this.props.setShowLatest}
                  sounds={this.props.sounds}
                >
                  Latest
                </Button>
              </Link>
              <Link to="/links" id="navToLinks">
                <Button
                  animate
                  show={this.props.anim.entered}
                  onClick={this.props.setShowLinks}
                  sounds={this.props.sounds}
                >
                  Links
                </Button>
              </Link>
              <Link to="/browse" id="navToBrowse">
                <Button
                  animate
                  show={this.props.anim.entered}
                  onClick={this.props.setShowBrowse}
                  sounds={this.props.sounds}
                >
                  Browse
                </Button>
              </Link>
            </Row>
          </nav>
        </Header>
      </div>
    )
  }
}

export default NavBar
