/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";

export function line() {
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

    const points = [];
    // point 1 
    points.push( new THREE.Vector3(-10, 0, 0 ));
    // point 2 ( point1 - point2 연결)
    points.push( new THREE.Vector3(0, 10, 0 ));
    // point 3 ( point2 - point3 연결)
    points.push( new THREE.Vector3(10, 0, 0 ));
    // point 4 ( point3 - point4 연결)
    points.push( new THREE.Vector3(0, -10, 0 ));
    // point 1 ( point4 - point1 연결)
    points.push( new THREE.Vector3(-10, 0, 0 ));

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial({ color: 0xfffafa });
    const line = new THREE.Line( geometry, material );

    const ambientLight = new THREE.AmbientLight('white', 1); // 색상, 강도 

    scene.add(line);
    scene.add(ambientLight);

    camera.position.z = 20;

    function animate() {
      requestAnimationFrame(animate);
      line.rotation.z += 0.015;
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