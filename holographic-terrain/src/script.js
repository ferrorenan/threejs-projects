import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BoxGeometry, MeshBasicMaterial } from 'three';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const box = new THREE.Mesh(
    new BoxGeometry(1,1,1),
    new MeshBasicMaterial({
        color: 0xdcc3423
    })
);
scene.add(box);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const clock = new THREE.Clock();

const tick = () => {

    box.rotation.x = clock.getElapsedTime();
    box.rotation.z = clock.getElapsedTime();

    renderer.render(scene, camera);

    controls.update();

    window.requestAnimationFrame(tick);
}

tick();