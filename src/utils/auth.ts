export interface User {
  name: string;
  gstin: string;
  role: 'msme' | 'lender' | 'regulator';
  email: string;
  loggedInAt: string;
}

const STORAGE_KEY = 'chainvoice_user';

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
