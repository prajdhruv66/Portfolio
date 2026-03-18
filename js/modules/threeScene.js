/* ============================================================
   THREE.JS — 3D FLOATING SCENE
   ============================================================ */

export function initThree() {
  const canvas = document.getElementById('three-canvas');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 18);

  // ── Lighting ──
  scene.add(new THREE.AmbientLight(0x00ffe0, 0.4));

  const pt1 = new THREE.PointLight(0x00ffe0, 2.5, 60);
  pt1.position.set(10, 10, 8);
  scene.add(pt1);

  const pt2 = new THREE.PointLight(0x7b2fff, 2, 50);
  pt2.position.set(-8, -6, 6);
  scene.add(pt2);

  const pt3 = new THREE.PointLight(0xff6b35, 1.2, 40);
  pt3.position.set(4, -10, 4);
  scene.add(pt3);

  // ── Wireframe material helper ──
  const wm = (color) => new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });

  // ── Floating objects ──
  const objects = [];

  function addObj(geo, mat, pos) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.009,
      ry: (Math.random() - 0.5) * 0.013,
      rz: (Math.random() - 0.5) * 0.006,
      fs: Math.random() * 0.5 + 0.3,
      fa: Math.random() * 0.35 + 0.15,
      iy: pos[1],
      ph: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    objects.push(mesh);
  }

  // Icosahedrons — data-brain vibe
  addObj(new THREE.IcosahedronGeometry(2.8, 1), wm(0x00ffe0), [-9,  2, -5]);
  addObj(new THREE.IcosahedronGeometry(1.6, 1), wm(0x7b2fff), [ 8, -4, -2]);
  addObj(new THREE.IcosahedronGeometry(1.1, 1), wm(0x00ffe0), [ 5,  5, -7]);

  // Octahedrons — ML graph nodes
  addObj(new THREE.OctahedronGeometry(2.2, 0), wm(0x7b2fff), [-6, -5, -3]);
  addObj(new THREE.OctahedronGeometry(1.3, 0), wm(0xff6b35), [ 3,  7, -8]);

  // Toruses — frontend rings
  addObj(new THREE.TorusGeometry(2.2, 0.4, 8, 24), wm(0x00ffe0), [ 7,  6, -5]);
  addObj(new THREE.TorusGeometry(1.6, 0.3, 6, 20), wm(0xff6b35), [-5,  7, -4]);
  addObj(new THREE.TorusGeometry(1.2, 0.25, 6, 18), wm(0x7b2fff), [ 0, -9, -6]);

  // Tetrahedrons
  addObj(new THREE.TetrahedronGeometry(1.9, 0), wm(0x00ffaa), [-11, 0, -6]);
  addObj(new THREE.TetrahedronGeometry(1.3, 0), wm(0xff6b35), [  2, -6, -5]);

  // Dodecahedron
  addObj(new THREE.DodecahedronGeometry(1.8, 0), wm(0x7b2fff), [-3, 8, -7]);

  // Glowing accent dots
  const accentColors = [0x00ffe0, 0x7b2fff, 0xff6b35];
  for (let i = 0; i < 14; i++) {
    const g   = new THREE.SphereGeometry(0.1, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: accentColors[i % 3],
      transparent: true,
      opacity: 0.75
    });
    addObj(g, mat, [
      (Math.random() - 0.5) * 24,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10 - 2
    ]);
  }

  // ── Particle field ──
  const particleGeo = new THREE.BufferGeometry();
  const pCount = 700;
  const pPositions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) {
    pPositions[i] = (Math.random() - 0.5) * 65;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  scene.add(new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.055, transparent: true, opacity: 0.35 })
  ));

  // ── Mouse & scroll tracking ──
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let scrollY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Animation loop ──
  const clock = new THREE.Clock();

  (function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    // Camera parallax + scroll drift
    camera.position.x = targetX * 2;
    camera.position.y = -targetY * 1.5 - scrollY * 0.003;
    camera.lookAt(0, -scrollY * 0.002, 0);

    // Rotate & float each object
    objects.forEach((obj) => {
      const d = obj.userData;
      obj.rotation.x += d.rx;
      obj.rotation.y += d.ry;
      obj.rotation.z += d.rz;
      obj.position.y = d.iy + Math.sin(t * d.fs + d.ph) * d.fa;
    });

    // Orbiting lights
    pt1.position.x = Math.sin(t * 0.3)  * 12;
    pt1.position.z = Math.cos(t * 0.3)  * 12;
    pt2.position.x = Math.cos(t * 0.22) * 10;
    pt2.position.z = Math.sin(t * 0.22) * 10;
    pt3.position.y = Math.sin(t * 0.18) *  8;

    renderer.render(scene, camera);
  })();
}
