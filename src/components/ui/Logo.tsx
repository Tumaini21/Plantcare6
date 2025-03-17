import React from 'react';
import { Sprout } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Sprout className={`${sizes[size]} text-green-600`} />
      <span className={`mt-2 font-bold text-green-600 ${size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
        PlantCare
      </span>
    </div>
  );
}