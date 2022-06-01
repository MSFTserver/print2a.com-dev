import React from 'react'
import { Button, Frame } from 'arwes'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// eslint-disable-next-line react/prefer-stateless-function
class ImagePopup extends React.Component {
  render() {
    const { setShowPopup, state, theme } = this.props
    const { popupFile, showPopup } = state
    const contentStyle = {
      background: 'none',
      color: theme.color.primary.base,
      border: 'none',
      display: 'block',
      overflow: 'hidden auto',
      width: '95vw',
    }
    const overlayStyle = {
      background: 'rgba(0,0,0,0.5)',
    }
    return (
      <Popup
        open={showPopup}
        closeOnDocumentClick={false}
        {...{ overlayStyle, contentStyle }}
      >
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show
          theme={theme}
          style={{
            backgroundColor: theme.background.primary.level0,
            padding: '1vh',
          }}
        >
          <div className="imageButtons">
            <Button
              style={{ padding: '1vh' }}
              type="button"
              className="close"
              onClick={setShowPopup}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
            <Button
              style={{ padding: '1vh' }}
              type="button"
              className="download"
              onClick={() =>
                window.open(
                  `https://print2a.com:5757/${popupFile.path}`,
                  '_blank',
                )
              }
            >
              <i className="fa-solid fa-circle-arrow-down"></i>Download
            </Button>
          </div>
          <img
            alt="Popup"
            style={{ height: '85vh', display: 'block', margin: '0 auto' }}
            className="popupImage"
            src={`data:image/${popupFile.ext};base64,${popupFile.data}`}
          />
        </Frame>
      </Popup>
    )
  }
}

export default ImagePopup
