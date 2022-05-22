import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  ThemeProvider, createTheme, Arwes, Puffs, SoundsProvider,
  createSounds, Line, Link, Footer
} from 'arwes';
import './App.scss';

import NavBar from '../components/shared/NavBar/NavBar';
import HomePage from '../components/pages/HomePage/HomePage';
import Browse from '../components/pages/Browse/Browse';
import Latest from '../components/pages/Latest/Latest';
import Links from '../components/pages/Links/Links';
import background from '../helpers/assets/images/background.gif';
import glow from '../helpers/assets/images/glow.png';
import clickSound from '../helpers/assets/sounds/click.mp3';
import typingSound from '../helpers/assets/sounds/typing.mp3';
import deploySound from '../helpers/assets/sounds/deploy.mp3';
import theme from '../theme';

const mySounds = {
  shared: { volume: 1 },
  players: {
    click: {
      sound: { src: [clickSound] },
    },
    typing: {
      sound: { src: [typingSound] },
    },
    deploy: {
      sound: { src: [deploySound] },
    },
  },
};

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
      showHomePage: true, showLatest: false, showLinks: false, showBrowse: false,
    });
  }

  setShowProj = () => {
    this.setState({
      showHomePage: false, showLatest: false, showLinks: false, showBrowse: false,
    });
  }

  setShowLatest = () => {
    this.setState({
      showLatest: true, showHomePage: false, showLinks: false, showBrowse: false,
    });
  }

  setShowLinks = () => {
    this.setState({
      showLinks: true, showLatest: false, showHomePage: false, showBrowse: false,
    });
  }

  setShowBrowse = () => {
    this.setState({
      showBrowse: true, showLinks: false, showLatest: false, showHomePage: false,
    });
  }

  render() {
    return (
      <ThemeProvider theme={createTheme(theme)}>
        <SoundsProvider sounds={createSounds(mySounds)}>
          <Arwes resources={this.resources} animate show background={{
          small: background,
          medium: background,
          large: background,
          xlarge: background
          }} pattern={glow} stype={{ padding: 20 }}>
            {(anim) => (
              <div className="App">
                <Router>
                <NavBar anim={anim} setShowHomePage={this.setShowHomePage} setShowLatest={this.setShowLatest} setShowLinks={this.setShowLinks}
                setShowBrowse={this.setShowBrowse} />
                  <Routes>
                    <Puffs>
                      <Route path="/" exact render={(props) => <HomePage {...props} anim={anim} />}/>
                      <Route path="/latest" exact render={(props) => <Latest {...props} anim={anim}/>} />
                      <Route path="/links" exact render={(props) => <Links {...props} anim={anim}/>} />
                      <Route path="/browse" exact render={(props) => <Browse {...props} anim={anim}/>} />
                    </Puffs>
                  </Routes>
                <Footer style={{position:'fixed',bottom: 0,width:'100%'}}>
                  <div className="footerContents d-flex row justify-content-between">
                  <Link animate show={anim.entered} href="https://github.com/MSFTserver/print2a.com" alt="Arwes theme">- Open Source -</Link>
                  <Link animate show={anim.entered} href="https://github.com/arwesjs/arwes" alt="Arwes theme">Powered By Arwes</Link>
                  </div>
                </Footer>
                </Router>
            </div>
            )}
          </Arwes>
        </SoundsProvider>
      </ThemeProvider>
    );
  }
}

export default App;
