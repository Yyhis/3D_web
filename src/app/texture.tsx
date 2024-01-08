/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";

export function background() {
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

    const loader = new THREE.TextureLoader();
    const texture = loader.load('../models/background/star.jpg')
    scene.background = texture;

    const ambientLight = new THREE.AmbientLight('white', 1); // 색상, 강도 
    scene.add(ambientLight);

    camera.position.z = 20;

    // Responsive window size set
    window.addEventListener( 'resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize( window.innerWidth, window.innerHeight );
    })

    function animate() {
      requestAnimationFrame(animate);
      camera.updateProjectionMatrix();

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