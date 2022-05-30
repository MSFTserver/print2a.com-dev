import React, { useState } from 'react'
import Markdown from 'marked-react'
import { Button, Frame } from 'arwes'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// eslint-disable-next-line react/prefer-stateless-function
class TextPopup extends React.Component {
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
    let fileToRender
    if (popupFile.ext === 'md') {
      fileToRender = <Markdown value={popupFile.data} gfm />
    } else {
      fileToRender = (
        <pre style={{ overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
          {popupFile.data}
        </pre>
      )
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
          noBackground
          theme={theme}
          style={{
            backgroundColor: theme.background.primary.level0,
            padding: '1vh',
            height: '80vh',
            display: 'flex',
          }}
        >
          <Button type="button" className="close" onClick={setShowPopup}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
          <Button
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
          <div
            className="popupContents"
            style={{ overflow: 'hidden auto', height: '74vh' }}
          >
            {fileToRender}
          </div>
        </Frame>
      </Popup>
    )
  }
}

export default TextPopup
