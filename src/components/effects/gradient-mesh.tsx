'use client';

import { useEffect, useState } from 'react';

export function GradientMesh() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 mix-blend-screen">
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px]"
        style={{
          animation: 'blob 15s infinite alternate ease-in-out'
        }}
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]"
        style={{
          animation: 'blob 18s infinite alternate-reverse ease-in-out',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-cyan-600/20 blur-[120px]"
        style={{
          animation: 'blob 20s infinite alternate ease-in-out',
          animationDelay: '4s'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary opacity-80" />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}} />
    </div>
  );
}
