import { UserFeedback } from '../types';

const INITIAL_FEEDBACKS: UserFeedback[] = [
  {
    id: 'fb-1',
    name: 'Rahul Sharma',
    role: 'Frontend Developer',
    rating: 5,
    tags: ['⚡ Super Fast', '🎯 ATS-Friendly', '💰 ₹10 Very Affordable'],
    comment: 'Just paid ₹10 via GPay and got the clean A4 PDF within seconds. Applied for 3 companies and already got an HR call for a tech interview!',
    createdAt: '2 hours ago',
    resumeTitle: 'Software Engineer Resume'
  },
  {
    id: 'fb-2',
    name: 'Priya Patel',
    role: 'B.Tech Fresher (2025)',
    rating: 5,
    tags: ['🎨 500+ Great Templates', '📱 Mobile Friendly', '🖨️ Clean PDF'],
    comment: 'I made the entire resume on my mobile phone during my bus ride. No complex login was needed, and ₹10 via UPI was super easy.',
    createdAt: '5 hours ago',
    resumeTitle: 'Entry Level IT Resume'
  },
  {
    id: 'fb-3',
    name: 'Amitabh Verma',
    role: 'Senior Project Manager',
    rating: 5,
    tags: ['🎯 ATS-Friendly', '🖨️ Clean PDF', '🎨 500+ Great Templates'],
    comment: 'The Executive Serif template with clean margins passed through standard ATS scanners seamlessly without formatting issues. Great tool by Akash!',
    createdAt: 'Yesterday',
    resumeTitle: 'Executive Leadership CV'
  },
  {
    id: 'fb-4',
    name: 'Sneha Deshmukh',
    role: 'UI/UX Designer',
    rating: 5,
    tags: ['🎨 500+ Great Templates', '⚡ Super Fast', '💰 ₹10 Very Affordable'],
    comment: 'The typography choices (Plus Jakarta & Space Grotesk) and customizable accent colors make it look like a customized Figma design.',
    createdAt: '2 days ago',
    resumeTitle: 'Product Design Resume'
  },
  {
    id: 'fb-5',
    name: 'Vikram Singh',
    role: 'Data Analyst',
    rating: 5,
    tags: ['💰 ₹10 Very Affordable', '⚡ Super Fast', '🎯 ATS-Friendly'],
    comment: 'Best ₹10 spent! Other sites ask for ₹500/month recurring subscriptions just to download a single PDF. Here it is transparent and fast.',
    createdAt: '3 days ago',
    resumeTitle: 'Analytics & SQL Resume'
  }
];

const STORAGE_KEY = 'resume_user_feedbacks_list';
const FEEDBACK_CHANGE_EVENT = 'resume_feedback_updated';

export const getStoredFeedbacks = (): UserFeedback[] => {
  try {
    const custom: UserFeedback[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return [...custom, ...INITIAL_FEEDBACKS];
  } catch {
    return INITIAL_FEEDBACKS;
  }
};

export const saveUserFeedback = (
  newFeedback: Omit<UserFeedback, 'id' | 'createdAt'>
): UserFeedback => {
  const feedbackItem: UserFeedback = {
    id: `fb-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    createdAt: 'Just now',
    ...newFeedback
  };

  try {
    const existing: UserFeedback[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = [feedbackItem, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for real-time reactivity
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(FEEDBACK_CHANGE_EVENT, { detail: feedbackItem }));
    }
  } catch (e) {
    console.error('Failed to store feedback:', e);
  }

  return feedbackItem;
};

export const onFeedbackUpdate = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(FEEDBACK_CHANGE_EVENT, callback);
  return () => window.removeEventListener(FEEDBACK_CHANGE_EVENT, callback);
};
