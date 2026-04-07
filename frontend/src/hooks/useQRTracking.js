import { useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'http://localhost:3000'

export const useQRTracking = () => {
  // Sync local cookies with backend on component mount
  useEffect(() => {
    const syncQRData = async () => {
      try {
        const qrViews = JSON.parse(Cookies.get('qrViews') || '[]')
        const qrDownloads = JSON.parse(Cookies.get('qrDownloads') || '[]')
        const qrCopies = JSON.parse(Cookies.get('qrCopies') || '[]')

        // Combine all actions
        const allActions = [...qrViews, ...qrDownloads, ...qrCopies]

        // Track each action with backend
        for (const action of allActions) {
          await trackQRAction(action.shortCode, action.action)
        }

        // Clear synced cookies
        if (allActions.length > 0) {
          Cookies.remove('qrViews')
          Cookies.remove('qrDownloads')
          Cookies.remove('qrCopies')
        }
      } catch (error) {
        console.error('Error syncing QR data:', error)
      }
    }

    syncQRData()
  }, [])

  return { trackQRAction }
}

export const trackQRAction = async (shortCode, action) => {
  try {
    await axios.post(`${API_URL}/qr/track`, {
      shortCode,
      action
    })
  } catch (error) {
    console.error(`Error tracking QR action (${action}):`, error)
  }
}

export const fetchQRAnalytics = async (shortCode) => {
  try {
    const response = await axios.get(`${API_URL}/qr/analytics/${shortCode}`)
    return response.data
  } catch (error) {
    console.error('Error fetching QR analytics:', error)
    return null
  }
}
