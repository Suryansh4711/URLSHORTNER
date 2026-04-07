import React from 'react';
import spectraImage from '../assets/spectra.png';
import titanXImage from '../assets/titan-x.png';
import aetherImage from '../assets/aether.png';

const LinkVanguards = () => {
  const vanguards = [
    {
      name: 'SPECTRA',
      badge: 'STEALTH OPS',
      badgeColor: 'text-cyan-400 bg-cyan-500/20 border-cyan-400/30',
      image: spectraImage,
      description: 'Master of invisible link routing. Guaranteed zero-trace navigation across all dimensions.',
      status1: 'SYST_RUNNING',
      status2: '98% OPTIMIZED'
    },
    {
      name: 'TITAN-X',
      badge: 'CORE SHIELD',
      badgeColor: 'text-pink-400 bg-pink-500/20 border-pink-400/30',
      image: titanXImage,
      description: 'Heavy encryption protocol for sensitive high-priority data transmissions.',
      status1: 'ARMOR_MAX',
      status2: '1024-BIT RSA'
    },
    {
      name: 'AETHER',
      badge: 'WARP DRIVE',
      badgeColor: 'text-purple-400 bg-purple-500/20 border-purple-400/30',
      image: aetherImage,
      description: 'Instantaneous redirection specialist. Bypassing the speed of light for global reach.',
      status1: 'WARP_ACTIVE',
      status2: '0.0ms DELAY'
    }
  ];

  const handlePrev = () => {
    // Navigation handler
  };

  const handleNext = () => {
    // Navigation handler
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gray-950" id="vanguards">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-space-grotesk text-5xl font-bold tracking-tight text-white mb-4">
              LINK VANGUARDS
            </h2>
            <p className="text-gray-400 font-manrope leading-relaxed">
              Each Nebula Link is protected by a dedicated AI Guardian, ensuring your data travels through the safest wormholes in the digital expanse.
            </p>
          </div>
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-400/10"
              aria-label="Previous"
            >
              ◀
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-700 hover:border-cyan-400 text-cyan-400 flex items-center justify-center transition-all duration-200 hover:bg-cyan-400/10"
              aria-label="Next"
            >
              ▶
            </button>
          </div>
        </div>

        
        {/* Vanguards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vanguards.map((vanguard, index) => (
            <div
              key={index}
              className={`group relative rounded-[2rem] overflow-hidden glass border transition-all duration-300 ${
                index === 1 
                  ? 'md:scale-110 border-white/20 md:translate-y-0' 
                  : 'md:translate-y-12 border-gray-800 opacity-60 md:opacity-100'
              }`}
            >
              {/* Background Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                <img
                  src={vanguard.image}
                  alt={vanguard.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Badge */}
                <span className={`inline-block text-[10px] font-space-grotesk tracking-widest uppercase rounded-full border px-3 py-1.5 mb-4 ${vanguard.badgeColor}`}>
                  {vanguard.badge}
                </span>

                {/* Name */}
                <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold text-white mb-2">
                  {vanguard.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-300 font-manrope mb-4 line-clamp-3">
                  {vanguard.description}
                </p>

                {/* Status */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className={index === 0 ? 'text-cyan-400' : index === 1 ? 'text-pink-400' : 'text-purple-400'}>
                    {vanguard.status1}
                  </span>
                  <span className="text-gray-500">
                    {vanguard.status2}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinkVanguards;