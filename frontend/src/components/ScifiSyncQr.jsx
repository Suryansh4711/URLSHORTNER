import React, { useState } from 'react';

const ScifiSyncQr = ({ urls }) => {
  const [selectedUrl, setSelectedUrl] = useState(urls.length > 0 ? urls[0] : null);

  return (
    <section className="py-32 relative overflow-hidden bg-gray-950/50" id="qr-code">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-space-grotesk text-xs tracking-widest text-pink-400 uppercase">Phase II Integration</span>
            <h2 className="font-space-grotesk text-5xl font-bold tracking-tight text-white">
              SCIFI-SYNC <br /> QR ENGINE
            </h2>
            <p className="text-gray-400 leading-relaxed font-manrope">
              Generate encoded spectral signatures for immediate physical-to-digital bridge transfers. Customizable patterns and error-correction protocols included.
            </p>
            <div className="space-y-4 pt-4">
              {/* Feature Card 1 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-400 text-xl">📱</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-manrope">Dynamic Redirection</h4>
                  <p className="text-xs text-gray-400 font-manrope">Update targets without printing new codes.</p>
                </div>
              </div>
              {/* Feature Card 2 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800 cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 text-xl">📊</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-manrope">Spectral Analytics</h4>
                  <p className="text-xs text-gray-400 font-manrope">Track scans across the multiverse.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - QR Engine */}
          <div className="lg:col-span-7">
            <div className="glass border border-white/10 rounded-3xl p-8 md:p-12 relative bg-gray-900/40">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500/30 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/30 blur-3xl"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                {/* Input Section */}
                <div className="w-full md:w-1/2 space-y-6">
                  <div>
                    <label className="block text-[10px] font-space-grotesk tracking-widest text-gray-400 mb-2 uppercase">Input Protocol</label>
                    <input
                      className="w-full bg-gray-950/80 border border-gray-800 rounded-lg text-sm text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent p-3 font-manrope outline-none transition"
                      type="text"
                      value={selectedUrl?.orignalUrl || "https://nebula.link/x/sentinel"}
                      readOnly
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Pattern Selector */}
                    <div>
                      <label className="block text-[10px] font-space-grotesk tracking-widest text-gray-400 mb-2 uppercase">Pattern</label>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded border border-purple-400 bg-purple-400/20"></div>
                        <div className="w-6 h-6 rounded border border-gray-700 bg-gray-700/20"></div>
                        <div className="w-6 h-6 rounded border border-gray-700 bg-gray-700/20"></div>
                      </div>
                    </div>
                    
                    {/* Integrity Bar */}
                    <div>
                      <label className="block text-[10px] font-space-grotesk tracking-widest text-gray-400 mb-2 uppercase">Integrity</label>
                      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-cyan-400 w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-black rounded-xl transition-colors font-space-grotesk tracking-wider">
                    GENERATE SIGNATURE
                  </button>
                </div>

                {/* QR Code Display */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative p-6 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,157,172,0.2)]">
                    <div className="w-48 h-48 bg-black flex items-center justify-center rounded-lg">
                      <div className="grid grid-cols-5 gap-1 w-32 h-32">
                        {[...Array(25)].map((_, i) => (
                          <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gray-900 rounded-full border border-gray-700">
                      <span className="text-[8px] font-mono text-gray-400">ENCODED_V.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScifiSyncQr;
