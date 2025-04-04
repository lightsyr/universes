import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-three.prod.js";

const mindarThree = new MindARThree({
  container: document.body,
  imageTargetSrc: "./targets.mind", // Substitua pelo seu arquivo .mind
});

const { renderer, scene, camera } = mindarThree;


const anchor = mindarThree.addAnchor(0);

const axesHelper = new THREE.AxesHelper(1);
anchor.group.add(axesHelper);

// Cubo 3D
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.25, 0); // centraliza o cubo acima da imagem

anchor.group.add(cube);

// Debug de detecção
anchor.onTargetFound = () => {
  console.log("🎯 Imagem detectada!");
};

anchor.onTargetLost = () => {
  console.log("🚫 Imagem perdida!");
};

// Começa AR
const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    renderer.render(scene, camera);
  });
};

start();
