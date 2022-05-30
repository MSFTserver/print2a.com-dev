import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Button, Frame } from 'arwes'
import TextPopup from './Text'

// eslint-disable-next-line react/prefer-stateless-function
class ControlledPopup extends React.Component {
  render() {
    const { setShowPopup, state, theme } = this.props
    const { popupFile, showPopup } = state
    const contentStyle = {
      background: 'none',
      color: theme.color.primary.base,
      border: 'none',
      height: '85vh',
      display: 'block',
      overflow: 'hidden auto',
    }
    const overlayStyle = {
      background: 'rgba(0,0,0,0.5)',
    }
    if (['md', 'txt'].includes(popupFile.ext)) {
      return <TextPopup {...this.props} />
    }
    return (
      <div className="ControlledPopup">
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
            File Not Supported --&gt; Right Click to Download
          </Frame>
        </Popup>
      </div>
    )
  }
}

export default ControlledPopup
