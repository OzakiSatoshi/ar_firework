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

  // 箱を作成
  const geometry = new THREE.SphereGeometry(200, 200, 200);
//   const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
  
//texture：パーティクル用画像
//color：花火の色
//size：パーティクル一つ一つの大きさ
//blending：光った感じにしたいので加算合成
//geometry：花火の爆発する瞬間の形状を指定。爆発後の挙動は他でごにょごにょしてる。
//scene：花火を配置する3DのScene

const loader = new THREE.TextureLoader();
const texture = loader.load('texture.png');

const material =new THREE.PointsMaterial({
    map:texture,
    color:0x888888,
    size:30,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false
});

// var particlebos = new THREE.Points(geometry,material);
// scene.add(particles);

var sphere = new THREE.Points(geometry,material);
scene.add(sphere);

//   const box = new THREE.Mesh(geometry, material);
//   scene.add(box);

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