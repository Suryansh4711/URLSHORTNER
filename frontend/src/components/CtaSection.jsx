import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gray-950">
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Accent Blurs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500/20 blur-3xl"></div>

        <div className="max-w-3xl mx-auto space-y-12 relative z-10">
          <h2 className="font-space-grotesk text-6xl md:text-7xl font-black tracking-tighter">
            READY TO <span className="text-cyan-400">LINK?</span>
          </h2>
          <p className="text-xl text-gray-400 font-manrope leading-relaxed">
            Join millions of explorers navigating the digital frontier with Nebula Link. Transform your web presence today.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-8">
            <button className="px-12 py-4 bg-white text-gray-950 font-bold rounded-xl text-lg hover:bg-gray-100 transition-all font-space-grotesk tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              CREATE FREE ACCOUNT
            </button>
            <button className="px-12 py-4 border-2 border-gray-600 hover:border-cyan-400 text-white font-bold rounded-xl text-lg hover:bg-cyan-400/10 transition-all font-space-grotesk tracking-wider">
              VIEW PRICING
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      <div className="absolute top-1/2 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </section>
  );
};

export default CtaSection;
