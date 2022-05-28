import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
//

// eslint-disable-next-line react/prefer-stateless-function
class ControlledPopup extends React.Component {
  render() {
    const { setShowPopup, state } = this.props
    const { popupFile, showPopup } = state
    const fileExt = popupFile ? popupFile.split('.').pop() : 'none'
    return (
      <div>
        <Popup open={showPopup} onClose={!setShowPopup}>
          <button type="button" className="close" onClick={setShowPopup}>
            &times;
          </button>
          {fileExt === 'md'
            ? popupFile
            : 'File Not Supported\nRight Click to Download'}
        </Popup>
      </div>
    )
  }
}

export default ControlledPopup
