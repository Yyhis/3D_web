/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";

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
    const material = new THREE.MeshBasicMaterial({ color: 0xfffafa });
    const cube = new THREE.Mesh(geometry, material);
  
    const ambientLight = new THREE.AmbientLight('white', 1); // 색상, 강도 

    scene.add(cube);
    scene.add(ambientLight);

    // 카메라 X, Y, Z 위치를 이동
    camera.position.set(2, 8, 5);
    camera.lookAt(cube.position);

    // 장면에 X, Y, Z 축을 표시 (X : Red, Y : Green, Z : Blue) 
    const axes = new THREE.AxesHelper(5);
    scene.add(axes);

    function animate() {
      requestAnimationFrame(animate);
      // 큐브 회전
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.005;
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