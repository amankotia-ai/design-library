import * as THREE from '/vendor/three.module.js';
import { tween, ease } from '/lib/time.js';
const meta = { title: 'Runtime calibration — replace with your film', width: 1920, height: 1080, fps: 30, durationFrames: 90 };
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#world'), antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(meta.width, meta.height, false);
renderer.setClearColor('#e9e7df', 1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, meta.width / meta.height, .1, 100);
camera.position.set(0, 0, 9);
scene.add(new THREE.HemisphereLight(0xffffff, 0x3e6853, 2));
const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(-3, 4, 5); scene.add(key);
const material = new THREE.MeshStandardMaterial({ color: '#2d6b53', roughness: .25, metalness: .3 });
const cube = new THREE.Mesh(new THREE.BoxGeometry(2.05, 2.05, .34), material);
cube.position.x = 2; scene.add(cube);
const label = document.querySelector('#label'), counter = document.querySelector('#counter');
function renderAt(frame) {
  if (!Number.isFinite(frame)) throw new Error('renderAt expects a finite frame');
  cube.rotation.set(tween(frame, 0, 89, -.2, .2, ease.smooth), tween(frame, 0, 89, -.7, .6, ease.smooth), -.08);
  cube.position.y = tween(frame, 0, 24, -.3, .1);
  label.style.opacity = tween(frame, 0, 18).toFixed(5);
  label.style.transform = `translateY(${tween(frame, 0, 24, 25, 0)}px)`;
  counter.textContent = `Frame ${frame.toFixed(2)} / ${meta.durationFrames - 1}`;
  renderer.render(scene, camera);
}
const ready = Promise.all([document.fonts.ready, renderer.compileAsync(scene, camera)]).then(() => renderAt(0));
window.film = { meta, ready, renderAt };
