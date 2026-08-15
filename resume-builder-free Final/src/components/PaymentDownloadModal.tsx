import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  X,
  QrCode,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Download,
  Loader2,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileCheck,
  CreditCard,
  Zap,
  Star,
  MessageSquareHeart,
  Send,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportResumeToPDF } from '../utils/pdfExport';
import { saveUserFeedback } from '../utils/feedbackStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeTitle?: string;
  candidateName?: string;
  documentId?: string;
  onPaymentSuccess?: () => void;
  onOpenFeedback?: () => void;
}

export const PaymentDownloadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  resumeTitle = 'Professional Resume',
  candidateName = 'Candidate',
  documentId,
  onPaymentSuccess,
  onOpenFeedback
}) => {
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Post-download feedback state
  const [fbRating, setFbRating] = useState<number>(5);
  const [fbRole, setFbRole] = useState<string>('');
  const [fbComment, setFbComment] = useState<string>('');
  const [fbTags, setFbTags] = useState<string[]>(['⚡ Super Fast', '💰 ₹10 Very Affordable', '🎯 ATS-Friendly']);
  const [fbSubmitted, setFbSubmitted] = useState<boolean>(false);
  const [isSubmittingFb, setIsSubmittingFb] = useState<boolean>(false);

  if (!isOpen) return null;

  const creatorName = 'Akash Vishwakarma';
  const upiId = '7350089567a143-5@okhdfcbank';
  const amount = 10;

  // UPI deep link
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(creatorName)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Resume Download PDF')}`;
  
  // Dynamic high-res QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUrl)}&margin=10&color=0f172a`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleConfirmAndDownload = async () => {
    setIsExporting(true);
    setExportProgress('Connecting & preparing A4 PDF...');

    try {
      const fileName = `${candidateName || 'Resume'}_CV.pdf`.replace(/\s+/g, '_');
      
      const success = await exportResumeToPDF({
        fileName,
        elementId: 'resume-printable-area',
        onProgress: (stage) => setExportProgress(stage)
      });

      if (success) {
        setIsCompleted(true);
        if (documentId) {
          try {
            const paid = JSON.parse(localStorage.getItem('paid_resumes_list') || '[]');
            if (!paid.includes(documentId)) {
              paid.push(documentId);
              localStorage.setItem('paid_resumes_list', JSON.stringify(paid));
            }
          } catch {
            // ignore
          }
        }
        onPaymentSuccess?.();
      }
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div
      id="payment-download-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="payment-download-modal-content"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden my-4 sm:my-6 transition-all transform animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 p-5 sm:p-6 text-white overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 hover:text-white transition-all cursor-pointer z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
              {isCompleted ? '🎉' : '📄'}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold tracking-wide uppercase mb-1">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>Instant Download • No Sign-Up Needed</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
                {isCompleted ? 'Resume Downloaded Successfully!' : 'Pay ₹10 to Download Resume PDF'}
              </h2>
              <p className="text-white/85 text-xs mt-1 leading-relaxed">
                Scan QR or pay via any UPI app (GPay, PhonePe, Paytm) to download your watermark-free A4 PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {isCompleted ? (
            /* Success View */
            <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Payment Confirmed!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto">
                  Your clean, ATS-optimized A4 resume has been downloaded to your device.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 text-left text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Candidate:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{candidateName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">₹10.00</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Paid to UPI:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{upiId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>Payee:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{creatorName}</span>
                </div>
              </div>

              {/* Interactive Feedback & Review Form right after download */}
              <div className="bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/80 dark:border-amber-900/60 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 dark:text-amber-300">
                    <MessageSquareHeart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>How was your experience? Give Feedback</span>
                  </div>
                  {fbSubmitted && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Saved!
                    </span>
                  )}
                </div>

                {!fbSubmitted ? (
                  <div className="space-y-2.5">
                    {/* Star selection */}
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-slate-700">
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Rate Resume Builder:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFbRating(star)}
                            className="text-amber-400 hover:scale-125 transition-transform p-0.5 cursor-pointer"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                fbRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick tags */}
                    <div className="flex flex-wrap gap-1">
                      {['⚡ Super Fast', '💰 ₹10 Very Affordable', '🎯 ATS-Friendly', '🎨 Great Templates', '📱 Mobile Friendly'].map((tag) => {
                        const isSel = fbTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setFbTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
                            }}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                              isSel
                                ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    {/* Optional Comment Input */}
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="Write a short review / suggestion (optional)..."
                        value={fbComment}
                        onChange={(e) => setFbComment(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          saveUserFeedback({
                            name: candidateName || 'Anonymous Candidate',
                            role: fbRole || 'Job Seeker',
                            rating: fbRating,
                            tags: fbTags,
                            comment: fbComment.trim() || 'Downloaded my resume successfully for ₹10. Great service!',
                            resumeTitle
                          });
                          setFbSubmitted(true);
                          try {
                            confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
                          } catch {
                            // ignore
                          }
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-amber-900 dark:text-amber-300">
                    🎉 Thank you for your feedback! Your review helps us continuously improve the resume builder.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmAndDownload}
                  disabled={isExporting}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span>Download Again</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Payment Flow View */
            <>
              {/* Price Banner Card */}
              <div className="flex items-center justify-between p-3.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                    ₹10
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">One-Time Download Fee</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Lifetime access to this downloaded file</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs line-through text-slate-400">₹99</span>
                  <span className="ml-1.5 font-black text-blue-600 dark:text-blue-400 text-lg">₹10</span>
                </div>
              </div>

              {/* QR Code & UPI Details Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Left: Dynamic QR Code */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
                  <div className="relative p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                    <img
                      src={qrCodeUrl}
                      alt="UPI QR Code for ₹10"
                      className="w-36 h-36 object-contain rounded-lg"
                      loading="eager"
                    />
                    <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-extrabold rounded-md shadow-xs">
                      ₹10 ONLY
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-3">
                    Scan with GPay / PhonePe / Paytm
                  </p>
                </div>

                {/* Right: UPI ID & Payee details */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-1">
                      Pay to UPI ID:
                    </span>
                    <div className="flex items-center justify-between gap-1 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 truncate">
                        {upiId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-1 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors cursor-pointer shrink-0"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? (
                          <span className="flex items-center text-[10px] font-bold text-emerald-600 gap-0.5">
                            <Check className="w-3.5 h-3.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{creatorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Account:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">HDFC Bank UPI</span>
                    </div>
                  </div>

                  {/* Mobile Quick UPI App Intent Button */}
                  <a
                    href={upiUrl}
                    className="sm:hidden w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Pay ₹10 via Installed UPI App</span>
                  </a>
                </div>
              </div>

              {/* Step 2: Verification / Download Trigger */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>UPI Reference / UTR (Optional):</span>
                  </label>
                  <span className="text-[10px] text-slate-400">e.g. 12 digits</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter 12-digit UTR from your UPI app (optional)"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />

                {/* Big Action Button */}
                <button
                  type="button"
                  id="confirm-pay-download-btn"
                  onClick={handleConfirmAndDownload}
                  disabled={isExporting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{exportProgress || 'Generating High-Res PDF...'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I Have Paid ₹10 — Download PDF Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust & Guarantee Badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Secure UPI Payment
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> No Watermark
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> High-Res A4 PDF
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
