import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Gift,
  Cake,
  Star,
  PartyPopper,
  BookOpen,
  Download,
  ArrowLeft,
} from 'lucide-react';
import pdfSrc from '../document/Lvl.22_Lisa-Arde_Project.pdf';

type CelebrationStage = 'confetti' | 'cake' | 'card' | 'pdf-viewer';

const CelebrationPage = () => {
  const [stage, setStage] = useState<CelebrationStage>('confetti');
  const [isFlipped, setIsFlipped] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  // Navigation handlers
  const handleOpenJournal = () => setStage('pdf-viewer');
  const handleBackToCard = () => setStage('card');

  // Download handler
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfSrc;
    link.download = 'Lvl.22_Lisa-Arde_Project.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Continuous confetti effect
  useEffect(() => {
    const fireConfettiBurst = () => {
      const colors = [
        '#E1AD9D',
        '#C9A998',
        '#F5E6E0',
        '#8B4D5C',
        '#FFD700',
        '#FF69B4',
        '#FFC0CB',
      ];

      // Left side
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        startVelocity: 45,
      });

      // Right side
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        startVelocity: 45,
      });
    };

    // Fire confetti every 2 seconds
    const interval = setInterval(fireConfettiBurst, 2000);
    fireConfettiBurst(); // Fire immediately

    return () => clearInterval(interval);
  }, []);

  // Stage progression
  useEffect(() => {
    if (stage === 'confetti') {
      const timer = setTimeout(() => setStage('cake'), 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);



  const fireConfetti = () => {
    const colors = [
      '#E1AD9D',
      '#C9A998',
      '#F5E6E0',
      '#8B4D5C',
      '#FFD700',
      '#FF69B4',
    ];

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);

    // Celebration confetti burst
    const end = Date.now() + 2000;
    const colors = ['#E1AD9D', '#C9A998', '#F5E6E0', '#8B4D5C', '#FFD700'];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Move to card stage after animation
    setTimeout(() => setStage('card'), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen gradient-ethereal relative overflow-x-hidden'
    >


      {/* Floating Decorations */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 4 === 0 ? (
              <Heart
                className='w-5 h-5 text-dusty-pink/50'
                fill='currentColor'
              />
            ) : i % 4 === 1 ? (
              <Sparkles className='w-5 h-5 text-rose-gold/50' />
            ) : i % 4 === 2 ? (
              <Star
                className='w-4 h-4 text-yellow-400/50'
                fill='currentColor'
              />
            ) : (
              <div className='w-3 h-3 rounded-full bg-gradient-to-r from-dusty-pink/40 to-rose-gold/40' />
            )}
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute top-20 left-10 w-64 h-64 rounded-full bg-dusty-pink/20 blur-3xl'
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className='absolute bottom-20 right-10 w-80 h-80 rounded-full bg-rose-gold/20 blur-3xl'
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col'>
        <AnimatePresence mode='wait'>
          {/* Stage 1: Confetti Welcome */}
          {stage === 'confetti' && (
            <motion.div
              key='confetti-stage'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className='flex-1 flex flex-col items-center justify-center text-center'
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <PartyPopper className='w-24 h-24 md:w-32 md:h-32 text-dusty-dark' />
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='font-display text-5xl md:text-7xl text-deep-maroon mt-8 mb-4'
              >
                🎉 HAPPY LEVEL UP DAY'S! 🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='text-xl md:text-2xl text-muted-foreground'
              >
                Sebentar yaa, Website nya Ejaa Siapin dulu nich xixixixi..:V
              </motion.p>

              <motion.div
                className='mt-8 flex gap-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className='w-4 h-4 rounded-full bg-dusty-pink'
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Stage 2: Birthday Cake */}
          {stage === 'cake' && (
            <motion.div
              key='cake-stage'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className='flex-1 flex flex-col items-center justify-center text-center px-4'
            >
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='font-display text-3xl md:text-5xl text-deep-maroon mb-24'
              >
                Make a Wish! ✨
              </motion.h2>

              {/* Birthday Cake */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className='relative mb-8'
              >
                {/* Cake Container */}
                <div className='relative'>
                  {/* Candles */}
                  <div className='absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4'>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className='flex flex-col items-center'
                      >
                        {/* Flame */}
                        <AnimatePresence>
                          {!candlesBlown && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [-5, 5, -5],
                              }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className='w-4 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-yellow-200 rounded-full mb-1'
                              style={{
                                filter:
                                  'drop-shadow(0 0 8px rgba(255, 165, 0, 0.8))',
                              }}
                            />
                          )}
                        </AnimatePresence>
                        {/* Candle stick */}
                        <div className='w-2 h-10 bg-gradient-to-b from-pink-300 to-pink-400 rounded-sm' />
                      </motion.div>
                    ))}
                  </div>

                  {/* Cake layers */}
                  <div className='flex flex-col items-center'>
                    {/* Top tier */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className='w-32 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-lg relative overflow-hidden'
                    >
                      <div className='absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-100 via-white to-pink-100' />
                      <div className='absolute bottom-2 left-0 right-0 flex justify-center gap-2'>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className='w-2 h-2 rounded-full bg-rose-gold'
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Middle tier */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className='w-44 h-20 bg-gradient-to-b from-pink-300 to-pink-400 relative overflow-hidden'
                    >
                      <div className='absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-pink-100 to-transparent' />
                      <div className='absolute top-2 left-0 right-0 flex justify-center'>
                        <div className='text-2xl'>🍓</div>
                      </div>
                      {/* Dripping frosting */}
                      <div className='absolute bottom-0 left-0 right-0 flex justify-around'>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className='w-3 h-4 bg-pink-200 rounded-b-full'
                            style={{ marginTop: i % 2 === 0 ? 0 : 4 }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Bottom tier */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className='w-56 h-24 bg-gradient-to-b from-dusty-pink to-dusty-dark rounded-b-lg relative overflow-hidden shadow-lg'
                    >
                      <div className='absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-pink-200 to-transparent' />
                      {/* Decorations */}
                      <div className='absolute top-6 left-4 right-4 flex justify-between'>
                        <span className='text-xl'>🌸</span>
                        <span className='text-xl'>💕</span>
                        <span className='text-xl'>🌸</span>
                      </div>
                      {/* Number 22 */}
                      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
                        <span className='font-display text-2xl text-soft-white font-bold drop-shadow-lg'>
                          22
                        </span>
                      </div>
                    </motion.div>

                    {/* Cake plate */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className='w-64 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mt-1 shadow-md'
                    />
                  </div>
                </div>
              </motion.div>

              {/* Blow candles button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                disabled={candlesBlown}
                className={`px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 ${
                  candlesBlown
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-dusty-pink via-rose-gold to-dusty-pink text-deep-maroon hover:shadow-glow animate-pulse'
                }`}
              >
                <span className='text-2xl'>🎂</span>
                {candlesBlown ? 'Buatlah Permintaan!' : 'Matikan Lilinnya!'}
                <span className='text-2xl'>🎂</span>
              </motion.button>

              {candlesBlown && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-4 text-dusty-dark font-display italic text-xl'
                >
                  ✨ Doa yang terbaik yaa untuk kamu, dan semoga hal-hal baik selalu datang kepadamu! AAMIIN 🫶🏾✨
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Stage 3: Birthday Card */}
          {stage === 'card' && (
            <motion.div
              key='card-stage'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='flex-1 flex flex-col'
            >
              {/* Header */}
              <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className='text-center mb-2 md:mb-4'
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='inline-block mb-2'
                >
                  <div className='relative'>
                    <Cake className='w-12 h-12 md:w-16 md:h-16 text-dusty-dark mx-auto' />
                    <motion.div
                      animate={{ scale: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className='absolute -top-2 -right-2'
                    >
                      <Sparkles className='w-6 h-6 text-yellow-400' />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className='font-display text-3xl md:text-5xl lg:text-6xl text-deep-maroon mb-1 drop-shadow-lg'
                >
                  Happy Level Up Day's!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className='font-display italic text-xl md:text-2xl text-dusty-dark'
                >
                  Lisa Ardéliana✨
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className='mt-2 inline-block'
                >
                  <span className='px-6 py-2 rounded-full bg-gradient-to-r from-dusty-pink/30 to-rose-gold/30 text-deep-maroon font-semibold tracking-wider border border-dusty-pink/50'>
                    🎮 Level 22 Achievement Unlocked! 🏆
                  </span>
                </motion.div>
              </motion.header>

              {/* Polaroid Card */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className='flex-1 flex items-start justify-center mt-2'
              >
                <div
                  className='perspective-1000 cursor-pointer group'
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className='relative w-80 md:w-96 lg:w-[420px]'
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front of card */}
                    <motion.div
                      className='absolute inset-0 backface-hidden'
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Front of card - PREMIUM DESIGN */}
                      <div className='relative bg-gradient-to-br from-white via-rose-50 to-dusty-light p-1 rounded-3xl shadow-2xl'>
                        {/* Outer glow ring */}
                        <div className='absolute -inset-1 bg-gradient-to-r from-dusty-pink via-rose-gold to-dusty-pink rounded-3xl opacity-50 blur-sm animate-pulse' />
                        
                        <div className='relative bg-gradient-to-br from-white via-soft-white to-dusty-light p-5 rounded-3xl border border-white/60'>
                          {/* Image area with decorative frame */}
                          <div className='relative'>
                            {/* Decorative corners */}
                            <div className='absolute -top-1 -left-1 w-8 h-8 border-l-3 border-t-3 border-dusty-pink/60 rounded-tl-lg' />
                            <div className='absolute -top-1 -right-1 w-8 h-8 border-r-3 border-t-3 border-dusty-pink/60 rounded-tr-lg' />
                            <div className='absolute -bottom-1 -left-1 w-8 h-8 border-l-3 border-b-3 border-dusty-pink/60 rounded-bl-lg' />
                            <div className='absolute -bottom-1 -right-1 w-8 h-8 border-r-3 border-b-3 border-dusty-pink/60 rounded-br-lg' />
                            
                            <div className='aspect-[4/5] bg-gradient-to-br from-dusty-light via-rose-100 to-dusty-pink/40 rounded-2xl overflow-hidden mb-4 flex items-center justify-center relative shadow-inner'>
                              {/* Sparkle effects */}
                              <motion.div
                                className='absolute inset-0'
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {[...Array(12)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className='absolute'
                                    style={{
                                      left: `${10 + Math.random() * 80}%`,
                                      top: `${10 + Math.random() * 80}%`,
                                    }}
                                    animate={{
                                      scale: [0, 1.2, 0],
                                      rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                      duration: 2.5,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  >
                                    <Star
                                      className='w-3 h-3 text-yellow-400/70'
                                      fill='currentColor'
                                    />
                                  </motion.div>
                                ))}
                              </motion.div>

                              {/* Floating hearts background */}
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={`heart-${i}`}
                                  className='absolute'
                                  style={{
                                    left: `${15 + i * 15}%`,
                                    bottom: '10%',
                                  }}
                                  animate={{
                                    y: [0, -100, 0],
                                    opacity: [0.3, 0.6, 0.3],
                                    scale: [0.8, 1, 0.8],
                                  }}
                                  transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                  }}
                                >
                                  <Heart className='w-4 h-4 text-dusty-pink/40' fill='currentColor' />
                                </motion.div>
                              ))}

                              <div className='text-center p-6 relative z-10'>
                                {/* Gift icon with glow */}
                                <motion.div
                                  animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, -5, 0],
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                  className='relative'
                                >
                                  <div className='absolute inset-0 blur-xl bg-dusty-pink/30 rounded-full' />
                                  <Gift className='w-24 h-24 mx-auto mb-4 text-deep-maroon drop-shadow-xl relative z-10' />
                                </motion.div>
                                
                                <motion.p 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className='font-display text-xl md:text-2xl text-deep-maroon font-semibold drop-shadow-sm'
                                >
                                  Buka Aku Sayang
                                </motion.p>
                                <p className='font-display text-base text-dusty-dark mt-2'>
                                  ini pesan buat kamu 💌
                                </p>
                                <motion.div
                                  animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className='mt-5'
                                >
                                  <span className='text-sm text-muted-foreground bg-white/60 px-4 py-2 rounded-full shadow-sm'>
                                    👆 Tekan Diarea ini yaa..
                                  </span>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Bottom label */}
                          <div className='flex items-center justify-center gap-3 py-2'>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Heart
                                className='w-5 h-5 text-dusty-pink drop-shadow'
                                fill='currentColor'
                              />
                            </motion.div>
                            <p className='font-display text-center text-deep-maroon text-lg font-medium'>
                              Spesial Buat Kamu
                            </p>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                            >
                              <Heart
                                className='w-5 h-5 text-dusty-pink drop-shadow'
                                fill='currentColor'
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Back of card - FIXED STYLING */}
                    <motion.div
                      className='absolute inset-0 backface-hidden'
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <div className='bg-gradient-to-br from-soft-white via-rose-light to-dusty-light p-4 md:p-6 rounded-2xl shadow-card border-4 border-dusty-pink/30 h-full min-h-[520px] md:min-h-[580px]'>
                        <div className='h-full flex flex-col justify-center text-center space-y-3 bg-white/50 rounded-xl p-3 md:p-5 backdrop-blur-sm'>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Heart
                              className='w-12 h-12 mx-auto text-dusty-pink drop-shadow-lg'
                              fill='currentColor'
                            />
                          </motion.div>

                          <h3 className='font-display text-2xl md:text-3xl text-deep-maroon'>
                            Dearest Lisa Ardé,
                          </h3>

                          <div className='w-16 h-0.5 bg-gradient-to-r from-transparent via-dusty-pink to-transparent mx-auto' />

                          <p className='text-deep-maroon/80 leading-relaxed text-sm md:text-base font-medium'>
                            Selamat ulang tahun yang ke-22! 🎂
                          </p>

                          <p className='text-muted-foreground leading-relaxed text-sm md:text-base'>
                            Di usia yang baru ini, aku berdoa agar langkahmu selalu diterangi cahaya kebaikan, 
                            hatimu senantiasa dipenuhi kedamaian, dan setiap mimpi yang kau rajut dalam diam 
                            perlahan menemukan jalannya menuju kenyataan.
                          </p>

                          <p className='text-muted-foreground leading-relaxed text-sm md:text-base'>
                            Terima kasih telah hadir dan mewarnai hari-hariku dengan ketulusan yang tak pernah 
                            kau minta balasannya. Kamu adalah puisi yang tak perlu kata-kata, 
                            adalah jawaban dari doa yang bahkan belum sempat aku ucapkan.
                          </p>
                          <div className='w-16 h-0.5 bg-gradient-to-r from-transparent via-dusty-pink to-transparent mx-auto' />

                          <p className='font-display italic text-dusty-dark text-lg md:text-xl'>
                            - EJAAAAAAAA 💕
                          </p>

                          <div className='flex justify-center gap-2 pt-2'>
                            {['🌸', '💖', '✨', '💖', '🌸'].map((emoji, i) => (
                              <motion.span
                                key={i}
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                              >
                                {emoji}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Baca Jurnal Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className='flex justify-center mt-6'
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenJournal}
                  className='px-8 py-4 rounded-full font-semibold shadow-lg bg-gradient-to-r from-dusty-pink via-rose-gold to-dusty-pink text-deep-maroon hover:shadow-glow transition-all duration-300 flex items-center gap-3'
                >
                  <BookOpen className='w-5 h-5' />
                  <span>Baca Jurnal 📖</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Stage 4: PDF Viewer */}
          {stage === 'pdf-viewer' && (
            <motion.div
              key='pdf-viewer-stage'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className='flex-1 flex flex-col items-center px-4 py-4'
            >
              {/* Header */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-center mb-4'
              >
                <div className='flex items-center justify-center gap-3 mb-2'>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BookOpen className='w-8 h-8 md:w-10 md:h-10 text-dusty-dark' />
                  </motion.div>
                  <h2 className='font-display text-2xl md:text-4xl text-deep-maroon drop-shadow-lg'>
                    Jurnal Spesial ✨
                  </h2>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className='w-6 h-6 text-dusty-pink' fill='currentColor' />
                  </motion.div>
                </div>
                <p className='text-muted-foreground text-sm md:text-base'>
                  Ini jurnal yang Ejaa tulis khusus buat kamu 💕
                </p>
              </motion.div>

              {/* PDF Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className='w-full max-w-4xl flex-1 bg-gradient-to-br from-soft-white via-rose-light to-dusty-light rounded-2xl shadow-card border-4 border-dusty-pink/30 overflow-hidden'
              >
                {pdfError ? (
                  <div className='h-full flex flex-col items-center justify-center p-8 text-center'>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <BookOpen className='w-16 h-16 text-dusty-dark/50 mb-4' />
                    </motion.div>
                    <p className='text-deep-maroon font-medium mb-4'>
                      PDF gagal dimuat 😢
                    </p>
                    <button
                      onClick={() => setPdfError(false)}
                      className='px-6 py-2 rounded-full bg-gradient-to-r from-dusty-pink to-rose-gold text-deep-maroon font-medium hover:shadow-lg transition-all'
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : (
                  <iframe
                    src={pdfSrc}
                    className='w-full h-[60vh] md:h-[70vh]'
                    title='Jurnal Lisa'
                    onError={() => setPdfError(true)}
                  />
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='flex flex-col sm:flex-row gap-4 mt-6'
              >
                {/* Back Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToCard}
                  className='px-6 py-3 rounded-full font-semibold shadow-lg bg-white/80 text-deep-maroon border-2 border-dusty-pink/50 hover:bg-dusty-light transition-all duration-300 flex items-center justify-center gap-2'
                >
                  <ArrowLeft className='w-5 h-5' />
                  <span>Kembali</span>
                </motion.button>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className='px-6 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-dusty-pink via-rose-gold to-dusty-pink text-deep-maroon hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2'
                >
                  <Download className='w-5 h-5' />
                  <span>Download PDF 📥</span>
                </motion.button>
              </motion.div>

              {/* Decorative footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className='flex justify-center gap-2 mt-4'
              >
                {['🌸', '💖', '✨', '💖', '🌸'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Custom Styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </motion.div>
  );
};

export default CelebrationPage;
