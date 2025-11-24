import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { BsPaperclip, BsArrowUp } from "react-icons/bs";
import { MdPlayArrow, MdErrorOutline } from "react-icons/md";
import imgRectangle from "../assets/rectangle.png";
import imgImage4 from "../assets/image4.png";
import VideoSelectionModal from "./VideoSelectionModal";
import videoThumb1 from "../assets/video-thumb-1.png";
import videoThumb2 from "../assets/video-thumb-2.png";
import videoThumb3 from "../assets/video-thumb-3.png";

interface LandingPageProps {
  onNavigateToChat: (videoId: number) => void;
  selectedVideoId: number | null;
}

const videoThumbnails: { [key: number]: string } = {
  1: videoThumb1,
  2: videoThumb2,
  3: videoThumb3,
};

export default function LandingPage({
  onNavigateToChat,
  selectedVideoId,
}: LandingPageProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log("LandingPage mounted");
  }, []);

  const handleVideoSelect = (videoId: number) => {
    onNavigateToChat(videoId);
  };

  return (
    <div
      className="bg-white relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      data-name="iPhone 14 & 15 Pro - 2"
    >
      <div
        className="relative h-[852px] w-[393px] max-w-full overflow-hidden mx-auto"
        data-name="Layer_1"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#022e21] to-[#012312]"
          data-name="Rectangle"
        >
          {!imageError && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt=""
                className="absolute left-0 w-full h-full top-0 object-cover"
                src={imgRectangle}
                onError={() => {
                  console.error("Failed to load background image");
                  setImageError(true);
                }}
              />
            </div>
          )}
        </div>

        {/* 3D Wave Graphic */}
        <div
          className="absolute h-[301px] left-[-66px] top-[239px] w-[527px] pointer-events-none"
          data-name="image 4"
        >
          <img
            alt=""
            className="absolute inset-0 w-full h-full mix-blend-screen object-cover"
            src={imgImage4}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Main Content Container - positioned from top 45px */}
        <div
          className="absolute left-[4.07%] right-[4.07%] top-[45px] bottom-0"
          data-name="content-container"
        >
          {/* Hamburger Menu - top left */}
          <div className="absolute top-[5.28%] left-0 w-[36px] h-[36px] flex items-center justify-center text-white">
            <HiMenu size={24} />
          </div>

          {/* Settings Button - top right */}
          <div
            className="absolute top-[5.28%] right-0"
            data-name="settings-button"
          >
            <div className="relative w-[36px] h-[36px]">
              <div className="absolute inset-0 bg-gradient-to-b border border-white/70 border-solid from-white/60 rounded-[36.5px] to-white/40 opacity-70" />
              <div className="absolute inset-[8.33%_10.33%] flex items-center justify-center text-white">
                <HiCog6Tooth size={16} />
              </div>
            </div>
          </div>

          {/* Greeting Text - positioned at 15.73% from top of container */}
          <div className="absolute top-[15.73%] left-[8.91%] right-[8.65%] text-center">
            <p
              className="bg-clip-text bg-gradient-to-r font-['Inter',sans-serif] font-normal from-white/60 leading-normal not-italic text-[26px] text-center to-white/80 via-white via-[52.404%] mt-0"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Hello, How can I help you today?
            </p>
          </div>

          {/* Selected Video Thumbnail - if video is selected */}
          {selectedVideoId && (
            <div className="absolute top-[50%] left-0 right-0 flex justify-center">
              <div className="relative w-[120px] h-[90px] rounded-lg overflow-hidden border-2 border-white/40">
                <img
                  src={videoThumbnails[selectedVideoId]}
                  alt="Selected video"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <MdPlayArrow size={32} className="text-white" />
                </div>
              </div>
            </div>
          )}

          {/* First Query Button - Why was my video taken down? - positioned at 70.54% from top */}
          <button
            onClick={() => {
              if (selectedVideoId) {
                onNavigateToChat(selectedVideoId);
              } else {
                setIsVideoModalOpen(true);
              }
            }}
            className="absolute top-[70.54%] left-0 right-0 cursor-pointer z-10"
            data-name="query-button-1"
          >
            <div className="relative w-full h-[52px]">
              <div className="absolute inset-0 bg-gradient-to-r border border-white/40 border-solid from-white/56 rounded-[26.5px] to-white/32" />
              <div className="absolute inset-0 flex items-center px-4">
                <div className="w-[24px] h-[24px] mr-3 flex-shrink-0 flex items-center justify-center text-[#05311c]">
                  <MdPlayArrow size={20} />
                </div>
                <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px]">
                  Why was my video taken down?
                </p>
              </div>
            </div>
          </button>

          {/* Second Query Button - How do I dispute my claim? - positioned at 77.93% from top */}
          <button
            onClick={() => {
              if (selectedVideoId) {
                onNavigateToChat(selectedVideoId);
              } else {
                setIsVideoModalOpen(true);
              }
            }}
            className="absolute top-[77.93%] left-0 right-0 cursor-pointer z-10"
            data-name="query-button-2"
          >
            <div className="relative w-full h-[52px]">
              <div className="absolute inset-0 bg-gradient-to-r border border-white/40 border-solid from-white/56 rounded-[26.5px] to-white/32" />
              <div className="absolute inset-0 flex items-center px-4">
                <div className="w-[24px] h-[24px] mr-3 flex-shrink-0 flex items-center justify-center text-[#05311c]">
                  <MdErrorOutline size={20} />
                </div>
                <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px]">
                  How do I dispute my claim?
                </p>
              </div>
            </div>
          </button>

          {/* Input Bar - positioned at 86.03% from top */}
          <div
            className="absolute top-[86.03%] left-0 right-0"
            data-name="input-bar"
          >
            <div className="relative w-full h-[56px]">
              <div className="absolute inset-0 bg-gradient-to-r border border-white/60 border-solid from-white/90 rounded-[36.5px] to-white/60" />
              <div className="absolute inset-0 flex items-center px-4">
                {/* Attachment Icon - Video Upload */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="cursor-pointer w-[24px] h-[24px] mr-3 flex-shrink-0 flex items-center justify-center text-[#012312]"
                  data-name="Group12"
                >
                  <BsPaperclip size={20} />
                </button>

                {/* Input Text */}
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#012312] text-[14px] flex-1 bg-transparent border-none outline-none"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && selectedVideoId) {
                      onNavigateToChat(selectedVideoId);
                    }
                  }}
                />

                {/* Send Button */}
                <button
                  onClick={() => {
                    if (selectedVideoId) {
                      onNavigateToChat(selectedVideoId);
                    } else {
                      setIsVideoModalOpen(true);
                    }
                  }}
                  className="cursor-pointer relative w-[40px] h-[40px] flex-shrink-0"
                  data-name="send-button"
                >
                  <div className="absolute inset-0 bg-white/50 border-2 border-[#217f53] border-solid rounded-[36.5px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BsArrowUp size={18} className="text-[#217f53]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Selection Modal */}
      <VideoSelectionModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSelectVideo={handleVideoSelect}
      />
    </div>
  );
}
