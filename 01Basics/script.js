const scene = new THREE.Scene();


// Red Cube


const geomentry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geomentry,material);

scene.add(mesh);

// Camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;
scene.add(camera);


// Renderer

const canvas = document.querySelector('.webgl');
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
    canvas:canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene,camera);