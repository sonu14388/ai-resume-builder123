import { ResumeDocument, ResumeData, ResumeStyle, UserAccount } from '../types';
import { defaultResumeDocument } from '../data/defaultResume';

const STORAGE_KEYS = {
  CURRENT_DRAFT: 'resume_builder_free_current_draft',
  SAVED_RESUMES: 'resume_builder_free_saved_resumes',
  USER_ACCOUNT: 'resume_builder_free_user_account'
};

export const getSavedDraft = (): ResumeDocument => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.data) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading saved draft:', err);
  }
  return defaultResumeDocument;
};

export const saveDraft = (doc: ResumeDocument): void => {
  try {
    const updatedDoc = {
      ...doc,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT, JSON.stringify(updatedDoc));
  } catch (err) {
    console.error('Error saving draft:', err);
  }
};

export const getSavedResumes = (): ResumeDocument[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_RESUMES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading saved resumes:', err);
  }
  // Initialize with the default document
  return [defaultResumeDocument];
};

export const saveResumesList = (resumes: ResumeDocument[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_RESUMES, JSON.stringify(resumes));
  } catch (err) {
    console.error('Error saving resumes list:', err);
  }
};

export const getUserAccount = (): UserAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ACCOUNT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.isLoggedIn) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading user account:', err);
  }
  return null;
};

export const setUserAccount = (user: UserAccount | null): void => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER_ACCOUNT, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER_ACCOUNT);
    }
  } catch (err) {
    console.error('Error updating user account:', err);
  }
};
