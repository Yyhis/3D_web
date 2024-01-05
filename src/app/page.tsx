"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

export default function Home() {
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

    const geometry = new THREE.BoxGeometry(10, 10, 10); // 가로, 세로, 높이
    const material = new THREE.MeshBasicMaterial({ color: 0xfffafa });
    const cube = new THREE.Mesh(geometry, material);

    const ambientLight = new THREE.AmbientLight('white', 1); // 색상, 강도 

    scene.add(cube);
    scene.add(ambientLight);

    camera.position.z = 20;

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

 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div>
          <h1 className="text-center">3D Web</h1>
        </div>
        <div>
          <div ref={canvasRef} />
        </div>
      </div>

    </main>
  )
}
