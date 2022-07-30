window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // サイズ
  const SIZE = 300;
  // パーティクルを配置する個数
  const LENGTH = 1000;
  // 頂点情報を格納する配列
  const vertices = [];
  for (let i = 1; i < LENGTH; i++) {
    const x = SIZE * (Math.random() - 0.5);
    const y = SIZE * (Math.random() - 0.5);
    const z = SIZE * (Math.random() - 0.5);

    vertices.push(x, y, z);
  }

  // 球を作成
  const geometry = new THREE.SphereGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
//   const material = new THREE.MeshStandardMaterial({color: 0x0000FF});

const loader = new THREE.TextureLoader();
const texture = loader.load('texture.png');

const material =new THREE.PointsMaterial({
    map:texture,
    color:0xFF0000,
    size:3,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false
});

var sphere = new THREE.Points(geometry,material);
scene.add(sphere);

  // 平行光源
  const light = new THREE.DirectionalLight(0xFFFFFF);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}