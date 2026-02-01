'use client';

import Scene3D from '@/components/ui/Scene3D';

interface Scene3DWrapperProps {
  url: string;
  className?: string;
}

// Simple wrapper for use in Server Components
export default function Scene3DWrapper({ url, className }: Scene3DWrapperProps) {
  return <Scene3D url={url} className={className} />;
}
