import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Sparkles, ChevronUp, X } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownPageProps {
  targetDate: Date;
  onComplete: () => void;
}

const CountdownPage = ({ targetDate, onComplete }: CountdownPageProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [showEarlySwipeMessage, setShowEarlySwipeMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  
  // For swipe detection
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-200, 0], [0, 1]);
  const scale = useTransform(y, [-200, 0], [0.8, 1]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  // Handle touch/swipe detection when countdown is NOT complete
  useEffect(() => {
    if (isComplete) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      // If swiped up more than 50px
      if (deltaY > 50) {
        setShowEarlySwipeMessage(true);
        // Auto hide after 3 seconds
        setTimeout(() => setShowEarlySwipeMessage(false), 3000);
      }
    };

    // Also handle mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -50) {
        setShowEarlySwipeMessage(true);
        setTimeout(() => setShowEarlySwipeMessage(false), 3000);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isComplete]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged up more than 100px with velocity, trigger transition
    if (info.offset.y < -100 || info.velocity.y < -500) {
      onComplete();
    }
  };

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days, prevValue: prevTimeLeft.days },
    { label: 'Jam', value: timeLeft.hours, prevValue: prevTimeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes, prevValue: prevTimeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds, prevValue: prevTimeLeft.seconds },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      style={isComplete ? { opacity, scale } : {}}
      drag={isComplete ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="min-h-screen gradient-ethereal flex flex-col items-center justify-center px-4 relative overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Early Swipe Message Toast */}
      <AnimatePresence>
        {showEarlySwipeMessage && !isComplete && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -100, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 max-w-sm w-full mx-4"
          >
            <div className="glass rounded-2xl p-4 shadow-lg border border-dusty-pink/30 mx-4">
              <div className="flex items-start gap-3">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-2xl flex-shrink-0"
                >
                  😏
                </motion.span>
                <div className="flex-1">
                  <p className="font-display text-deep-maroon font-semibold">
                    Hayoo mau ngapain?
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Masih lamaa nichh, tunggu waktunya selesai yaaaw~ 🕐
                  </p>
                </div>
                <button
                  onClick={() => setShowEarlySwipeMessage(false)}
                  className="text-muted-foreground hover:text-deep-maroon transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-dusty-pink/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          /* Countdown View */
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="z-10"
          >
            {/* Main Content */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4"
              >
                Tunggu Sebentar yaa Eja Lagi Siapin Dulu
              </motion.p>
              
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="font-display text-4xl md:text-6xl lg:text-7xl text-deep-maroon mb-4"
              >
                Level 22 Unlocked
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-display italic text-2xl md:text-3xl text-dusty-dark mb-12"
              >
                Lisa's Edition ✨
              </motion.p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
            >
              {timeUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <div className="glass rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[120px] shadow-card relative overflow-hidden">
                    <div className="relative h-16 md:h-20 flex items-center justify-center overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={unit.value}
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -50, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="font-display text-4xl md:text-6xl text-deep-maroon absolute"
                        >
                          {String(unit.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="mt-3 text-muted-foreground uppercase tracking-wider text-xs md:text-sm">
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          /* Celebration View - When countdown is complete */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="z-10 text-center"
          >
            {/* Sparkles Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 30}deg) translateY(-150px)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-6xl md:text-8xl block mb-4"
              >
                🎉
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-deep-maroon mb-4"
            >
              INI WAKTUNYA!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-display text-xl md:text-2xl text-dusty-dark mb-2"
            >
              Saatnya Merayakan Hari Spesialmu ✨
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Selamat Berumur Kembar, Lisa Ardéliana! 🎂
            </motion.p>

            {/* Swipe Up Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center text-dusty-dark"
              >
                <ChevronUp className="w-8 h-8" />
                <ChevronUp className="w-8 h-8 -mt-4" />
                <p className="text-sm mt-2 font-medium">Geser ke atas untuk lanjut</p>
              </motion.div>
            </motion.div>

            {/* Floating emojis */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {['🎈', '🎁', '🎊', '💖', '⭐', '🌟'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${15 + i * 15}%`,
                    bottom: '-50px',
                  }}
                  animate={{
                    y: [0, -800],
                    x: [0, Math.sin(i) * 50],
                    rotate: [0, 360],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Decoration - Only show during countdown */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-dusty-pink"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CountdownPage;

