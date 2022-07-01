/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React from 'react'
import { Button, Header, Heading, Row, Words } from 'arwes'
import { Link } from 'react-router-dom'

function mobileMenuClicked() {
  const isActive = document.getElementById('navLinks').style.display
  console.log("test",isActive)
  if (isActive === 'none') {
    isActive.style.display = 'block'
  } else if (isActive === 'block') {
    isActive.style.display = 'none'
  } else {
    isActive.style.display = 'block'
  }
}

class NavBar extends React.Component {

  componentDidMount() {
    console.log("fired")
    console.log(document.getElementById('mobileMenu').onclick)
    document.getElementById('mobileMenu').addEventListener('click', () => mobileMenuClicked())
    console.log(document.getElementById('mobileMenu').onclick)
  }

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
            <Heading>
              Print2a
              <li id="mobileMenu" class="fa fa-bars" title="Click me!"/>
            </Heading>
            <Row className="row wrap mr-1" id="navLinks" col s={12}>
              <Link to="/">
                <Button
                  className="navToButton"
                  animate
                  disabled={this.props.state.showPage === 'home'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  <Words className="navToText">Home</Words>
                </Button>
              </Link>
              <Link to="/latest">
                <Button
                  className="navToButton"
                  animate
                  disabled={this.props.state.showPage === 'latest'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  <Words className="navToText">Latest</Words>
                </Button>
              </Link>
              <Link to="/links">
                <Button
                  className="navToButton"
                  animate
                  disabled={this.props.state.showPage === 'links'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  <Words className="navToText">Links</Words>
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  className="navToButton"
                  animate
                  disabled={this.props.state.showPage === 'browse'}
                  show={this.props.anim.entered}
                  onClick={this.props.setShowPage}
                  onMouseEnter={() => this.props.sounds.hover.play()}
                >
                  <Words className="navToText">Browse</Words>
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
