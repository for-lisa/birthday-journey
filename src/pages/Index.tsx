import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CountdownPage from "../components/CountdownPage";
import QRScannerPage from "../components/QRScannerPage";
import CelebrationPage from "../components/CelebrationPage";
import GlobalAudioPlayer from "../components/GlobalAudioPlayer";
import audioSrc from "../audio/NA-SAD.mp3";

type Stage = "countdown" | "scan" | "celebration";

// Set the target date for countdown (adjust as needed)
// Set the target date for countdown - change this to Lisa's birthday date
const TARGET_DATE = new Date("2026-01-09T00:00:00");

const Index = () => {
  const [stage, setStage] = useState<Stage>("countdown");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCountdownComplete = useCallback(() => {
    setStage("scan");
  }, []);

  const handleScanSuccess = useCallback(() => {
    setStage("celebration");
  }, []);

  // Attempt autoplay on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = volume;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            // Remove all listeners after successful play
            events.forEach(event => {
              document.removeEventListener(event, handleFirstInteraction);
            });
          })
          .catch((err) => {
            console.log("Autoplay prevented:", err);
          });
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    
    if (!hasInteracted) {
      events.forEach(event => {
        document.addEventListener(event, handleFirstInteraction);
      });
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [hasInteracted, volume]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  }, [isMuted]);

  return (
    <div className="min-h-screen">
      {/* Global Audio Element */}
      <audio ref={audioRef} loop preload="auto" src={audioSrc} />

      {/* Global Audio Player - visible on all pages */}
      <GlobalAudioPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
      />

      <AnimatePresence mode="wait">
        {stage === "countdown" && (
          <CountdownPage key="countdown" targetDate={TARGET_DATE} onComplete={handleCountdownComplete} />
        )}
        {stage === "scan" && <QRScannerPage key="scan" onSuccess={handleScanSuccess} />}
        {stage === "celebration" && <CelebrationPage key="celebration" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

