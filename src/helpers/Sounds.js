import startSound from './assets/sounds/start.mp3'
import clickSound from './assets/sounds/click.mp3'
import typingSound from './assets/sounds/typing.mp3'
import deploySound from './assets/sounds/deploy.mp3'
import hoverSound from './assets/sounds/hover.mp3'
import expandSound from './assets/sounds/expand.mp3'
import fadeSound from './assets/sounds/fade.mp3'

export default {
  shared: { volume: 0.3 },
  players: {
    start: {
      sound: { src: [startSound] },
      volume: 0.15,
    },
    click: {
      sound: { src: [clickSound] },
      settings: { oneAtATime: true },
    },
    typing: {
      sound: { src: [typingSound] },
      settings: { oneAtATime: true },
    },
    deploy: {
      sound: { src: [deploySound] },
      settings: { oneAtATime: true },
    },
    hover: {
      sound: { src: [hoverSound] },
      settings: { oneAtATime: true },
    },
    expand: {
      sound: { src: [expandSound] },
      settings: { oneAtATime: true },
    },
    fade: {
      sound: { src: [fadeSound] },
      settings: { oneAtATime: true },
    },
  },
}
