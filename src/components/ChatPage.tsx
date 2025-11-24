import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { BsPaperclip, BsArrowUp, BsPlayFill } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import imgRectangle from "../assets/rectangle-chat.png";
import imgRectangle6 from "../assets/rectangle6.png";
import imgRectangle7 from "../assets/rectangle7.png";
import imgGroup8 from "../assets/group8.png";
import aiAvatar from "../assets/ai-avatar.png";
import VideoSelectionModal from "./VideoSelectionModal";
import ProgressBar from "./ProgressBar";
import TypingIndicator from "./TypingIndicator";
import videoThumb1 from "../assets/video-thumb-1.png";
import videoThumb2 from "../assets/video-thumb-2.png";
import videoThumb3 from "../assets/video-thumb-3.png";

interface ChatPageProps {
  onBack: () => void;
  selectedVideoId: number | null;
  onRestartFlow: (newVideoId?: number) => void;
}

interface Message {
  id: number;
  text: string[];
  type: "bot" | "user";
  showTyping?: boolean;
}

const videoThumbnails: { [key: number]: string } = {
  1: videoThumb1,
  2: videoThumb2,
  3: videoThumb3,
};

export default function ChatPage({
  onBack,
  selectedVideoId,
  onRestartFlow,
}: ChatPageProps) {
  const [selectedTimestamp, setSelectedTimestamp] = useState<number | null>(
    null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allMessages: Message[] = [
    {
      id: 1,
      type: "bot",
      text: [
        "Looking at the file you attached, I",
        "identified two potential issues",
      ],
    },
    {
      id: 2,
      type: "bot",
      text: ["Would you like any additional", " information?"],
    },
    {
      id: 3,
      type: "user",
      text: ["What part of the video", " should I fix?"],
    },
    {
      id: 4,
      type: "bot",
      text: [
        "I found some potential issues at the",
        "following time stamps, which would",
        "you like to further explore?",
      ],
    },
  ];

  const showMessagesSequentially = () => {
    allMessages.forEach((message, index) => {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, message.id]);
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1000); // Typing duration
      }, index * 2000); // Delay between messages
    });
  };

  // Simulate upload progress
  useEffect(() => {
    if (selectedVideoId) {
      // Reset state when video changes
      setVisibleMessages([]);
      setSelectedTimestamp(null);
      setIsUploading(true);
      setUploadProgress(0);
      setIsTyping(false);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            // Start showing messages after upload completes
            setTimeout(() => {
              showMessagesSequentially();
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [selectedVideoId]);

  const handleTimestampClick = (index: number) => {
    setSelectedTimestamp(selectedTimestamp === index ? null : index);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDownloadForm = () => {
    alert("Downloading Dispute Form.docx (dummy action)");
  };

  const handleVideoSelect = (videoId: number) => {
    // Close modal first
    setIsVideoModalOpen(false);
    // Reset all chat state
    setVisibleMessages([]);
    setSelectedTimestamp(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsTyping(false);
    // Restart the flow with new video - this will trigger re-render with new video
    onRestartFlow(videoId);
  };

  return (
    <div
      className="bg-white relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      data-name="iPhone 14 & 15 Pro - 9"
    >
      <div
        className="relative h-[852px] w-[393px] max-w-full overflow-hidden mx-auto"
        data-name="Layer_1"
      >
        {/* Background */}
        <div className="absolute inset-0" data-name="Rectangle">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute left-0 w-full h-full top-0 object-cover"
              src={imgRectangle}
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bg-gradient-to-b from-[#022e21] to-[rgba(2,46,33,0)] inset-0 pointer-events-none" />

        {/* Header Buttons - fixed */}
        <button
          onClick={onBack}
          className="absolute top-[5.28%] left-[4.07%] w-[36px] h-[36px] z-20 cursor-pointer flex items-center justify-center text-white"
          data-name="Group10"
        >
          <HiMenu size={24} />
        </button>

        <div
          className="absolute top-[5.28%] right-[4.07%] w-[36px] h-[36px] z-20"
          data-name="settings-button"
        >
          <div className="relative w-[36px] h-[36px]">
            <div className="absolute inset-0 bg-gradient-to-b border border-white/70 border-solid from-white/60 rounded-[36.5px] to-white/40 opacity-70" />
            <div className="absolute inset-[8.33%_10.33%] flex items-center justify-center text-white">
              <HiCog6Tooth size={16} />
            </div>
          </div>
        </div>

        {/* Video Thumbnail and Upload Progress - Only show during upload */}
        {selectedVideoId && isUploading && (
          <div className="absolute top-[10%] left-[4.07%] right-[4.07%] z-10">
            <div className="relative w-full flex justify-center mb-4">
              <div className="relative w-[200px] h-[150px] rounded-lg overflow-hidden border-2 border-white/40">
                <img
                  src={videoThumbnails[selectedVideoId]}
                  alt="Selected video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <BsPlayFill size={40} className="text-white" />
                </div>
              </div>
            </div>
            <div className="px-4">
              <ProgressBar progress={uploadProgress} />
              <p className="text-white text-xs text-center mt-2">
                Uploading... {uploadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Main Content Container */}
        <div className="absolute left-[4.07%] right-[4.07%] top-[90px] bottom-[100px] overflow-y-auto chat-scroll">
          <div className="pb-4">
            {/* Bot Avatar - First Message */}
            {visibleMessages.includes(1) && (
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#012312] rounded-[48px] w-[61px] h-[61px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    alt="AI Avatar"
                    className="block w-full h-full object-cover"
                    src={aiAvatar}
                    onError={(e) => {
                      e.currentTarget.src = imgGroup8;
                    }}
                  />
                </div>
                <div className="bg-gradient-to-b border border-white/60 border-solid from-white/90 rounded-[22px] to-white/60 p-3 max-w-[85%]">
                  {allMessages[0].text.map((line, idx) => (
                    <p
                      key={idx}
                      className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Second Bot Message */}
            {visibleMessages.includes(2) && (
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#012312] rounded-[48px] w-[61px] h-[61px] flex items-center justify-center flex-shrink-0 opacity-0">
                  <img
                    alt=""
                    className="block w-[24px] h-[24px]"
                    src={imgGroup8}
                  />
                </div>
                <div className="bg-gradient-to-b border border-white/60 border-solid from-white/90 rounded-[22px] to-white/60 p-3 max-w-[85%]">
                  {allMessages[1].text.map((line, idx) => (
                    <p
                      key={idx}
                      className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* User Message */}
            {visibleMessages.includes(3) && (
              <div className="flex items-start justify-end gap-3 mb-3">
                <div className="bg-gradient-to-r border border-white/40 border-solid from-[#449670] rounded-[22px] to-[#25684c] p-3 max-w-[60%]">
                  {allMessages[2].text.map((line, idx) => (
                    <p
                      key={idx}
                      className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[14px] text-white mb-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#012312] rounded-[48px] w-[61px] h-[61px] flex items-center justify-center flex-shrink-0 opacity-0">
                  <img
                    alt=""
                    className="block w-[24px] h-[24px]"
                    src={imgGroup8}
                  />
                </div>
                <div className="bg-gradient-to-b border border-white/60 border-solid from-white/90 rounded-[22px] to-white/60">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {/* Bot Response with Timestamps */}
            {visibleMessages.includes(4) && (
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#012312] rounded-[48px] w-[61px] h-[61px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    alt="AI Avatar"
                    className="block w-full h-full object-cover"
                    src={aiAvatar}
                    onError={(e) => {
                      e.currentTarget.src = imgGroup8;
                    }}
                  />
                </div>
                <div className="bg-gradient-to-b border border-white/90 border-solid from-white/90 rounded-[22px] to-white/60 p-3 max-w-[85%]">
                  {allMessages[3].text.map((line, idx) => (
                    <p
                      key={idx}
                      className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-2"
                    >
                      {line}
                    </p>
                  ))}

                  {/* First Timestamp Card */}
                  <div
                    className="relative bg-gradient-to-r from-[#217f53] to-[#0d4b33] rounded-[17px] p-3 mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleTimestampClick(0)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-[54px] h-[54px] rounded-[8px] overflow-hidden flex-shrink-0">
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          src={imgRectangle6}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BsPlayFill size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter',sans-serif] font-bold leading-normal not-italic text-[10px] text-white mb-1">
                          00:00-00:16
                        </p>
                        <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[8px] text-white">
                          This is likely an infringement of an original video
                          titled "The Making of My New VR headset," created by
                          Technology102 and first published on May 1, 2024. The
                          jurisdiction for your submission is under the Digital
                          Millenium Copyright Act of 1998 (DMCA).
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-[24px] h-[24px] flex-shrink-0">
                        <AiOutlineArrowRight
                          size={20}
                          className="text-white rotate"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Second Timestamp Card */}
                  <div
                    className="relative bg-gradient-to-r from-[#217f53] to-[#0d4b33] rounded-[17px] p-3 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleTimestampClick(1)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-[54px] h-[54px] rounded-[8px] overflow-hidden flex-shrink-0">
                        <img
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          src={imgRectangle7}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BsPlayFill size={18} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Inter',sans-serif] font-bold leading-normal not-italic text-[10px] text-white mb-1">
                          01:20-01:44
                        </p>
                        <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[8px] text-white">
                          The audio from this section is an original audio
                          titled "Here with Me," created by D4vd and first
                          published on September 22, 2022. The jurisdiction for
                          your submission is under the Digital Millenium
                          Copyright Act of 1998 (DMCA)
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-[24px] h-[24px] flex-shrink-0">
                        <AiOutlineArrowRight size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Detailed Response Message - shown when timestamp is selected */}
            {selectedTimestamp !== null && (
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-[#012312] rounded-[48px] w-[61px] h-[61px] flex items-center justify-center flex-shrink-0 opacity-0">
                  <img
                    alt=""
                    className="block w-[24px] h-[24px]"
                    src={imgGroup8}
                  />
                </div>
                <div className="bg-gradient-to-b border border-white/90 border-solid from-white/90 rounded-[22px] to-white/60 p-3 max-w-[85%]">
                  <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-2">
                    First time stamp: This is likely an infringement of an
                    original video titled "The Making of My New VR headset,"
                    created by Technology102 and first published on May 1, 2024.
                    The jurisdiction for your submission is under the Digital
                    Millenium Copyright Act of 1998 (DMCA).
                  </p>
                  <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-2">
                    &nbsp;
                  </p>
                  <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mb-4">
                    Here's a dispute form I filled for you.
                  </p>

                  {/* Dispute Form Download Button */}
                  <button
                    onClick={handleDownloadForm}
                    className="relative bg-gradient-to-r from-[#217f53] to-[#0d4b33] rounded-[17px] p-3 w-full flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center justify-center w-[22px] h-[22px] flex-shrink-0">
                      <MdDownload size={20} className="text-white" />
                    </div>
                    <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[14px] text-white">
                      Dispute Form.docx
                    </p>
                  </button>

                  <p className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#05311c] text-[14px] mt-4">
                    DISCLAIMER: Please seek a lawyer before pursuing legal
                    action. DO NOT rely solely on my advice.
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar - fixed at bottom */}
        <div
          className="absolute bottom-[5.4%] left-[4.33%] right-[3.82%]"
          data-name="input-bar"
        >
          <div className="relative w-full h-[56px]">
            <div className="absolute inset-0 bg-gradient-to-r border border-white/60 border-solid from-white/90 rounded-[36.5px] to-white/60" />
            <div className="absolute inset-0 flex items-center px-4">
              {/* Attachment Icon */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="cursor-pointer w-[24px] h-[24px] mr-3 flex-shrink-0 flex items-center justify-center text-[#012312]"
                data-name="Group14"
              >
                <BsPaperclip size={20} />
              </button>

              {/* Input Text */}
              <input
                type="text"
                placeholder="Ask me anything..."
                className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#012312] text-[14px] flex-1 bg-transparent border-none outline-none"
              />

              {/* Send Button */}
              <button
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

      {/* Video Selection Modal */}
      <VideoSelectionModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSelectVideo={handleVideoSelect}
      />
    </div>
  );
}
