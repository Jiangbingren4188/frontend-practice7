const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1b2a);
scene.fog = new THREE.Fog(0x0d1b2a, 6, 18);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(4, 3, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const spot = new THREE.SpotLight(0xffffff, 1.6, 20, Math.PI / 6, 0.4, 1);
spot.position.set(0, 8, 2);
scene.add(spot);

const rim = new THREE.PointLight(0x4fc3f7, 0.9, 12);
rim.position.set(-3, 2, -2);
scene.add(rim);

const stage = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2.2, 0.3, 48),
  new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.7, metalness: 0.3 })
);
stage.position.y = -0.15;
scene.add(stage);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.9, 0.05, 16, 64),
  new THREE.MeshStandardMaterial({ color: 0xffd54f, metalness: 0.9, roughness: 0.2 })
);
ring.rotation.x = Math.PI / 2;
ring.position.y = 0.01;
scene.add(ring);

const sword = new THREE.Group();

const blade = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 2.4, 0.04),
  new THREE.MeshStandardMaterial({ color: 0xeceff1, metalness: 0.95, roughness: 0.15 })
);
blade.position.y = 1.6;
sword.add(blade);

const tip = new THREE.Mesh(
  new THREE.ConeGeometry(0.09, 0.32, 4),
  new THREE.MeshStandardMaterial({ color: 0xeceff1, metalness: 0.95, roughness: 0.15 })
);
tip.position.y = 2.96;
tip.rotation.y = Math.PI / 4;
sword.add(tip);

const guard = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 0.12, 0.16),
  new THREE.MeshStandardMaterial({ color: 0xffd54f, metalness: 0.9, roughness: 0.25 })
);
guard.position.y = 0.36;
sword.add(guard);

const grip = new THREE.Mesh(
  new THREE.CylinderGeometry(0.07, 0.07, 0.6, 16),
  new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.8 })
);
grip.position.y = -0.06;
sword.add(grip);

const pommel = new THREE.Mesh(
  new THREE.SphereGeometry(0.12, 24, 24),
  new THREE.MeshStandardMaterial({ color: 0xffd54f, metalness: 0.9, roughness: 0.25 })
);
pommel.position.y = -0.42;
sword.add(pommel);

scene.add(sword);

const gems = new THREE.Group();
const gemColors = [0x4fc3f7, 0xffb74d, 0xef5350];
for (let i = 0; i < 3; i++) {
  const angle = (i / 3) * Math.PI * 2;
  const gem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.MeshStandardMaterial({
      color: gemColors[i], emissive: gemColors[i], emissiveIntensity: 0.6,
      metalness: 0.3, roughness: 0.2
    })
  );
  gem.position.set(Math.cos(angle) * 1.3, 0.9, Math.sin(angle) * 1.3);
  gem.userData.angle = angle;
  gems.add(gem);
}
scene.add(gems);

const clock = new THREE.Clock();
const animate = () => {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  sword.rotation.y = t * 0.4;
  sword.position.y = Math.sin(t * 1.2) * 0.08;
  gems.rotation.y = -t * 0.3;
  gems.children.forEach((g, i) => {
    g.position.y = 0.9 + Math.sin(t * 2 + i * 2) * 0.15;
    g.rotation.x = t * 1.5;
    g.rotation.z = t;
  });
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
