import { HiX } from 'react-icons/hi'
import { BsPlayFill } from 'react-icons/bs'
import videoThumb1 from '../assets/video-thumb-1.png'
import videoThumb2 from '../assets/video-thumb-2.png'
import videoThumb3 from '../assets/video-thumb-3.png'

interface VideoSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectVideo: (videoId: number) => void
}

const dummyVideos = [
  { id: 1, thumbnail: videoThumb1, title: 'Video 1' },
  { id: 2, thumbnail: videoThumb2, title: 'Video 2' },
  { id: 3, thumbnail: videoThumb3, title: 'Video 3' },
]

export default function VideoSelectionModal({ isOpen, onClose, onSelectVideo }: VideoSelectionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(1,37,20,0.8)]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-r border border-white/90 border-solid from-white/90 rounded-[22px] to-white/60 p-6 w-[271px] max-w-[90%]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#05311c] hover:opacity-70"
        >
          <HiX size={24} />
        </button>

        {/* Title */}
        <h2 className="font-['Inter',sans-serif] font-bold text-[#05311c] text-[20px] text-center mb-6 mt-2">
          Attach a file
        </h2>

        {/* Video Grid */}
        <div className="grid grid-cols-2 gap-4">
          {dummyVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => {
                onSelectVideo(video.id)
                onClose()
              }}
              className="relative w-full aspect-[103/75] rounded-[8px] overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BsPlayFill size={24} className="text-white group-hover:scale-110 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

