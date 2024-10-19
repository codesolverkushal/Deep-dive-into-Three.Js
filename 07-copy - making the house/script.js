// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
ground.receiveShadow = true;
scene.add(ground);

// House: Walls
const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4);
const wallsMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown walls
const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
walls.position.y = 1.25;
walls.castShadow = true;
walls.receiveShadow = true;
scene.add(walls);

// House: Roof
const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xB22222 }); // Red roof
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 3.5;
roof.rotation.y = Math.PI / 4;
roof.castShadow = true;
scene.add(roof);

// House: Door (Interactive)
const doorGeometry = new THREE.BoxGeometry(1, 1.5, 0.1);
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // Wooden door
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0.75, 2.05);
door.castShadow = true;
scene.add(door);

// Door interaction with Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isDoorHovered = false;
let doorOpen = false;

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(door);

    if (intersects.length > 0) {
        isDoorHovered = true;
    } else {
        isDoorHovered = false;
    }
});

// Door open/close logic
function handleDoor() {
    if (isDoorHovered && !doorOpen) {
        if (door.rotation.y > -Math.PI / 2) {
            door.rotation.y -= 0.05;
        } else {
            doorOpen = true;
        }
    } else if (!isDoorHovered && doorOpen) {
        if (door.rotation.y < 0) {
            door.rotation.y += 0.05;
        } else {
            doorOpen = false;
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    handleDoor();

    renderer.render(scene, camera);
}

animate();

// Resize window handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Camera positioning
camera.position.set(6, 4, 8);
camera.lookAt(0, 1.25, 0);
