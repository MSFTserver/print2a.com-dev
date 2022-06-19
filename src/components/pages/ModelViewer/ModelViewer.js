/* eslint-disable react/prefer-stateless-function */
import './ModelViewer.scss'
import React from 'react'
import { Frame, Heading, Link, Words } from 'arwes'
import * as THREE from 'three';
import { OrbitControls, STLExporter, STLLoader, TDSLoader, OBJLoader } from './three.js'

const STRING_ERROR =
  'ERROR: Please check that the model is a STL, OBJ or 3DS model.'

const modelContainer = document.getElementById('modelContainer')

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100000,
)
camera.position.z = 300
camera.position.y = -500
camera.position.x = -500
camera.up = new THREE.Vector3(0, 0, 1)

let vol = 0

const renderer = new THREE.WebGLRenderer({ antialias: false })
renderer.setSize(window.innerWidth, window.innerHeight)

let controls
let light
let mesh
let height
let width
let depth

let density = parseFloat('1.05')
const filamentCost = parseFloat('20')
const filamentDiameter = parseFloat('1.75')
const printingSpeed = parseFloat('150')

function animate() {
  requestAnimationFrame(animate)
  light.position.copy(camera.getWorldPosition())
  renderer.render(scene, camera)
}

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

function moreDensity(increaseDensity) {
  let result
  if (increaseDensity === true) {
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

  document.getElementById('densityValue').innerHTML = density
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
    result = parseFloat(filament_cost) + parseFloat('1')
    if (result <= 10000) {
      filament_cost = result
    }
  } else {
    result = parseFloat(filament_cost) - parseFloat('1')
    if (result > 0) {
      filament_cost = result
    }
  }
  document.getElementById('costKilogramValue').innerHTML = filament_cost

  updateCost()
}

function moreDiameter(increaseDiameter) {
  let result
  if (increaseDiameter === true) {
    result = parseFloat(filament_diameter) + parseFloat('0.01')
    if (result <= 10000) {
      filament_diameter = result
    }
  } else {
    result = parseFloat(filament_diameter) - parseFloat('0.01')
    if (result > 0) {
      filament_diameter = result
    }
  }

  filament_diameter = parseFloat(filament_diameter).toFixed(2)

  let filament_length = parseFloat(
    (((vol / (filament_diameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filament_length = parseFloat(filament_length).toFixed(0)

  let hours = Math.floor(filament_length / printing_speed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filament_length / printing_speed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes == 0) {
    minutes = 1
  }

  document.getElementById('diameterValue').innerHTML = filament_diameter
  document.getElementById('lengthValue').innerHTML = filament_length
  document.getElementById('hoursValue').innerHTML = hours
  document.getElementById('minutesValue').innerHTML = minutes
}

function moreSpeed(increaseSpeed) {
  let result
  if (increaseSpeed == true) {
    result = parseFloat(printing_speed) + parseFloat('1')
    if (result <= 10000) {
      printing_speed = result
    }
  } else {
    result = parseFloat(printing_speed) - parseFloat('1')
    if (result > 0) {
      printing_speed = result
    }
  }

  printing_speed = parseFloat(printing_speed).toFixed(0)

  const filament_length = parseFloat(
    (((vol / (filament_diameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)

  let hours = Math.floor(filament_length / printing_speed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filament_length / printing_speed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  document.getElementById('speedValue').innerHTML = printing_speed
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
    console.log('EXT: ', fileExt)
    alert(STRING_ERROR)
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
  geometry.computeFaceNormals()
  geometry.computeVertexNormals()
  geometry.center()

  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    emissive: 0x000000,
    emissiveIntensity: 2,
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

  let filament_length = parseFloat(
    (((vol / (filament_diameter / 2)) ^ (2 / Math.PI)) * 2) / 10,
  ).toFixed(2)
  filament_length = parseFloat(filament_length).toFixed(0)

  let hours = Math.floor(filament_length / printing_speed / 60)
  hours = parseFloat(hours).toFixed(0)

  let minutes = (filament_length / printing_speed) % 60
  minutes = parseFloat(minutes).toFixed(0)

  if (minutes == 0) {
    minutes = 1
  }

  let finalCost = (weightFinal * filament_cost) / 1000
  finalCost = parseFloat(finalCost).toFixed(2)

  document.getElementById('weightValue').innerHTML = weightFinal
  document.getElementById('volumeValue').innerHTML = volumeFinal
  document.getElementById('widthValue').innerHTML = widthFinal
  document.getElementById('depthValue').innerHTML = depthFinal
  document.getElementById('heightValue').innerHTML = heightFinal
  document.getElementById('costValue').innerHTML = finalCost
  document.getElementById('lengthValue').innerHTML = filament_length
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

  const x = distance + 200
  const y = distance + 200
  const division_x = Math.floor(x / 10)
  const division_y = Math.floor(y / 10)

  // AN ALTERNATIVE FOR MOVING THE OBJECT USING THE MOUSE WITHIN THE RENDERER
  controls = new OrbitControls(camera, renderer.domElement)
  // controls = new OrbitControls(camera);
  function animateSpin() {
    controls.update()
    requestAnimationFrame(animateSpin)
    renderer.render(scene, camera)
  }
  controls.update()
  console.log(controls)
  scene.add(mesh)
  controls.autoRotate = true
  animateSpin()
  // HIDDING THE LOADING SPLASH
  document.getElementById('loading').style.display = 'none'

  light = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
  light.position.set(0, 1, 0)
  scene.add(light)

  modelContainer.appendChild(renderer.domElement)

  requestAnimationFrame(animate)

  window.addEventListener('resize', onWindowResize, false)
}

class ModelViewer extends React.Component {
  async componentDidMount() {
    console.log('MOUNTED!')
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
    document.getElementById('densityValue').innerHTML = density
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
