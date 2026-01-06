import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import { ScanLine, Sparkles } from 'lucide-react';

const SECRET_CODE = 'I-LOVE-U_LISA-ARDELIANA';

interface QRScannerPageProps {
  onSuccess: () => void;
}

const QRScannerPage = ({ onSuccess }: QRScannerPageProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = async () => {
    if (!containerRef.current) return;

    try {
      setError(null);
      setIsScanning(true);

      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScanResult(decodedText);
          if (decodedText === SECRET_CODE) {
            setShowSuccess(true);
            html5QrCode.stop();
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            setError('Kode undangan tidak valid nih. Coba Scan lagi.');
            setTimeout(() => setError(null), 3000);
          }
        },
        () => {}
      );
    } catch (err) {
      setError('Akses Kamera Ditolak. Tolong Berikan Akses kamera untuk scan.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        // Scanner already stopped, ignore
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop();
        } catch (err) {
          // Scanner already stopped, ignore
        }
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen gradient-ethereal flex flex-col items-center justify-center px-4 relative overflow-hidden'
    >
      {/* Decorative sparkles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className='w-4 h-4 text-dusty-pink/40' />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {showSuccess ? (
          <motion.div
            key='success'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className='text-center z-10'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className='w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden shadow-glow border-4 border-dusty-pink/50'
            >
              <img 
                src='/src/images/image-lisa.jpg' 
                alt='Lisa Ardéliana' 
                className='w-full h-full object-cover'
              />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='font-display text-3xl md:text-4xl text-deep-maroon mb-2'
            >
              Yeayyyy, Selamat Datang Sayang^^!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='text-muted-foreground'
            >
              Selamat datang. Yukss, kita rayain hari spesial ini.
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key='scanner'
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className='text-center z-10 w-full max-w-md'
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='mb-8'
            >
              <ScanLine className='w-12 h-12 mx-auto mb-4 text-dusty-dark' />
              <h1 className='font-display text-3xl md:text-4xl text-deep-maroon mb-3'>
                KODE RAHASIA
              </h1>
              <p className='text-muted-foreground text-sm md:text-base'>
                Ini adalah website rahasia negara, Silahkan kamu Scan bagian yang bertuliskan
                <strong>"TOKEN"</strong> yaaa! 
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='glass rounded-3xl p-6 shadow-card'
            >
              <div
                ref={containerRef}
                id='qr-reader'
                className='w-full aspect-square rounded-2xl overflow-hidden bg-muted mb-6'
                style={{ display: isScanning ? 'block' : 'none' }}
              />

              {!isScanning && (
                <div className='w-full aspect-square rounded-2xl bg-muted flex items-center justify-center mb-6'>
                  <div className='text-center p-6'>
                    <div className='w-32 h-32 mx-auto mb-4 border-2 border-dashed border-dusty-pink rounded-xl flex items-center justify-center'>
                      <ScanLine className='w-12 h-12 text-dusty-pink animate-pulse' />
                    </div>
                    <p className='text-muted-foreground text-sm'>
                      Tekan Tombol "<strong>Mulai Scan</strong>" buat scan yaa
                      sayang!
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='text-destructive text-sm mb-4'
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={isScanning ? stopScanner : startScanner}
                className='w-full py-4 px-6 rounded-xl bg-gradient-to-r from-dusty-pink to-rose-gold text-deep-maroon font-semibold shadow-soft hover:shadow-glow transition-all duration-300'
              >
                {isScanning ? 'Berhenti Scan' : 'Mulai Scan'}
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='mt-6 text-xs text-muted-foreground'
            >
              Kamu Bakal liat website ini ketika membuka buku di halaman pertama, Yuks Scan Kodenya diatas. <strong>Tapiiii Kamu boleh baca bukunya dulu sampai habis baru akses website ini yaaaw</strong>^^
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide html5-qrcode default elements */}
      <style>{`
        #qr-reader__scan_region > img,
        #qr-reader__dashboard,
        #qr-reader__dashboard_section,
        #qr-reader__dashboard_section_csr,
        #qr-reader__dashboard_section_swaplink,
        #qr-reader > div:last-child,
        #qr-reader__status_span,
        #qr-reader__header_message {
          display: none !important;
        }
        #qr-reader video {
          border-radius: 1rem;
          object-fit: cover;
        }
        #qr-reader {
          border: none !important;
        }
      `}</style>
    </motion.div>
  );
};

export default QRScannerPage;
