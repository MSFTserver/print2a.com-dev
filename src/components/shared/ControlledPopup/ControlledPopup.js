import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
//

// eslint-disable-next-line react/prefer-stateless-function
class ControlledPopup extends React.Component {
  render() {
    const { setShowPopup, state } = this.props
    console.log('STATE: ', state.showPopup)
    return (
      <div>
        <button type="button" className="button" onClick={setShowPopup}>
          Testing Popup for file viewer
        </button>
        <Popup open={state.showPopup} onClose={!setShowPopup}>
          <button type="button" className="close" onClick={setShowPopup}>
            &times;
          </button>
          {this.props.value}
        </Popup>
      </div>
    )
  }
}

export default ControlledPopup
