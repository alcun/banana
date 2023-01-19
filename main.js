import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";



//sound
const audio = document.querySelector("audio");
window.addEventListener("click", () => {
  audio.volume = 1;
  audio.play();
});



//scene
const scene = new THREE.Scene();

//Load background texture
const bgLoader = new THREE.TextureLoader();
bgLoader.load(
  "/space.jpeg",
  function (texture) {
    scene.background = texture;
  }
);

//sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//   color: 'yellow'
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

//banana - https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
//shouts out ejderhan-sarp34 on cgtrader


const objLoader = new GLTFLoader();

objLoader.load(
  "/banana.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new THREE.PointLight(0xffffff, 3, 1000);
const light2 = new THREE.PointLight(0xffffff, 3, 1000);
light.position.set(0, 10, 10);
light2.position.set(0, -10, -10);

scene.add(light);
scene.add(light2);

//camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resize on window change
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  console.log(sizes);

  //move camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// const timeline1 = gsap.timeline({ defaults: { duration: 1 } });
// timeline1.fromTo;
