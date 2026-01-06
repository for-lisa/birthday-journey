import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Copy, Check, Settings } from 'lucide-react';

const SECRET_CODE = "I-LOVE-U_LISA-ARDELIANA";

const QRGeneratorPage = () => {
  const [customCode, setCustomCode] = useState(SECRET_CODE);
  const [copied, setCopied] = useState(false);
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(customCode)}&bgcolor=F5E6E0&color=3D2027`;

  const handleCopy = () => {
    navigator.clipboard.writeText(customCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'birthday-invitation-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen gradient-ethereal flex flex-col items-center justify-center px-4 py-8"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-dusty-light to-dusty-pink flex items-center justify-center shadow-soft"
          >
            <Settings className="w-8 h-8 text-deep-maroon" />
          </motion.div>
          <h1 className="font-display text-3xl md:text-4xl text-deep-maroon mb-2">
            QR Generator
          </h1>
          <p className="text-muted-foreground text-sm">
            Admin page - Generate invitation QR codes
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-6 shadow-card"
        >
          {/* QR Code Display */}
          <div className="bg-soft-white rounded-2xl p-6 mb-6 flex items-center justify-center">
            <img 
              src={qrCodeUrl} 
              alt="QR Code"
              className="w-48 h-48 md:w-64 md:h-64 rounded-lg"
            />
          </div>

          {/* Secret Code Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Secret Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-dusty-pink transition-all"
                placeholder="Enter secret code"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="px-4 py-3 rounded-xl bg-muted text-muted-foreground hover:bg-dusty-light transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> The QR code above encodes the secret code "{customCode}". 
              Share this QR code with your guests. They will need to scan it to access the birthday celebration page.
            </p>
          </div>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-dusty-pink to-rose-gold text-deep-maroon font-semibold shadow-soft hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
          >
            <QrCode className="w-5 h-5" />
            Download QR Code
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-xs text-muted-foreground"
        >
          This is an admin-only page. Keep this URL private.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default QRGeneratorPage;
