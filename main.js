

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let mixer,mixer2;
let car, ambulance,crash;
let isAnimationStarted = false; // Controls animation start



const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 5, 20);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 220;
controls.maxDistance = 1000;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.autoRotate = false;
controls.update();

// Lighting
const spotLight = new THREE.DirectionalLight(0xffffff, 4);
spotLight.position.set(50000, 50000, 50000);
scene.add(spotLight);

// Load 3D Model
const loader = new GLTFLoader().setPath('public/background/');
loader.load(
  'untitled.gltf',
  (gltf) => {
    console.log('Loading model...');
    console.log(gltf.animations);

    const mesh = gltf.scene;
    mixer = new THREE.AnimationMixer(mesh);
    mixer2 = new THREE.AnimationMixer(mesh);

    
      car = mixer.clipAction(gltf.animations[80]);
      ambulance = mixer2.clipAction(gltf.animations[0]);
    

    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.position.set(0, 0, 0);
    mesh.rotation.y = 0.5;
    scene.add(mesh);

    document.getElementById('progress-container').style.display = 'none';
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

// Window Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation Button
document.getElementById('start-animation').addEventListener('click', () => {
  crash = "Car is crashed person is not movable so it say help me device recive command and ask How can i help yor preson say help help help and help msg send to givan contect number and ambulance ";
  displaytext(crash);
  if (!isAnimationStarted && mixer) {
    isAnimationStarted = true;

    // Start animations
    if (car) car.play();
    if (ambulance) ambulance.play();

    // Pause car animation after 2 seconds
    setTimeout(() => {
      if (car) car.paused = true;
    }, 6000);

    // Pause ambulance animation after 6 seconds
    setTimeout(() => {
      if (ambulance) ambulance.paused = true;

      crash = "Ambulance came for help thanks for being with us stay safe stay happy";
      displaytext(crash);
    }, 15000);
  }
});

// Animation Loop (Runs continuously)
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  
  if (isAnimationStarted && mixer) {
    mixer.update(0.04);
    
  }
  if (isAnimationStarted && mixer2) {
    mixer2.update(0.04);
    
  }
}

animate(); // Start rendering immediately

function displaytext(crash){
document.getElementById('textarea').innerHTML = crash

}