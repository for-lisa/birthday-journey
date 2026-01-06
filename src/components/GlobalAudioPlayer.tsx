import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface GlobalAudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

const GlobalAudioPlayer = ({
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}: GlobalAudioPlayerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className='fixed bottom-6 inset-x-0 mx-auto w-fit lg:bottom-auto lg:top-6 lg:inset-x-auto lg:right-6 lg:mx-0 z-50'
    >
      <div className='glass rounded-full px-4 py-3 flex items-center gap-3 shadow-card border border-white/30'>
        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onTogglePlay}
          className='w-10 h-10 rounded-full bg-gradient-to-r from-dusty-pink to-rose-gold flex items-center justify-center text-deep-maroon shadow-soft'
        >
          {isPlaying ? (
            <Pause className='w-5 h-5' />
          ) : (
            <Play className='w-5 h-5 ml-0.5' />
          )}
        </motion.button>

        {/* Song Info */}
        <div className='text-sm hidden sm:block'>
          <p className='font-semibold text-deep-maroon'>Nadin Amizah - Semua Aku Dirayakan</p>
          <p className='text-xs text-muted-foreground'>
            For Lisa Ardéliana ♪
          </p>
        </div>

        {/* Volume Slider */}
        <div className='hidden sm:flex items-center gap-2'>
          <input
            type='range'
            min='0'
            max='1'
            step='0.1'
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className='w-20 h-1 accent-dusty-pink cursor-pointer'
          />
        </div>

        {/* Mute Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMute}
          className='text-muted-foreground hover:text-deep-maroon transition-colors'
        >
          {isMuted || volume === 0 ? (
            <VolumeX className='w-5 h-5' />
          ) : (
            <Volume2 className='w-5 h-5' />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GlobalAudioPlayer;
