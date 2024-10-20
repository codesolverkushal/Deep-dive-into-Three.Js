import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1,1,1,1)



const vertices = new Float32Array([
    0, 0, 0,    // Vertex 1: (x, y, z) = (0, 0, 0)
    0, 1, 0,    // Vertex 2: (x, y, z) = (0, 1, 0)
    1, 0, 0     // Vertex 3: (x, y, z) = (1, 0, 0)
 ]);
 
// const vertices = new Float32Array([
//     // First triangle (top-left, bottom-left, bottom-right)
//     -1.0,  1.0, 0.0,  // Vertex 1: Top-left
//     -1.0, -1.0, 0.0,  // Vertex 2: Bottom-left
//      1.0, -1.0, 0.0,  // Vertex 3: Bottom-right

//     // Second triangle (top-left, bottom-right, top-right)
//     -1.0,  1.0, 0.0,  // Vertex 4: Top-left (reused)
//      1.0, -1.0, 0.0,  // Vertex 5: Bottom-right (reused)
//      1.0,  1.0, 0.0   // Vertex 6: Top-right
// ]);

 // Create the position attribute with the vertices
 const positionsAttribute = new THREE.BufferAttribute(vertices, 3);
 
 // Create BufferGeometry and set its 'position' attribute
 const geometry = new THREE.BufferGeometry();
 geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
 })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate


const tick = () =>
{

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()