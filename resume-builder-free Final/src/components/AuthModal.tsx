import React, { useState } from 'react';
import { UserAccount } from '../types';
import { X, Lock, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  promptReason?: string;
  onSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  promptReason,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    // Simulate fast reliable authentication with stored mock accounts
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: `user-${Date.now()}`,
        name: name.trim() || email.split('@')[0],
        email: email.trim(),
        isLoggedIn: true
      };
      onSuccess(user);
      onClose();
    }, 450);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: 'user-google-oauth-101',
        name: 'Alex Johnson',
        email: 'alex.johnson@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        isLoggedIn: true
      };
      onSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#dadce0] overflow-hidden">
        {/* Close Button */}
        <button
          id="auth-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Banner */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-50 text-[#1a73e8] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-bold text-[#202124]">
              {promptReason || (mode === 'signup' ? 'Create a Free Account' : 'Welcome Back')}
            </h2>

            <p className="text-xs text-[#5f6368] mt-1.5">
              {promptReason
                ? 'Create a free account to download your resume as PDF and save it permanently.'
                : mode === 'signup'
                ? 'Sign up in seconds. 100% free with unlimited high-res PDF exports.'
                : 'Log in to access your saved resumes and export PDFs.'}
            </p>
          </div>

          {/* Quick Google Sign In */}
          <button
            type="button"
            id="auth-google-btn"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-[#dadce0] rounded-xl text-sm font-semibold text-[#3c4043] bg-white hover:bg-gray-50 transition-colors shadow-xs mb-4 cursor-pointer"
          >
            {/* Google G SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-3 text-xs text-gray-400 font-medium uppercase">or email</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    id="auth-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#dadce0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="email"
                  id="auth-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#dadce0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202124] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="password"
                  id="auth-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#dadce0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#202124] mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="password"
                    id="auth-confirm-password-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#dadce0] focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              id="auth-submit-btn"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In & Download'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle login vs signup */}
          <div className="mt-5 text-center text-xs text-[#5f6368]">
            {mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  id="auth-switch-to-login"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="font-bold text-[#1a73e8] hover:underline"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  id="auth-switch-to-signup"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="font-bold text-[#1a73e8] hover:underline"
                >
                  Create Free Account
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Benefits bar */}
        <div className="bg-gray-50 border-t border-[#dadce0] px-6 py-3 text-[11px] text-[#5f6368] flex items-center justify-around">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" /> 100% Free
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" /> Instant PDF Export
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#188038]" /> Auto-Saved
          </span>
        </div>
      </div>
    </div>
  );
};
