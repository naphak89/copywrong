import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ChatPage from './components/ChatPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'chat'>('landing')
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null)

  const handleNavigateToChat = (videoId: number) => {
    setSelectedVideoId(videoId)
    setCurrentPage('chat')
  }

  const handleBackToLanding = () => {
    setCurrentPage('landing')
    // Keep video selection when going back
  }

  const handleRestartFlow = (newVideoId?: number) => {
    if (newVideoId) {
      setSelectedVideoId(newVideoId)
      setCurrentPage('chat')
    } else {
      setSelectedVideoId(null)
      setCurrentPage('landing')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {currentPage === 'landing' && (
        <LandingPage 
          onNavigateToChat={handleNavigateToChat}
          selectedVideoId={selectedVideoId}
        />
      )}
      {currentPage === 'chat' && (
        <ChatPage 
          onBack={handleBackToLanding}
          selectedVideoId={selectedVideoId}
          onRestartFlow={handleRestartFlow}
        />
      )}
    </div>
  )
}

export default App
