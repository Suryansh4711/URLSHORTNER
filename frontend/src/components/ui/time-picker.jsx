import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const TimePicker = ({ value, onChange }) => {
  const [hours, minutes] = value ? value.split(':').map(Number) : [0, 0]

  const updateTime = (newHours, newMinutes) => {
    const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
    onChange(formattedTime)
  }

  const handleHourChange = (delta) => {
    let newHours = hours + delta
    if (newHours < 0) newHours = 23
    if (newHours > 23) newHours = 0
    updateTime(newHours, minutes)
  }

  const handleMinuteChange = (delta) => {
    let newMinutes = minutes + delta
    if (newMinutes < 0) newMinutes = 59
    if (newMinutes > 59) newMinutes = 0
    updateTime(hours, newMinutes)
  }

  const handleHourInput = (e) => {
    const val = Math.max(0, Math.min(23, parseInt(e.target.value) || 0))
    updateTime(val, minutes)
  }

  const handleMinuteInput = (e) => {
    const val = Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
    updateTime(hours, val)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-black/30 border border-cyan-500/30 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleHourChange(1)}
          className="h-8 w-8 p-0 text-cyan-400 hover:bg-cyan-500/20"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        <input
          type="number"
          min="0"
          max="23"
          value={String(hours).padStart(2, '0')}
          onChange={handleHourInput}
          className="w-12 h-10 text-center bg-black/50 border border-cyan-500/30 rounded text-white font-bold text-lg focus:border-cyan-400 focus:outline-none"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleHourChange(-1)}
          className="h-8 w-8 p-0 text-cyan-400 hover:bg-cyan-500/20"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <span className="text-2xl font-bold text-cyan-400">:</span>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleMinuteChange(1)}
          className="h-8 w-8 p-0 text-cyan-400 hover:bg-cyan-500/20"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        <input
          type="number"
          min="0"
          max="59"
          value={String(minutes).padStart(2, '0')}
          onChange={handleMinuteInput}
          className="w-12 h-10 text-center bg-black/50 border border-cyan-500/30 rounded text-white font-bold text-lg focus:border-cyan-400 focus:outline-none"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleMinuteChange(-1)}
          className="h-8 w-8 p-0 text-cyan-400 hover:bg-cyan-500/20"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export { TimePicker }
