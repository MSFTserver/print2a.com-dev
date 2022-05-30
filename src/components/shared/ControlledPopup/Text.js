import React, { useState } from 'react'
import Markdown from 'marked-react'
import { Button, Frame } from 'arwes'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

// eslint-disable-next-line react/prefer-stateless-function
class TextPopup extends React.Component {
  render() {
    const { setShowPopup, state, theme, overlayStyle, contentStyle } =
      this.props
    const { popupFile, showPopup } = state
    let fileToRender
    console.log(popupFile.data)
    if (popupFile.ext === 'md') {
      fileToRender = <Markdown value={popupFile.data} gfm />
    } else {
      fileToRender = popupFile.data
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
          <div className="popupContents">
            {fileToRender}
          </div>
        </Frame>
      </Popup>
    )
  }
}

export default TextPopup
