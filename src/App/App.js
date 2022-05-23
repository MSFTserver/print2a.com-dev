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
} from 'arwes'
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
    showHomePage: true,
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
    const { props } = this
    return (
      <ThemeProvider theme={createTheme(theme)}>
        <SoundsProvider sounds={createSounds(mySounds)}>
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
                <Router>
                  <NavBar
                    anim={anim}
                    sounds={createSounds(mySounds)}
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
                        element={
                          <HomePage
                            {...props}
                            anim={anim}
                            sounds={createSounds(mySounds)}
                          />
                        }
                      />
                      <Route
                        path="/latest"
                        exact
                        element={
                          <Latest
                            {...props}
                            anim={anim}
                            sounds={createSounds(mySounds)}
                          />
                        }
                      />
                      <Route
                        path="/links"
                        exact
                        element={
                          <Links
                            {...props}
                            anim={anim}
                            sounds={createSounds(mySounds)}
                          />
                        }
                      />
                      <Route
                        path="/browse"
                        exact
                        element={
                          <Browse
                            {...props}
                            anim={anim}
                            sounds={createSounds(mySounds)}
                          />
                        }
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
