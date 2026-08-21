'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  const maxDistance = 1.5;

  // Generate particles
  const [positions, colors, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    const colorPalette = [
      new THREE.Color('#8B5CF6'), // Purple
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#06B6D4'), // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      // Random position in a sphere-ish volume
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    return [positions, colors, velocities];
  }, [particleCount]);

  // Max lines possible: n * (n - 1) / 2
  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const points = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      points[i * 3] += velocities[i].x;
      points[i * 3 + 1] += velocities[i].y;
      points[i * 3 + 2] += velocities[i].z;

      // Bounce off walls (rough limits)
      if (points[i * 3] > 5 || points[i * 3] < -5) velocities[i].x *= -1;
      if (points[i * 3 + 1] > 5 || points[i * 3 + 1] < -5) velocities[i].y *= -1;
      if (points[i * 3 + 2] > 5 || points[i * 3 + 2] < -5) velocities[i].z *= -1;

      // Simple mouse interaction
      const mouse = state.pointer;
      // Convert mouse to 3D space roughly
      const targetX = (mouse.x * state.viewport.width) / 2;
      const targetY = (mouse.y * state.viewport.height) / 2;
      
      const dx = points[i * 3] - targetX;
      const dy = points[i * 3 + 1] - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        points[i * 3] += (dx / dist) * 0.02;
        points[i * 3 + 1] += (dy / dist) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines
    let lineIndex = 0;
    const ptColors = pointsRef.current.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = points[i * 3] - points[j * 3];
        const dy = points[i * 3 + 1] - points[j * 3];
        const dz = points[i * 3 + 2] - points[j * 3];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;

          linePositions[lineIndex * 6] = points[i * 3];
          linePositions[lineIndex * 6 + 1] = points[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = points[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = points[j * 3];
          linePositions[lineIndex * 6 + 4] = points[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = points[j * 3 + 2];

          lineColors[lineIndex * 6] = ptColors[i * 3] * alpha;
          lineColors[lineIndex * 6 + 1] = ptColors[i * 3 + 1] * alpha;
          lineColors[lineIndex * 6 + 2] = ptColors[i * 3 + 2] * alpha;
          lineColors[lineIndex * 6 + 3] = ptColors[j * 3] * alpha;
          lineColors[lineIndex * 6 + 4] = ptColors[j * 3 + 1] * alpha;
          lineColors[lineIndex * 6 + 5] = ptColors[j * 3 + 2] * alpha;

          lineIndex++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    // Subtle rotation to the whole group
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    linesRef.current.rotation.x += 0.0005;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
