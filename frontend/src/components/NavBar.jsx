import React from 'react';

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-black/60 backdrop-blur-2xl border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tighter text-purple-500 font-space-grotesk">
          NEBULA LINK
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#shorten"
          className="text-purple-400 border-b-2 border-purple-500 pb-1 text-xs tracking-widest uppercase transition-colors duration-300"
        >
          Shorten
        </a>
        <a
          href="#qr-code"
          className="text-slate-500 hover:text-cyan-400 transition-colors duration-300 text-xs tracking-widest uppercase"
        >
          QR Code
        </a>
        <a
          href="#features"
          className="text-slate-500 hover:text-cyan-400 transition-colors duration-300 text-xs tracking-widest uppercase"
        >
          Features
        </a>
        <a
          href="#contact"
          className="text-slate-500 hover:text-cyan-400 transition-colors duration-300 text-xs tracking-widest uppercase"
        >
          Contact
        </a>
      </div>
      <button className="bg-purple-500 hover:bg-purple-600 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 duration-150">
        Get Started
      </button>
    </nav>
  );
};

export default NavBar;
