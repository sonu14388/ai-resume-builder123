import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Copy,
  Check,
  X,
  Coffee,
  QrCode,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Gift,
  ArrowRight,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  isDownloadTriggered?: boolean;
}

export const DonationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title = 'Support the Creator',
  isDownloadTriggered = false
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(49);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [showQrFullscreen, setShowQrFullscreen] = useState<boolean>(false);

  if (!isOpen) return null;

  const creatorName = 'Akash Vishwakarma';
  const defaultUpiId = '7350089567a143-5@okhdfcbank'; // Primary Google Pay / HDFC UPI ID
  const creatorEmail = 'sonuakash11121@gamil.com';

  const amountToPay = customAmount && parseInt(customAmount, 10) > 0 ? parseInt(customAmount, 10) : selectedAmount;

  // UPI deep link
  const upiUrl = `upi://pay?pa=${defaultUpiId}&pn=${encodeURIComponent(creatorName)}&am=${amountToPay}&cu=INR&tn=${encodeURIComponent('Resume Builder Support')}`;
  
  // Dynamic high-res QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUrl)}&margin=10&color=0f172a`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(defaultUpiId);
    setCopiedUpi(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const presetAmounts = [
    { value: 29, label: '₹29', icon: '☕', desc: 'Chai Treat' },
    { value: 49, label: '₹49', icon: '🍕', desc: 'Snack Support', popular: true },
    { value: 99, label: '₹99', icon: '🚀', desc: 'Super Booster' },
    { value: 199, label: '₹199', icon: '💎', desc: 'Hero Sponsor' }
  ];

  return (
    <div
      id="donation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="donation-modal-content"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden my-6 transition-all transform animate-in zoom-in-95 duration-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colorful Gradient Header Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 text-white overflow-hidden">
          {/* Ambient circles & glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-all cursor-pointer z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {isDownloadTriggered ? '🎉' : '💖'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{isDownloadTriggered ? 'Download Ready' : '100% Free Forever'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                {isDownloadTriggered ? 'Your Resume is Downloading!' : title}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-1 leading-relaxed">
                Resume Builder Free is completely free with no watermarks. If it helped you, consider supporting <strong className="text-white font-bold">{creatorName}</strong> with a small tip!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Preset Contribution Chips */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Select Contribution Amount:</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">Every ₹ helps keep servers active</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((preset) => {
                const isSelected = selectedAmount === preset.value && !customAmount;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(preset.value);
                      setCustomAmount('');
                    }}
                    className={`relative p-2.5 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm scale-102 font-bold'
                        : 'border-slate-200 bg-white hover:border-rose-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {preset.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full tracking-wider shadow-xs">
                        Popular
                      </span>
                    )}
                    <div className="text-base">{preset.icon}</div>
                    <div className="text-sm font-black mt-0.5">{preset.label}</div>
                    <div className="text-[9px] opacity-75 font-medium">{preset.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Input */}
            <div className="mt-2.5 flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Or enter custom amount (e.g. 150)"
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* QR Code & UPI Details Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 text-white shadow-lg border border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Scan QR Code Container */}
              <div className="bg-white p-2.5 rounded-2xl shadow-md shrink-0 flex flex-col items-center group relative cursor-pointer"
                onClick={() => setShowQrFullscreen(!showQrFullscreen)}
                title="Click to toggle QR zoom"
              >
                <img
                  src={qrCodeUrl}
                  alt="UPI Payment QR Code"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg object-contain"
                  loading="lazy"
                />
                <span className="text-[9px] font-bold text-slate-700 mt-1 flex items-center gap-1">
                  <QrCode className="w-3 h-3 text-blue-600" />
                  <span>Scan to Pay ₹{amountToPay}</span>
                </span>
              </div>

              {/* UPI ID Info & Quick Action */}
              <div className="flex-1 text-center sm:text-left space-y-3 w-full">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Bank UPI (0% Fee)</span>
                  </div>
                  <h4 className="text-white font-bold text-base mt-0.5">{creatorName}</h4>
                  <p className="text-slate-400 text-[11px]">Any UPI App: GPay, PhonePe, Paytm, BHIM, Cred, Amazon Pay</p>
                </div>

                {/* Copy UPI ID Bar */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2 flex items-center justify-between gap-2">
                  <div className="text-left min-w-0 pl-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">UPI ID</span>
                    <code className="text-xs font-mono font-bold text-amber-300 truncate block">
                      {defaultUpiId}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                      copiedUpi
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
                    }`}
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct UPI App Trigger (Mobile Friendly) */}
                <a
                  href={upiUrl}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition-all sm:hidden"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Pay ₹{amountToPay} via Installed UPI App</span>
                </a>
              </div>
            </div>

            {/* Supported Payment App Logos/Badges */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
              <span className="font-semibold text-slate-300">Accepted Apps:</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-white font-bold border border-slate-700">GPay</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-900/50 text-purple-200 font-bold border border-purple-800/50">PhonePe</span>
                <span className="px-2 py-0.5 rounded-md bg-sky-900/50 text-sky-200 font-bold border border-sky-800/50">Paytm</span>
                <span className="px-2 py-0.5 rounded-md bg-orange-900/50 text-orange-200 font-bold border border-orange-800/50">BHIM</span>
              </div>
            </div>
          </div>

          {/* Sweet note from creator */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">
                &ldquo;Thank you for using this app! Your voluntary contribution supports cloud hosting, domain renewal, and continuous feature updates.&rdquo;
              </p>
              <span className="text-[10px] text-amber-700 font-bold block mt-1">
                — Akash Vishwakarma ({creatorEmail})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer text-center"
            >
              {isDownloadTriggered ? 'Continue Building' : 'Close'}
            </button>

            <button
              type="button"
              onClick={handleCopyUpi}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{copiedUpi ? 'UPI Copied!' : 'Copy UPI & Pay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
