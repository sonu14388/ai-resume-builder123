import React, { useState } from 'react';
import {
  Star,
  X,
  MessageSquareHeart,
  Send,
  CheckCircle2,
  Sparkles,
  User,
  Briefcase,
  Heart,
  ThumbsUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveUserFeedback } from '../utils/feedbackStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
  defaultResumeTitle?: string;
  onSubmitted?: () => void;
}

const AVAILABLE_TAGS = [
  '⚡ Super Fast & Easy',
  '💰 ₹10 Very Affordable',
  '🎯 ATS-Friendly',
  '🎨 500+ Great Templates',
  '📱 Mobile Friendly',
  '🖨️ Clean A4 PDF',
  '🚀 Got an Interview!',
  '✨ No Login Needed'
];

export const FeedbackModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultName = '',
  defaultResumeTitle = '',
  onSubmitted
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>(defaultName || '');
  const [role, setRole] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '⚡ Super Fast & Easy',
    '💰 ₹10 Very Affordable'
  ]);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 1:
        return 'Needs Improvement 😕';
      case 2:
        return 'Fair / Okay 🙂';
      case 3:
        return 'Good Experience 👍';
      case 4:
        return 'Very Good / Loved it! 😍';
      case 5:
        return 'Outstanding / 5-Star! 🌟';
      default:
        return 'Select a rating';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    try {
      saveUserFeedback({
        name: name.trim(),
        role: role.trim() || 'Job Seeker',
        rating,
        tags: selectedTags,
        comment: comment.trim() || 'Great experience creating and downloading my resume for ₹10!',
        resumeTitle: defaultResumeTitle || 'Professional Resume'
      });

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setIsSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      console.error('Error saving feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="feedback-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="feedback-modal-content"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 transition-all transform animate-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 sm:p-6 text-white overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/20 rounded-full blur-xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all cursor-pointer z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
              <MessageSquareHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/25 text-[11px] font-bold tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3" />
                <span>User Feedback & Review</span>
              </div>
              <h2 className="text-xl font-black text-white">How Was Your Experience?</h2>
              <p className="text-white/90 text-xs mt-0.5">
                Your feedback helps us make resume building better for everyone!
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {isSubmitted ? (
            /* Thank You State */
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-500 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <Heart className="w-8 h-8 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Thank You for Your Feedback, {name}!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto">
                  Your rating and review have been saved and will inspire thousands of fellow job seekers.
                </p>
              </div>

              <div className="flex justify-center gap-1 text-amber-400 py-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Feedback Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Overall Rating
                </label>
                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-300 hover:scale-125 transition-transform cursor-pointer"
                        title={`${star} Stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {getRatingLabel(hoverRating || rating)}
                </div>
              </div>

              {/* Name & Role Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your Job Role / Field</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Engineer / Fresher"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Quick Tags Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  What did you like the most? (Click to select)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comments / Suggestions */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Your Review / Suggestions
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you loved, or any new feature you would like to see..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback & Review</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
