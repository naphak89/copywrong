import React from 'react'

interface ProgressBarProps {
  progress: number // 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#217f53] to-[#0d4b33] transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}

