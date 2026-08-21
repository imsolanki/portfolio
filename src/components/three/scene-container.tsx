'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { GradientMesh } from '@/components/effects/gradient-mesh';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

const ParticleNetwork = dynamic(() => import('./particle-network').then((mod) => mod.ParticleNetwork), {
  ssr: false,
});

export function SceneContainer() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-black">
      <GradientMesh />
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <color attach="background" args={['#09090B']} />
          <fog attach="fog" args={['#09090B', 3, 15]} />
          <ParticleNetwork />
        </Canvas>
      </Suspense>
    </div>
  );
}
