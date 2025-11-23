import React from 'react'

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="w-2 h-2 bg-[#05311c] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-[#05311c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-[#05311c] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

