/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function cube() {
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75, // 시야각
      window.innerWidth / window.innerHeight, // 종횡비
      0.1,  // near
      1000  // far
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    canvasRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 높이
    const material = new THREE.MeshPhongMaterial({ color: 0x98fb98 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 2, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1); // 색상, 강도 
    light.position.set(-1, 2, 1);

    scene.add(cube);
    scene.add(light);

    // 카메라 X, Y, Z 위치를 이동
    camera.position.set(2, 5, 5);
    camera.lookAt(cube.position);

    // 평면 생성
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshToonMaterial({color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // 평면을 바닥으로 위치
    plane.rotation.x = Math.PI * -0.5;
    plane.position.set(0, -1, 0);

    scene.add(plane);

    // 장면에 X, Y, Z 축을 표시 (X : Red, Y : Green, Z : Blue) 
    const axes = new THREE.AxesHelper(5);
    scene.add(axes);

    // 그림자 활성화 및 그림자 타입 지정
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 그림자 생성 개체 지정
    cube.castShadow = true;
    light.castShadow = true;
    // 바닥에 그림자 받기
    plane.receiveShadow = true;

    // 컨트롤 생성
    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      // 큐브 회전
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.005;

      controls.update();
      renderer.render(scene, camera);
    };

    // 브라우져 호환성검사
    if ( WebGL.isWebGLAvailable()) {
      animate();
    }
    else {
      const warning = WebGL.getWebGLErrorMessage();
      canvasRef.current?.appendChild( warning );
    }

    return () => canvasRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={canvasRef} />;
}