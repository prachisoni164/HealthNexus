import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  rememberMe: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  initAuth: () => () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      rememberMe: false,

      login: async (email, password, rememberMe) => {
        set({ loading: true, error: null });

        // Dummy credentials bypass
        if (email === 'demo@healthnexus.com' && password === 'demo@123') {
          set({
            user: {
              uid: 'demo-user-001',
              email: 'demo@healthnexus.com',
              displayName: 'Dr. Demo User',
              photoURL: null,
            },
            rememberMe,
            loading: false,
            error: null,
          });
          return;
        }

        try {
          const credential = await signInWithEmailAndPassword(auth, email, password);
          const firebaseUser = credential.user;
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            },
            rememberMe,
            loading: false,
            error: null,
          });
        } catch (err: unknown) {
          let errorMessage = 'Login failed. Please try again.';
          if (err && typeof err === 'object' && 'code' in err) {
            const code = (err as { code: string }).code;
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
              errorMessage = 'Invalid email or password.';
            } else if (code === 'auth/too-many-requests') {
              errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (code === 'auth/network-request-failed') {
              errorMessage = 'Network error. Please check your connection.';
            }
          }
          set({ error: errorMessage, loading: false });
          throw err;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch {
          set({ loading: false });
        }
      },

      setUser: (user) => set({ user, loading: false }),
      setLoading: (loading) => set({ loading }),
      clearError: () => set({ error: null }),

      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              },
              loading: false,
            });
          } else {
            set({ user: null, loading: false });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ rememberMe: state.rememberMe }),
    }
  )
);
