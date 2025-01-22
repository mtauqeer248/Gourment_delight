import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

interface ProductProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  isHovered?: boolean;
}

export default function Product({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  isHovered = false 
}: ProductProps) {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF(modelPath);
  
  useFrame((state, delta) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y += delta * 2;
    }
  });

  useEffect(() => {
    if (meshRef.current && !isHovered) {
      meshRef.current.rotation.y = rotation[1];
    }
  }, [isHovered, rotation]);

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
}