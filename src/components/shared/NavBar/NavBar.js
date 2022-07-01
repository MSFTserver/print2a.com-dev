/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React, { useState } from 'react'
import { Button, Header, Heading, Row, Words } from 'arwes'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuActive: false,
    }
  }

  setMenuActive = (isActive) => {
    this.setState(() => ({
      menuActive: isActive,
    }))
  }

  render() {
    console.log(this.state)
    function mobileMenuClicked(state, setMenuActive) {
      console.log(state)
      if (!state.menuActive) {
        document.getElementById('navLinks').style.display = 'block'
        setMenuActive(true)
      } else {
        document.getElementById('navLinks').style.display = 'none'
        setMenuActive(false)
      }
    }

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
              <div
                id="mobileMenu"
                onClick={() =>
                  mobileMenuClicked(this.state, this.setMenuActive)
                }
              >
                <li className="fa fa-bars" title="Click me!" />
              </div>
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
