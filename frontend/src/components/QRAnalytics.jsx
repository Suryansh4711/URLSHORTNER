import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Download, Copy, Eye } from 'lucide-react'
import { fetchQRAnalytics } from '@/hooks/useQRTracking'

const QRAnalytics = ({ shortCode }) => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true)
        const data = await fetchQRAnalytics(shortCode)
        if (data) {
          setAnalytics(data)
          setError(null)
        }
      } catch (err) {
        setError('Failed to load analytics')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
    const interval = setInterval(loadAnalytics, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [shortCode])

  if (loading) {
    return (
      <div className="p-4 bg-black/30 border border-cyan-500/20 rounded-lg text-gray-400 text-sm">
        Loading analytics...
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="p-4 bg-black/30 border border-cyan-500/20 rounded-lg text-gray-400 text-sm">
        {error || 'No analytics available'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-gray-400">Views</p>
          </div>
          <p className="text-2xl font-bold text-cyan-400">{analytics.qrScans}</p>
        </div>

        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Copy className="w-4 h-4 text-purple-400" />
            <p className="text-xs text-gray-400">Copies</p>
          </div>
          <p className="text-2xl font-bold text-purple-400">{analytics.qrCopies}</p>
        </div>

        <div className="p-3 bg-magenta-500/10 border border-magenta-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-magenta-400" />
            <p className="text-xs text-gray-400">Downloads</p>
          </div>
          <p className="text-2xl font-bold text-magenta-400">{analytics.qrDownloads}</p>
        </div>
      </div>

      {/* Total Interactions */}
      <div className="p-3 bg-black/30 border border-cyan-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <p className="text-xs text-gray-400">Total Interactions</p>
        </div>
        <p className="text-xl font-bold text-cyan-400">{analytics.totalInteractions}</p>
      </div>

      {/* Recent Activity */}
      {analytics.recentActivity && analytics.recentActivity.length > 0 && (
        <div className="p-3 bg-black/30 border border-cyan-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-gray-400 font-semibold">Recent Activity</p>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {analytics.recentActivity.map((activity, idx) => (
              <div key={idx} className="text-xs p-2 bg-black/50 rounded border border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-400 capitalize font-semibold">{activity.action}</span>
                  <span className="text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { QRAnalytics }
