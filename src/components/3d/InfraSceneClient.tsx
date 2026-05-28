'use client';

import dynamic from 'next/dynamic';

const InfraScene = dynamic(() => import('./InfraScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border border-cyan-400/20 rounded-full animate-pulse" />
    </div>
  ),
});

export default function InfraSceneClient() {
  return <InfraScene />;
}
