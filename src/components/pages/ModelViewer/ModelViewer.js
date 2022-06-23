/* eslint-disable react/prefer-stateless-function */
import './ModelViewer.scss'
import React from 'react'
import { Frame, Heading, Link, Words } from 'arwes'
import * as THREE from 'three';
import { OrbitControls, STLExporter, STLLoader, TDSLoader, OBJLoader, signedVolumeOfTriangle } from './three.js'

const StringERROR =
  'ERROR: Please check that the model is a STL, OBJ or 3DS model.'

const scene = new THREE.Scene()
//scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100000,
)

let vol = 0

function vh(v) {
  let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return (v * h) / 100;
}

function vw(v) {
  let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  return (v * w) / 100;
}

function resizeInput() {
  console.log(this.value)
  this.style.width = `${this.value.length + 2}ch`
  moreDensity(0,this.value)
}

const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(vw(100), vh(100))

let controls
let mesh
let height
let width
let depth
let pauseSpin = 1
let pauseSpinTimeout

let density = parseFloat('1.05')
let filamentCost = parseFloat('20')
let filamentDiameter = parseFloat('1.75')
let printingSpeed = parseFloat('150')

const getRandomValue = (min, max) => Math.random() * (max - min) + min

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function updateCost() {
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)
  let finalCost = (weightFinal * filamentCost) / 1000
  finalCost = parseFloat(finalCost).toFixed(2)
  document.getElementById('costValue').innerHTML = finalCost
}

function moreDensity(increaseDensity, inputDensity=null) {
  let result
  if (inputDensity) {
    density = inputDensity
  } else if (increaseDensity === true) {
    result = parseFloat(density) + parseFloat('0.01')
    if (result <= 10000) {
      density = result
    }
  } else {
    result = parseFloat(density) - parseFloat('0.01')
    if (result > 0) {
      density = result
    }
  }

  density = parseFloat(density).toFixed(2)

  let heightFinal = height / 10
  heightFinal = heightFinal.toFixed(2)
  let widthFinal = width / 10
  widthFinal = widthFinal.toFixed(2)
  let depthFinal = depth / 10
  depthFinal = depthFinal.toFixed(2)
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)
  document.getElementById('densityValue').placeholder = density
  document.getElementById('weightValue').innerHTML = weightFinal
  document.getElementById('volumeValue').innerHTML = volumeFinal
  document.getElementById('widthValue').innerHTML = widthFinal
  document.getElementById('depthValue').innerHTML = depthFinal
  document.getElementById('heightValue').innerHTML = heightFinal
  updateCost()
}

function moreCost(increaseCost) {
  let result
  if (increaseCost === true) {
    result = parseFloat(filamentCost) + parseFloat('1')
    if (result <= 10000) {
      filamentCost = result
    }
  } else {
    result = parseFloat(filamentCost) - parseFloat('1')
    if (result > 0) {
      filamentCost = result
    }
  }
  document.getElementById('costKilogramValue').innerHTML = filamentCost

  updateCost()
}

function moreDiameter(increaseDiameter) {
  let result
  if (increaseDiameter === true) {
    result = parseFloat(filamentDiameter) + parseFloat('0.01')
    if (result <= 10000) {
      filamentDiameter = result
    }
  } else {
    result = parseFloat(filamentDiameter) - parseFloat('0.01')
    if (result > 0) {
      filamentDiameter = result
    }
  }

  filamentDiameter = parseFloat(filamentDiameter).toFixed(2)

  let filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filamentLength = parseFloat(filamentLength).toFixed(0)

  let hours = Math.floor(filamentLength / printingSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printingSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes == 0) {
    minutes = 1
  }

  document.getElementById('diameterValue').innerHTML = filamentDiameter
  document.getElementById('lengthValue').innerHTML = filamentLength
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes
}

function moreSpeed(increaseSpeed) {
  let result
  if (increaseSpeed == true) {
    result = parseFloat(printingSpeed) + parseFloat('1')
    if (result <= 10000) {
      printingSpeed = result
    }
  } else {
    result = parseFloat(printingSpeed) - parseFloat('1')
    if (result > 0) {
      printingSpeed = result
    }
  }

  printingSpeed = parseFloat(printingSpeed).toFixed(0)

  const filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)

  let hours = Math.floor(filamentLength / printingSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printingSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  document.getElementById('speedValue').innerHTML = printingSpeed
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes
}

function init(fileExt, fileData) {
  if (fileExt === 'stl') {
    // SHOWING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'block'
  } else if (fileExt === '3ds') {
    // SHOWING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'block'
  } else if (fileExt === 'obj') {
    // SHOWING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'block'
  } else {
    // HIDDING THE LOADING SPLASH
    document.getElementById('loading').style.display = 'none'
    alert(StringERROR)
  }

  const sceneConverter = new THREE.Scene()
  const exporter = new STLExporter()
  if (fileExt === 'obj') {
    const object = new OBJLoader().parse(fileData)
    sceneConverter.add(object)
    fileData = exporter.parse(sceneConverter)
  } else if (fileExt === '3ds') {
    const object3ds = new TDSLoader().parse(fileData)
    sceneConverter.add(object3ds)
    fileData = exporter.parse(sceneConverter)
  }

  const geometry = new STLLoader().parse(fileData)
  geometry.computeVertexNormals()
  geometry.center()

  const material = new THREE.MeshPhongMaterial({
    color: 0x00cc00,
    emissive: 0x000000,
    emissiveIntensity: 1,
  })
  mesh = new THREE.Mesh(geometry, material)

  mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const positions = child.geometry.getAttribute('position').array
      for (let i = 0; i < positions.length; i += 9) {
        const t1 = {}
        t1.x = positions[i + 0]
        t1.y = positions[i + 1]
        t1.z = positions[i + 2]

        const t2 = {}
        t2.x = positions[i + 3]
        t2.y = positions[i + 4]
        t2.z = positions[i + 5]

        const t3 = {}
        t3.x = positions[i + 6]
        t3.y = positions[i + 7]
        t3.z = positions[i + 8]

        vol += signedVolumeOfTriangle(t1, t2, t3)
      }
    }
  })

  const box = new THREE.Box3().setFromObject(mesh)

  height = box.max.z - box.min.z
  width = box.max.x - box.min.x
  depth = box.max.y - box.min.y

  let heightFinal = height / 10
  heightFinal = heightFinal.toFixed(2)
  let widthFinal = width / 10
  widthFinal = widthFinal.toFixed(2)
  let depthFinal = depth / 10
  depthFinal = depthFinal.toFixed(2)
  let volumeFinal = vol / 1000
  volumeFinal = volumeFinal.toFixed(2)
  let weightFinal = volumeFinal * density
  weightFinal = weightFinal.toFixed(2)

  let filamentLength = parseFloat(
    (((vol / (filamentDiameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filamentLength = parseFloat(filamentLength).toFixed(0)

  let hours = Math.floor(filamentLength / printingSpeed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filamentLength / printingSpeed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes == 0) {
    minutes = 1
  }

  let finalCost = (weightFinal * filamentCost) / 1000
  finalCost = parseFloat(finalCost).toFixed(2)

  document.getElementById('weightValue').innerHTML = weightFinal
  document.getElementById('volumeValue').innerHTML = volumeFinal
  document.getElementById('widthValue').innerHTML = widthFinal
  document.getElementById('depthValue').innerHTML = depthFinal
  document.getElementById('heightValue').innerHTML = heightFinal
  document.getElementById('costValue').innerHTML = finalCost
  document.getElementById('lengthValue').innerHTML = filamentLength
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes

  let distance

  if (height > width && height > depth) {
    distance = height * 2
  } else if (width > height && width > depth) {
    distance = width * 2
  } else if (depth > height && depth > width) {
    distance = depth * 2
  } else {
    distance = depth * 4
  }

  camera.position.set(0, -distance, 0)

  // AN ALTERNATIVE FOR MOVING THE OBJECT USING THE MOUSE WITHIN THE RENDERER
  controls = new OrbitControls(camera, renderer.domElement)
  // controls = new OrbitControls(camera);
  
  const lightHolder = new THREE.Group()
  const ambientLight = new THREE.AmbientLight(0xd5d5d5)
  const light = new THREE.SpotLight(0xffffff)
  light.position.set( 1, distance, 100 )
  light.castShadow = true
  lightHolder.add(light)
  lightHolder.add(ambientLight)
  scene.add(lightHolder)

  const updateSpin = () => {
    mesh.rotation.x += getRandomValue(0.003, 0.004)
    mesh.rotation.y += getRandomValue(0.001, 0.002)
    mesh.rotation.z += getRandomValue(0.003, 0.004)
  }

  controls.addEventListener('end', () => {
    clearTimeout(pauseSpinTimeout)
    pauseSpinTimeout = setTimeout(() => {
      pauseSpin = 1
    }, 30000)
  })

  controls.addEventListener('start', () => {
    clearTimeout(pauseSpinTimeout)
    pauseSpin = 0
  })

  const animateSpin = () => {
    if (pauseSpin) {
      updateSpin()
    }
    controls.update()
    lightHolder.quaternion.copy(camera.quaternion)
    renderer.render(scene, camera)
    requestAnimationFrame(animateSpin)
  }
  controls.update()
  scene.add(mesh)
  animateSpin()
  // HIDDING THE LOADING SPLASH
  document.getElementById('loading').style.display = 'none'

  document.getElementById('modelContainer').appendChild(renderer.domElement)

  window.addEventListener('resize', onWindowResize, false)
}

class ModelViewer extends React.Component {
  async componentDidMount() {
    const print2aApiHost = 'https://print2a.com'
    const print2aApiPort = '5757'
    const print2aApiEndpoint = `${print2aApiHost}:${print2aApiPort}`
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const filePath = urlParams.get('fileLocation')
    const fileName = filePath.split('/').pop()
    const fileExt = fileName.split('.').pop().toLowerCase()
    const data = await fetch(
      `${print2aApiEndpoint}/GetFile?fileLocation=print2a/${filePath}`,
    )
    const fileData = await data.arrayBuffer()
    const densityValueInput = document.getElementById('densityValue')
    densityValueInput.addEventListener('input', resizeInput)
    densityValueInput.style.width = densityValueInput.value ? (`${densityValueInput.value.length+2}ch`) : (`${densityValueInput.placeholder.length+2}ch`)
    document.getElementById('costKilogramValue').innerHTML = filamentCost
    document.getElementById('diameterValue').innerHTML = filamentDiameter
    document.getElementById('speedValue').innerHTML = printingSpeed
    document.getElementById('calcContainer').style.display = 'block'
    init(fileExt, fileData)
  }

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
          <div id="modelContainer"></div>
          <div id="calcContainer">
          <Frame
            animate
            level={3}
            corners={6}
            layer="primary"
            show={this.props.anim.entered}
          >
            <div id="calcContents">
            <label for="densityValue">Density:&nbsp;</label>
            <input type="number" steps="0.01" id="densityValue" placeHolder={density}></input>
            <span>&nbsp;g/cc&nbsp;</span>
            {/* <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreDensity(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreDensity(false)}
              value="-"
            /> */}
            <br />
            <span id="weightLabel">Weight</span>:&nbsp;<span id="weightValue"></span>
            &nbsp;g
            <br />
            <span id="volumeLabel">Volume</span>:&nbsp;<span id="volumeValue"></span>
            &nbsp;cm3
            <br />
            <span id="sizeLabel">Dimensions</span>:&nbsp;<span id="widthValue"></span>
            &nbsp;x&nbsp;
            <span id="heightValue"></span>&nbsp;x&nbsp;
            <span id="depthValue"></span>&nbsp;cm
            <br />
            <hr className="separator" />
            <span id="costKilogramLabel">Filament Cost</span>:&nbsp;$
            <span id="costKilogramValue"></span>&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreCost(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreCost(false)}
              value="-"
            />
            <br />
            <span id="costLabel">Printing Cost</span>:&nbsp;$<span id="costValue"></span>
            <br />
            <hr className="separator" />
            <span id="diameterLabel">Filament Diameter</span>:&nbsp;
            <span id="diameterValue"></span>&nbsp;mm&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreDiameter(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreDiameter(false)}
              value="-"
            />
            <br />
            <span id="speedLabel">Print Speed</span>:&nbsp;<span id="speedValue"></span>
            &nbsp;mm/s&nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreSpeed(true)}
              value="+"
            />
            &nbsp;
            <input
              type="submit"
              className="buttonChanger"
              onClick={() => moreSpeed(false)}
              value="-"
            />
            <br />
            <span id="lengthLabel">Filament Length</span>:&nbsp;<span id="lengthValue"></span>
            &nbsp;mm
            <br />
            <span id="timeLabel">Print Time</span>:&nbsp;<span id="hoursValue"></span>
            &nbsp;
            <span id="hoursLabel">hrs</span>&nbsp;<span id="minutesValue"></span>
            &nbsp;
            <span id="minutesLabel">mins</span>
            <br />
            </div>
            </Frame>
          </div>
        </div>
      </div>
    )
  }
}

export default ModelViewer
