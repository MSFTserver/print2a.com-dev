/* eslint-disable react/prefer-stateless-function */
import './ModelViewer.scss'
import React from 'react'
import { Frame, Heading, Link, Words } from 'arwes'
import { moreDensity, moreCost, moreDiameter, moreSpeed } from './render'

class ModelViewer extends React.Component {
  render() {
    return (
      <div className="ModelViewer">
        <div id="loading" className="loading_splash">
          <div className="loading_splash_container">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="content">
          <div id="container"></div>
          <div id="container2">
            <span id="densityLabel"></span>:&nbsp;
            <span id="densityValue"></span>&nbsp;g/cc&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreDensity(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreDensity(false)}
              value="-"
            />
            <br />
            <span id="weightLabel"></span>:&nbsp;<span id="weightValue"></span>
            &nbsp;g
            <br />
            <span id="volumeLabel"></span>:&nbsp;<span id="volumeValue"></span>
            &nbsp;cm3
            <br />
            <span id="sizeLabel"></span>:&nbsp;<span id="widthValue"></span>
            &nbsp;x&nbsp;
            <span id="heightValue"></span>&nbsp;x&nbsp;
            <span id="depthValue"></span>&nbsp;cm
            <br />
            <hr className="separator" />
            <span id="costKilogramLabel"></span>:&nbsp;$
            <span id="costKilogramValue"></span>&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreCost(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreCost(false)}
              value="-"
            />
            <br />
            <span id="costLabel"></span>:&nbsp;$<span id="costValue"></span>
            <br />
            <hr className="separator" />
            <span id="diameterLabel"></span>:&nbsp;
            <span id="diameterValue"></span>&nbsp;mm&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreDiameter(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreDiameter(false)}
              value="-"
            />
            <br />
            <span id="speedLabel"></span>:&nbsp;<span id="speedValue"></span>
            &nbsp;mm/s&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreSpeed(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={moreSpeed(false)}
              value="-"
            />
            <br />
            <span id="lengthLabel"></span>:&nbsp;<span id="lengthValue"></span>
            &nbsp;mm
            <br />
            <span id="timeLabel"></span>:&nbsp;<span id="hoursValue"></span>
            &nbsp;
            <span id="hoursLabel"></span>&nbsp;<span id="minutesValue"></span>
            &nbsp;
            <span id="minutesLabel"></span>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default ModelViewer
