import { useEffect, useState } from 'react';
import synapseLogoPath from '@assets/erasebg-transformed_1757521923866.png';

export function SynapseOpsLogo() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const pulseOpacity = 0.6 + 0.4 * Math.sin(pulse * 0.15);

  return (
    <div className="flex flex-col items-center space-y-6" data-testid="synapse-logo-container">
      {/* Logo Symbol with Pulsing Effect */}
      <div className="relative">
        <img 
          src={synapseLogoPath}
          alt="SynapseOps Logo"
          className="w-32 h-32 relative z-10"
          style={{
            filter: `drop-shadow(0 0 20px rgba(77, 157, 224, ${pulseOpacity}))`
          }}
          data-testid="logo-symbol"
        />
        {/* Pulsing glow effect */}
        <div 
          className="absolute inset-0 w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(77, 157, 224, ${pulseOpacity * 0.3}) 0%, transparent 70%)`,
            transform: `scale(${1 + pulseOpacity * 0.1})`
          }}
        />
      </div>
      
      {/* Company Name */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-wide text-foreground" data-testid="company-name">
          SYNAPSE <span className="text-primary">OPS</span>
        </h1>
      </div>
    </div>
  );
}