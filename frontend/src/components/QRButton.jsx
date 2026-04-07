import React, { useState } from 'react'
import { QrCode } from 'lucide-react'
import { QRCodeModal } from './QRCodeModal'

const QRButton = ({ shortCode }) => {
  const [showQR, setShowQR] = useState(false)
  const shortUrl = `localhost:3000/${shortCode}`

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
        title="View QR Code"
      >
        <QrCode className="w-4 h-4" />
      </button>

      {showQR && (
        <QRCodeModal
          shortUrl={shortUrl}
          shortCode={shortCode}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  )
}

export { QRButton }
