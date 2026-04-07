import React from 'react';
import sentinelXImage from '../assets/sentinel-x.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="hero">
      {/* Background Energy */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/10 rotate-12 blur-[150px]"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#4af8e3]"></span>
            <span className="text-[10px] tracking-widest uppercase text-cyan-400">Intergalactic Connectivity Active</span>
          </div>
          <h1 className="font-space-grotesk text-6xl md:text-8xl font-bold leading-tight tracking-tight text-white">
            CONNECT <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">COSMOS</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-md leading-relaxed font-manrope">
            Transform lengthy dimensional coordinates into elegant, high-speed links. The next evolution of web navigation is here.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#shorten"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-black rounded-xl hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all"
            >
              INITIALIZE LINK
            </a>
            <button className="px-8 py-4 glass-bright text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
              WATCH TRAILER
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative glass rounded-3xl border border-white/10 p-4 overflow-hidden aspect-[4/5] md:aspect-square flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
            <img
              src={sentinelXImage}
              alt="Nebula Hero - Sentinel-X"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-8 left-8 right-8 p-6 glass-bright rounded-2xl border border-white/10">
              <p className="text-[10px] tracking-widest text-purple-400 mb-2 font-space-grotesk uppercase">System Protocol</p>
              <h3 className="font-space-grotesk text-2xl font-bold text-white">SENTINEL-X</h3>
              <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-400">
                <span>LVL. 99 LINK MASTER</span>
                <span className="text-cyan-400">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
