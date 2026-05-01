import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const DUMMY_EMAIL = 'demo@healthnexus.com';
const DUMMY_PASSWORD = 'demo@123';

export default function Login() {
  const navigate = useNavigate();
  const { login, user, loading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    clearError();
  }, [email, password, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    try {
      await login(email, password, rememberMe);
      navigate('/dashboard', { replace: true });
    } catch {
      // error handled in store
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDummyLogin = async () => {
    setEmail(DUMMY_EMAIL);
    setPassword(DUMMY_PASSWORD);
    setIsSubmitting(true);
    try {
      await login(DUMMY_EMAIL, DUMMY_PASSWORD, false);
      navigate('/dashboard', { replace: true });
    } catch {
      // error handled in store
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isSubmitting) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-violet-950" />
        {/* Glowing orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl"
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Glassmorphism card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-glass">
          {/* Card glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none" />

          {/* Logo/Brand */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow mb-4"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
            >
              HealthNexus
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-sm mt-1"
            >
              B2B Healthcare Management Platform
            </motion.p>
          </div>

          {/* Sign in text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-white">Welcome back</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your account to continue</p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Remember me */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                    rememberMe ? 'bg-gradient-to-r from-indigo-500 to-violet-600' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    animate={{ x: rememberMe ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </button>
            </motion.div>

            {/* Submit */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Dummy credentials button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleDummyLogin}
            disabled={isSubmitting}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            Continue with Demo Credentials
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-center text-xs text-gray-600"
          >
            demo@healthnexus.com · demo@123
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
