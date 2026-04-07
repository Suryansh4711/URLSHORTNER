import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import DimensionalCompression from './components/DimensionalCompression';
import ScifiSyncQr from './components/ScifiSyncQr';
import LinkVanguards from './components/LinkVanguards';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import './App.css';

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const handleShortUrlCreated = (newUrl) => {
    setUrls([newUrl, ...urls]);
    setUrlInput('');
  };

  const handleCompress = async (url) => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        longUrl: url.trim(),
      });
      handleShortUrlCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create short URL');
      console.error(err);
    }
  };

  const handleDeleteUrl = async (urlId) => {
    try {
      await axios.delete(`${API_BASE_URL}/urls/${urlId}`);
      setUrls(urls.filter(url => url._id !== urlId));
    } catch (err) {
      setError('Failed to delete URL');
      console.error(err);
    }
  };

  const handleGetAllUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/urls`);
      setUrls(response.data);
    } catch (err) {
      setError('Failed to fetch URLs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllUrls();
  }, []);

  return (
    <div className="bg-gray-950 text-white selection:bg-cyan-400 selection:text-gray-950">
      <NavBar />
      <main>
        <HeroSection />
        <DimensionalCompression 
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          onCompress={handleCompress}
          urls={urls}
          error={error}
          onDelete={handleDeleteUrl}
        />
        <ScifiSyncQr urls={urls} />
        <LinkVanguards />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
