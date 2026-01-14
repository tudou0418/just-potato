'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Character3DProps {
  modelPath?: string;
}

const Character3D = ({ modelPath = '/models/character.glb' }: Character3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentAnim, setCurrentAnim] = useState('待机');
  const [animationType, setAnimationType] = useState<'idle' | 'wave' | 'dance' | 'happy'>('idle');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let character: THREE.Group | null = null;
    let rightArmMesh: THREE.Mesh | null = null;
    let headMesh: THREE.Mesh | null = null;

    const createProceduralCharacter = () => {
      const group = new THREE.Group();

      const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x60a5fa,
        metalness: 0.3,
        roughness: 0.4
      });
      
      const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.5
      });

      const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1e40af,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.5
      });

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1.2, 0.8),
        bodyMaterial
      );
      body.position.y = 0;
      group.add(body);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        headMaterial
      );
      head.position.y = 1.2;
      headMesh = head;
      group.add(head);

      const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        eyeMaterial
      );
      leftEye.position.set(-0.2, 1.3, 0.4);
      group.add(leftEye);

      const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        eyeMaterial
      );
      rightEye.position.set(0.2, 1.3, 0.4);
      group.add(rightEye);

      const antennaBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.4),
        bodyMaterial
      );
      antennaBase.position.y = 1.7;
      group.add(antennaBase);

      const antennaBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        eyeMaterial
      );
      antennaBall.position.y = 1.95;
      group.add(antennaBall);

      const leftArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.8, 0.3),
        bodyMaterial
      );
      leftArm.position.set(-0.7, 0.2, 0);
      group.add(leftArm);

      const rightArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.8, 0.3),
        bodyMaterial
      );
      rightArm.position.set(0.7, 0.2, 0);
      rightArmMesh = rightArm;
      group.add(rightArm);

      group.scale.set(1.5, 1.5, 1.5);
      return group;
    };

    const loadModel = async () => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();

        loader.load(
          modelPath,
          (gltf) => {
            character = gltf.scene;
            character.scale.set(2, 2, 2);
            scene.add(character);
            setIsLoading(false);
            console.log('Model loaded successfully');
          },
          (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            console.log(`Loading: ${percent.toFixed(2)}%`);
          },
          (err) => {
            console.log('Model file not found, using procedural character');
            character = createProceduralCharacter();
            scene.add(character);
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.log('GLTFLoader not available, using procedural character');
        character = createProceduralCharacter();
        scene.add(character);
        setIsLoading(false);
      }
    };

    loadModel();

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (character) {
        const time = Date.now() * 0.001;
        
        character.rotation.y += 0.005;
        character.rotation.x += (mouseY * 0.3 - character.rotation.x) * 0.05;
        character.rotation.y += (mouseX * 0.3 - character.rotation.y) * 0.05;

        if (animationType === 'idle') {
          character.position.y = 0;
          if (rightArmMesh) rightArmMesh.rotation.z = 0;
          if (headMesh) headMesh.rotation.y = 0;
        } else if (animationType === 'wave') {
          character.position.y = 0;
          if (rightArmMesh) {
            rightArmMesh.rotation.z = Math.sin(time * 8) * 0.5;
          }
        } else if (animationType === 'dance') {
          character.position.y = Math.sin(time * 4) * 0.2;
          character.rotation.z = Math.sin(time * 4) * 0.1;
        } else if (animationType === 'happy') {
          character.position.y = Math.sin(time * 6) * 0.1;
          if (headMesh) {
            headMesh.rotation.y = Math.sin(time * 6) * 0.3;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath, animationType]);

  const animations = ['待机', '打招呼', '跳舞', '开心'];

  const handleAnimationChange = (anim: string) => {
    setCurrentAnim(anim);
    const newType = anim === '待机' ? 'idle' : anim === '打招呼' ? 'wave' : anim === '跳舞' ? 'dance' : 'happy';
    setAnimationType(newType);
    console.log('Animation changed to:', anim, 'Type:', newType);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {!isLoading && !error && showMenu && (
        <div className="mb-4 flex flex-col gap-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-ui-surface/90 backdrop-blur-md p-4 rounded-2xl shadow-brand border border-ui-border max-w-[200px]">
            <p className="text-[10px] font-bold text-brand mb-2 px-1 uppercase tracking-widest">角色动作</p>
            <div className="grid grid-cols-1 gap-2">
              {animations.map((anim) => (
                <button
                  key={anim}
                  onClick={() => handleAnimationChange(anim)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl transition-all truncate text-left ${
                    currentAnim === anim
                      ? 'bg-brand text-white shadow-md'
                      : 'bg-ui-border/20 text-ui-text hover:bg-ui-border/40'
                  }`}
                >
                  {anim}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div 
        ref={containerRef}
        className="relative group pointer-events-auto w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        {isLoading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-ui-surface/80 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-[10px] text-brand font-bold uppercase tracking-tighter">载入 3D 角色...</span>
          </div>
        )}
        
        <div className="absolute -inset-10 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all duration-1000"></div>
      </div>
    </div>
  );
};

export default Character3D;
