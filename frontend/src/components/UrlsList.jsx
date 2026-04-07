import React, { useState } from 'react';
import { CopyButton } from '@/components/ui/copy-button';

const UrlsList = ({ urls, loading, onDelete, onRefresh }) => {
  const [selectedQR, setSelectedQR] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('✓ Copied to clipboard!');
  };

  const downloadQRCode = (qrCode, shortCode) => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qr-${shortCode}.png`;
    link.click();
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-md text-center">
        <div className="inline-block">
          <div className="animate-spin">
            <div className="text-4xl">⚛️</div>
          </div>
        </div>
        <p className="mt-4 text-cyan-400 font-semibold">LOADING LINKS...</p>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-2xl p-12 backdrop-blur-md text-center">
        <div className="text-5xl mb-4">🔗</div>
        <p className="text-gray-400 text-lg">No shortened URLs yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">SCIFI-SYNC<br />QR RECORDS</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full mt-2"></div>
          </div>
          <button
            onClick={onRefresh}
            className="px-6 py-2 bg-gradient-to-r from-magenta-500 to-purple-600 hover:from-magenta-600 hover:to-purple-700 text-white font-bold rounded-lg transition transform hover:scale-105 uppercase text-sm"
          >
            🔄 Refresh
          </button>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {urls.map((url) => (
            <div key={url._id} className="p-5 bg-black/50 border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Original URL */}
                <div>
                  <label className="block text-xs font-bold text-cyan-400 uppercase mb-2">Original URL</label>
                  <div className="flex items-center gap-2">
                    <a
                      href={url.orignalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 truncate text-sm font-mono"
                      title={url.orignalUrl}
                    >
                      {url.orignalUrl.length > 40 ? url.orignalUrl.substring(0, 40) + '...' : url.orignalUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(url.orignalUrl)}
                      className="text-gray-400 hover:text-cyan-400 transition text-lg"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                </div>

                {/* Short URL */}
                <div>
                  <label className="block text-xs font-bold text-cyan-400 uppercase mb-2">Short URL</label>
                  <div className="flex items-center gap-2">
                    <code className="bg-black/80 px-3 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-500/30">
                      localhost:3000/{url.shortCode}
                    </code>
                    <CopyButton value={`localhost:3000/${url.shortCode}`} copyMessage="Copied!" timeout={3000} />
                  </div>
                </div>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-cyan-500/20 text-xs">
                <div className="text-gray-400">
                  <span className="font-bold text-cyan-400">📊 Clicks:</span> {url.count || 0}
                </div>
                <div className="text-gray-400">
                  <span className="font-bold text-cyan-400">📅 Created:</span> {new Date(url.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {url.qrCode && (
                    <button
                      onClick={() => setSelectedQR(url)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition text-sm"
                      title="View QR Code"
                    >
                      📱 QR Code
                    </button>
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onDelete(url._id)}
                    className="text-red-400 hover:text-red-300 font-semibold transition text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-cyan-500/20 text-sm text-gray-400">
          <p>Total URLs: <span className="text-cyan-400 font-bold text-lg">{urls.length}</span></p>
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/50 rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-white">QR CODE</h3>
              <button
                onClick={() => setSelectedQR(null)}
                className="text-gray-400 hover:text-cyan-400 text-3xl transition"
              >
                ✕
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl mb-6 flex items-center justify-center">
              <img src={selectedQR.qrCode} alt="QR Code" className="w-48 h-48" />
            </div>

            <p className="text-sm text-gray-400 mb-6 text-center">
              Short URL: <code className="bg-black/50 px-3 py-1 rounded text-cyan-400 font-mono">{selectedQR.shortCode}</code>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => downloadQRCode(selectedQR.qrCode, selectedQR.shortCode)}
                className="flex-1 bg-gradient-to-r from-magenta-500 to-purple-600 hover:from-magenta-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition uppercase text-sm"
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => setSelectedQR(null)}
                className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 font-bold py-3 px-4 rounded-lg transition uppercase text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlsList;
