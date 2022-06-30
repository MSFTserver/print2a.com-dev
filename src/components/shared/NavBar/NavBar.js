/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React from 'react'
import { Button, Header, Heading, Row } from 'arwes'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    const location = window.location.pathname
    if (location === '/') {
      this.props.state.showPage = 'home'
    } else if (location === '/latest') {
      this.props.state.showPage = 'latest'
    } else if (location === '/links') {
      this.props.state.showPage = 'links'
    } else if (location === '/browse') {
      this.props.state.showPage = 'browse'
    } else if (location === '/modelViewer') {
      this.props.state.showPage = 'modelViewer'
    } else {
      this.props.state.showPage = 'home'
    }
    return (
      <div className="NavBar">
        <Header animate show={this.props.anim.entered}>
          <nav className="container-fluid navbar">
            <Heading>Print2a</Heading>
            <Row className="row wrap mr-1" id="navLinks" col s={12}>
              <Link to="/" id="navToHomePage">
                <Button
                  animate
                  disabled={this.props.state.showPage === 'home'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  Home
                </Button>
              </Link>
              <Link to="/latest" id="navToLatest">
                <Button
                  animate
                  disabled={this.props.state.showPage === 'latest'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  Latest
                </Button>
              </Link>
              <Link to="/links" id="navToLinks">
                <Button
                  animate
                  disabled={this.props.state.showPage === 'links'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  Links
                </Button>
              </Link>
              <Link to="/browse" id="navToBrowse">
                <Button
                  animate
                  disabled={this.props.state.showPage === 'browse'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
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
