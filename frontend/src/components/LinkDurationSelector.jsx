import React, { useState } from 'react'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { Calendar as CalendarComponent } from '@/components/ui/calendar'
// import { TimePicker } from '@/components/ui/time-picker'
// import { format } from 'date-fns'

const LinkDurationSelector = ({ onDurationChange }) => {
  const [customDuration, setCustomDuration] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  // const [useCustomDateTime, setUseCustomDateTime] = useState(false)
  // const [selectedDate, setSelectedDate] = useState(new Date())
  // const [selectedTime, setSelectedTime] = useState('00:00')

  const handleCustomDuration = () => {
    if (customDuration) {
      const value = parseInt(customDuration)
      if (value > 0) {
        setIsCustom(true)
        // setUseCustomDateTime(false)
        onDurationChange({ duration: value, unit: 'day', custom: true })
      }
    }
  }

  // const handleDateTimeSelection = () => {
  //   if (selectedDate && selectedTime) {
  //     setUseCustomDateTime(true)
  //     setIsCustom(false)
  //     onDurationChange({ 
  //       date: format(selectedDate, 'yyyy-MM-dd'),
  //       time: selectedTime,
  //       custom: true,
  //       type: 'datetime'
  //     })
  //   }
  // }

  return (
    <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white font-space-grotesk">LINK VALIDITY</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-400 mb-4">
          Choose how long your shortened link will remain valid:
        </p>

        {/* Custom Duration */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Set custom duration (in days):</p>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              placeholder="Enter days"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400"
            />
            <Button
              onClick={handleCustomDuration}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold px-6 py-2 rounded-lg transition"
            >
              Set
            </Button>
          </div>
          {isCustom && customDuration && (
            <p className="text-xs text-green-400 mt-2">✓ Custom duration: {customDuration} days</p>
          )}
        </div>

        {/* FUTURE: Date & Time Picker Section - Commented out for future use */}
        {/* 
        <div className="mt-6 pt-6 border-t border-cyan-500/20">
          <p className="text-sm text-gray-400 mb-4">Or set exact expiration date & time:</p>
          
          {/* Date Picker */}
          {/* <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Select Date:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full bg-black/30 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 justify-start"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'MMM dd, yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-950 border-cyan-500/30 z-50" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today
                  }}
                  className="rounded-md border border-cyan-500/30"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Picker */}
          {/* <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Select Time:</p>
            <TimePicker value={selectedTime} onChange={setSelectedTime} />
          </div>

          <Button
            onClick={handleDateTimeSelection}
            className="w-full mt-3 bg-gradient-to-r from-magenta-500 to-purple-600 hover:from-magenta-600 hover:to-purple-700 text-white font-bold"
          >
            Set Expiration Date & Time
          </Button>

          {useCustomDateTime && (
            <p className="text-xs text-green-400 mt-2">
              ✓ Expires: {format(selectedDate, 'MMM dd, yyyy')} at {selectedTime}
            </p>
          )}
        </div>
        */}

        {/* Info */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <p className="text-xs text-cyan-300">
            💡 Tip: Set a custom duration in days for your shortened link validity.
          </p>
        </div>
      </div>
    </div>
  )
}

export { LinkDurationSelector }
