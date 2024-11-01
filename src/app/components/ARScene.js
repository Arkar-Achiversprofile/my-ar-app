// components/ARScene.js
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ARScene = () => {
  const sceneRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Add a light
    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    // Load tree model (assuming you have a glTF model)
    const loader = new THREE.GLTFLoader();
    loader.load('/path/to/your/tree-model.glb', (gltf) => {
      scene.add(gltf.scene);
    });

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // components/ARScene.js (continued)
useEffect(() => {
  const xrSession = navigator.xr.requestSession('immersive-ar', {
    requiredFeatures: ['hit-test']
  });

  xrSession.then((session) => {
    session.addEventListener('end', onSessionEnded);
    renderer.xr.setSession(session);
  });

  function onSessionEnded() {
    // Handle session end
  }

  // Hit testing
  const hitTestSource = null;

  session.requestHitTestSource({ space: viewerSpace }).then((source) => {
    hitTestSource = source;
  });

  // Update loop for hit testing
  const updateHitTest = () => {
    if (hitTestSource) {
      // Perform hit testing and place the tree model
    }
  };

  return () => {
    if (xrSession) {
      xrSession.end();
    }
  };
}, []);

  return <div ref={sceneRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ARScene;