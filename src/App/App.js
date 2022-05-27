import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  Arwes,
  Puffs,
  SoundsProvider,
  createSounds,
  Link,
  Footer,
  withSounds,
} from 'arwes'
import { Toaster } from 'react-hot-toast'
import './App.scss'

import NavBar from '../components/shared/NavBar/NavBar'
import HomePage from '../components/pages/HomePage/HomePage'
import Browse from '../components/pages/Browse/Browse'
import Latest from '../components/pages/Latest/Latest'
import Links from '../components/pages/Links/Links'
import background from '../helpers/assets/images/background.gif'
import glow from '../helpers/assets/images/glow.png'
import theme from '../helpers/Theme'
import mySounds from '../helpers/Sounds'

class App extends React.Component {
  resources = {
    bg: background,
    pattern: glow,
  }

  state = {
    showHomePage: false,
    showLatest: false,
    showLinks: false,
    showBrowse: false,
  }

  setShowHomePage = () => {
    this.setState({
      showHomePage: true,
      showLatest: false,
      showLinks: false,
      showBrowse: false,
    })
  }

  setShowLatest = () => {
    this.setState({
      showLatest: true,
      showHomePage: false,
      showLinks: false,
      showBrowse: false,
    })
  }

  setShowLinks = () => {
    this.setState({
      showLinks: true,
      showLatest: false,
      showHomePage: false,
      showBrowse: false,
    })
  }

  setShowBrowse = () => {
    this.setState({
      showBrowse: true,
      showLinks: false,
      showLatest: false,
      showHomePage: false,
    })
  }

  render() {
    const location = window.location.pathname
    if (location === '/') {
      this.state.showHomePage = true
    } else if (location === '/latest') {
      this.state.showLatest = true
    } else if (location === '/links') {
      this.state.showLinks = true
    } else if (location === '/browse') {
      this.state.showBrowse = true
    } else {
      this.state.showHomePage = true
    }
    const createdTheme = createTheme(theme)
    const createdSounds = createSounds(mySounds)
    const MyNav = withSounds()((props) => <NavBar {...props} />)
    const { props } = this
    return (
      <ThemeProvider theme={createdTheme}>
        <SoundsProvider sounds={createdSounds}>
          <Arwes
            resources={this.resources}
            animate
            show
            background={{
              small: background,
              medium: background,
              large: background,
              xlarge: background,
            }}
            pattern={glow}
            style={{ padding: 20 }}
          >
            {(anim) => (
              <div className="App">
                <Toaster
                  containerStyle={{
                    top: '10vh',
                  }}
                  position="top-right"
                  reverseOrder
                  toastOptions={{
                    className: 'toast-note',
                    duration: 10000,
                    style: {
                      maxWidth: 'none',
                      borderRadius: '10px',
                      background: 'rgba(216, 42, 42, 0.8)',
                      color: '#000',
                    },
                  }}
                />
                <Router>
                  <MyNav
                    anim={anim}
                    setShowHomePage={this.setShowHomePage}
                    setShowLatest={this.setShowLatest}
                    setShowLinks={this.setShowLinks}
                    setShowBrowse={this.setShowBrowse}
                    state={this.state}
                  />
                  <Puffs>
                    <Routes>
                      <Route
                        path="/"
                        exact
                        element={<HomePage {...props} anim={anim} />}
                      />
                      <Route
                        path="/latest"
                        exact
                        element={<Latest {...props} anim={anim} />}
                      />
                      <Route
                        path="/links"
                        exact
                        element={<Links {...props} anim={anim} />}
                      />
                      <Route
                        path="/browse"
                        exact
                        element={<Browse {...props} anim={anim} />}
                      />
                    </Routes>
                  </Puffs>
                  <div className="footer">
                    <Footer
                      style={{ position: 'fixed', bottom: 0, width: '100%' }}
                    >
                      <div className="footerContents">
                        <Link
                          href="https://github.com/MSFTserver/print2a.com"
                          alt="Arwes theme"
                        >
                          - Open Source -
                        </Link>
                        <Link
                          href="https://github.com/arwesjs/arwes"
                          alt="Arwes theme"
                        >
                          Powered By Arwes
                        </Link>
                      </div>
                    </Footer>
                  </div>
                  <div className="mobileFooter">
                    <div className="footerContents">
                      <Link
                        href="https://github.com/MSFTserver/print2a.com"
                        alt="Arwes theme"
                      >
                        - Open Source -
                      </Link>
                      <Link
                        href="https://github.com/arwesjs/arwes"
                        alt="Arwes theme"
                      >
                        Powered By Arwes
                      </Link>
                    </div>
                  </div>
                </Router>
              </div>
            )}
          </Arwes>
        </SoundsProvider>
      </ThemeProvider>
    )
  }
}

export default App
