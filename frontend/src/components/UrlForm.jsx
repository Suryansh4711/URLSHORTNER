import React, { useState } from 'react';
import axios from 'axios';
import { LinkDurationSelector } from './LinkDurationSelector';

const UrlForm = ({ onUrlCreated, apiBase }) => {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [linkDuration, setLinkDuration] = useState({ duration: 7, unit: 'day' });

  const handleDurationChange = (duration) => {
    setLinkDuration(duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      if (!longUrl.trim()) {
        setError('Please enter a URL');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${apiBase}/shorten`, {
        longUrl: longUrl.trim(),
        expiresIn: linkDuration,
      });

      onUrlCreated(response.data);
      setSuccess(true);
      setLongUrl('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-md">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-white mb-2">DIMENSIONAL<br />COMPRESSION</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-bold text-cyan-400 mb-3 uppercase">
            🔗 Enter URL
          </label>
          <input
            id="longUrl"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full px-4 py-3 bg-black/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
            disabled={loading}
          />
        </div>

        {/* Link Duration Selector */}
        <LinkDurationSelector onDurationChange={handleDurationChange} defaultDuration={7} />

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-sm flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg text-sm flex items-center gap-2 animate-pulse">
            ✓ URL shortened successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-magenta-500 to-purple-600 hover:from-magenta-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 disabled:scale-100 uppercase tracking-wider"
        >
          {loading ? '⏳ Shortening...' : '⚡ Shorten URL'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
        <h3 className="font-bold text-cyan-400 mb-3 text-sm uppercase">💡 Features:</h3>
        <ul className="text-xs text-gray-400 space-y-2">
          <li>✨ Instant URL compression</li>
          <li>📱 Auto-generated QR codes</li>
          <li>📊 Click tracking & analytics</li>
          <li>🔐 Secure & reliable links</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlForm;
