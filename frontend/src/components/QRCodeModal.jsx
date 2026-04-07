import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const QRCodeModal = ({ shortUrl, shortCode, onClose }) => {
  const qrRef = useRef()

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `qrcode-${shortCode}.png`
    link.click()
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl)
    alert('Short URL copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-space-grotesk">QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* QR Code */}
        <div
          ref={qrRef}
          className="flex justify-center mb-6 bg-white p-4 rounded-lg"
        >
          <QRCodeSVG
            value={shortUrl}
            size={256}
            level="H"
            includeMargin={true}
            fgColor="#000000"
            bgColor="#ffffff"
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
            className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 font-bold"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy URL
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold"
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
