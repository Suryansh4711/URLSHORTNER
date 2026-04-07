import React, { useRef, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import Cookies from 'js-cookie'
import { Download, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackQRAction } from '@/hooks/useQRTracking'

const QRCodeModal = ({ shortUrl, shortCode, onClose }) => {
  const canvasRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const handleDownload = async () => {
    if (!canvasRef.current) return
    
    const link = document.createElement('a')
    link.href = canvasRef.current.toDataURL('image/png')
    link.download = `qrcode-${shortCode}.png`
    link.click()

    // Track download both locally and on backend
    const qrDownloads = JSON.parse(Cookies.get('qrDownloads') || '[]')
    qrDownloads.push({
      shortCode,
      timestamp: new Date().toISOString(),
      action: 'download'
    })
    Cookies.set('qrDownloads', JSON.stringify(qrDownloads), { expires: 365 })

    // Also sync with backend
    await trackQRAction(shortCode, 'download')
  }

  const handleCopyUrl = async () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    
    // Track copy both locally and on backend
    const qrCopies = JSON.parse(Cookies.get('qrCopies') || '[]')
    qrCopies.push({
      shortCode,
      timestamp: new Date().toISOString(),
      action: 'copy'
    })
    Cookies.set('qrCopies', JSON.stringify(qrCopies), { expires: 365 })

    // Also sync with backend
    await trackQRAction(shortCode, 'copy')

    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, shortUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.92,
        margin: 1,
        width: 256,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) {
          console.error('Error generating QR code:', error)
        }
      })

      // Track QR view both locally and on backend
      const qrViews = JSON.parse(Cookies.get('qrViews') || '[]')
      qrViews.push({
        shortCode,
        timestamp: new Date().toISOString(),
        action: 'view'
      })
      Cookies.set('qrViews', JSON.stringify(qrViews), { expires: 365 })

      // Sync with backend
      trackQRAction(shortCode, 'view')
    }
  }, [shortUrl, shortCode])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-space-grotesk">QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* QR Code Canvas */}
        <div className="flex justify-center mb-6 bg-white p-4 rounded-lg">
          <canvas
            ref={canvasRef}
            className="w-64 h-64"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Short URL */}
        <div className="mb-6 p-4 bg-black/30 border border-cyan-500/20 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Short URL:</p>
          <p className="text-cyan-400 font-mono text-sm break-all">{shortUrl}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleCopyUrl}
            className={`flex-1 font-bold transition-all ${
              copied 
                ? 'bg-green-500/20 hover:bg-green-500/20 text-green-400 border border-green-500/50' 
                : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </>
            )}
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          📱 Scan this QR code to open the shortened link
        </p>
      </div>
    </div>
  )
}

export { QRCodeModal }
