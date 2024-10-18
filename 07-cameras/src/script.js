// import './style.css'
// import * as THREE from 'three'


// // Cursor

// const cursor = {
//     x: 0,
//     y: 0
// }

// window.addEventListener('mousemove',(event)=>{
//   cursor.x = event.clientX/sizes.width - 0.5
//   cursor.y = -(event.clientY/sizes.height - 0.5)
// })

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Sizes
// const sizes = {
//     width: 800,
//     height: 600
// }

// // Scene
// const scene = new THREE.Scene()

// // Object
// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// scene.add(mesh)

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// // const aspectRatio = sizes.width / sizes.height
// // const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000)
// // camera.position.x = 2
// // camera.position.y = 2
// camera.position.z = 2
// camera.lookAt(mesh.position)
// scene.add(camera)

// const controls = new OrbitControls(camera,canvas)

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)

// // Animate
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update objects
//     // mesh.rotation.y = elapsedTime;

//     // Update the camera

//     // camera.position.x = cursor.x*3;
//     // camera.position.y = cursor.y*3;

//     camera.position.x = Math.sin(cursor.x * 10)*3
//     camera.position.y = Math.cos(cursor.y * 10)*3 
//     camera.lookAt(mesh.position);

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()



import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Cursor
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight }

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x1e1e1e)
scene.fog = new THREE.Fog(0x1e1e1e, 1, 10)

// Create textures with letters for each face
const createLetterTexture = (letter) => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')

  // Background color and styling
  context.fillStyle = '#000000'
  context.fillRect(0, 0, 256, 256)

  // Text styling
  context.font = 'bold 150px Arial'
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(letter, 128, 128)

  return new THREE.CanvasTexture(canvas)
}

// Object (Cube with letters)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const materials = [
  new THREE.MeshBasicMaterial({ map: createLetterTexture('K') }), // Front face
  new THREE.MeshBasicMaterial({ map: createLetterTexture('U') }), // Back face
  new THREE.MeshBasicMaterial({ map: createLetterTexture('S') }), // Top face
  new THREE.MeshBasicMaterial({ map: createLetterTexture('H') }), // Bottom face
  new THREE.MeshBasicMaterial({ map: createLetterTexture('A') }), // Right face
  new THREE.MeshBasicMaterial({ map: createLetterTexture('L') }), // Left face
]
const mesh = new THREE.Mesh(geometry, materials)
scene.add(mesh)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls (Orbit)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Handle window resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
})

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update object rotation
  mesh.rotation.y = elapsedTime * 0.5
  mesh.rotation.x = elapsedTime * 0.5

  // Update camera position based on cursor
  camera.position.x = Math.sin(cursor.x * Math.PI) * 3
  camera.position.y = Math.cos(cursor.y * Math.PI) * 3
  camera.lookAt(mesh.position)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
